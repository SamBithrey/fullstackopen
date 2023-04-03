import axios from 'axios';
import { useEffect, useState } from 'react';
import Countrieslist from './Components/CountriesList';
import Filter from './Components/Filter';

const App = () => {

  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  const hook = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(res => {
        setCountries(res.data)})
  }

  useEffect(hook, []);

  const countriesFilter = countries.filter(countries => countries.name.official.toUpperCase().includes(filter.toUpperCase()))
  
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const filterButton = (country) =>{
    setFilter(country)
  }
  const clearFilter = () => {
    setFilter('')
  }

  return (
    <div className='app'>
      <Filter filter={filter} handleFilterChange={handleFilterChange} clearFilter={clearFilter}/>
      <Countrieslist countries={countriesFilter} filterButton={filterButton}/>
    </div>
  );
}

export default App;