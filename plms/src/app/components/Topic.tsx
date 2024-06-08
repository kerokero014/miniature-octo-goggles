interface TopicsProps {
  id: number;
  title: string;
  description: string;
}

export default function Topic({ id, title, description }: TopicsProps) {
  return (
    <>
      <h1 className="mb-2 text-2xl font-bold text-white">{title}</h1>
      <h2 className="mb-2 text-lg text-gray-200 underline">{description}</h2>
    </>
  );
}
