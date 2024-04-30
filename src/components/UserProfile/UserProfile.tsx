import Image from 'next/image';

interface UserProfileProps {
  name: string;
  imageSrc: string;
}

export default function UserProfile({ name, imageSrc }: UserProfileProps) {
  return (
    <div className="flex items-center mt-auto">
      <Image className="w-16 h-16 bg-neutral-50 border-4 border-emerald-400 rounded-full mr-4" src={imageSrc} width={70} height={70} alt={name} />
      <p className="text-[#56577E] font-bold text-cl">{name}</p>
    </div>
  );
}
