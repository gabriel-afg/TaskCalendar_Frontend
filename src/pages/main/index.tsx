import { Icon } from '@/components/Icon';
import { MainMenu } from '@/components/Menu/MainMenu';
import { Sidebar } from '@/components/Sidebar/Sidebar';
import InputTask from '@/components/Task/InputTask';
import ListItem from '@/components/Task/ListItem';
import Image from 'next/image';
import { useTasks } from '@/contexts/TasksContext';
import SearchBar from '@/components/Search/SearchBar';
import UserProfile from '@/components/UserProfile/UserProfile';

export default function Main() {
	const {
		selectedPeriod, 
		setSelectedPeriod, 
		tasks, 
		taskCounts = { today: 0, week: 0, month: 0, all: 0 }, searchValue, setSearchValue, createTask, searchResults } = useTasks();

	return (
		<main className="p-7">
			<div className="container mx-auto bg-white flex rounded-[20px] shadow-md overflow-hidden">
				<Sidebar>
					<div className="flex flex-col justify-between h-full">
						<div>
							<div className="flex items-center gap-2 mb-7">
								<Icon icon="Calendar" />
								<h1 className='text-[#23243D] font-medium text-[20px]'>MyTask</h1>
							</div>

							<div className="grid ">
								<div className="grid gap-10">
									<MainMenu
										selectedPeriod={selectedPeriod}
										taskCounts={taskCounts}
										setSelectedPeriod={setSelectedPeriod}
									/>
								</div>
							</div>
						</div>

						<UserProfile name="Gabriel Augusto" imageSrc="/Face.jpeg" />
					</div>
				</Sidebar>

				<div className="p-7 w-full">
					<div>
						<div className="flex my-4 gap-x-[10px]">
							<Icon icon="List" />
							<h2 className='flex text-[#767798] items-center font-bold text-[16px] uppercase'>{selectedPeriod}</h2>
							<SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
						</div>
						<InputTask createTask={createTask} />
						<div className='flex flex-col w-full'>
							<h3 className='text-[#94A1B7] font-bold text-[12px] my-5'>Para fazer</h3>
							<ul className='flex flex-col gap-2 w-full overflow-y-auto max-h-[700px]'>
								{(searchResults || tasks || []).map((task) => (
									<li className='w-full' key={task.id}>
										<ListItem
											dateToDo={new Date(task.date)}
											description={task.description}
											isDone={false}
										>
											{task.title}
										</ListItem>
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}