import React, { useState, useRef } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { auth, store, storage } from '../config/firebaseConfig';
import { ref, uploadBytesResumable } from 'firebase/storage';
import { ToastContainer, toast } from 'react-toastify';
import { Loader } from '../components/Loader';
import { v4 as uuidv4 } from 'uuid';

const CreatePost = () => {
  const formRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const postsCollectionRef = collection(store, 'posts');

  const createPost = async (e) => {
    e.preventDefault();
    // Image must be present
    if (!e.target.image.files.length) {
      toast.warning('Image must be selected !');
      return;
    }
    // Title must be present
    if (!e.target.title.value.length) {
      toast.warning('Title is required !');
      return;
    }
    // Description must be present
    if (!e.target.description.value.length) {
      toast.warning('Description is required !');
      return;
    }
    const file = e.target.image.files[0];
    // File Size Limit
    const imageSize = (file.size / 1000000).toFixed(1);
    if (imageSize > 5) {
      toast.warning('Max size limit is 5 Mb');
      return;
    }
    // File Type only allowed for jpeg & png
    if (file.type === 'image/jpeg' || file.type === 'image/png') {
      // File name modification for preventing duplication
      const fileName = file.name.split('.')[0];
      const fileExtension = file.name.split('.').pop();
      const modifiedName = fileName + '_' + uuidv4() + '.' + fileExtension;
      // Save Everything to firebase
      setIsLoading(true);
      const fileRef = ref(storage, `images/${modifiedName}`);
      uploadBytesResumable(fileRef, file);
      await addDoc(postsCollectionRef, {
        image: modifiedName,
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
    } else {
      toast.warning('Image must be jpeg or png');
    }

    formRef.current.reset();
  };

  return (
    <>
      <ToastContainer
        autoClose={1500}
        hideProgressBar={true}
        position='bottom-right'
        theme='dark'
      />
      <div className='create-post bg-white rounded shadow mx-auto p-5'>
        <h3 className='text-3xl mb-4 text-center border-b pb-3'>
          Create A Post
        </h3>
        <form onSubmit={createPost} ref={formRef} autoComplete='off'>
          <div className='flex flex-col mb-4'>
            <label htmlFor='image' className='text-lg mb-2'>
              Image
            </label>
            <input
              type='file'
              name='image'
              required
              className='ring-2 ring-gray-300 focus:ring-red-300 active:ring-red-300 rounded p-2 mb-4'
            />
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
            disabled={isLoading ? true : false}
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
