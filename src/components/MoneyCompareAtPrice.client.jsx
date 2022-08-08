import React from 'react'
import {useMoney} from '@shopify/hydrogen';
export default function MoneyComparePriceAt({money,collectionProductCount}) {
  const {amount,currencySymbol} = useMoney(money);
  return (
    <span className='line-through text-lg mr-2.5 text-gray-500'>
        {currencySymbol}
        {amount}
    </span>
  )
}
