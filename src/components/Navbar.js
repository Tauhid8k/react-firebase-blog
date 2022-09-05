import { Link } from 'react-router-dom';
import {
  BiHome,
  BiEdit,
  BiUser,
  BiLogOutCircle,
  BiXCircle,
} from 'react-icons/bi';
import { useState } from 'react';

const Navbar = ({ isAuth, userSignOut }) => {
  const [isMenuActive, setIsMenuActive] = useState(false);

  const handleMenuOpen = () => {
    setIsMenuActive(!isMenuActive);
  };

  return (
    <nav className='bg-white shadow py-3 mb-8'>
      <div className='container flex justify-between items-center'>
        <div className='logo font-medium text-2xl text-red-500'>
          <Link to='/'>FireBlog</Link>
        </div>
        <div className='hamburger' onClick={handleMenuOpen}>
          <div className='line'></div>
        </div>
        <ul
          className={`menu flex gap-5 font-medium text-gray-700 ${
            isMenuActive ? 'menu-active' : ''
          }`}
        >
          <div className='menu-close' onClick={handleMenuOpen}>
            <BiXCircle />
          </div>
          <li>
            <Link to='/' className='nav-link flex items-center gap-1'>
              <BiHome />
              Home
            </Link>
          </li>
          {isAuth && (
            <li>
              <Link to='/create' className='nav-link flex items-center gap-1'>
                <BiEdit /> Create
              </Link>
            </li>
          )}
          <li>
            {!isAuth ? (
              <Link to='/login' className='nav-link flex items-center gap-1'>
                <BiUser /> Login
              </Link>
            ) : (
              <button
                type='button'
                className='nav-link font-medium text-gray-700 flex items-center gap-1'
                onClick={userSignOut}
              >
                <BiLogOutCircle />
                Logout
              </button>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
