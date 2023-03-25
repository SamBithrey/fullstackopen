const NewPerson = ( {submit, name, number, nameChange, numberChange} ) => {
    return (
      <form onSubmit={submit}> 
        <div>
          name: <input value={name} onChange={nameChange}/>
        </div>
        <div>
          number: <input value={number} onChange={numberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default NewPerson