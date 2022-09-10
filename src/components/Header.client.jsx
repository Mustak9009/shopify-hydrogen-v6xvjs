import React,{useState} from 'react';
import CountrySelector from './CountrySelector.client';
import Navigation from './Navigation.client';
import {flattenConnection, Link} from '@shopify/hydrogen';
import AccountIcon from './AccountIcon';
import CartToggle from './CartToggle.client';
import MobileNavigation from './MobileNavigation.client';
const Header = ({collections, shopName}) => {
  const [isMobileNavOpen,setIsMobileNavOpen] = useState(false);
  return (
    <>
      <header className="h-20 lg:h-32 text-gray-700" role="banner">
        <div className={`fixed z-20 h-20 lg:h-32 w-full border-b border-gray-200 px-6 md:px-8 md:py-6 lg:pt-8 lg:pb-0 mx-auto bg-white ${isMobileNavOpen ? '' : 'bg-opacity-95'}`}>
          <div className="h-full flex lg:flex-col place-content-between">
            <div className="w-full flex justify-between items-center text-center">
              <div className="w-20 lg:w-40">
                <CountrySelector />
                <MobileNavigation collections={collections} isOpen={isMobileNavOpen} setIsOpen={setIsMobileNavOpen}/>
              </div>
              <Link
                className="font-black uppercase text-3xl tracking-widest lg:mr-16"
                to="/"
              >
                {shopName}
              </Link>
              <div className="cursor-pointer flex justify-end ">
                <Link to="/account">
                  <AccountIcon />
                </Link>
                <CartToggle handleClick={()=>{ if(isMobileNavOpen) setIsMobileNavOpen(false)}}/>
              </div>
            </div>
            <Navigation collections={collections} />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
