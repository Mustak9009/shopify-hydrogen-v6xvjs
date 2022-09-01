import React from 'react'
import {Image, Link} from '@shopify/hydrogen';
export default function FetureCollection({collection}) {
  return collection ? (
    <div className='shadow-xl rounded-xl grid grid-cols-1 lg:grid-cols-2 items-center  bg-white overflow-hidden'>
        <Image width={200} height={465} alt={collection.altText} data={collection.image} className="w-full"/>
        <div className='px-10 py-10 lg:py-0'>
            <h2 className='text-gray-700 text-3xl font-bold mb-5'>{collection.title}</h2>
            <p className='text-lg text-gray-500 mb-6'>{collection.description}</p>
            <Link to={`/collections/${collection.handle}`} className="inline-block bg-gray-900 text-lg  text-white font-medium rounded-md py-4 px-16  uppercase">Shop collection</Link>
        </div>
    </div>
  ): null;
  
}
