import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import { getDocs, collection, deleteDoc, doc } from 'firebase/firestore';
import { auth, store } from '../config/firebaseConfig';
import { Loader } from '../components/Loader';
import { FaTrash } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';

const Home = ({ isAuth }) => {
  const [postsList, setPostsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const postsCollectionRef = collection(store, 'posts');
    setIsLoading(true);
    const getPosts = async () => {
      const data = await getDocs(postsCollectionRef);
      const simplifiedData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setPostsList(simplifiedData);
      setIsLoading(false);
    };
    getPosts();
  }, []);

  const deletePost = async (id) => {
    const newList = postsList.filter((post) => post.id !== id);
    setPostsList(newList);
    const postDoc = doc(store, 'posts', id);
    await deleteDoc(postDoc);
    toast.warn('Post Deleted');
  };

  // Limit String Length
  function limitStr(str, length = 130) {
    return str.length > length ? str.substring(0, length) + '...' : str;
  }

  return (
    <>
      <ToastContainer
        autoClose={1000}
        hideProgressBar={true}
        position='bottom-right'
        theme='dark'
      />
      {isLoading && <Loader center={true} />}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {!isLoading &&
          postsList.map((post) => (
            <div className='bg-white shadow rounded' key={post.id}>
              <div className='p-5'>
                <div className='flex justify-between gap-3 items-start'>
                  <h3 className='text-2xl mb-2'>{post.title}</h3>
                  {isAuth && post.author.id === auth.currentUser.uid && (
                    <button
                      className='post-trash'
                      onClick={() => deletePost(post.id)}
                    >
                      <FaTrash className='text-red-500 text-sm' />
                    </button>
                  )}
                </div>
                <p className='mb-2'>{limitStr(post.postText)}</p>
                <Link
                  to={`/posts/${post.id}`}
                  className='flex gap-1 items-center text-lg text-gray-600'
                >
                  Read More
                  <HiOutlineArrowNarrowRight className='read-more-icon' />
                </Link>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default Home;
