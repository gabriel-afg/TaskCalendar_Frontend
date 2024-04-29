import { ItemMenu } from './ItemMenu';

interface MainMenuProps {
  selectedPeriod: string;
  setSelectedPeriod: (period: string) => void;
	taskCountToday: number;
	taskCountWeek: number;
	taskCountMonth: number;
}

export function MainMenu({
	selectedPeriod, 
	setSelectedPeriod, 
	taskCountToday, 
	taskCountWeek, 
	taskCountMonth }:MainMenuProps) {
	return (
		<div className="grid gap-3">
			<ItemMenu
        icon="Today"
        counter={taskCountToday.toString()}
        active={selectedPeriod === 'today'}
        onClick={() => setSelectedPeriod('today')}
      >
        Hoje
      </ItemMenu>
      <ItemMenu
        icon="Tomorrow"
        counter={taskCountWeek.toString()}
        active={selectedPeriod === 'week'}
        onClick={() => setSelectedPeriod('week')}
      >
        Semana
      </ItemMenu>
      <ItemMenu
        icon="NextWeek"
        counter={taskCountMonth.toString()}
        active={selectedPeriod === 'month'}
        onClick={() => setSelectedPeriod('month')}
      >
        Mês
      </ItemMenu>
		</div>
	);
}