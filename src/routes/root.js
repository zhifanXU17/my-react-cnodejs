import { Outlet } from 'react-router-dom';

import logo from '../assets/images/cnodejsLogo.svg';

export default function Root() {
  return (
    <div className='App h-full'>
      <header className='h-16 px-16 flex items-center justify-between bg-defaultBg'>
        <img
          src={logo}
          alt='CNode logo'
          className='w-32 h-full hover:cursor-pointer'
        />
        <span className='text-white hover:cursor-pointer'>
          关于
        </span>
      </header>
      <main className='py-10'>
        <Outlet />
      </main>
    </div>
  );
}
