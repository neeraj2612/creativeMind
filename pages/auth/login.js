import{FcGoogle} from 'react-icons/fc';
import{SignInWithPopup,GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import{auth} from '../../utils/firebase';
import { useRouter } from 'next/navigation';
import{useAuthState} from 'react-firebase-hooks/auth';
import { useEffect } from 'react';
export default function Login(){
const route = useRouter();
const [user , loading] = useAuthState(auth);
const googleProvider = new GoogleAuthProvider();
const GoogleLogin = async () =>{
    try {
        const result = await signInWithPopup(auth,googleProvider)
        route.push('/dashboard');
    }
    catch (error){}
};

useEffect(()=>{
if(user){
    route.push('/dashboard');
}
},[user]);


    return(
        <div className="text-gray-700 bg-gradient-to-r from-white to-gray-300 shadow-xl m-20 p-5  text-center rounded-lg items-center">
            <h2>Join Today</h2>
            <div className="py-2">
                <button type="submit" onClick={GoogleLogin} className="text-white bg-gray-700 w-full rounded-md py-2 shadow-lg flex">
                    <FcGoogle className='text-2xl ml-12 mr-2'/>
                    Sign in With Google
                </button>
            </div>
   </div> );
}