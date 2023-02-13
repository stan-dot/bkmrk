import React, { createContext, useContext, useReducer } from "react";
import { initialTasks } from "../data/initialTasks";
import { Task } from "../types/Task";
import { Action } from "../types/Action";


const TasksContext = createContext<Task[]>([]);
const TasksDispatchContext = createContext<React.Dispatch<Action>>(null as unknown as React.Dispatch<Action>);


export function useTasks() {
  return useContext(TasksContext);
}

export function useTasksDispatch() {
  return useContext(TasksDispatchContext);
}

export function TasksProvider({ children }: any) {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);
  return <TasksContext.Provider value={tasks}>
    <TasksDispatchContext.Provider value={dispatch}>
      {children}
    </TasksDispatchContext.Provider>
  </TasksContext.Provider>
}


export function tasksReducer(tasks: Task[], action: Action): Task[] {
  switch (action.type) {
    case 'added': {
      return [...tasks, {
        id: action.id!,
        text: action.text,
        done: false
      }];
    }
    case 'changed': {
      return tasks.map((t: Task) => {
        const newTask = action.task;
        if (!newTask) {
          throw Error('this action should carry a task ' + action.id ?? action.type)
        }
        return t.id === newTask.id ? newTask : t;
      });
    }
    case 'deleted': {
      return tasks.filter(t => t.id !== action.id);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}