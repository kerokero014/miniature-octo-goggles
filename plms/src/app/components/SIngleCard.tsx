import Link from 'next/link';
import Topics from '../Data/Topics.model';

export default function SingleCard({ id, title, description, image }: Topics) {
  return (
    <div className="card">
      <img src={image} alt={title} />
      <h3>{title}</h3>
      <p>{description}</p>
      <Link href={`/topics/${id}`}>Take me...</Link>
    </div>
  );
}
