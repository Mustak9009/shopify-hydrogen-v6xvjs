import React,{useCallback} from 'react'
import CartUiProvider,{useCartUI} from './CartUiProvider.client';
import {CartProvider as ShopifyCartProvider} from '@shopify/hydrogen';
export default function LocalCartProvider({children,customerAccessToken}) {
  return (
    <CartUiProvider
      children={<Provider customerAccessToken={customerAccessToken}>{children}</Provider>}
    />
  )
}
function Provider({children,customerAccessToken}){
  const {openCart} = useCartUI();
  const open = useCallback(()=>{
      openCart();
  },[openCart])
  return(
    <ShopifyCartProvider customerAccessToken={customerAccessToken} onCreate={open} onLineAdd={open}>
        {children}
    </ShopifyCartProvider>
  )
}