import {FiStar} from 'react-icons/fi'
import {FaMapMarkerAlt, FaBriefcase} from 'react-icons/fa'
import './index.css'

const SimilarJobCard = ({job}) => {
  const {
    companyLogoUrl,
    title,
    rating,
    location,
    employmentType,
    jobDescription,
  } = job

  return (
    <li className="similar-job-card" data-testid="similarJobCard">
      <div className="logo-rating-container">
        <img
          src={companyLogoUrl}
          alt={`${title} company logo`}
          className="company-logo"
        />
        <div className="title-rating">
          <h3 className="title">{title}</h3>
          <p className="rating">
            <FiStar className="star-icon" /> {rating}
          </p>
        </div>
      </div>
      <p className="job-description">{jobDescription}</p>
      <div className="location-employment">
        <p className="location">
          <FaMapMarkerAlt className="icon" /> {location}
        </p>
        <p className="employment-type">
          <FaBriefcase className="icon" /> {employmentType}
        </p>
      </div>
    </li>
  )
}

export default SimilarJobCard
