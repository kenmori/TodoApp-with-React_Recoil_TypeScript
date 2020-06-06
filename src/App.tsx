import * as React from "react";
import * as TaskInput from "./TaskInput";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <h1>TodoApp with React x TypeScript x Recoil</h1>
      <TaskInput.TaskList />
      <hr />
      <a href="https:kenjimorita.jp">my blog</a>
    </div>
  );
}
