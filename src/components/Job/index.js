import {Component} from 'react'
import { ThreeDots } from 'react-loader-spinner'
import Cookies from 'js-cookie'

import JobDetails from '../JobDetails'
import Header from '../Header'
import FilterGroup from '../FilterGroup'
import './index.css'

const employmentTypesList = [
  {label: 'Full Time', employmentTypeId: 'FULLTIME'},
  {label: 'Part Time', employmentTypeId: 'PARTTIME'},
  {label: 'Freelance', employmentTypeId: 'FREELANCE'},
  {label: 'Internship', employmentTypeId: 'INTERNSHIP'},
]

const salaryRangesList = [
  {salaryRangeId: '1000000', label: '10 LPA and above'},
  {salaryRangeId: '2000000', label: '20 LPA and above'},
  {salaryRangeId: '3000000', label: '30 LPA and above'},
  {salaryRangeId: '4000000', label: '40 LPA and above'},
]

class Jobs extends Component {
  state = {
    jobsList: [],
    isLoading: false,
    searchInput: '',
    activeEmploymentTypeIds: [],
    activeSalaryRangeId: '',
    isApiFailure: false,
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({isLoading: true, isApiFailure: false})
    const jwtToken = Cookies.get('jwt_token')
    const {searchInput, activeEmploymentTypeIds, activeSalaryRangeId} =
      this.state

    const employmentTypesQuery = activeEmploymentTypeIds.length
      ? `employment_type=${activeEmploymentTypeIds.join(',')}`
      : ''
    const salaryRangeQuery = activeSalaryRangeId
      ? `minimum_package=${activeSalaryRangeId}`
      : ''
    const searchQuery = searchInput ? `search=${searchInput}` : ''

    const queryParams = [employmentTypesQuery, salaryRangeQuery, searchQuery]
      .filter(Boolean)
      .join('&')

    const apiUrl = `https://apis.ccbp.in/jobs${
      queryParams ? '?' + queryParams : ''
    }`

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    try {
      const response = await fetch(apiUrl, options)
      if (response.ok) {
        const data = await response.json()
        const updatedData = data.jobs?.map(job => ({
          companyLogoUrl: job.company_logo_url,
          employmentType: job.employment_type,
          id: job.id,
          jobDescription: job.job_description,
          location: job.location,
          packagePerAnnum: job.package_per_annum,
          rating: job.rating,
          title: job.title,
        }))
        this.setState({jobsList: updatedData, isLoading: false})
      } else {
        this.setState({isLoading: false, isApiFailure: true})
      }
    } catch (error) {
      this.setState({isLoading: false, isApiFailure: true})
    }
  }

  updateSearchInput = value => this.setState({searchInput: value})

  enterSearchInput = () => this.getJobDetails()

  changeEmploymentType = employmentTypeId => {
    this.setState(prevState => {
      const {activeEmploymentTypeIds} = prevState
      const updatedIds = activeEmploymentTypeIds.includes(employmentTypeId)
        ? activeEmploymentTypeIds.filter(id => id !== employmentTypeId)
        : [...activeEmploymentTypeIds, employmentTypeId]
      return {activeEmploymentTypeIds: updatedIds}
    }, this.getJobDetails)
  }

  changeSalaryRange = salaryRangeId =>
    this.setState({activeSalaryRangeId: salaryRangeId}, this.getJobDetails)

  clearFilters = () => {
    this.setState(
      {
        searchInput: '',
        activeEmploymentTypeIds: [],
        activeSalaryRangeId: '',
      },
      this.getJobDetails,
    )
  }

  renderNoJobsView = () => (
    <div className="no-jobs-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="no-jobs-img"
      />
      <h1>No Jobs Found</h1>
      <p>We could not find any Jobs. Try different filters.</p>
    </div>
  )

  renderFailureView = () => (
    <div className="jobs-error-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="jobs-failure-img"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>
        We are having some trouble processing your request. Please try again.
      </p>
      <button
        type="button"
        onClick={this.getJobDetails}
        data-testid="retry-button"
      >
        Retry
      </button>
    </div>
  )

  renderJobs = () => {
    const {jobsList} = this.state
    if (jobsList.length === 0) {
      return this.renderNoJobsView()
    }

    return (
      <ul className="jobs-list">
        {jobsList.map(eachJob => (
          <JobDetails eachJob={eachJob} key={eachJob.id} />
        ))}
      </ul>
    )
  }

  renderLoader = () => (
    <div className="products-loader-container" data-testid="loader">
      <ThreeDots
        height="50"
        width="50"
        color="#0b69ff"
        ariaLabel="three-dots-loading"
        visible={true}
      />
    </div>
  )

  render() {
    const {
      isLoading,
      searchInput,
      activeEmploymentTypeIds,
      activeSalaryRangeId,
      isApiFailure,
    } = this.state

    return (
      <div className="all-jobs-section">
        <Header />
        <FilterGroup
          employmentTypesList={employmentTypesList}
          salaryRangesList={salaryRangesList}
          searchInput={searchInput}
          updateSearchInput={this.updateSearchInput}
          enterSearchInput={this.enterSearchInput}
          activeEmploymentTypeIds={activeEmploymentTypeIds}
          changeEmploymentType={this.changeEmploymentType}
          activeSalaryRangeId={activeSalaryRangeId}
          changeSalaryRange={this.changeSalaryRange}
          clearFilters={this.clearFilters}
        />
        {isLoading
          ? this.renderLoader()
          : isApiFailure
          ? this.renderFailureView()
          : this.renderJobs()}
      </div>
    )
  }
}

export default Jobs
