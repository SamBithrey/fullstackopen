import Weather from "./Weather"
import CountryInfo from "./CountryInfo"

const Countrieslist = ({ countries, filterButton }) => {
    // console.log(countries)
    if (countries.length > 10) {
        return (
            <div>
                Too many matches. Specify another filter.
            </div>
        )
    }
    
    if (countries.length === 0) {
        return (
            <div>
                No matches. Specify another filter.
            </div>
        )
    }

    if (countries.length === 1) {
        return (
            countries.map(c => (
            <div key={c.name.official}>
                <CountryInfo c={c} />
                <Weather lat={c.capitalInfo.latlng[0]} lon={c.capitalInfo.latlng[1]} capital={c.capital}/>
            </div>
            ))
        )
    }

    return (
        countries.map(c => (
            <div key={c.name.official}>
                <span>{c.name.official}</span><button onClick={() => filterButton(c.name.official)}>Show</button><br/>
            </div>
        ))
    )
}

export default Countrieslist