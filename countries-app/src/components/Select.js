const Select = ({ setDropdown, dropdown }) => {
  
  return <select onChange={(e) => setDropdown(e.target.value)}>
      <option value="allCountries">Show all countries</option>
      <option value="smallerThanLt">Countries smaller than Lithuania</option>
      <option value="inOceania">Countries in Oceania region</option>
  </select>;
};

export default Select;
