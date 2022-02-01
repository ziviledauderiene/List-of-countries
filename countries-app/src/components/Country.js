const Country = ({ country }) => {
  return (
  <div className="country">
      <p>{country.name}</p>
      <p>Region: {country.region}</p>
      <p>Area: {country.area} km<sup>2</sup></p>
  </div>
  )
};

export default Country;
