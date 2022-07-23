import React from 'react';
import {Seo, useSession, NoStore, useShopQuery, gql,flattenConnection} from '@shopify/hydrogen';
import Layout from '../../components/Layout.server';
import AccountDetails from '../../components/account/AccountDetails.client';
import OrderHistory from '../../components/account/OrderHistory.server';
import AddressBook from '../../components/account/AddressBook.client';
import EditAccountDetails from '../../components/account/EditAccountDetails.client';
import EditAddress from '../../components/account/EditAddress.client';
export default function Account({response, editingAccount, editingAddress}) {
  response.cache(NoStore());
  const {customerAccessToken} = useSession();
  if (!customerAccessToken) return response.redirect('/account/login');
  const {data} = useShopQuery({
    query: QUERY,
    variables: {
      customerAccessToken,
      withAddressDetails: !!editingAddress,
    },
    cache: NoStore(),
  });
  const customer = data.customer;
  if(!customer) return response.redirect('/account/login');
  const addresses = flattenConnection(customer.addresses).map((address)=>({...address ,id:address.id.substring(0,address.id.lastIndexOf('?')),originalId:address.id})); //Each data is well defined -> substring => https://www.w3schools.com/jsref/jsref_substring.asp, lastIndexOf => https://www.w3schools.com/jsref/jsref_lastindexof.asp
  const defaultAddress = customer?.defaultAddress?.id?.substring(0,customer.defaultAddress.id.lastIndexOf('?'));

  
  if (editingAccount) {
    return (
      <Layout
        children={
          <>
            <Seo type="noindex" data={{title: 'Account details'}} />
            <EditAccountDetails />
          </>
        }
      />
    );
  }
  if (editingAddress) {
    const addressToEdit = addresses.find((address)=> address.id === editingAddress); //when user clink of 'edit' button. This will be returned -> true
    return (
      <Layout
        children={
          <>
            <Seo type="noindex" data={{title:addressToEdit ? 'Edit address' :'Add address'}} />
            <EditAddress address={addressToEdit} defaultAddress={defaultAddress === editingAddress}/>
          </>
        }
      />
    );
  }
  return <AuthenticatedAccount addresses={addresses} defaultAddress={defaultAddress}/>;
}
function AuthenticatedAccount({addresses,defaultAddress}) {
  return (
    <Layout
      children={
        <>
          <Seo type="noindex" data={{title: 'Account details'}} />
          <div className="flex justify-center mt-10">
            <div className="w-full max-w-md">
              <h1 className="text-5xl">Welcome to your account.</h1>
              <div className="flex">
                <span className="flex-1"></span>
                <p className="font-medium underline">Logout</p>
              </div>
              {/* --------Component--------- */}
              <OrderHistory />
              <AccountDetails />
              <AddressBook addresses={addresses} defaultAddress={defaultAddress}/>
            </div>
          </div>
        </>
      }
    />
  );
}

const QUERY = gql`
  query customerDetails($customerAccessToken: String!$withAddressDetails: Boolean!) {
    customer(customerAccessToken:$customerAccessToken) {
      defaultAddress{
        id 
        formatted
      }
      addresses(first: 6) {
        edges {
          node {
            id
            formatted
            firstName @include(if: $withAddressDetails) #firstName depends(show/hide) on $withAddressDetails
            lastName @include(if: $withAddressDetails)
            company @include(if: $withAddressDetails)
            address1 @include(if: $withAddressDetails)
            address2 @include(if: $withAddressDetails)
            country @include(if: $withAddressDetails)
            province @include(if: $withAddressDetails)
            city @include(if: $withAddressDetails)
            phone @include(if: $withAddressDetails)
          }
        }
      }
    }
  }
`;
