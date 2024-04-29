import { FormCheckbox } from '../Form/FormCheckbox';
import Styles from './ListItem.module.css';

type ListItemProps = {
  children: React.ReactNode;
  dateToDo: Date;
  isDone: boolean;
  description: string;
};

export default function ListItem({ children, dateToDo, isDone, description }: ListItemProps) {

  const formattedDate = dateToDo.toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className={Styles.item}>
      <div className="flex gap-x-[15px]">
        <FormCheckbox isDone={isDone} />
        <div>
          <span className={Styles.title}>{children}</span>
          <p className={Styles.description}>{description.length > 40 ? description.substring(0, 40) + '...' : description}</p>
        </div>
      </div>
      <div className={Styles.props}>
        <div className="break-keep">{formattedDate}</div>
      </div>
    </div>
  )
}