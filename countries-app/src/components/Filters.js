import Select from "./Select";

const Filters = ({ setDropdown, setSort }) => {

  return (
  <div className="filters">

      <div className="sorting-buttons" 
            onClick={(e) => {
            setSort(e.target.value);
            console.log(e.target.value);
            }}>
        <button value="az">Sort A - Z</button>
        <button value="za">Sort Z - A</button>
      </div>

      <div>
        <Select setDropdown={setDropdown}/>
      </div>
  </div>
  )
};

export default Filters;
