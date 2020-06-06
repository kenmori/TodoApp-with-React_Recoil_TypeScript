import { atom } from "recoil";

export type Item = {
  id: string;
  title: string;
  isCompleted: boolean;
};
export type Task = {
  [id: string]: Item;
};

const initState: Task = {};
export const taskState = atom({
  key: "task",
  default: initState
});
