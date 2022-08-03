import React from 'react';
import {
  Seo,
  useSession,
  NoStore,
  useShopQuery,
  gql,
  flattenConnection,
} from '@shopify/hydrogen';
import {getApiErrorMessage} from '../../components/utilities/api.helper';
import Layout from '../../components/Layout.server';
import AccountDetails from '../../components/account/AccountDetails.client';
import OrderHistory from '../../components/account/OrderHistory.server';
import AddressBook from '../../components/account/AddressBook.client';
import EditAccountDetails from '../../components/account/EditAccountDetails.client';
import EditAddress from '../../components/account/EditAddress.client';
import Logout from '../../components/account/Logout.client';
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
  if (!customer) return response.redirect('/account/login');
  const addresses = flattenConnection(customer.addresses).map((address) => ({...address,id: address.id.substring(0, address.id.lastIndexOf('?')),originalId: address.id,})); //Each data is well defined -> substring => https://www.w3schools.com/jsref/jsref_substring.asp, lastIndexOf => https://www.w3schools.com/jsref/jsref_lastindexof.asp
  const defaultAddress = customer?.defaultAddress?.id?.substring(0,customer.defaultAddress.id.lastIndexOf('?'),);
  if (editingAccount) {
    return (
      <Layout
        children={
          <>
            <Seo type="noindex" data={{title: 'Account details'}} />
            <EditAccountDetails firstName={customer.firstName} lastName={customer.lastName} email={customer.email} phone={customer.phone}/>
          </>
        }
      />
    );
  }
  if (editingAddress) {
    const addressToEdit = addresses.find(
      (address) => address.id === editingAddress,
    ); //when user clink of 'edit' button. This will be returned -> true
    return (
      <Layout
        children={
          <>
            <Seo
              type="noindex"
              data={{title: addressToEdit ? 'Edit address' : 'Add address'}}
            />
            <EditAddress
              address={addressToEdit}
              defaultAddress={defaultAddress === editingAddress}
            />
          </>
        }
      />
    );
  }
  return (
    <AuthenticatedAccount
      addresses={addresses}
      defaultAddress={defaultAddress}
      customer={customer}
    />
  );
}
// ---------------------------API---------------------------//
export async function api(request, {session, queryShop}) {
  if (request.method !== 'PATCH') {
    return new Response(null, {
      status: 405,
      headers: {
        Allow: 'PATCH',
      },
    });
  }
  const {customerAccessToken} = await session.get();
  if (!customerAccessToken) return new Response(null, {status: 401});

  const {email, phone, firstName, lastName, newPassword} = await request.json();
  const customer = {}; //Default daua jabe na -> ..
  
  if (email) customer.email = email;
  if (phone) customer.phone = phone;
  if (firstName) customer.firstName = firstName;
  if (lastName) customer.lastName = lastName;
  if (newPassword) customer.password = newPassword;

  const {data,errors} = await queryShop({
    query: MUTATION,
    variables: {
      customer,
      customerAccessToken,
    },
    cache: NoStore(),
  });
  const error = getApiErrorMessage('customerUpdate', data, errors);
  if (error) return new Response(JSON.stringify({error}), {status: 400});
  return new Response(null);
}
//----------------------------0----------------------------//
function AuthenticatedAccount({addresses, defaultAddress, customer}) {
  const pageHeader = customer?.firstName ? `Hi ${customer.firstName}.` : 'Welcome to your account.';
  return (
    <Layout
      children={
        <>
          <Seo type="noindex" data={{title: 'Account details'}} />
          <div className="flex justify-center mt-10">
            <div className="w-full max-w-md">
              <h1 className="text-5xl">{pageHeader}</h1>
              {customer?.firstName ? (
                <div className="mt-2">Welcome to your account.</div>
              ) : null}
              <div className="flex">
                <span className="flex-1"></span>
                <Logout className="font-medium underline"/>
              </div>
              {/* --------Component--------- */}
              <OrderHistory />
              <AccountDetails 
                firstName={customer.firstName}
                lastName={customer.lastName}
                phone={customer.phone}
                email={customer.email}
              />
              <AddressBook
                addresses={addresses}
                defaultAddress={defaultAddress}
              />
            </div>
          </div>
        </>
      }
    />
  );
}

const QUERY = gql`
  query customerDetails($customerAccessToken: String!,$withAddressDetails: Boolean!) {
    customer(customerAccessToken: $customerAccessToken) {
      firstName
      lastName
      phone
      email
      defaultAddress {
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
const MUTATION = gql`
  mutation customerUpdate(
    $customer: CustomerUpdateInput!
    $customerAccessToken: String!
  ) {
    customerUpdate(
      customer: $customer
      customerAccessToken: $customerAccessToken
    ) {
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;
