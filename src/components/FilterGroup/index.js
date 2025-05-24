import './index.css'

const FilterGroup = props => {
  const {
    employmentTypesList,
    salaryRangesList,
    searchInput,
    updateSearchInput,
    enterSearchInput,
    activeEmploymentTypeId,
    changeEmploymentType,
    activeSalaryRangeId,
    changeSalaryRange,
    clearFilters,
  } = props

  const onChangeSearchInput = event => updateSearchInput(event.target.value)

  const onEnterSearchInput = event => {
    if (event.key === 'Enter') {
      enterSearchInput()
    }
  }

  const onClickSearchButton = () => {
    enterSearchInput()
  }

  const onEmploymentTypeChange = event => {
    const selectedType = event.target.value
    const prevSelected = activeEmploymentTypeId.split(',')
    let newSelected

    if (prevSelected.includes(selectedType)) {
      newSelected = prevSelected.filter(type => type !== selectedType)
    } else {
      newSelected = [...prevSelected, selectedType]
    }

    changeEmploymentType(newSelected.filter(Boolean).join(','))
  }

  return (
    <div className="filter-group-container">
      <div className="search-container">
        <input
          type="search"
          className="search-input"
          value={searchInput}
          onChange={onChangeSearchInput}
          onKeyDown={onEnterSearchInput}
          placeholder="Search"
        />
        <button
          type="button"
          className="search-button"
          onClick={onClickSearchButton}
          data-testid="searchButton"
        >
          Search
        </button>
      </div>

      <h3 className="filter-heading">Employment Type</h3>
      <ul className="filter-list">
        {employmentTypesList.map(type => (
          <li key={type.employmentTypeId}>
            <input
              type="checkbox"
              id={type.employmentTypeId}
              name="employmentType"
              value={type.employmentTypeId}
              checked={activeEmploymentTypeId.includes(type.employmentTypeId)}
              onChange={onEmploymentTypeChange}
            />
            <label htmlFor={type.employmentTypeId}>{type.label}</label>
          </li>
        ))}
      </ul>

      <h3 className="filter-heading">Salary Range</h3>
      <ul className="filter-list">
        {salaryRangesList.map(range => (
          <li key={range.salaryRangeId}>
            <input
              type="radio"
              id={range.salaryRangeId}
              name="salaryRange"
              value={range.salaryRangeId}
              checked={activeSalaryRangeId === range.salaryRangeId}
              onChange={() => changeSalaryRange(range.salaryRangeId)}
            />
            <label htmlFor={range.salaryRangeId}>{range.label}</label>
          </li>
        ))}
      </ul>

      <button
        type="button"
        className="clear-filters-button"
        onClick={clearFilters}
      >
        Clear Filters
      </button>
    </div>
  )
}

export default FilterGroup
