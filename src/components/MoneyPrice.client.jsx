import React from 'react';
import {useMoney} from '@shopify/hydrogen';
export default function MoneyPrice({money}) {
    const {currencyCode,currencySymbol,amount} = useMoney(money);
    return (
        <span>
            {currencyCode}
            {currencySymbol}
            {amount}
        </span>
  )
}
