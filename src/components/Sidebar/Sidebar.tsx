export function Sidebar({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex flex-col p-7 w-full min-h-[600px] max-w-[300px] bg-[#DDE4F1]">{children}</div>
	);
}