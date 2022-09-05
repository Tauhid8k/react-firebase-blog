import { BsGoogle } from 'react-icons/bs';
import { auth, provider } from '../config/firebaseConfig';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsAuth }) => {
  const navigate = useNavigate();

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((info) => {
      localStorage.setItem('isAuth', true);
      setIsAuth(true);
      navigate('/');
    });
  };

  return (
    <div className='text-center'>
      <h2 className='text-2xl text-gray-700 mb-6'>
        Sign In With Google to Continue
      </h2>
      <button
        onClick={signInWithGoogle}
        className='flex gap-2 mx-auto items-center self-start py-2 px-5 text-xl text-gray-600 font-medium bg-white rounded shadow-md'
      >
        <BsGoogle className='text-red-500' /> Sign in with Google
      </button>
    </div>
  );
};

export default Login;
