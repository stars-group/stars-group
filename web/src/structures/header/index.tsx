import './styles.css'
import * as React from 'react'
import { NavLink } from 'react-router-dom'

import Container from '../../components/container'
import Text from '../../components/text'
import Icon from '../../components/icon'

import { Store } from '../../kora'

interface IProps {

}

interface IState {

}

export default class Header extends React.Component<IProps, IState> {
	constructor() {
		super()
	}
	render() {
		const me = Store.get<string>(['me', 'key'])
		const info = Store.get<User>(['user:info', me]) || {}

		return (
			<Container pad-h8 align-center style={{flex: '0 0 4.5rem'}} bg-white>
				<Text uppercase weight-6>STARS Platform</Text>
				<Container grow />
				{ me &&
					<Container align-center>
						<Text size-3-5 uppercase weight-5 mgn-r4>{info.name}</Text>
						<Text size-3-5 uppercase weight-5 fg-highlight mgn-r4>23.2K STARS</Text>
						<Icon src='log-out' />
					</Container>
				}
				{ !me &&
					<Container align-center>
						<NavLink to='/auth/register'>
							<Text size-3-5 uppercase weight-5 mgn-r4>Register</Text>
						</NavLink>
						<NavLink to='/auth/login'>
							<Text size-3-5 uppercase weight-5 fg-highlight mgn-r4>Login</Text>
						</NavLink>
					</Container>
				}
			</Container>
		)
	}

}
