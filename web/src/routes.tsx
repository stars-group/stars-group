import * as React from 'react'
import { Store } from './kora'
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom'

import Root from './root'

import HomePage from './pages/home-page'
import AuthPage from './pages/auth-page'
import WalletPage from './pages/wallet-page'
import WaitlistPage from './pages/waitlist-page'

export default () => {
	return (
		<BrowserRouter>
			<Root>
				<Switch>
					<Redirect exact path='/' to='/auth/register' />
					<Route exact path='/auth/:type' component={AuthPage} />
					<Route exact path='/wallet' component={WalletPage} />
					<Route exact path='/waitlist' component={WaitlistPage} />
				</Switch>
			</Root>
		</BrowserRouter>
	)
}

const PrivateRoute = ({ component: Component, ...rest }) => (
	<Route {...rest} render={props => (
	  Store.get(['me', 'key']) ? (
		<Component {...props}/>
	  ) : (
		<Redirect to={{
		  pathname: '/auth/login',
		}}/>
	  )
	)}/>
  )
