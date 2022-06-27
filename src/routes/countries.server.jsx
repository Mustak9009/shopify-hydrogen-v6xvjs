export async function api(request, {queryShop, session}) {//create an api -> point
  if(request.method=="POST"){ //set country in a server..
    const {isoCode,name} = await request.json();
    await session.set('countryCode',isoCode);
    await session.set('countryName',name);
    return 'success';
  }
  //Destructuring Object
  const {data: {localization: {availableCountries}}} = await queryShop({query: QUERY}); //get county name & isoCode from shop
  return availableCountries.sort((a,b) => a.name.localeCompare(b.name)); //shorting country and return it
}
//GraphQl query for get -> all markets
const QUERY = `
  query Localization {
    localization {
      availableCountries {
        isoCode
        name
        currency {
          isoCode
        } 
      }
    }
  }
`;
