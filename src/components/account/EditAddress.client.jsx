import React, {useState} from 'react';
import {useServerProps} from '@shopify/hydrogen';
const EditAddress = () => {
  const {setServerProps} = useServerProps();
  const close = () => setServerProps('editingAddress', null);
  const [submitError, setSubmitError] = useState(null);
  const [saving, setSaving] = useState(false);

  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [company, setCompany] = useState('');
  const [country, setCountry] = useState('');
  const [province, setProvince] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    const response = await callUpdateAddressApi({
      address1,
      address2,
      firstName,
      lastName,
      company,
      country,
      province,
      city,
      phone,
    });
    setSaving(false);
    if (response.error) {
      setSubmitError(response.error);
      return;
    }
    close();
  }
  return (
    <div className="flex justify-center mt-8">
      <div className="max-w-md w-full">
        <button onClick={close}>{'< Back'}</button>
        <h1 className="text-5xl mt-4">Add address</h1>
        <form className="mt-6" noValidate onSubmit={handleSubmit}>
          {submitError && (
            <div className="flex items-center justify-center mb-6 bg-zinc-500">
              <p className="m-4 text-s text-white">{submitError}</p>
            </div>
          )}
          <div className="mb-3">
            <input
              id="firstName"
              value={firstName}
              name="firstName"
              type="text"
              required
              onChange={(e) => setFirstName(e.target.value)}
              autoComplete="give-name"
              placeholder="First name"
              aria-label="First name"
              className={`mb-1 appearance-none border w-full  py-2 px-3 text-gray-800 placeholder:text-gray-500 leading-tight  focus:shadow-sm border-gray-900 `}
            />
          </div>
          <div className="mb-3">
            <input
              id="lastName"
              name="lastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              autoComplete="family-name"
              placeholder="Last name"
              aria-label="Last name"
              className={`mb-1 appearance-none border w-full  py-2 px-3 text-gray-800 placeholder:text-gray-500 leading-tight  focus:shadow-sm border-gray-900 `}
            />
          </div>
          <div className="mb-3">
            <input
              id="company"
              name="company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              type="text"
              autoComplete="Organization"
              placeholder="Company"
              aria-label="Company"
              className={`mb-1 appearance-none border w-full  py-2 px-3 text-gray-800 placeholder:text-gray-500 leading-tight  focus:shadow-sm border-gray-900 `}
            />
          </div>
          <div className="mb-3">
            <input
              id="street1"
              name="street1"
              type="text"
              value={address1}
              required
              onChange={(e) => setAddress1(e.target.value)}
              autoComplete="address-line1"
              placeholder="Address line 1*"
              aria-label="Address line 1"
              className={`mb-1 appearance-none border w-full  py-2 px-3 text-gray-800 placeholder:text-gray-500 leading-tight  focus:shadow-sm border-gray-900 `}
            />
          </div>
          <div className="mb-3">
            <input
              id="address2"
              name="address2"
              value={address2}
              onChange={(e) => setAddress2(e.target.value)}
              type="text"
              autoComplete="address-line2"
              placeholder="Address line 2"
              aria-label="Address  line 2"
              className={`mb-1 appearance-none border w-full  py-2 px-3 text-gray-800 placeholder:text-gray-500 leading-tight  focus:shadow-sm border-gray-900 `}
            />
          </div>
          <div className="mb-3">
            <input
              id="country"
              name="country"
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
              autoComplete="country-name"
              placeholder="Country"
              aria-label="Country"
              className={`mb-1 appearance-none border w-full  py-2 px-3 text-gray-800 placeholder:text-gray-500 leading-tight  focus:shadow-sm border-gray-900 `}
            />
          </div>
          <div className="mb-3">
            <input
              id="state"
              name="state"
              type="text"
              required
              value={province}
              onChange={(e) => setProvince(e.target.value)}
              autoComplete="address-level1"
              placeholder="State"
              aria-label="State"
              className={`mb-1 appearance-none border w-full  py-2 px-3 text-gray-800 placeholder:text-gray-500 leading-tight  focus:shadow-sm border-gray-900 `}
            />
          </div>
          <div className="mb-3">
            <input
              id="city"
              name="city"
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
              autoComplete="address-level2"
              placeholder="City"
              aria-label="City"
              className={`mb-1 appearance-none border w-full  py-2 px-3 text-gray-800 placeholder:text-gray-500 leading-tight  focus:shadow-sm border-gray-900 `}
            />
          </div>
          <div className="mb-3">
            <input
              id="phone"
              name="phone"
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              autoComplete="tel"
              placeholder="Phone"
              aria-label="Phone"
              className={`mb-1 appearance-none border w-full  py-2 px-3 text-gray-800 placeholder:text-gray-500 leading-tight  focus:shadow-sm border-gray-900 `}
            />
          </div>
          <div className="mt-4">
            <input
              type="checkbox"
              id="defaultAddress"
              name="defaultAddress"
              className="accent-black"
            />
            <label
              htmlFor="defaultAddress"
              className="ml-2 inline-block text-gray-800"
            >
              set as default address
            </label>
          </div>
          <div className="mt-6">
            <button
              className="bg-gray-900 text-white uppercase py-2 px-4 focus:shadow-sm w-full block"
              type="submit"
              disabled={saving}
            >
              Save
            </button>
            <button
              className="bg-white text-black mt-3 border  mb-11 border-gray-900 uppercase py-2 px-4 focus:shadow-sm w-full block"
              onClick={close}
            >
              Cancle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

function callUpdateAddressApi({
  firstName,
  lastName,
  address1,
  address2,
  company,
  country,
  province,
  city,
  phone,
}) {
  return fetch('/account/address', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      firstName,
      lastName,
      address1,
      address2,
      company,
      country,
      province,
      city,
      phone,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return {};
      } else {
        return res.json();
      }
    })
    .catch(() => {
      return {error: 'Error saving address. Please try again.'};
    });
}
export default EditAddress;
