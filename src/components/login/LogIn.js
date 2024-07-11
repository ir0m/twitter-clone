import "./LogIn.css"
import {auth} from "../../firebase";
import {browserSessionPersistence, setPersistence,createUserWithEmailAndPassword,signInWithEmailAndPassword,sendSignInLinkToEmail,isSignInWithEmailLink,signInWithEmailLink, sendEmailVerification} from "firebase/auth";
import { useState } from "react";
import { useNavigate} from "react-router-dom";
import { TextField ,Button, Input} from "@mui/material";
import { GoogleAuthProvider ,signInWithPopup} from "firebase/auth";
import { Password } from "@mui/icons-material";
import { addDoc,collection } from "firebase/firestore";
import { db } from "../../firebase";

const SignUp = () =>{


    const provider = new GoogleAuthProvider();

    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    const navigate = useNavigate();
    const redirect = () => {
      navigate("/home");

    };

    const signup=(e)=>{
        e.preventDefault();
        setPersistence(auth,browserSessionPersistence)
            .then(() => { 
                createUserWithEmailAndPassword(auth,email,password)
                   .then((userCredential) => {
                        const user = userCredential.user;
                        e.preventDefault();
                        addDoc(collection(db,"users"),{
                            email:email,
                            displayName:"名無し",
                            avatar:"",
                            username:"no_name",
                        });
                        sendEmailVerification(user);
                        alert("認証メールを送信しました");
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                    });

            })
                    
            .catch((error) => {
                    // Handle Errors here.
                    const errorCode = error.code;
                    const errorMessage = error.message;
            });
            
    };
    const signin=(e)=>{
        e.preventDefault();
        setPersistence(auth,browserSessionPersistence)
            .then(() => {
                signInWithEmailAndPassword(auth,email,password)
                    .then((userCredential) => {
                        const user = userCredential.user;
                        if(user!=null){
                            if(!user.emailVerified){
                                sendEmailVerification(user);
                                alert("認証メールを送信しました");
                            }else{
                                redirect();
                            }
                        }
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                    });
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
            });

        
    };
    const googlelogin=(e)=>{
        e.preventDefault();
        setPersistence(auth,browserSessionPersistence)
        .then(() => {
            signInWithPopup(auth, provider)
                .then((result) => {
                    // This gives you a Google Access Token. You can use it to access the Google API.
                    const credential = GoogleAuthProvider.credentialFromResult(result);
                    const user = result.user;
                    // ...

                    redirect();
                })
                .catch((error) => {
                    console.log(error.message);
                });
        })
        .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
        });     
    };
    return(
        <div className="signUp">
            <div>
                
                <div>
                    <TextField label="Email" variant="outlined" onChange={(e)=>setEmail(e.target.value)}/>
                    <TextField label="Password" variant="outlined" onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                <div>
                    <Button variant="contained" type="submit" onClick={signup}>サインアップ</Button>
                    <Button variant="outlined" type="submit" onClick={signin}>サインイン</Button>
                    <Button variant="outlined" type="submit" onClick={googlelogin}>Googleでログイン</Button>
                </div>

               
            </div>
        </div>
    )

};

export default SignUp;