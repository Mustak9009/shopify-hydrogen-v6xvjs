export async function api(request, {queryShop, session}) {//create an api -> point
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
