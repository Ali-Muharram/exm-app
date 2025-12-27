import Image from "next/image";

export default function ProjectName() {
  return (
    <div className="flex items-center gap-2">
      <Image src="/icons/folder-code.svg" alt="folder-code" width={40} height={40} />
      <p className="text-xl font-semibold text-primary">Exam App</p>
    </div>
  );
}
