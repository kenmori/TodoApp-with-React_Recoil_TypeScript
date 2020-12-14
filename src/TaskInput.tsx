import * as React from "react";
import * as Atoms from "./atoms/index";
import * as uuid from "uuid/";
import omit from "lodash/omit";
import { useSetRecoilState, useRecoilState, RecoilState } from "recoil";

const Task = () => {
  const [titleState, setTitleState] = React.useState<string>("");
  const setTask = useSetRecoilState(Atoms.taskState);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitleState(e.target.value);
  };
  const registerTask = (_e: React.MouseEvent<HTMLButtonElement>) => {
    if (titleState !== "") {
      setTask((task: Atoms.Task) => {
        console.log(task, "task");
        const id = uuid.v4();
        return {
          ...task,
          [id]: { id, title: titleState, isCompleted: false }
        };
      });
    } else {
      window.alert("hey!! create task!!!");
    }
    setTitleState("");
  };

  return (
    <div>
      <input type="text" onChange={onChange} value={titleState} />;
      <button onClick={registerTask}>create task</button>
    </div>
  );
};

export const TaskList = () => {
  const [tasks, setTask] = useRecoilState(Atoms.taskState);

  const remove = (id: string) => () => {
    setTask((task: Atoms.Task) => omit(task, id));
  };
  const toggle = (id: string) => () => {
    setTask((task: Atoms.Task) => {
      const target = { ...task[id], isCompleted: !task.isCompleted };
      const result = { ...task, [id]: target };
      return result;
    });
  };
  console.log("task", tasks);
  return (
    <>
      <Task />
      <div>
        <span role="img" aria-label="book">
          📚
        </span>
        not completed
      </div>
      {/* TODO refactor */}
      {Object.values<Atoms.Item>(tasks)
        .filter(e => !e.isCompleted)
        .map(e => (
          <div key={`${e.id}`}>
            <div>
              <input type="checkbox" onClick={toggle(`${e.id}`)} />
              {e.title} <button onClick={remove(`${e.id}`)}>remove</button>
            </div>
          </div>
        ))}
      <hr />
      <div>
        <span role="img" aria-label="check">
          ✅
        </span>
        completed
      </div>
      {/* TODO refactor */}
      {Object.values<Atoms.Item>(tasks)
        .filter(e => e.isCompleted)
        .map(e => (
          <div key={`${e.id}`}>
            <div>
              {e.title} <button onClick={remove(`${e.id}`)}>remove</button>
            </div>
          </div>
        ))}
    </>
  );
};
