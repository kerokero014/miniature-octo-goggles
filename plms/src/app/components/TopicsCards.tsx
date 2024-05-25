//function to render the topics cards from db

import Link from 'next/link';

export default function TopicsCards() {
  return (
    <div className=" grid cursor-pointer grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <div className="transform transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-110">
        <div className="m-4 max-w-sm overflow-hidden rounded shadow-lg hover:shadow-2xl">
          <div className="bg-fuchsia-300 px-8 py-4">
            <h2 className="text-black-500 text-center text-2xl font-bold">React</h2>
          </div>
        </div>
      </div>

      <div className="transform cursor-pointer transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-110">
        <div className="m-4 max-w-sm overflow-hidden rounded shadow-lg hover:shadow-2xl">
          <div className="bg-fuchsia-300 px-8 py-4">
            <h2 className="text-black-500 text-center text-2xl font-bold">Node.js</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
