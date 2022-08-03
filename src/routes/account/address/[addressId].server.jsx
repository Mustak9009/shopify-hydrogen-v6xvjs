import { gql, NoStore } from "@shopify/hydrogen";
import {getApiErrorMessage} from '../../../components/utilities/api.helper';
export async function  api(request,{params,session,queryShop}) {
    const {customerAccessToken} = await session.get();
    if(!customerAccessToken) return new Response(null,{status:401});

    if(request.method === 'PATCH') return upDatateAddress({request,params,customerAccessToken,queryShop});
    if(request.method === 'DELETE') return deleteAddress({customerAccessToken,params,queryShop});
    return new Response(null,{
        status:405,
        headers:{
            Allow:'PATCH'
        }
    });
}

function deleteAddress({customerAccessToken,params,queryShop}){
    const {data,errors} = queryShop({
        query:DELETE_ADDRESS,
        variables:{
            customerAccessToken,
            id:decodeURIComponent(params.addressId)
        },
        cache:NoStore()
    });
    const error = getApiErrorMessage('customerAddressDelete',data,errors);
    if(error) return new Response(JSON.stringify({error}),{status:400});
    return new Response(null);
}
async function upDatateAddress({request,params,customerAccessToken,queryShop}){
    const { firstName, lastName, address1, address2, company, country, province, city, phone,isDefaultAddress} = await request.json();
    const address = { firstName:'', lastName:'', address1:'', address2:'', company:'', country:'', province:'', city:'', phone:''}

    if(firstName) address.firstName = firstName;
    if(lastName) address.lastName = lastName;
    if(address1) address.address1 = address1;
    if(address2) address.address2 =address2 ;
    if(company) address.company = company;
    if(country) address.country = country;
    if(province) address.province = province;
    if(city) address.city = city;
    if(phone) address.phone = phone;   

    const {data,errors} = await queryShop({
      query:UPDATE_ADDRESS,
      variables:{
          address,
          customerAccessToken,
          id:decodeURIComponent(params.addressId)
      },
      cache:NoStore()
    });
    const error = getApiErrorMessage('customerAddressUpdate',data,errors);
    if(error) return new Response(JSON.stringify({error}),{status:400});
    
    if(isDefaultAddress){
        const {data,errors} = await setDefaultAddress(queryShop,decodeURIComponent(params.addressId),customerAccessToken);
        const error = getApiErrorMessage('customerDefaultAddressUpdate',data,errors);
        if(error) return new Response(JSON.stringify({error}),{status:400});
    }
    return new Response(null);
}
async function setDefaultAddress(queryShop,addressId,customerAccessToken){
    return queryShop({
        query:UPDATE_DEFAULT_ADDRESS,
        variables:{
            customerAccessToken,
            addressId
        },
        cache:NoStore()
    })
}
const  DELETE_ADDRESS = gql `
  mutation customerAddressDelete($customerAccessToken:String!,$id:ID!){
    customerAddressDelete(customerAccessToken:$customerAccessToken,id:$id){
        customerUserErrors{
            code 
            field
            message
        }
        deletedCustomerAddressId
    }
  }
`
const UPDATE_ADDRESS = gql `
    mutation customerAddressUpdate($address:MailingAddressInput!,$customerAccessToken:String!,$id:ID!){
        customerAddressUpdate(address:$address,customerAccessToken:$customerAccessToken,id:$id){
            customerUserErrors{
                code
                field
                message
            }
        }
    }
`
const UPDATE_DEFAULT_ADDRESS = gql `
    mutation customerDefaultAddressUpdate($addressId:ID!,$customerAccessToken:String!){
        customerDefaultAddressUpdate(addressId:$addressId,customerAccessToken:$customerAccessToken){
            customerUserErrors{
                code 
                field 
                message
            }
        }
    }
`