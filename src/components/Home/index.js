//Home.js
import Cookies from 'js-cookie'
import {Redirect, useHistory} from 'react-router-dom'
import Header from '../Header'

import './index.css'

const Home = () => {
  const jwtToken = Cookies.get('jwt_token')
  const history = useHistory()

  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }

  const onClickFindJobs = () => {
    history.push('/Jobs')
  }

  return (
    <>
      <Header />
      <div className="home-container">
        <div className="home-content">
          <h1 className="home-heading"> Find The Job That Fits Your Life </h1>
          <p className="home-description">
            Millions of People Searching for Jobs, salary information, company
            reviews. Find the job that fits your abilities and potential
          </p>
          <button
            type="button"
            className="find-jobs-button"
            onClick={onClickFindJobs}
          >
            Find Jobs
          </button>
        </div>
      </div>
    </>
  )
}

export default Home
