import React from 'react';
import {Link} from '@shopify/hydrogen';
const Navigation = ({collections}) => {
  return (
    <>
      <nav className="hidden lg:block text-center">
        <ul className="md:flex items-center justify-center ">
          {collections.map((collection) => {
            return (
              <li key={collection.id}>
                <Link className="block p-4 hover:opacity-80 capitalize" to={`/collections/${collection.handle}`}>
                  {collection.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
};

export default Navigation;
