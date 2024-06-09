// components/Topic.tsx

interface TopicProps {
  topic_id: number;
  title: string;
  description: string;
  onDelete: (id: number) => void;
}

export default function Topic({ topic_id, title, description, onDelete }: TopicProps) {
  const handleDelete = () => {
    onDelete(topic_id);
  };

  return (
    <>
      <h1 className="mb-2 text-2xl font-bold text-gray-800">{title}</h1>
      <h2 className="mb-2 text-lg text-gray-800 underline">{description}</h2>

      <button
        onClick={handleDelete}
        className="mt-4 rounded-lg px-2 py-1 text-black hover:bg-red-800 hover:text-white"
      >
        X
      </button>
    </>
  );
}
