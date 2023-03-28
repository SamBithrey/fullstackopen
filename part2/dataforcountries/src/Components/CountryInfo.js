import Languages from "./Languages"

const CountryInfo = ({c}) => {
    return (
        <div className="countries">
            <h1>{c.name.official}</h1>
            <h2>{c.name.common}</h2>
            <p>Capital: {c.capital}</p>
            <p>Area: {c.area}km²</p>
            <Languages languages={c.languages} />
            <img src={c.flags.png} alt={c.flags.alt}/>
        </div>
    )        
}

export default CountryInfo