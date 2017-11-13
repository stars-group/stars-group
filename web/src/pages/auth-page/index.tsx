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
			<Container fill vertical justify-center align-center>
				<Container wrap pad-8 align-center justify-center>
					<Container vertical grow pad-4 style={{maxWidth: '50rem'}}>
						<Text uppercase size-6 weight-6 mgn-b2>STARS Platform</Text>
						<Text size-4 line-6>Register for the ICO today blah blah blah</Text>
						<Container border-h border-b mgn-v5 vertical >
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
									<Link to='/wallet'>
										<Text weight-5 fg-gray cursor >Already Registered?</Text>
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
			this.props.history.push('/wallet')
		} catch (ex) {
			console.log(ex)
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