import React, {Suspense, useCallback, useState} from 'react';
import {Listbox} from '@headlessui/react';
import SpinnerIcon from './SpinnerIcon.client';
import {fetchSync,useCountry} from '@shopify/hydrogen';
const CountrySelector = () => {
  const [listBoxOpen,setListBoxOpen] = useState(false);  
  const [selectCountry] = useCountry();
  const setCountry = useCallback(({isoCode, name}) => { //set country in a local storage
    fetch(`/countries`, {
      body: JSON.stringify({isoCode, name}),
      method: 'POST',
    }).then(() => {
      window.location.reload();
    });
  }, []);
  return (
    <>
      <div>
        {/*Listbox use create drop-down menu -> https://headlessui.dev/react/listbox*/}
        <Listbox onChange={setCountry}> 
          {({open}) => {
            setTimeout(()=> setListBoxOpen(open));
            return (
              <>
                <Listbox.Button className="font-medium flex text-sm h-8 p-2 items-center">
                  <span className="p-4">{selectCountry.name}</span>
                  <ArrowIcon isOpen={open} />
                </Listbox.Button>
                <Listbox.Options className="absolute mt-2 z-10">
                  <div className="bg-white p-4 rounded-lg drop-shadow-2xl overflow-y-auto h-64">
                    <Listbox.Option
                      disabled
                      className="p-2 text-md text-left font-medium uppercase"
                    >
                      Country
                    </Listbox.Option>
                    {listBoxOpen && (
                      <Suspense fallback={<div className='flex justify-center'><SpinnerIcon/></div>}>
                        <Country selectCountry={selectCountry}  getClassName={(active)=>{
                          return (
                            `w-36 py-2 px-3 flex justify-between items-center text-left cursor-pointer rounded` +
                            `${active ? ' bg-gray-200' : ''}`
                          )
                        }}/>
                      </Suspense>
                    )}
                  </div>
                </Listbox.Options> 
              </>
            );
          }}
        </Listbox>
      </div>
    </>
  );
};
export function Country({selectCountry,getClassName}){
  const countries = fetchSync("/countries").json(); //fetch api data using fetchSync -> https://shopify.dev/api/hydrogen/hooks/global/fetchsync
  return countries.map((country)=>{
    const isSelected = country.isoCode === selectCountry.isoCode; //Checking country name for -> <CheckIcon/>
    return(
         <Listbox.Option key={country.isoCode} value={country}>
              {({active})=>(
              <div className={getClassName(active)}>
                {country.name}
                {isSelected ? <CheckIcon/> : null}
               </div>
              )}
         </Listbox.Option>
    )
  })
  
}
export function CheckIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M7 10L9 12L13 8M19 10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10Z"
        stroke="#354CF6"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
export function ArrowIcon({isOpen}) {
  return (
    <svg
      className={`transition-transform duration-300 ${
        isOpen ? 'rotate-180' : null
      }`}
      aria-hidden="true"
      width="10"
      height="6"
      viewBox="0 0 10 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.292893 0.292893C0.683416 -0.097631 1.31658 -0.097631 1.7071 0.292893L4.99999 3.58579L8.29288 0.292893C8.6834 -0.0976311 9.31657 -0.0976311 9.70709 0.292893C10.0976 0.683417 10.0976 1.31658 9.70709 1.70711L5.7071 5.70711C5.31657 6.09763 4.68341 6.09763 4.29289 5.70711L0.292893 1.70711C-0.0976309 1.31658 -0.0976309 0.683417 0.292893 0.292893Z"
        fill="#374151"
      />
    </svg>
  );
}

export default CountrySelector;
