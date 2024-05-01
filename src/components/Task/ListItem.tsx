import { useTasks } from '@/contexts/TasksContext';
import EditTaskDialog from './EditTaskDialog';
import { useState } from 'react';
import { FormCheckbox } from '../Form/FormCheckbox';
import Styles from './ListItem.module.css';
import { FaTrash, FaPencilAlt } from 'react-icons/fa';
import { NewTask, Task } from '@/@types/Task';

type ListItemProps = {
  task: Task;
  children: React.ReactNode;
  dateToDo: Date;
  isDone: boolean;
  description: string;
  updateTask: (taskId: string, updatedTask: NewTask) => Promise<void>;
};

export default function ListItem({ task, children, dateToDo, isDone, description }: ListItemProps) {

  const { deleteTask, updateTask } = useTasks();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const formattedDate = dateToDo.toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const openEditDialog = () => {
    setIsEditDialogOpen(true);
  };

  const closeEditDialog = () => {
    setIsEditDialogOpen(false);
  };

  return (
    <div className={Styles.item}>
      {isEditDialogOpen && (
        <EditTaskDialog task={task} updateTask={updateTask} onClose={closeEditDialog} isOpen={isEditDialogOpen} />
      )}

      <div className="flex gap-x-[15px]">
        <FormCheckbox isDone={isDone} />
        <div>
          <span className={Styles.title}>{children}</span>
          <p className={Styles.description}>{description.length > 40 ? description.substring(0, 40) + '...' : description}</p>
        </div>
      </div>
      <div className={Styles.props}>
        <div className="break-keep">{formattedDate}</div>
        <button onClick={() => deleteTask(task.id)}>
          <FaTrash />
        </button>
        <button onClick={openEditDialog}>
          <FaPencilAlt />
        </button>
      </div>
    </div>
  )
}