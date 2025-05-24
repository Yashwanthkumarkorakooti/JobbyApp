import {Link} from 'react-router-dom'
import {FiStar} from 'react-icons/fi'
import {FaMapMarkerAlt, FaBriefcase} from 'react-icons/fa'
import './index.css'

const JobDetails = props => {
  const {eachJob} = props
  const {
    id,
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = eachJob

  return (
    <li className="jobs-item">
      <Link to={`/jobs/${id}`} className="item-link">
        <div className="job-header">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="logo"
          />
          <div className="job-title-rating">
            <h1 className="company-name">{title}</h1>
            <p className="company-rating">
              <FiStar className="icon star-icon" />
              <span>{rating}</span>
            </p>
          </div>
        </div>

        <div className="job-info">
          <div className="job-meta">
            <FaMapMarkerAlt className="icon" />
            <p className="job-meta-text">{location}</p>
          </div>
          <div className="job-meta">
            <FaBriefcase className="icon" />
            <p className="job-meta-text">{employmentType}</p>
          </div>
          <p className="job-salary">{packagePerAnnum}</p>
        </div>

        <hr className="divider" />

        <h1 className="job-description-heading">Description</h1>
        <p className="job-description">{jobDescription}</p>
      </Link>
    </li>
  )
}

export default JobDetails
