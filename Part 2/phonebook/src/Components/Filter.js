const Filter = ({ submit, filterName, filterChange }) => {
    return (
      <form onSubmit={submit}>
        <div>
          name: <input value={filterName} onChange={filterChange}/>
        </div>
        <div>
          <button type="submit">Search</button>
        </div>
      </form>
    )
}

export default Filter