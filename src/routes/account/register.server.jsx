import React from 'react'
import Layout from '../../components/Layout.server';
import AccountCreateForm from '../../components/account/AccountCreateForm.client';
import {getApiErrorMessage} from '../../components/utilities/api.helper';
import {NoStore, Seo,gql} from '@shopify/hydrogen';
export default function Register({response}){
  response.cache(NoStore())
  return (
    <Layout>
      <Seo type="noindex" data={{title: 'Register'}} />
      <AccountCreateForm/>
    </Layout>
  )
}

export async function api(response,{queryShop}){
    const jsonBody = await response.json();
    if(!jsonBody.email || jsonBody.email === '' || !jsonBody.password || jsonBody.password === ''){
      return new Response( //create a new response if any problem occurred
        JSON.stringify({error:"Email and password are required."}),
        {status:400}
      )
    }
    const {data,errors} = await queryShop({
      query:MUTATION,
      variables:{
        input:{
          email:jsonBody.email,
          password:jsonBody.password,
          firstName:jsonBody.firstName,
          lastName:jsonBody.lastName
        }
      },
      cache:NoStore()
    });
    const errorMessage = getApiErrorMessage('customerCreate',data,errors);
    if(!errorMessage && data && data.customerCreate && data.customerCreate.customer && data.customerCreate.customer.id){
      return new Response(null,{status:200})
    }else{
        return new Response(
          JSON.stringify({error:errorMessage??"Unknown error"}), //The nullish coalescing operator (??) is a logical operator that returns its right-hand side operand when its left-hand side operand is null or undefined, More -> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator
          {status:401}
        )
    }
    
}
const MUTATION = gql`
  mutation customerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer {
        id
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;
