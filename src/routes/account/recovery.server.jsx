import {NoStore, Seo, gql} from '@shopify/hydrogen';

import Layout from '../../components/Layout.server';
import AccountRecoverForm from '../../components/account/AccountRecoveryForm.client';
export default function Recovery({response}) {
  response.cache(NoStore());
  return (
    <Layout
      children={
        <>
          <Seo type="noindex" data={{title: 'Recover password'}} />
          <AccountRecoverForm />
        </>
      }
    />
  );
}

export async function api(request, {queryShop}) {
  const jsonBody = await request.json();

  if (!jsonBody.email || jsonBody.email === '') {
    return new Response(JSON.stringify({error: 'Email required'}), {
      status: 400,
    });
  }
  await queryShop({
    query: MUTATION,
    variables: {
      email: jsonBody.email,
    },
    cache: NoStore(),
  });
  return new Response(null, {
    status: 200,
  });
}

const MUTATION = gql`
  mutation customerRecover($email: String!) {
    customerRecover(email: $email) {
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;
