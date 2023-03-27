const Numbers = ({people, deleteContact}) => {
    return (
        people.map((p) => (
        <div key={p.id}>
            <span>Name: {p.name}</span><br/>
            <span>Number: {p.number}</span><br/>
            <button onClick={() => deleteContact(p.id)}>Delete?</button><br/>
        </div> 
        ))
    )
}

export default Numbers