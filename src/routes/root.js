import { Outlet } from 'react-router-dom';

import Header from '../components/Header';

export default function Root() {
  return (
    <div className='App h-full'>
      <Header />
      <main className='py-10 bg-mainBg h-fit min-h-full'>
        <Outlet />
      </main>
    </div>
  );
}
