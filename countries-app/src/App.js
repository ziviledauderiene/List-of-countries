import React, { useState, useEffect, useRef } from "react"

import Header from "./components/Header";
import Countries from "./components/Countries";
import Loading from "./components/Loading";
import Pagination from "./components/Pagination";
import Filters from "./components/Filters";


const App = () => {

  var [countries, setCountries] = useState ([]);
  const [isLoading, setIsLoading] = useState (true);
  const [currentPage, setCurrentPage] = useState (1); // currentPage ir countriesPerPage naudojami pagination
  const [countriesPerPage] = useState (20); // 20 valstybių kiekvienam page
  const [dropdown, setDropdown] = useState ("allCountries");
  const [sort, setSort] = useState ("az");
  const allCountries = useRef([]); // allCountries naudojamas filtruojant (kur dropdown), kad kiekvieną kartą filtruotų nuo pilno sąrašo
  const currentCountries = useRef([]); // currentCountries jau tos, kurios lieka po filtravimo. Jos naudojamos sortinimui.

useEffect( () => {
   (async () => {
      const response = await fetch("https://restcountries.com/v2/all?fields=name,region,area");
      var countries  = await response.json();
      setCountries (countries);
      setIsLoading (false);
      allCountries.current = countries; //allCountries priskiriama vieną kartą. Nesikeis reikšmė.
   }) ();
  } ,[]);
 

useEffect( () => {
     
  if (dropdown === "allCountries") {
    setSort("az"); // šito nepriskyrus netiksliai veikia sekantis useEffect. Jei setSort lieka "za", tai po filtro nebeveikia paspaudus ant SORT Z-A mygtuko, nes sort reiškmė nesikeistų.
    setCountries (allCountries.current);
  }
  if (dropdown === "inOceania") {
    const oceaniaCountries = allCountries.current.filter(country => country.region === "Oceania");
    setSort("az"); // tas pats prie visų filtrų
    setCountries(oceaniaCountries); 
  }
  else if (dropdown === "smallerThanLt") {
    const smallerCountries = allCountries.current.filter(country => country.area < 65300);
    setSort("az"); // tas pats prie visų filtrų
    setCountries(smallerCountries);
  }
}, [dropdown]);


useEffect(() => {
  currentCountries.current = countries; // sekantis useEffect (kur sort funkcijos) kažkodėl nenori naudoti countries kintamojo (kuris yra useState) savo viduje. Kintamis, priskirtas su useRef jam tinka.
}, [countries])


 useEffect (() => {
   if (sort === "az") {
      const sortedCountriesAz = [...currentCountries.current].sort(function(a,b) {
        var nameA = a.name.toLowerCase();
        var nameB = b.name.toLowerCase();
        if (nameA < nameB) {return -1;}
        if (nameA > nameB) {return 1;}
        return 0;
      });
      setCountries(sortedCountriesAz);
    }
    else if (sort === "za") {
      const sortedCountriesZa = [...currentCountries.current].sort(function(a,b) {
        var nameA = a.name.toLowerCase();
        var nameB = b.name.toLowerCase();
        if (nameA < nameB) {return 1;}
        if (nameA > nameB) {return -1;}
        return 0;
      });
      setCountries(sortedCountriesZa);
    };
         
  }, [sort]);
 

  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const countriesToDisplay = countries.slice(indexOfFirstCountry, indexOfLastCountry); // viename puslapyje rodomos valstybės

  const paginate = pageNumber => setCurrentPage(pageNumber);



  return (
    <div className="container">
      <Header />
      <Filters 
      setDropdown={setDropdown}
      setSort={setSort}
      />
      { 
      isLoading ? <Loading /> : 
      <Countries countries={countriesToDisplay} />
      }
      <Pagination 
      countriesPerPage={countriesPerPage} 
      totalCountries={countries.length}
      paginate={paginate}/>
    </div>
  );
}

export default App;
