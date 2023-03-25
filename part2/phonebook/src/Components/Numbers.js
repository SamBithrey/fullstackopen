const Numbers = ({people}) => {
    return (
        people.map((p) => (
        <div key={p.id}>
            <span>Name: {p.name}</span><br/>
            <span>Number: {p.number}</span><br/>
            <br/>
        </div> 
        ))
    )
}

export default Numbers