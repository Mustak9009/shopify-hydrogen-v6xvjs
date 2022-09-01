import React from 'react'
import {Image,useProductOptions} from '@shopify/hydrogen';
export default function Gallery({product}) {
  console.log(product.media.nodes);
  const {selectedVariant,selectedOptions} = useProductOptions();
  console.log(selectedOptions)
  return (
    <div className='gap-4 flex  md:grid md:grid-cols-2  overflow-x-scrol scroll-smooth h-[485px] md:h-auto place-content-start' tabIndex="-1">
      <Image fetchpriority="high" data={selectedVariant.image} className="md:h-auto object-cover object-center flex-shrink-0 snap-start md:col-span-2 border border-gray-200 rounded-lg"/>
    </div>
  )
}
