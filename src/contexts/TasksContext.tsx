import api from "@/service/axios";
import { createContext, ReactNode, useState } from "react";

interface Task {
  id: string;
  title: string;
  description: string;
  date: string;
  duration: string;
}

interface TasksContextData {
  dailyTasks: Task[];
  fetchDailyTasks: () => Promise<void>;
  weeklyTasks: Task[];
  fetchWeeklyTasks: () => Promise<void>;
  monthlyTasks: Task[];
  fetchMonthlyTasks: () => Promise<void>;
}

interface TasksProviderProps {
  children: ReactNode;
}

export const TasksContext = createContext({} as TasksContextData);

export function TasksProvider({ children }: TasksProviderProps) {
  const [dailyTasks, setDailyTasks] = useState<Task[]>([]);
  const [weeklyTasks, setWeeklyTasks] = useState<Task[]>([]);
  const [monthlyTasks, setMonthlyTasks] = useState<Task[]>([]);

  async function fetchDailyTasks() {
    const response = await fetch('/api/tasks/today');
    const data = await response.json();
    console.log(data);
    setDailyTasks(data);
  }

  const fetchWeeklyTasks = async () => {
    const response = await api.get('/tasks/week');
    setWeeklyTasks(response.data);
  }

  const fetchMonthlyTasks = async () => {
    const response = await api.get('/tasks/month');
    setMonthlyTasks(response.data);
  }

  return (
    <TasksContext.Provider value={{ dailyTasks, fetchDailyTasks, weeklyTasks, fetchWeeklyTasks, monthlyTasks, fetchMonthlyTasks }}>
      {children}
    </TasksContext.Provider>
  )
}