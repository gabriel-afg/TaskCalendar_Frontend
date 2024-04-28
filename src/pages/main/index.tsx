import { Icon } from '@/components/Icon';
import { MainMenu } from '@/components/Menu/MainMenu';
import { Sidebar } from '@/components/Sidebar/Sidebar';
import InputTask from '@/components/Task/InputTask';
import ListItem from '@/components/Task/ListItem';
import Image from 'next/image';

export default function Main() {
	return (
		<main className="p-7">
			<div className="container mx-auto bg-white flex rounded-[20px] shadow-md overflow-hidden">
				<Sidebar>
					<div className="flex flex-col justify-between h-full">
						<div>
							<div className="flex items-center gap-2 mb-7">
								<Icon icon="Today" />
								<h1 className='text-[#23243D] font-medium text-[20px]'>MyTask</h1>
							</div>

							<div className="grid ">
								<div className="grid gap-10">
									<MainMenu />
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
							<h2 className='text-[#767798] font-bold text-[16px] uppercase'>Hoje</h2>
						</div>
						<InputTask />
						<div className='flex flex-col w-full'>
							<h3 className='text-[#94A1B7] font-bold text-[12px] my-5'>Para fazer</h3>

							<ul className='flex flex-col gap-2 w-full'>
								<li className='w-full'>
									<ListItem
										dateToDo={new Date()}
										isDone={true}
									>
										Estudar React
									</ListItem>
								</li>
								<li className='w-full'>
									<ListItem
										dateToDo={new Date()}
										isDone={true}
									>
										Estudar React
									</ListItem>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}