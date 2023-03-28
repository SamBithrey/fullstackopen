const Languages = ({ languages }) => {
    return (
        <div>
            <h2>Languages</h2>
            <ul>
                {(Object.keys(languages).map((property, i) => 
                <li key={i}>{languages[property]}</li>)) }   
            </ul>
        </div>
        
    )
}

export default Languages