import React from 'react';
import {useRouteParams} from '@shopify/hydrogen';
import Layout from '../../components/Layout.server';
const Account = ({response, editingAccount, editingAddress}) => {
 console.log(response)
  return (
    <Layout>
      <div>Account page</div>
    </Layout>
  );
};

export default Account;
