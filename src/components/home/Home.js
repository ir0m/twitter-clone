
import './Home.css';
import Sidebar from './sidebar/Sidebar';
import Timeline from './timeline/Timeline';
import Widgets from './widget/Widgets';
import { auth } from '../../firebase';
import { useEffect,useState } from 'react';
import { Navigate } from 'react-router-dom';
import { onAuthStateChanged , sendEmailVerification} from 'firebase/auth';

function Home() {
  const [user,setUser]=useState("");
  useEffect(()=>{
    onAuthStateChanged(auth,(currentUser)=>{
      
      setUser(currentUser);
    });
  },[]);



  return (
    user!=null ? user.emailVerified ?(
      <div className="home">
        <Sidebar />
        <Timeline />
        <Widgets />
      </div>
    ) : (<div></div>) :
    (
      <Navigate to={"/"} />
    )
  )
}

export default Home;
