import React, {useState} from 'react';

export default function AccountRecoveryForm() {
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError,setSubmitError] = useState(null);
  const [email,setEmail] = useState('');
  const [emailError,setEmailError]= useState(null);


  function emailValidation(email){
    if(email.validity.valid) return null;
    return email.validity.valueMissing? 'Please enter an email':'Please enter a valid email';
  }
 async function handleSubmit(e){
    e.preventDefault();
    setSubmitError(null);
    setEmailError(null);
    const newEmailError = emailValidation(e.target.email);
    if(newEmailError){
      setEmailError(newEmailError);
      return;
    }
    await callAccountRecoveryApi({email})
    setEmail('');
    setSubmitSuccess(true);
 }
  return (
    <div className="flex justify-center mt-7">
      <div className="max-w-md w-full">
        {submitSuccess ? (
          <>
            <h1 className="text-4xl">Request Sent</h1>
            <p className="mt-4 text-gray-600">
              If that email address is in our system, you will receive an email
              with instructions about how to reset your password in a few
              minutes.
            </p>
          </>
        ) : (
          <>
            <h1 className="text-4xl">Forgot Password</h1>
            <p className="mt-4 text-gray-600">
              Enter the email address associated with your account to recieve a
              link to reset your password.
            </p>
          </>
        )}
        <form className="pt-6 pb-8 mt-4 mb-4" noValidate onSubmit={handleSubmit}>
          {submitError && (
            <div className='flex items-center justify-center mb-6 bg-zinc-500'>
              <p className="m-4 text-s text-white">{submitError}</p>
            </div>
          )}
          <div className="mb-4">
            <input
              id="email"
              value={email}
              name="Email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              placeholder="Email address"
              aria-label="Email address"
              className={`mb-1 appearance-none border w-full  py-2 px-3 text-gray-800 placeholder:text-gray-500 leading-tight  focus:shadow-sm border-gray-900  ${
                emailError ? ' border-red-500' : 'border-gray-900'
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
          <div className='flex justify-center items-center'>
              <button className="bg-gray-900 text-white uppercase py-2 px-4 focus:shadow-sm w-full block"
                type="submit">Request Reset Link</button>
          </div>
        </form>
      </div>
    </div>
  );
}


function callAccountRecoveryApi({email, password, firstName, lastName}) {
  return fetch(`/account/recovery`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({email, password, firstName, lastName}),
  })
    .then((res) => {
      if (res.status === 200) {
        return {};
      } else {
        return res.json();
      }
    })
    .catch((error) => {
      return {
        error: error.toString(),
      };
    });
}
