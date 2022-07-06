import React, { useCallback } from 'react';
import { useServerProps } from '@shopify/hydrogen';
function AccountDetails() {
  const { setServerProps } = useServerProps(); //This hook help to manage server side props. More:- https://shopify.dev/api/hydrogen/hooks/global/useserverprops
  const startEditing = useCallback(()=> setServerProps("editingAccount",true),[setServerProps]) //set variable on a server -> editingAccount = true;
  return (
    <div className="mt-6">
      <h2 className="text-2xl">Account Details</h2>
      <div className="p-4 mt-4">
        <div className="flex">
          <h3 className="font-medium flex-1">Profile & Security</h3>
          <button className="underline" onClick={startEditing}>Edit</button>
        </div>
        <div className="text-sm text-gray-500 mt-4">Name</div>
        <p className="mt-1">Add name</p>
        <div className="text-sm text-gray-500 mt-4">Contact</div>
        <p className="mt-1">Add phone</p>
        <div className="text-sm text-gray-500 mt-4">Email address</div>
        <p className="mt-1">jjttssi592@gmail.com</p>
        <div className="text-sm text-gray-500 mt-4">Password</div>
        <p className="mt-1">**********</p>
      </div>
    </div>
  );
}

export default AccountDetails;
