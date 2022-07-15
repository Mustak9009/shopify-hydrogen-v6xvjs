import React, {useState, useCallback} from 'react';
import {useServerProps} from '@shopify/hydrogen';
function emailValidation(email) {
  if (email.validity.valid) return null;
  return email.validity.valueMissing
    ? 'please enter an email'
    : 'please enter a valid email';
}
function passwordValidation(password) {
  
  if (password.validity.valid) return null;
  if (password.validity.valueMissing) {
    return 'please enter a password';
  }
  return 'password must be at least 6 characters';
}
export default function EditAccountDetails() {
  const {setServerProps} = useServerProps();
  const close = useCallback(
    () => setServerProps('editingAccount', false),
    [setServerProps],
  );
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [emailError,setEmailError] = useState(null);
  const [saving,setSaving] = useState(false);

  const [currentPasswordError,setCurrentPasswordError] = useState(null);
  const [newPasswordError,setNewPasswordError] = useState(null);
  const [newPassword2Error,setNewPassword2Error] = useState(null);
  const [submitError,setSubmitError] = useState(null);
  async function handleSubmit(e) {
    e.preventDefault();
    setEmailError(null);
    setCurrentPasswordError(null);
    setNewPasswordError(null)
    setNewPassword2Error(null);

    const emailError  = emailValidation(e.target.email);
    if(emailError){
      setEmailError(emailError);
    }
    //creating new variable for handle input -> Error
    let currentPasswordError,newPasswordError,newPassword2Error; 
    if(e.target.currentPassword.value){
      currentPasswordError = passwordValidation(e.target.currentPassword);
      if(currentPasswordError){
        setCurrentPasswordError(currentPasswordError);
      }
      newPasswordError = passwordValidation(e.target.newPassword);
     
      if(newPasswordError){
        setNewPasswordError(newPasswordError)
      }
      newPassword2Error = e.target.newPassword.value !== e.target.newPassword2.value ? 'The two password enter did not match':'';
      if(newPassword2Error){
        setNewPassword2Error(newPassword2Error)
      }
    }
    if(emailError || currentPasswordError || newPasswordError || newPassword2Error){
      return;
    }
    setSaving(true);
    const accountUpdateResponse = await callAccountUpdateApi({
      firstName,
      lastName,
      phone,
      email,
      currentPassword:e.target.currentPassword.value,
      newPassword:e.target.newPassword.value
    });
    setSaving(false);
    if(accountUpdateResponse.error){
      setSubmitError(accountUpdateResponse)
      return;
    }
    close();
  }
  return (
    <div className="flex justify-center mt-8 mb-7">
      <div className="max-w-md w-full">
        <button onClick={close}>{'< Back'}</button>
        <h1 className="text-5xl mt-4">Edit account details</h1>
        <form noValidate onSubmit={handleSubmit} className="mt-6">
          {submitError ? (
            <div className="flex items-center justify-center mb-6 bg-zinc-500">
              <p className="m-4 text-s text-white">Not valid</p>
            </div>
          ) : (
            ''
          )}
          <h2 className="text-xl font-medium">Profile</h2>
          <div className="mt-3">
            <input
              id="firstName"
              name="firstName"
              value={firstName}
              type="text"
              autoComplete="given-name"
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First name"
              aria-label="First name"
              className={`mb-1 appearance-none border w-full  py-2 px-3 text-gray-800 placeholder:text-gray-500 leading-tight  focus:shadow-sm border-gray-900`}
            />
          </div>
          <div className="mt-3">
            <input
              id="lastName"
              name="lastName"
              type="text"
              value={lastName}
              autoComplete="family-name"
              placeholder="Last name"
              onChange={(e) => setLastName(e.target.value)}
              aria-label="Last name"
              className={`mb-1 appearance-none border w-full  py-2 px-3 text-gray-800 placeholder:text-gray-500 leading-tight  focus:shadow-sm border-gray-900`}
            />
          </div>
          <div className="mt-3">
            <input
              id="phone"
              name="phone"
              value={phone}
              type="tel"
              autoComplete="tel"
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Mobile"
              aria-label="Mobile"
              className={`mb-1 appearance-none border w-full  py-2 px-3 text-gray-800 placeholder:text-gray-500 leading-tight  focus:shadow-sm border-gray-900`}
            />
          </div>
          <div className="mt-3">
            <input
              id="email"
              name="Email"
              type="email"
              value={email}
              required
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              aria-label="Email address"
              className={`mb-1 appearance-none border w-full  py-2 px-3 text-gray-800 placeholder:text-gray-500 leading-tight  focus:shadow-sm border-gray-900 ${
                emailError?'border-red-500':'border-gray-900'
              }`}
            />
            <p
              className={`text-red-500 text-xs ${
                !emailError ? 'invisible' : ''
              }`}
            >
              {emailError} &nbsp;
            </p>
          </div>
          <h2 className="text-xl font-medium mt-4">Security</h2>
          <Password name="currentPassword" label="Current password" passwordError={currentPasswordError}/>
          <Password name="newPassword" label="New password" passwordError={newPasswordError}/>
          <p className={`text-sm font-medium ${currentPasswordError || newPasswordError ? 'text-red-500':''}`}>{currentPasswordError || newPasswordError}</p>
          <Password name="newPassword2" label="Re-enter new password"  passwordError={newPassword2Error}/>
          <p className={`text-sm font-medium ${newPassword2Error ? 'text-red-500':''}`}>{newPassword2Error}</p>
          <div className="mt-4">
            <button
              className="bg-gray-900 text-white uppercase py-2 px-4 focus:shadow-sm w-full block"
              type="submit"
              disabled={saving}
            >
              Save
            </button>
          </div>
          <div>
            <button
              className="bg-white text-black mt-3 border  border-gray-900 uppercase py-2 px-4 focus:shadow-sm w-full block"
              onClick={close}
            >
              Cancle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
function Password({name, label,passwordError}) {
  const [password, setPassword] = useState('');
  return (
    <div className="mt-3">
      <input
        className={`mb-1 appearance-none border w-full  py-2 px-3 text-gray-800 placeholder:text-gray-500 leading-tight  focus:shadow-sm border-gray-900   ${passwordError ? ' border-red-500' : 'border-gray-900'}`}
        id={name}
        name={name}
        type="password"
        autoComplete={name === 'currentPassword' ? 'current-password' : null}
        placeholder={label}
        aria-label={label}
        value={password}
        minLength={6}
        maxLength={10}
        required
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>
  );
}

function callAccountUpdateApi({firstName,lastName,phone,email,currentPassword,newPassword}){
    return fetch('/account',{
        method:'PATCH',
        headers:{
          Accept:'application/json',
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
          firstName,
          lastName,
          phone,
          email,
          currentPassword,
          newPassword
        })
    }).then((res)=>{
      if(res.ok){
        return{};
      }else{
        return res.json();
      }
    }).catch(()=>{
      return {error:'Error saving account. Please try again.'}
    })
}