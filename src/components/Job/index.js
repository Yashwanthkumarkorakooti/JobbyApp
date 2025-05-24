// Job.js
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {Navigate} from 'react-router-dom'

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

class Job extends Component {
  state = {
    jobsList: [],
    isLoading: false,
    searchInput: '',
    activeEmploymentTypeId: '',
    activeSalaryRangeId: '',
    isApiFailure: false,
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({isLoading: true, isApiFailure: false})
    const jwtToken = Cookies.get('jwt_token')
    const {searchInput, activeEmploymentTypeId, activeSalaryRangeId} =
      this.state
    const apiurl = `https://apis.ccbp.in/jobs?employment_type=${activeEmploymentTypeId}&minimum_package=${activeSalaryRangeId}&search=${searchInput}`

    const options = {
      headers: {Authorization: `Bearer ${jwtToken}`},
      method: 'GET',
    }

    const response = await fetch(apiurl, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData =
        data.jobs?.map(job => ({
          companyLogoUrl: job.company_logo_url,
          employmentType: job.employment_type,
          id: job.id,
          jobDescription: job.job_description,
          location: job.location,
          packagePerAnnum: job.package_per_annum,
          rating: job.rating,
          title: job.title,
        })) || []
      this.setState({jobsList: updatedData, isLoading: false})
    } else {
      this.setState({isLoading: false, isApiFailure: true})
    }
  }

  updateSearchInput = value => this.setState({searchInput: value})

  enterSearchInput = () => this.getJobDetails()

  changeEmploymentType = employmentTypeId =>
    this.setState(
      {activeEmploymentTypeId: employmentTypeId},
      this.getJobDetails,
    )

  changeSalaryRange = salaryRangeId =>
    this.setState({activeSalaryRangeId: salaryRangeId}, this.getJobDetails)

  clearFilters = () => {
    this.setState(
      {
        searchInput: '',
        activeEmploymentTypeId: '',
        activeSalaryRangeId: '',
      },
      this.getJobDetails,
    )
  }

  renderNoJobsView = () => (
    <div className="no-products-view">
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
    <div className="products-error-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="jobs-failure-img"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>
        We are having some trouble processing your request. Please try again.
      </p>
      <button type="button" onClick={this.getJobDetails}>
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
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  render() {
    const {
      isLoading,
      searchInput,
      activeEmploymentTypeId,
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
          activeEmploymentTypeId={activeEmploymentTypeId}
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

export default Job
