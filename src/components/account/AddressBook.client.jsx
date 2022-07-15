import React, {useState} from 'react';
import {useServerProps} from '@shopify/hydrogen';
export default function AddressBook() {
  const {setServerProps} = useServerProps();
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
      <Address />
    </div>
  );
}
function Address() {
  const [showConfirmRemove, setShowConfirmRemove] = useState(false);
  return (
    <div className="p-4 mt-4">
      <div className="flex font-medium mt-4">
        {showConfirmRemove ? <ConfirmRemove close={()=>setShowConfirmRemove(false)}/> : null}
        <button className="underline flex-1 text-left">Edit</button>
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
function ConfirmRemove({close}) {
  return (
    <>
      <div className="fixed w-full h-full bg-white opacity-95 z-50 top-0 left-0"></div>
      <div className="fixed w-full h-full z-50 top-0 left-0">
        <div className="flex justify-center items-center mt-64">
          <div className="bg-gray-50 max-w-md w-full p-4">
            <div className="text-xl">Confirm removel</div>
            <div>Are you sure you wish to remove this address?</div>
            <div className="mt-6">
              <button
                className="bg-gray-900 text-white uppercase py-2 px-4 w-full block"
                type="submit"
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
