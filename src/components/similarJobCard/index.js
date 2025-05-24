// similarJobCard.js

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
    <li className="similar-job-card">
      <img src={companyLogoUrl} alt="similar job company logo" />
      <div className="similar-job-container">
        <h3 className="title">{title}</h3>
        <p className="rating">⭐ {rating}</p>
        <p className="job-description">{jobDescription}</p>
        <div>
          <p className="location">{location}</p>
          <p className="employment-type">{employmentType}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobCard
