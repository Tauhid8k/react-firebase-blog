import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { store } from '../config/firebaseConfig';
import { getDoc, doc } from 'firebase/firestore';
import { Loader } from '../components/Loader';

const SinglePost = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    const getPost = async () => {
      const postDoc = doc(store, 'posts', id);
      const docSnap = await getDoc(postDoc);
      setPost(docSnap.data());
      setIsLoading(false);
    };
    getPost();
  }, [id]);

  return (
    <>
      <button
        onClick={() => navigate('/')}
        className='mb-5 font-medium bg-slate-600 text-white py-1 px-3 rounded'
      >
        Go Back
      </button>
      {isLoading ? (
        <Loader />
      ) : (
        <div className='post'>
          <div className='post-img mb-4'>
            <img src={post.image} alt='' />
          </div>
          <div className='mb-3'>
            <h1 className='text-3xl mb-1'>{post.title}</h1>
          </div>
          <p>{post.postText}</p>
        </div>
      )}
    </>
  );
};

export default SinglePost;
