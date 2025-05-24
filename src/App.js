import {Redirect, Route, Switch} from 'react-router-dom'

import Login from './components/Login'
import Home from './components/Home'
import Job from './components/Job'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import JobItemDetails from './components/JobItemDetails'

import './App.css'

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/jobs" component={Job} />
    <ProtectedRoute exact path="/jobs/:id" component={JobItemDetails} />
    <Route path="*" component={NotFound} />
  </Switch>
)
export default App
