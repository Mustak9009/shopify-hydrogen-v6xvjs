import { CacheDays, gql, NoStore, Seo, useShopQuery } from '@shopify/hydrogen';
import React from 'react'
import LoginForm from '../../components/account/LoginForm.client';
import Layout from '../../components/Layout.server';
export default function Login({ response }) {
  response.cache(NoStore());
  const { data } = useShopQuery({
    query: QUERY,
    cache: CacheDays(),
    preload: "*"
  });
  return (
    <Layout children={
      <>
        <Seo type='noindex' data={{ title: "Login" }} />
        <LoginForm shopName={data.shop.name} />
      </>
    } />
  )
}
const QUERY = gql`
    query shopInfo{
      shop{
        name
      }
    }
`
export async function api(response, { session, queryShop }) {
  const jsonBody = await response.json();
  if (!jsonBody.email || jsonBody.email === '' || !jsonBody.password || jsonBody.password === '') {
    return new Response(
      JSON.stringify({ error: "Incorrect email or password" }),
      { status: 400 }
    )
  }

  const { data, error } = await queryShop({
    query: LOGIN,
    variables: {
      input: {
        email: jsonBody.email,
        password: jsonBody.password
      }
    },
    cache: CacheDays()
  });
  if (data?.customerAccessTokenCreate?.customerAccessToken?.accessToken !== null) {
    await session.set('customerAccessToken', data.customerAccessTokenCreate.customerAccessToken.accessToken);
    return new Response(null, { status: 200 });
  } else {
    return new Response(
      JSON.stringify({ error: data?.customerAccessTokenCreate?.customerUserErrors ?? error }),
      { status: 401 }
    )
  }
}
const LOGIN = gql`
  mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
      customerUserErrors {
        code
        field
        message
      }
      customerAccessToken {
        accessToken
        expiresAt
      }
    }
  }
`;