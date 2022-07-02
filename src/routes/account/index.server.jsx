import React from 'react';
import {useSession} from '@shopify/hydrogen';
import Layout from '../../components/Layout.server';
import AccountDetails from '../../components/account/AccountDetails.server';
const Account = ({response, editingAccount, editingAddress}) => {
  const {customerAccessToken} = useSession();
  return (
    <Layout children={<AccountDetails/>}/>
  );
};

export default Account;
