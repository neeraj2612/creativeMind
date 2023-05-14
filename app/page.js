'use client'

import { useEffect, useState } from "react";
import { db } from "../utils/firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import Message from "@/components/message";

export default function Home() {
  const [allPosts, setAllPosts] = useState([]);

  const getPosts = () => {
    const collectionRef = collection(db, "posts");
    const q = query(collectionRef, orderBy("timestamp", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const posts = [];
      snapshot.forEach((doc) => {
        posts.push({ ...doc.data(), id: doc.id });
      });
      setAllPosts(posts);
    });

    return unsubscribe;
  };

  useEffect(() => {
    const unsubscribe = getPosts();

    return () => {
      unsubscribe();
    };
  }, []);
  console.log(allPosts)
  return (
   
      <div>
        <h2 className="text-white text-center font-semibold text-2xl">See what others are saying</h2>
        <Message/>
      
       {allPosts.length > 0 &&
        allPosts.forEach((post) => {
          return <Message key={post.id} {...post} />;
        })}
      </div>
  
  );
}
