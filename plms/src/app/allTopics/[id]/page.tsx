import MainFooter from '@/app/components/MainFooter';
import MainHeader from '@/app/components/MainHeader';
import StaticBg from '@/app/components/StaticBg';

export default function Page() {
  return (
    <>
      <MainHeader />
      <StaticBg />

      <div>
        <h1>Topic 1</h1>
      </div>

      <MainFooter />
    </>
  );
}
