import { FormCheckbox } from '../Form/FormCheckbox';
import Styles from './ListItem.module.css';

type ListItemProps = {
  children: React.ReactNode;
  dateToDo: string;
  isDone: boolean;
};

export default function ListItem({ children, dateToDo, isDone }: ListItemProps) {
  return (
    <div className={Styles.item}>
			<div className="flex">
				<FormCheckbox isDone={isDone} />
				<span>{children}</span>
			</div>
			<div className={Styles.props}>
				<div className="break-keep">{dateToDo}</div>
			</div>
		</div>
  )
}