import React, { useState } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { auth, store } from '../config/firebaseConfig';
import { ToastContainer, toast } from 'react-toastify';
import { Loader } from '../components/Loader';

const CreatePost = () => {
  const [isLoading, setIsLoading] = useState(false);

  const postsCollectionRef = collection(store, 'posts');

  const createPost = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await addDoc(postsCollectionRef, {
      image: null,
      title: e.target.title.value,
      postText: e.target.description.value,
      author: {
        id: auth.currentUser.uid,
        name: auth.currentUser.displayName,
      },
      timestamp: serverTimestamp(),
    });
    setIsLoading(false);
    toast.info('Post Added');
  };

  return (
    <>
      <ToastContainer
        autoClose={1000}
        hideProgressBar={true}
        position='bottom-right'
        theme='dark'
      />
      <div className='create-post bg-white rounded shadow mx-auto p-5'>
        <h3 className='text-3xl mb-4 text-center border-b pb-3'>
          Create A Post
        </h3>
        <form onSubmit={createPost} autoComplete='off'>
          <div className='flex flex-col mb-4'>
            <label htmlFor='title' className='text-lg mb-2'>
              Title
            </label>
            <input
              type='text'
              name='title'
              id='title'
              required
              className='ring-2 ring-gray-300 focus:outline-none focus:ring-red-300 rounded p-2'
            />
          </div>
          <div className='flex flex-col mb-5'>
            <label htmlFor='description' className='text-lg mb-2'>
              Description
            </label>
            <textarea
              type='text'
              name='description'
              id='description'
              rows='8'
              required
              className='ring-2 ring-gray-300 focus:outline-none focus:ring-red-300 rounded p-2'
            ></textarea>
          </div>
          <button
            type='submit'
            className='flex gap-2 items-center py-1 px-4 bg-red-400 text-white rounded shadow-lg text-2xl'
          >
            {isLoading && <Loader />}
            Publish
          </button>
        </form>
      </div>
    </>
  );
};

export default CreatePost;
