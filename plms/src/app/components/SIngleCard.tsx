import Link from 'next/link';
import Topics from '../Data/Topics.model';

export default function SingleCard({ id, title, description, image }: Topics) {
  return (
    <div className="transform cursor-pointer transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-110">
      <div className="m-4 max-w-sm overflow-hidden rounded-xl shadow-lg hover:shadow-2xl">
        <div className="bg-fuchsia-300 px-8 py-4">

          <img src={image} alt={title} />
          <h3>{title}</h3>
          <p>{description}</p>
          <Link href={`/topics/${id}`}>Take me...</Link>
          
        </div>
      </div>
    </div>
  );
}
