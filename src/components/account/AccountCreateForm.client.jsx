import {Link,useNavigate} from '@shopify/hydrogen';
import React, {useState} from 'react';

export default function AccountCreate() {
  const navigation = useNavigate();
  const [emailError, setEmailError] = useState(null);
  const [email, setEmail] = useState('');
  const [passwordError, setPasswordError] = useState(null);
  const [password, setPassword] = useState('');
  const [submitError, setSubmitError] = useState(null);

  function emailValidation(email) {
    //Email and password validation
    if (email.validity.valid) return null;
    return email.validity.valueMissing
      ? 'please enter an email'
      : 'please enter a valid email';
  }
  function passwordValidation(password) {
    //Email and password validation
    if (password.validity.valid) return null;
    if (password.validity.valueMissing) {
      return 'please enter a password';
    }
    return 'password must be at least 6 characters';
  }
  async function handleSubmit(event) {
    
    event.preventDefault();
    setEmailError(null);
    setPasswordError(null);
    const newEmailError = emailValidation(event.target.email);
    if (newEmailError) {
      setEmailError(newEmailError);
    }
    const newPasswordError = passwordValidation(event.target.password);
    if (newPasswordError) {
      setPasswordError(newPasswordError);
    }
    if (newEmailError || newPasswordError) {
      return; // if did not get any error -> simple
    }
    //user send to server..
    const accountCreateResponse = await callAccountCreateApi({email, password});
    if (accountCreateResponse.error) {
      setSubmitError(accountCreateResponse.error);
      return;
    }
    navigation("/account");
  }
  return (
    <div className="max-w-7xl mx-auto p-4 md:py-5 md:px-8 ">
      <div className="flex justify-center  p-2">
        <div className="max-w-md  w-full  p-2">
          <h1 className="text-4xl">Create an account</h1>
          <form
            noValidate
            className="pt-6 pb-8 mt-4 mb-4"
            onSubmit={handleSubmit}
          >
            {submitError && (
              <div className="flex items-center justify-center mb-6 bg-zinc-500">
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
                className={`mb-1 appearance-none border w-full  py-2 px-3 text-gray-800 placeholder:text-gray-500 leading-tight  focus:shadow-sm border-gray-900  ${emailError ? ' border-red-500' : 'border-gray-900'}`}
              />
              <p
                className={`text-red-500 text-xs ${
                  !emailError ? 'invisible' : ''
                }`}
              >
                {emailError} &nbsp;
              </p>
            </div>
            <div className="mb-4">
              <input
                id="password"
                value={password}
                name="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                minLength={6}
                maxLength={10}
                required
                autoComplete="current-password"
                placeholder="Password"
                aria-label="Password"
                className={`mb-1 appearance-none border w-full  py-2 px-3 text-gray-800 placeholder:text-gray-500 leading-tight  focus:shadow-sm border-gray-900  ${passwordError ? ' border-red-500' : 'border-gray-900'}`}
              />
              <p
                className={`text-red-500 text-xs ${
                  !passwordError ? 'invisible' : ''
                }`}
              >
                {passwordError} &nbsp;
              </p>
            </div>
            <div className="flex justify-center items-center ">
              <button
                className="bg-gray-900 text-white uppercase py-2 px-4 focus:shadow-sm w-full block"
                type="submit"
              >
                Create an account
              </button>
            </div>
            <div className="flex items-center mt-4">
              <p className="align-baseline text-sm">
                Already have account? &nbsp;
                <Link to="/account" className="inline underline">
                  Sign
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function callAccountCreateApi({email, password, firstName, lastName}) {
    return fetch(`/account/register`, {
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
  