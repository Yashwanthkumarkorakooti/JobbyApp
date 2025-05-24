import Cookies from 'js-cookie'
import {Router, useNavigate } from 'react-router-dom'
import Header from '../Header'

import './index.css'

const Home = () => {
  const jwtToken = Cookies.get('jwt_token')
  const history = useNavigate()

  if (jwtToken === undefined) {
    return <Router to="/login" />
  }

  const onClickFindJobs = () => {
    history.push('/jobs') // lowercase path to match routes
  }

  return (
    <>
      <Header />
      <div className="home-container">
        <div className="home-content">
          <h1 className="home-heading">Find The Job That Fits Your Life</h1>
          <p className="home-description">
            Millions of people searching for jobs, salary information, company
            reviews. Find the job that fits your abilities and potential.
          </p>
          <button
            type="button"
            className="find-jobs-button"
            onClick={onClickFindJobs}
            data-testid="find-jobs"
          >
            Find Jobs
          </button>
        </div>
      </div>
    </>
  )
}

export default Home
