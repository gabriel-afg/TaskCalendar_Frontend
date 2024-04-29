import Styles from './ItemMenu.module.css';
import { Icon, IconName } from '../Icon';

export function ItemMenu({
  icon,
  counter,
  children,
  active,
  onClick
}: {
  icon?: IconName;
  counter: string;
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <div className={`${Styles.itemMenu} ${active ? Styles.active : ''}`} onClick={onClick}>
      <div className="flex">
        {icon && <Icon icon={icon} />}
        {children}
      </div>
      <span>{counter}</span>
    </div>
  );
}