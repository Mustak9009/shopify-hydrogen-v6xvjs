import React from 'react';
import { Seo, useSession,NoStore } from '@shopify/hydrogen';
import Layout from '../../components/Layout.server';
import AccountDetails from '../../components/account/AccountDetails.client';
import OrderHistory from '../../components/account/OrderHistory.server';
import AddressBook from '../../components/account/AddressBook.client';
import EditAccountDetails from '../../components/account/EditAccountDetails.client';
const Account = ({ response, editingAccount, editingAddress }) => {
  response.cache(NoStore());
  const { customerAccessToken } = useSession();
  if (!customerAccessToken) return response.redirect('/account/login');
  if(editingAccount){
    return(
      <Layout children={<>
        <Seo type='noindex' data={{title:"Account details"}}/>
        <EditAccountDetails/>
      </>}/>
    )
  }
  return <AuthenticatedAccount />;
};
function AuthenticatedAccount() {
  return <Layout children={<>
    <Seo type='noindex' data={{ title: "Account details" }} />
    <div className='flex justify-center mt-10'>
      <div className='w-full max-w-md'>
        <h1 className='text-5xl'>Welcome to your account.</h1>
        <div className='flex'>
          <span className='flex-1'></span>
          <p className='font-medium underline'>Logout</p>
        </div>
        {/* --------Component--------- */}
        <OrderHistory/>
        <AccountDetails/>
        <AddressBook/>
      </div>
    </div>
  </>} />;
}

export default Account;
