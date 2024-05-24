import Image from 'next/image';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Image src="/imgs/Fulllogo.png" alt="PLMS Logo" width={200} height={200} />
      <p className="text-center text-lg">
        The Personal Learning Management System is a web application that helps you manage your
        learning journey.
      </p>
    </main>
  );
}
