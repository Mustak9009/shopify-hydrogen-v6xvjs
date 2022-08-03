import React from 'react';
import {Link, Image} from '@shopify/hydrogen';
function ProductCard({product}) {
  const selectVarient = product.variants.nodes[0];
  return (
    <div className="mb-4 relative">
      <Link to={`products/${product.handle}`}>
        <div className="border-gray-200 border-2 rounded-lg mb-2 flex justify-center items-center overflow-hidden object-cover h-96 relative">
          {selectVarient.image ? (
            <Image      
              alt={product.handle}
              className="bg-white absolute w-full h-full transition-all duration-500 ease-in-out transform bg-center bg-cover object-center object-contain hover:scale-110"
              data={selectVarient.image}
            />
          ) : null}
          {!selectVarient?.availableForSale ? (
            <div className="absolute top-3 left-3 rounded-3xl bg-black text-white py-3 px-4">
              Out of stock
            </div>
          ) : null}
        </div>
        <span className='text-gray-900 text-sm font-semibold mb-0.5'>{product.title}</span>
        {product.vendor?
        <p className='text-gray-900 font-medium text-sm mb-0.5 mt-2'>{product.vendor}</p>
        :null}
      </Link>
    </div>
  );
}

export default ProductCard;
