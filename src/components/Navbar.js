import { Link } from 'react-router-dom';
import { BiHome, BiEdit, BiUser, BiLogOutCircle } from 'react-icons/bi';

const Navbar = ({ isAuth, userSignOut }) => {
  return (
    <nav className='bg-white shadow py-3 mb-8'>
      <div className='container flex justify-between items-center'>
        <div className='logo font-medium text-2xl text-red-500'>
          <Link to='/'>FireBlog</Link>
        </div>
        <ul className='menu flex gap-5 font-medium text-gray-700'>
          <li>
            <Link to='/' className='flex items-center gap-1'>
              <BiHome />
              Home
            </Link>
          </li>
          {isAuth && (
            <li>
              <Link to='/create' className='flex items-center gap-1'>
                <BiEdit /> Create
              </Link>
            </li>
          )}
          <li>
            {!isAuth ? (
              <Link to='/login' className='flex items-center gap-1'>
                <BiUser /> Login
              </Link>
            ) : (
              <button
                type='button'
                className='font-medium text-gray-700 flex items-center gap-1'
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
