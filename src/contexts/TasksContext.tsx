import { createContext, useState, useCallback, useEffect, useContext } from 'react';
import api from '@/service/axios';
import { NewTask, Task } from '@/@types/Task';
import { AxiosError } from 'axios';

interface TaskCounts {
  today: number;
  week: number;
  month: number;
  all: number;
}

interface TaskContextData {
  selectedPeriod: string;
  tasks: Task[];
  taskCounts: TaskCounts;
  searchValue: string;
  searchResults: any[] | null;
  setSelectedPeriod: React.Dispatch<React.SetStateAction<string>>;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  createTask: (newTask: NewTask) => Promise<void>;
  fetchTasks: (period: string) => Promise<void>;
}

export const TaskContext = createContext<TaskContextData>({} as TaskContextData);

export const TaskProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('all');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskCounts, setTaskCounts] = useState<TaskCounts>({ today: 0, week: 0, month: 0, all: 0 });
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState<any[] | null>(null);

  const createTask = async (newTask: NewTask) => {
    try {
      const response = await api.post('/tasks', newTask);
      const createdTask = response.data;

      setTasks(prevTasks => [...prevTasks, createdTask]);

      const today = new Date();
      const taskDate = new Date(createdTask.date);
      setTaskCounts(prevCounts => ({
        ...prevCounts,
        today: taskDate.toDateString() === today.toDateString() ? prevCounts.today + 1 : prevCounts.today,
        week: taskDate.getTime() - today.getTime() <= 7 * 24 * 60 * 60 * 1000 ? prevCounts.week + 1 : prevCounts.week,
        month: taskDate.getMonth() === today.getMonth() ? prevCounts.month + 1 : prevCounts.month,
        all: prevCounts.all + 1
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTasks = useCallback(async (period: string) => {
    const response = await api.get(`/tasks/${period}`);
    setTaskCounts(prevCounts => ({ ...prevCounts, [period]: response.data.length }));
    if (period === selectedPeriod) {
      setTasks(response.data);
    }
  }, [selectedPeriod]);

  const searchTasks = useCallback(async () => {
    if (searchValue) {
      try {
        const response = await api.get(`/tasks/title/${searchValue}`);
        setSearchResults(response.data);
      } catch (error) {
        if ((error as AxiosError).response?.status === 404) {
          setSearchResults([]);
        } else {
          console.error(error);
        }
      }
    } else {
      setSearchResults(null);
    }
  }, [searchValue]);

  useEffect(() => {
    searchTasks();
  }, [searchTasks]);

  useEffect(() => {
    fetchTasks('today');
    fetchTasks('week');
    fetchTasks('month');
    fetchTasks('all');
  }, [fetchTasks]);

  return (
    <TaskContext.Provider value={{ selectedPeriod, tasks, taskCounts, searchValue, searchResults, setSelectedPeriod, setSearchValue, createTask, fetchTasks }}>
      {children}
    </TaskContext.Provider>
  );
};

export function useTasks() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
}