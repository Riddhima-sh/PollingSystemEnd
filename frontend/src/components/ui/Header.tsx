export default function Header({ title }: { title: string }) {
  return (
    <header className="flex items-center justify-between">
      <h1 className="text-2xl font-semibold">{title}</h1>
    </header>
  );
}


