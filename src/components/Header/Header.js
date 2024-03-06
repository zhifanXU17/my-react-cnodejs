import { Link } from 'react-router-dom';

import SearchBar from '../../components/SearchBar';
import logo from '../../assets/images/cnodejsLogo.svg';

function Header() {
  return (
    <header className='h-16 bg-current'>
      <nav className='h-full max-w-6xl mx-auto flex items-center justify-between gap-4'>
        <div className='flex-1 flex gap-4'>
          <Link to={'/'}>
            <img
              src={logo}
              alt='CNode logo'
              className='w-32 h-full hover:cursor-pointer'
            />
          </Link>

          <SearchBar />
        </div>

        <Link to={'/'}>
          <span className='text-gray-200 hover:text-white hover:cursor-pointer'>
            首页
          </span>
        </Link>

        <span className='text-gray-200 hover:text-white hover:cursor-pointer'>
          关于
        </span>
      </nav>
    </header>
  );
}

export default Header;
