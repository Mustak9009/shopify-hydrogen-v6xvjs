import { Link } from '@shopify/hydrogen'
import React from 'react'

export default function OrderHistory() {
  return (
    <div className='mt-6'>
      <h2 className='text-2xl'>Order History</h2>
      <EmptyOrder/>
    </div>
  )
}
function EmptyOrder(){
  return(
    <>
        <div className='my-4 text-gray-500'>No oreder yet</div>
        <div className='flex justify-between items-center '>
          <Link to='/collections/fresstyle-collection' className='text-center border border-gray-900 uppercase py-3 px-4 block w-full'>Start shopping</Link>
        </div>
    </>
  )
}
