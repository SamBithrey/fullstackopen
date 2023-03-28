const Filter = ({ filter, handleFilterChange, clearFilter }) => {
    return (
        <div className="filter">
            <span>Find Countries: </span><input value={filter} onChange={handleFilterChange}/>
            <button onClick={clearFilter} className='clear'>Clear</button>
        </div>
    )
}

export default Filter