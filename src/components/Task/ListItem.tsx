import { FormCheckbox } from '../Form/FormCheckbox';
import Styles from './ListItem.module.css';

type ListItemProps = {
  children: React.ReactNode;
  dateToDo: Date;
  isDone: boolean;
};

export default function ListItem({ children, dateToDo, isDone }: ListItemProps) {

	const formattedDate = dateToDo.toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className={Styles.item}>
			<div className="flex gap-x-[15px]">
				<FormCheckbox isDone={isDone} />
				<span>{children}</span>
			</div>
			<div className={Styles.props}>
				<div className="break-keep">{formattedDate}</div>
			</div>
		</div>
  )
}