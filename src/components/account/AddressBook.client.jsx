import React, {useState, useMemo} from 'react';
import {useServerProps} from '@shopify/hydrogen';
export default function AddressBook({addresses, defaultAddress}) {
  const {serverProps,setServerProps} = useServerProps();
  const {addressesWithoutDefault,fullDefaultAddress} = useMemo(() => {
    const defaultAddressIndex = addresses.findIndex(
      (address) => address.id === defaultAddress,
    );
    return {
      addressesWithoutDefault: [...addresses.slice(0, defaultAddressIndex),...addresses.slice(defaultAddress + 1, addresses.length),],
      fullDefaultAddress: addresses[defaultAddressIndex],
    };
  }, [addresses, defaultAddress]);

  async function deleteAddress(id){
      const response = await callDeleteAddressApi(id);
      if(response.error) alert(response.error);
      else setServerProps('rerender',!serverProps.rerender);
  }
  return (
    <div className="mt-6 mb-10">
      <h2 className="text-2xl">Adress Book</h2>
      <p className="mt-2 text-sm text-gray-500">No address yet</p>
      <div className="flex justify-between items-center mt-2">
        <button
          onClick={() => setServerProps('editingAddress', 'NEW')}
          className="text-center border border-gray-900 uppercase py-3 px-4 block w-full"
        >
          Add an address
        </button>
      </div>
      {addresses?.length ? (
        <>
          {fullDefaultAddress ? (
            <Address address={fullDefaultAddress} defaultAddress deleteAddress={deleteAddress.bind(null,fullDefaultAddress.originalId)}/>
          ) : null}
          {addressesWithoutDefault.map((address) => (
            <Address key={address.id} address={address} deleteAddress={deleteAddress.bind(null,address.originalId)}/>
          ))}
        </>
      ) : null}
    </div>
  );
}
function Address({address, defaultAddress,deleteAddress}) {
  const {setServerProps} = useServerProps();
  const [showConfirmRemove, setShowConfirmRemove] = useState(false);
  return (
    <div className="p-4 mt-4">
      {showConfirmRemove ? (
        <ConfirmRemove close={() => setShowConfirmRemove(false)} deleteAddress={deleteAddress}/>
      ) : null}
      {defaultAddress ? (
        <p className="mb-2 text-sm text-gray-500 font-medium">
          Default Delivery Address
        </p>
      ) : null}
      {address.formatted.map((line, index) => (
        <div key={line + index} className='pt-1'>{line}</div>
      ))}
      <div className="flex font-medium mt-4">
        <button
          className="underline flex-1 text-left"
          onClick={() => setServerProps('editingAddress', address.id)}
        >
          Edit
        </button>
        <button
          className="text-gray-500"
          onClick={() => setShowConfirmRemove(true)}
        >
          Remove
        </button>
      </div>
    </div>
  );
}


function ConfirmRemove({close,deleteAddress}) {
  return (
    <>
      <div className="fixed w-full h-full bg-white opacity-95 z-50 top-0 left-0"></div>
      <div className="fixed w-full h-full z-50 top-0 left-0">
        <div className="flex justify-center items-center mt-64">
          <div className="bg-gray-50 max-w-md w-full p-4">
            <div className="text-xl" >Confirm removel</div>
            <div>Are you sure you wish to remove this address?</div>
            <div className="mt-6">
              <button
                className="bg-gray-900 text-white uppercase py-2 px-4 w-full block"
                type="submit"
                onClick={()=>{
                  close();
                  deleteAddress(); //you can allso call two function in a single method like this.
                }}
              >
                Confirm
              </button>
              <button
                className="bg-white text-black mt-3 border  border-gray-900 uppercase py-2 px-4  w-full block"
                onClick={close}
              >
                Cancle
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function callDeleteAddressApi(id) {
  return fetch(`/account/address/${encodeURIComponent(id)}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
    },
  })
    .then((res) => {
      if (res.ok) {
        return {};
      } else {
        return res.json();
      }
    })
    .catch(() => {
      return {
        error: 'Error removing address. Please try again.',
      };
    });
}