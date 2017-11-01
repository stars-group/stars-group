import * as React from 'react'
import { Store } from './kora'
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom'

import Root from './root'

import HomePage from './pages/home-page'
import AuthPage from './pages/auth-page'

export default () => {
	return (
		<BrowserRouter>
			<Root>
				<Switch>
					<Route exact path='/auth/:type' component={AuthPage} />
					<Route exact path='/' component={HomePage} />
				</Switch>
			</Root>
		</BrowserRouter>
	)
}

const PrivateRoute = ({ component: Component, ...rest }) => (
	<Route {...rest} render={props => (
	  Store.get(['user', 'key']) ? (
		<Component {...props}/>
	  ) : (
		<Redirect to={{
		  pathname: '/login',
		}}/>
	  )
	)}/>
  )
