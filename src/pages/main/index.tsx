import { Icon } from '@/components/Icon';
import { MainMenu } from '@/components/Menu/MainMenu';
import { Sidebar } from '@/components/Sidebar/Sidebar';
import InputTask from '@/components/Task/InputTask';
import ListItem from '@/components/Task/ListItem';
import api from '@/service/axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface Task {
	id: string;
	title: string;
	description: string;
	date: string;
	duration: string;
}

export default function Main() {
	const [selectedPeriod, setSelectedPeriod] = useState('all');
	const [tasks, setTasks] = useState([]);
	const [taskCountToday, setTaskCountToday] = useState(0);
	const [taskCountWeek, setTaskCountWeek] = useState(0);
	const [taskCountMonth, setTaskCountMonth] = useState(0);
	const [taskCountAll, setTaskCountAll] = useState(0);
	const [searchValue, setSearchValue] = useState('');
	const [searchResults, setSearchResults] = useState(null);

	useEffect(() => {
		if (searchValue) {
			api.get(`/tasks/title/${searchValue}`)
				.then(response => setSearchResults(response.data))
				.catch(error => console.error(error));
		} else {
			setSearchResults(null);
		}
	}, [searchValue]);

	useEffect(() => {
		const fetchTasks = async (period: string, setTaskCount: (count: number) => void) => {
			const response = await api.get(`/tasks/${period}`);
			setTaskCount(response.data.length);
			if (period === selectedPeriod) {
				setTasks(response.data);
			}
		};

		fetchTasks('today', setTaskCountToday);
		fetchTasks('week', setTaskCountWeek);
		fetchTasks('month', setTaskCountMonth);
		fetchTasks('all', setTaskCountAll);
	}, [selectedPeriod]);

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
										taskCountToday={taskCountToday}
										taskCountWeek={taskCountWeek}
										taskCountMonth={taskCountMonth}
										setSelectedPeriod={setSelectedPeriod}
										taskCountAll={taskCountAll}
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
							<h2 className='flex text-[#767798] items-center font-bold text-[16px] uppercase'>Hoje</h2>
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
						<InputTask />
						<div className='flex flex-col overflow-y-auto w-full'>
							<h3 className='text-[#94A1B7] font-bold text-[12px] my-5'>Para fazer</h3>

							<ul className='flex flex-col gap-2 w-full'>
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