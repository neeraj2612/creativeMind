import { auth, db } from '../utils/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Toast, toast } from 'react-toastify';
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

export default function Post() {
    const route = useRouter();
    const [user , loading] = useAuthState(auth);
     


  const [post, setPost] = useState({ description: "" });

  const submitPost = async (e) => {
    e.preventDefault();
    //Run checks for description
    if (!post.description) {
      toast.error("Description Field empty 😅", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
      return;
    }
    if (post.description.length > 300) {
      toast.error("Description too long 😅", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
      return;
    }

    if (post?.hasOwnProperty("id")) {
      const docRef = doc(db, "posts", post.id);
      const updatedPost = { ...post, timestamp: serverTimestamp() };
      await updateDoc(docRef, updatedPost);
      return route.push("/");
    } else {
      //Make a new post
      const collectionRef = collection(db, "posts");
      await addDoc(collectionRef, {
        ...post,
        timestamp: serverTimestamp(),
        user: user.uid,
        avatar: user.photoURL,
        username: user.displayName,
      });
      setPost({ description: "" });
      toast.success("Post has been made 🚀", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
      return route.push("/");
    }
  };

  
  return (
    <div className='bg-white m-20 rounded-xl p-5 max-auto'>
        <form onSubmit={submitPost}>
      <h2 className='text-black font-semibold ml-2'>Create a new post</h2>
      <div>
        <h3 className='text-black font-light ml-2 my-2'>Description</h3>
        <textarea
          value={post.description}
          onChange={(e) => setPost({ ...post, description: e.target.value })}
          className='bg-gray-800 h-40 w-72 ml-2 rounded-md shadow-lg'
        ></textarea>
      </div>
      <p className={`text-cyan-500 ml-3 font-normal ${post.description.length > 300 ? 'text-red-600 ' : '' }`}>{post.description.length}/300</p>
      <button type='submit' className='bg-cyan-500 text-white px-32 ml-2 rounded-sm mt-1 shadow-lg'>
        Post
      </button>
      </form>
    </div>
  );
}
