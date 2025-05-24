// FilterGroup.js
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
    if (event.key === 'Enter') enterSearchInput()
  }

  const onClickSearchButton = () => enterSearchInput()

  // For multiple checkbox selection
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
          value={searchInput}
          onChange={onChangeSearchInput}
          onKeyDown={onEnterSearchInput}
          placeholder="Search"
        />
        <button type="button" onClick={onClickSearchButton}>
          Search
        </button>
      </div>

      <h3>Employment Type</h3>
      <ul>
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

      <h3>Salary Range</h3>
      <ul>
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

      <button type="button" onClick={clearFilters}>
        Clear Filters
      </button>
    </div>
  )
}

export default FilterGroup
