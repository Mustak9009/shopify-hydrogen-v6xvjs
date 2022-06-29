import { Link } from '@shopify/hydrogen';
import React,{useState} from 'react'

export default function AccountCreate() {
    const [emailError,setEmailError] = useState(null);
    const [email,setEmail] = useState('');
    const [passwordError,setPasswordError] = useState(null);
    const [password,setPassword] = useState('');
    
    function emailValidation(email){
        if(email.validity.valid) return null;
        return email.validity.valueMissing ? "please enter an email" : "please enter a valid email";
    }
    function passwordValidation(password){
        if(password.validity.valid) return null;
        if(password.validity.valueMissing){
            return "please enter a password";
        }
        return "password must be at least 6 characters";
    }
    function handleSubmit(event){
        event.preventDefault();
        setEmailError(null);
        setPasswordError(null);
        const newEmailError = emailValidation(event.target.email);
        if(newEmailError){
            setEmailError(newEmailError)
        }
        const newPasswordError = passwordValidation(event.target.password);
        console.log(newPasswordError,newEmailError)
        if(newPasswordError){
            setPasswordError(newPasswordError)
        }
    }
    return (
    <div className='max-w-7xl mx-auto p-4 md:py-5 md:px-8 '>
        <div className='flex justify-center  p-2'>
            <div className='max-w-md  w-full  p-2'>
                <h1 className='text-4xl'>Create an account</h1>
                <form noValidate className='pt-6 pb-8 mt-4 mb-4' onSubmit={handleSubmit}>
                    <div className='mb-4'>
                        <input id='email' name='Email' type="email" onChange={(e)=>setEmail(e.target.value)} required autoComplete='email' placeholder='Email address' aria-label='Email address' className='mb-1 appearance-none border w-full  py-2 px-3 text-gray-800 placeholder:text-gray-500 leading-tight  focus:shadow-sm border-gray-900'/>    
                        <p className={`text-red-500 text-xs ${!emailError?'invisible':''}`}>{emailError} &nbsp;</p>
                    </div>
                    <div className='mb-4'>
                        <input id='password' name='password' type="password" onChange={(e)=>setPassword(e.target.value)} minLength={6} maxLength={10} required autoComplete='current-password' placeholder='Password' aria-label='Password' className='mb-1 appearance-none border w-full  py-2 px-3 text-gray-800 placeholder:text-gray-500 leading-tight  focus:shadow-sm border-gray-900'/>    
                        <p className={`text-red-500 text-xs ${!passwordError?'invisible':''}`}>{passwordError} &nbsp;</p>
                    </div>
                    <div className='flex justify-center items-center '>
                        <button className='bg-gray-900 text-white uppercase py-2 px-4 focus:shadow-sm w-full block'>Create an account</button>
                    </div>
                    <div className='flex justify-center items-center mt-4'>
                        <p>
                            Already have account? &nbsp;
                        </p>
                        <Link to='/account' className='inline underline'>Sign</Link>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}
