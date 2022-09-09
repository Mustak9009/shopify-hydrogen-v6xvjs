import React from 'react';
import {
  ProductOptionsProvider,
  useProductOptions,
  ProductPrice,
  AddToCartButton,
  BuyNowButton,
} from '@shopify/hydrogen';
import Gallery from './Gallery.client';
import ProductOptions from './ProductOptions.client';
import {BUTTON_PRIMARY_CLASS,BUTTON_SECONDARY_CLASS} from './Button.client';
function ProductPrices({product}) {
  const {selectedVariant} = useProductOptions(); //useProductOptions help you to (get,set,track) product variant
  return (
    <>
      <ProductPrice
        data={product}
        priceType="compareAt"
        variantId={selectedVariant.id}
        className="text-gray-500 line-through text-lg font-semibold"
      />
      <ProductPrice
        data={product}
        variantId={selectedVariant.id}
        className="text-gray-900  text-lg font-semibold"
      />
    </>
  );
}
function AddToCartMarkup(){
  const {selectedVariant} = useProductOptions();
  //alternate the -> availableForSale value because of -> 40 line
  const isOutOfstock = !selectedVariant.availableForSale; //Change->availableForSale value usnig -> not(!)
  
  return (
    <div className='space-y-2 mb-8'>
        <AddToCartButton  disabled={isOutOfstock} className={BUTTON_PRIMARY_CLASS}>
          {isOutOfstock?"Out of stock":"Add to bag"}
        </AddToCartButton>
        {isOutOfstock?(
          <p className='text-center text-black'>Available in 2-3 weeks</p>
        ):(<BuyNowButton variantId={selectedVariant.id} className={BUTTON_SECONDARY_CLASS}>Buy it now</BuyNowButton>)}
    </div>
  );
}
export default function ProductDetails({product}) {
  const initialVariant = product.variants.nodes[0];
  return (
    <ProductOptionsProvider data={product} initialVariantId={initialVariant.id}>
      {/*ProductOptionsProvider use for -> Track which varient user select*/}
      <div className="grid grid-cols-1 md:grid-cols-[1fr,1fr] gap-x-8 my-16">
        <div className="md:hidden mt-5 mb-8">
          <h1 className="text-2xl font-bold text-black mb-4">
            {product.title}
          </h1>
          {product.vendor && (
            <div className="text-sm font-medium mb-2 text-gray-900">
              {product.vendor}
            </div>
          )}
          <span />
          <div className="flex justify-between md:block">
            <ProductPrices product={product} />
          </div>
        </div>
        <Gallery product={product} />
        <div>
          <div className="hidden md:block">
            <h1 className="text-3xl font-bold text-black mb-4">
              {product.title}
            </h1>
            {product.vendor && (
              <div className="text-sm font-medium mb-2 text-gray-900">
                {product.vendor}
              </div>
            )}
            <ProductPrices product={product} />
          </div>
          <div className="mt-8">
            <ProductOptions />
            <AddToCartMarkup/>
            <div className="flex space-x-4">
              <span className="flex items-center mb-8">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current text-blue-600 mr-3"
                >
                  <path
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364-.7071-.7071M6.34315 6.34315l-.70711-.70711m12.72796.00005-.7071.70711M6.3432 17.6569l-.70711.7071M16 12c0 2.2091-1.7909 4-4 4-2.20914 0-4-1.7909-4-4 0-2.20914 1.79086-4 4-4 2.2091 0 4 1.79086 4 4Z"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-sm text-gray-900 font-medium">
                  Sustainable Material
                </span>
              </span>
              <span className="flex items-center mb-8">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current text-blue-600 mr-3"
                >
                  <path
                    d="M9 12L11 14L15 10M20.6179 5.98434C20.4132 5.99472 20.2072 5.99997 20 5.99997C16.9265 5.99997 14.123 4.84453 11.9999 2.94434C9.87691 4.84446 7.07339 5.99985 4 5.99985C3.79277 5.99985 3.58678 5.9946 3.38213 5.98422C3.1327 6.94783 3 7.95842 3 9.00001C3 14.5915 6.82432 19.2898 12 20.622C17.1757 19.2898 21 14.5915 21 9.00001C21 7.95847 20.8673 6.94791 20.6179 5.98434Z"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-sm text-gray-900 font-medium ">
                  Lifetime Warranty
                </span>
              </span>
            </div>
          </div>
          <div
            dangerouslySetInnerHTML={{__html: product.descriptionHtml}}
            className="Product_information"
          />
        </div>
      </div>
    </ProductOptionsProvider>
  );
}
