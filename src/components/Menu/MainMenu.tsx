import { ItemMenu } from './ItemMenu';

interface TaskCounts {
    today: number;
    week: number;
    month: number;
    all: number;
}

interface MainMenuProps {
    selectedPeriod: string;
    setSelectedPeriod: (period: string) => void;
    taskCounts: TaskCounts;
}

export function MainMenu({
    selectedPeriod,
    setSelectedPeriod,
    taskCounts
}: MainMenuProps) {
    return (
        <div className="grid gap-3">
            <ItemMenu
                icon="Archive"
                counter={taskCounts.all.toString()}
                active={selectedPeriod === 'all'}
                onClick={() => setSelectedPeriod('all')}
            >
                Todas as tasks
            </ItemMenu>
            <ItemMenu
                icon="Today"
                counter={taskCounts.today.toString()}
                active={selectedPeriod === 'today'}
                onClick={() => setSelectedPeriod('today')}
            >
                Hoje
            </ItemMenu>
            <ItemMenu
                icon="Tomorrow"
                counter={taskCounts.week.toString()}
                active={selectedPeriod === 'week'}
                onClick={() => setSelectedPeriod('week')}
            >
                Semana
            </ItemMenu>
            <ItemMenu
                icon="NextWeek"
                counter={taskCounts.month.toString()}
                active={selectedPeriod === 'month'}
                onClick={() => setSelectedPeriod('month')}
            >
                Mês
            </ItemMenu>
        </div>
    );
}