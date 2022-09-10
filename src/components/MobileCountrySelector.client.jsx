import React, {useCallback, useState, Suspense} from 'react';
import {Listbox} from '@headlessui/react';
import {useCountry} from '@shopify/hydrogen';
import {ArrowIcon, Country} from './CountrySelector.client';
import SpinnerIcon from './SpinnerIcon.client';
export default function MobileCountrySelector() {
  const [listBoxOpen, setListboxOpen] = useState(true);
  const [selectCountry] = useCountry();
  const setCountry = useCallback(({isoCode, name}) => {
    //set country in a local storage
    fetch(`/countries`, {
      body: JSON.stringify({isoCode, name}),
      method: 'POST',
    }).then(() => {
      window.location.reload();
    });
  }, []);
  return (
    <div className="mt-8 rounded border border-gray-200 w-full">
      <Listbox onChange={setCountry}>
        {({open}) => {
          setTimeout(() => setListboxOpen(open));
          return (
            <>
              <Listbox.Button className="w-full flex justify-between text-sm items-center py-5 px-7">
                {selectCountry.name}
                <ArrowIcon isOpen={open} />
              </Listbox.Button>
              <Listbox.Options className="w-full px-3 pb-2 text-lg overflow-y-auto h-64">
                <Listbox.Option
                  disabled
                  className="font-medium px-4 pb-4 w-full text-left uppercase"
                >
                  Country
                </Listbox.Option>
                {listBoxOpen && (
                  <Suspense
                    fallback={
                      <div className="flex justify-center">
                        <SpinnerIcon />
                      </div>
                    }
                  >
                    <Country
                      selectCountry={selectCountry}
                      getClassName={(active) => {
                        return (
                          `py-2 px-4 rounded flex justify-between items-center text-left w-full cursor-pointer` +
                          `${active ? 'bg-gray-100' : ''}`
                        );
                      }}
                    />
                  </Suspense>
                )}
              </Listbox.Options>
            </>
          );
        }}
      </Listbox>
    </div>
  );
}
