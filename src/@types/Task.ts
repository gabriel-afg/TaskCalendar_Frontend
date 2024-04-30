export interface Task {
  id: string;
  title: string;
  description: string;
  date: string;
  duration: string;
}

export interface NewTask {
  title: string;
  description: string;
  date: string;
  duration: string;
}