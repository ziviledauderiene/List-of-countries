import Country from "./Country";


const Countries = ({ countries }) => {

    return (
  <div> 
    {countries.map((country) => (
    <Country key={country.name} country={country} />
    ))}
  </div>
  )
};

export default Countries;
