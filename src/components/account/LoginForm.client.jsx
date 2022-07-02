import React, {useState} from 'react';
import {Link, useNavigate} from '@shopify/hydrogen';
export default function LoginForm({shopName}) {
  const navigate = useNavigate();
  const [showEmailField, setShowEmailField] = useState(true);
  const [hasSubmitError, setHasSubmitError] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(null);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(null);
  function handleSubmit(e) {
    e.preventDefault();
    setEmailError(null);
    setPasswordError(null);
    if (showEmailField) {
      checkEmail(e);
    } else {
      checkPassword(e);
    }
  }
  function checkEmail(e) {
    if (e.target.email.validity.valid) {
      setShowEmailField(false);
    } else {
      setEmailError('Please enter a valid email');
    }
  }
  async function checkPassword(e) {
    const validity = e.target.password.validity;
    if (validity.valid) {
      const response = await callLoginApi({email, password});
      if (response.error) {
        setHasSubmitError(true);
        resetForm();
      } else {
        navigate('/account');
      }
    } else {
      setPasswordError(
        validity.valueMissing
          ? 'Please enter a password'
          : 'Password must be at lest 6 characters',
      );
    }
  }
  function resetForm() {
    setShowEmailField(true);
    setEmail('');
    setEmailError(null);
    setPassword('');
    setPasswordError(null);
  }
  return (
    <div className="flex justify-center mt-7">
      <div className="max-w-md w-full">
        <h1 className="text-4xl">Sign in.</h1>
        <form
          noValidate
          className="pt-6 pb-8 mt-4 mb-4"
          onSubmit={handleSubmit}
        >
          {hasSubmitError && (
            <div className=" justify-center items-center mb-6 bg-zinc-500 p-[2px]">
              <p className="m-4 text-sm text-white">
                Sorry we did not recognize either your email or password. Please
                try to sign in again or create a new account.
              </p>
            </div>
          )}
          {showEmailField && (
            <EmailField
              email={email}
              setEmail={setEmail}
              emailError={emailError}
              shopName={shopName}
            />
          )}
          {!showEmailField && (
            <ValidEmail email={email} resetForm={resetForm} />
          )}
          {!showEmailField && (
            <PasswordField
              password={password}
              setPassword={setPassword}
              passwordError={passwordError}
            />
          )}
        </form>
      </div>
    </div>
  );
}

function EmailField({email, setEmail, emailError,shopName}) {
  return (
    <>
      <div className="mb-4">
        <input
          id="email"
          name="Email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          placeholder="Email address"
          aria-label="Email address"
          className="mb-1 appearance-none border w-full  py-2 px-3 text-gray-800 placeholder:text-gray-500 leading-tight  focus:shadow-sm border-gray-900"
        />
        <p className={`text-red-500 text-xs ${!emailError ? 'invisible' : ''}`}>
          {emailError} &nbsp;
        </p>
      </div>
      <div className="flex justify-center items-center ">
        <button
          className="bg-gray-900 text-white uppercase py-2 px-4 focus:shadow-sm w-full block"
          type="submit"
        >
          Next
        </button>
      </div>
      <div className="flex items-center mt-4">
        <p className="align-baseline text-sm">
          New to {shopName} ? &nbsp;
          <Link to="/account/register" className="inline underline">
            Create an account
          </Link>
        </p>
      </div>
    </>
  );
}

function PasswordField({password, setPassword, passwordError}) {
  return (
    <>
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
          className={`mb-1 appearance-none border w-full  py-2 px-3 text-gray-800 placeholder:text-gray-500 leading-tight  focus:shadow-sm border-gray-900  ${
            passwordError ? ' border-red-500' : 'border-gray-900'
          }`}
        />
        <p
          className={`text-red-500 text-xs ${
            !passwordError ? 'invisible' : ''
          }`}
        >
          {passwordError} &nbsp;
        </p>
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-gray-900 text-white uppercase py-2 px-4 focus:shadow-outline block w-full"
          type="submit"
        >
          Sign in
        </button>
      </div>
      <div className="flex justify-between  items-center mt-4">
        <div className="flex-1"></div>
        <Link
          to="/account/recovery"
          className="inline-block align-baseline text-sm text-gray-500"
        >
          Forgot password
        </Link>
      </div>
    </>
  );
}
async function callLoginApi({email, password}) {
  return fetch(`/account/login`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({email, password}),
  })
    .then((res) => {
      if (res.ok) {
        return {};
      } else {
        return res.JSON();
      }
    })
    .catch((err) => {
      return {
        error: err.toString(),
      };
    });
}
function ValidEmail({email,resetForm}) {
  return (
    <>
      <div className="mb-6 flex  items-center justify-between">
        <div>
          <p>{email}</p>
          <input
            className="hidden"
            type="text"
            autoComplete="userName"
            value={email}
            readOnly
          />
        </div>
        <div>
          <button
            className="inline-block align-baseline text-sm underline"
            type="button"
            onClick={resetForm}
          >
            Change email
          </button>
        </div>
      </div>
    </>
  );
}
