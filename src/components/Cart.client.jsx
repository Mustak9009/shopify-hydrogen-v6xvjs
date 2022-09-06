import React from 'react'
import {useCartUI} from './CartUiProvider.client';
export default function Cart() {
  const {isCartOpen,closeCart} = useCartUI();
  return (
    <div className={`z-20 fixed top-0 bottom-0 left-0 right-0 bg-black transition-opacity ${isCartOpen ? "opacity-20":"opacity-0 pointer-events-none"}`}/>
  )
}
