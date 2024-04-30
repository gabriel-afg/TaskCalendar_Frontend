import { Icon } from '@/components/Icon';
import { MainMenu } from '@/components/Menu/MainMenu';
import { Sidebar } from '@/components/Sidebar/Sidebar';
import InputTask from '@/components/Task/InputTask';
import ListItem from '@/components/Task/ListItem';
import api from '@/service/axios';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { NewTask, Task } from '@/@types/Task';

interface TaskCounts {
	today: number;
	week: number;
	month: number;
	all: number;
}

export default function Main() {
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

						<div className="flex items-center mt-auto">
							<Image className='w-16 h-16 rounded-full mr-4 flex items-center justify-center' src="/userProfile.png" width={70} height={70} alt="Gabriel Augusto" />
							<p className="text-[#56577E] font-bold text-cl">Gabriel Augusto</p>
						</div>
					</div>
				</Sidebar>

				<div className="p-7 w-full">
					<div>
						<div className="flex my-4 gap-x-[10px]">
							<Icon icon="List" />
							<h2 className='flex text-[#767798] items-center font-bold text-[16px] uppercase'>{selectedPeriod}</h2>
							<div>
								<input
									className="border-2 ml-5 min-w-[300px] border-gray-300 bg-white h-10 px-3 rounded-lg text-sm focus:outline-none"
									type="search"
									name="search"
									placeholder="Procurar Task por título"
									value={searchValue}
									onChange={e => setSearchValue(e.target.value)}
								/>
							</div>
						</div>
						<InputTask createTask={createTask} />
						<div className='flex flex-col w-full'>
							<h3 className='text-[#94A1B7] font-bold text-[12px] my-5'>Para fazer</h3>
							<ul className='flex flex-col gap-2 w-full overflow-y-auto max-h-[700px]'>
								{(searchResults || tasks).map((task: Task) => (
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