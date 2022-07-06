import React from 'react';

export default function AddressBook() {
  return (
    <div className="mt-6 mb-10">
      <h2 className="text-2xl">Adress Book</h2>
      <p className="mt-2 text-sm text-gray-500">No address yet</p>
      <div className="flex justify-between items-center mt-2">
        <button className="text-center border border-gray-900 uppercase py-3 px-4 block w-full">
            Add an address
        </button>
      </div>
    </div>
  );
}
