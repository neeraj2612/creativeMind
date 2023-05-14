'use client'
import Link from "next/link";
import{auth} from '../utils/firebase';
import{useAuthState} from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation'

import { useEffect } from 'react';

export default function Nav(){
    const route = useRouter();
    const [user, loading] = useAuthState(auth);
    const getData = async() =>{if(loading) return;
        if(!user) return route.push('auth/login');}
        
        useEffect(()=>{
        getData();
        },[user,loading]);
    return(
        <nav className="flex justify-between items-center p-10">
           <Link href='/'>
            <button className="text-lg font-medium">Creative Minds</button>
           </Link>
           <ul className="flex items-center ">
            
            {user &&(
            <div className="flex justify-between items-center gap-5 ">
                <Link href='/post' className="bg-cyan-500 py-1 px-5 font-thin shadow-md"><button className="bg-cyan-500">Post</button></Link>
                <Link href='/dashboard' className="bg-cyan-500 py-1 px-5 font-thin shadow-md"><button>Dashboard</button></Link>
                <Link href='/auth/login' className="bg-cyan-500 py-1 px-5 font-thin shadow-md"><button onClick={()=> auth.signOut()}>Signout</button>
</Link>
                </div>
            )}
            {!user && (
                <Link href='/auth/login' className="bg-cyan-500 py-1 px-2 rounded-md font-thin shadow-md">Join Now</Link>

            )}
            </ul>
        </nav>
    );
}