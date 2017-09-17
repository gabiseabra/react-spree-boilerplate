export default (id = 1, { firstName, lastName } = {}) => ({
  id,
  firstname: firstName || "John",
  lastname: lastName || "Doe",
  city: "City",
  zipcode: 1111,
  phone: "000-000",
  country: {
    id: 1,
    numcode: 1,
    iso_name: "UNITED STATES",
    iso: "US",
    iso3: "USA",
    name: "United States"
  },
  state: {
    id: 1,
    country_id: 1,
    name: "New York",
    abbr: "NY"
  },
  address1: "Some Street 111",
  address2: ""
})
