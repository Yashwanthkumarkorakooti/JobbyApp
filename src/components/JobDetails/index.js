// JobDetails
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
    <Link to={`/jobs/${id}`} className="item-link">
      <li className="jobs-item">
        <div className="job-header">
          <img src={companyLogoUrl} alt="company logo" className="logo" />
          <div>
            <h1 className="company-name">{title}</h1>
            <p className="company-rating">
              <FiStar className="icon" /> {rating}
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
        <h2>Description</h2>
        <p>{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobDetails
