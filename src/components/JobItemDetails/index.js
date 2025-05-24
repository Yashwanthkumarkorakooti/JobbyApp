import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Cookies from 'js-cookie'
import { ThreeDots } from 'react-loader-spinner';
import { FiStar } from 'react-icons/fi'
import { FaMapMarkerAlt, FaBriefcase } from 'react-icons/fa'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const JobItemDetails = () => {
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  const [jobDetails, setJobDetails] = useState({})
  const [similarJobs, setSimilarJobs] = useState([])
  const { id } = useParams()

  useEffect(() => {
    getJobDetails()
  }, [id])

  const getJobDetails = async () => {
    setApiStatus(apiStatusConstants.inProgress)
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedJobDetails = {
        id: data.job_details.id,
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        jobDescription: data.job_details.job_description,
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        title: data.job_details.title,
        skills: data.job_details.skills,
        lifeAtCompany: data.job_details.life_at_company,
      }

      const updatedSimilarJobs = data.similar_jobs.map(each => ({
        id: each.id,
        title: each.title,
        companyLogoUrl: each.company_logo_url,
        location: each.location,
        employmentType: each.employment_type,
        rating: each.rating,
        jobDescription: each.job_description,
      }))

      setJobDetails(updatedJobDetails)
      setSimilarJobs(updatedSimilarJobs)
      setApiStatus(apiStatusConstants.success)
    } else {
      setApiStatus(apiStatusConstants.failure)
    }
  }

  const renderSkills = () =>
    jobDetails.skills?.map(skill => (
      <li key={skill.name} className="skill-item">
        <img
          src={skill.image_url}
          alt={`${skill.name} icon`}
          className="skill-icon"
        />
        <p>{skill.name}</p>
      </li>
    ))

  const renderSimilarJobs = () =>
    similarJobs.map(job => (
      <li key={job.id} className="similar-job-item">
        <div className="job-header">
          <img src={job.companyLogoUrl} alt="company logo" className="logo" />
          <div>
            <h3>{job.title}</h3>
            <p>
              <FiStar className="icon" />
              <span>{job.rating}</span>
            </p>
          </div>
        </div>
        <div className="job-info">
          <p>{job.jobDescription}</p>
          <p>
            <FaMapMarkerAlt className="icon" /> {job.location}
          </p>
          <p>
            <FaBriefcase className="icon" /> {job.employmentType}
          </p>
        </div>
      </li>
    ))

  const renderJobDetails = () => {
    const {
      companyLogoUrl,
      title,
      rating,
      location,
      employmentType,
      packagePerAnnum,
      jobDescription,
      companyWebsiteUrl,
      lifeAtCompany,
    } = jobDetails

    return (
      <div className="job-details-container">
        <div className="job-card">
          <div className="job-header">
            <img src={companyLogoUrl} alt="company logo" className="logo" />
            <div>
              <h1>{title}</h1>
              <p>
                <FiStar className="icon" />
                <span>{rating}</span>
              </p>
            </div>
          </div>
          <div className="job-info">
            <p>
              <FaMapMarkerAlt className="icon" /> {location}
            </p>
            <p>
              <FaBriefcase className="icon" /> {employmentType}
            </p>
            <p>{packagePerAnnum}</p>
          </div>
          <hr />
          <div className="job-description-section">
            <div className="description-heading">
              <h2>Description</h2>
              <a
                href={companyWebsiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="company-website-link"
              >
                Visit
              </a>
            </div>
            <p>{jobDescription}</p>
          </div>

          <div className="skills-section">
            <h2>Skills</h2>
            <ul className="skills-list">{renderSkills()}</ul>
          </div>

          <div className="life-at-company-section">
            <h2>Life at Company</h2>
            <div className="life-content">
              <p>{lifeAtCompany?.description}</p>
              <img
                src={lifeAtCompany?.image_url}
                alt="life at company"
                className="life-image"
              />
            </div>
          </div>
        </div>

        <div className="similar-jobs-section">
          <h2>Similar Jobs</h2>
          <ul className="similar-jobs-list">{renderSimilarJobs()}</ul>
        </div>
      </div>
    )
  }

  const renderFailureView = () => (
    <div className="failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button type="button" onClick={getJobDetails}>
        Retry
      </button>
    </div>
  )

  const renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <ThreeDots
        height="50"
        width="50"
        color="#0b69ff"
        ariaLabel="three-dots-loading"
        visible={true}
/>
    </div>
  )

  const renderJobDetailsRoute = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderJobDetails()
      case apiStatusConstants.failure:
        return renderFailureView()
      case apiStatusConstants.inProgress:
        return renderLoader()
      default:
        return null
    }
  }

  return <div className="job-details-route">{renderJobDetailsRoute()}</div>
}

export default JobItemDetails
