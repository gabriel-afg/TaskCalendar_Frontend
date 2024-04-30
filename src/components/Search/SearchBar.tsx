
interface SearchBarProps {
  searchValue: string;
  setSearchValue: (value: string) => void;
}

export default function SearchBar({ searchValue, setSearchValue }: SearchBarProps) {
  return (
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
  );
}