import React from 'react';
import {useProductOptions} from '@shopify/hydrogen';
export default function ProductOptions() {
  const {options, setSelectedOption, selectedOptions} = useProductOptions();
  return (
    <>
      {options.map(({name, values}) => (  //Map keu 'return' korlam
          <fieldset className="mt-8 mb-4" key={name}>
            <legend className="mb-4 text-4xl font-medium text-gray-900">
              {name}
            </legend>
            <div className="flex items-center flex-wrap gap-4">
              {values.map((value) => {
                const checked = selectedOptions[name] === value;
                const id = `option-${name}-${value}`;
                return (
                  <label key={id} htmlFor={id}>
                    <input
                      className="sr-only"
                      type="radio"
                      id={id}
                      name={`option[${name}]`}
                      value={value}
                      checked={checked}
                      onChange={() => setSelectedOption(name, value)}
                    />
                    {/*sr-only -> use for hide (element) visually(user not see that) but it present interly*/}
                    <div
                      className={`p-2 border cursor-pointer rounded text-sm md:text-base ${
                        checked ? 'bg-gray-900 text-white' : 'text-gray-900'
                      }`}
                    >
                      {value}
                    </div>
                  </label>
                );
              })}
            </div>
          </fieldset>
        )
      )}
    </>
  );
}
