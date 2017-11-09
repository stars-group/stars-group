import * as React from 'react'
import { Link } from 'react-router-dom'

import { Kora, Store } from '../../kora'

import Container from '../../components/container'
import Text from '../../components/text'
import Button from '../../components/button'
import * as Form from '../../components/form'

interface IState {
	auth: {
		email?: string,
		password?: string
		name?: string
		address?: string
	}
}


export default class AuthPage extends React.Component<any, IState> {
	constructor() {
		super()
		this.state = {
			auth: {}
		}
	}
	private editor = new Form.Editor<IState['auth']>(this, 'auth')
	componentDidMount() {
	}
	render() {
		const { auth } = this.state
		const { type } = this.props.match.params
		return (
			<Container fill >
				<Container grow bg-black>
					<Container grow style={{
						backgroundImage: `url(http://starsgroup.io/wp-content/uploads/2017/09/intro-image-1900x1069.jpg)`,
						opacity: 0.5,
						backgroundSize: 'cover',
						backgroundPosition: 'center',
						position: 'relative',
					}} />
				</Container>
				<Container style={{
					flex: '0 0 35rem',
				}} pad-8 align-center>
					<Container vertical grow pad-4>
						<Text uppercase size-6 weight-5 mgn-b8 >STARS Platform</Text>
						<Container border-h border-b mgn-t8 vertical mgn-b5>
							{
								type === 'register' &&
								<span>
									<Form.Row>
										<Form.Block>
											<Form.Label>Name</Form.Label>
											<Form.Input
												value={auth.name || ''}
												placeholder='Enter Name'
												onChange={this.editor.handle('name')} />
										</Form.Block>
									</Form.Row>
									<Form.Row>
										<Form.Block>
											<Form.Label>Ethereum Address</Form.Label>
											<Form.Input
												value={auth.address || ''}
												placeholder='Enter Ethereum Address'
												onChange={this.editor.handle('address')} />
										</Form.Block>
									</Form.Row>
								</span>
							}
							<Form.Row>
								<Form.Block>
									<Form.Label>Email</Form.Label>
									<Form.Input
										value={auth.email || ''}
										placeholder='Enter email'
										onChange={this.editor.handle('email')} />
								</Form.Block>
							</Form.Row>
							<Form.Row>
								<Form.Block>
									<Form.Label>Password</Form.Label>
									<Form.Input
										onKeyPress={e => e.which === 13 && this.handle_login()}
										value={auth.password || ''}
										type='password'
										placeholder='Enter password'
										onChange={this.editor.handle('password')} />
								</Form.Block>
							</Form.Row>
						</Container>
						{
							type === 'login' &&
								<Container justify-end>
									<Link to='/auth/register'>
										<Text weight-5 fg-gray cursor>Register</Text>
									</Link>
									<Container grow />
									<Text mgn-l3 weight-5 fg-highlight cursor onClick={this.handle_login} >Login</Text>
								</Container>
						}
						{
							type === 'register' &&
								<Container justify-end>
									<Link to='/auth/login'>
										<Text weight-5 fg-gray cursor >Login</Text>
									</Link>
									<Container grow />
									<Text mgn-l3 weight-5 fg-highlight cursor onClick={this.handle_register} >Register</Text>
								</Container>
						}
					</Container>
				</Container>
			</Container>
		)
	}
	private handle_register = async () => {
		try {
			await Kora.send('auth.register', this.state.auth)
			this.handle_login()
		} catch (ex) {
			alert(ex)
		}
	}
	private handle_login = async () => {
		try {
			const token = await Kora.send("auth.login", this.state.auth)
			localStorage.setItem('token', token)
			const result = await Kora.send('auth.upgrade', {
				token: token,
			}) as string
			Store.put(['me', 'key'], result)
			this.props.history.push('/')
		} catch (ex) {
			alert(ex)
		}
	}
}