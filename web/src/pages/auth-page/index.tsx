import * as React from 'react'
import { Link } from 'react-router-dom'
import { Dynamic } from '@ironbay/kora'

import { Kora, Store } from '../../kora'

import Container from '../../components/container'
import Text from '../../components/text'
import Button from '../../components/button'
import * as Form from '../../components/form'

interface IState {
	auth: {
		name?: string
		email?: string,
		address?: any
		ethereum?: string
		dob?: number
		terms?: string
	}
}


export default class AuthPage extends React.Component<any, IState> {
	constructor() {
		super()
		this.state = {
			auth: {
				dob: new Date().getTime(),
			}
		}
	}
	private editor = new Form.Editor<IState['auth']>(this, 'auth')
	componentDidMount() {
	}
	render() {
		const { auth } = this.state
		const { type } = this.props.match.params
		return (
			<Container vertical justify-center align-center mgn-t8 pad-t8>
				<Container wrap pad-v8 mgn-v8 align-center justify-center>
					<Container vertical grow style={{maxWidth: '50rem'}}>
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
										<Form.Block relative>
											<Form.Label>Date of Birth</Form.Label>
											<Form.Date 
												value={auth.dob}
												onChange={this.editor.handle('dob')}
											/>
										</Form.Block>
									</Form.Row>
									<Form.Row>
										<Form.Block>
											<Form.Label>Address</Form.Label>
											<Form.Address
												value={Dynamic.get(auth, ['address', 'name']) || ''}
												placeholder='Home address'
												onChange={this.editor.handle('address')} />
										</Form.Block>
									</Form.Row>
									<Form.Row>
										<Form.Block>
											<Form.Label>Ethereum Address</Form.Label>
											<Form.Input
												value={auth.ethereum || ''}
												placeholder='Enter Ethereum Address'
												onChange={this.editor.handle('ethereum')} />
										</Form.Block>
									</Form.Row>
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
											<Form.Label>Terms and Conditions</Form.Label>
											<Container mgn-b2>
												<Form.TextArea
													disabled
													rows={6}
													value='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ac enim elementum purus molestie cursus sit amet id augue. Fusce quis mauris enim. Ut bibendum ac nulla in ornare. Proin sit amet tellus eget risus rutrum pellentesque non non augue. Duis sit amet risus eu odio vehicula molestie. Etiam vitae ultricies leo, id lacinia justo. Cras ligula mi, sollicitudin nec nulla eget, convallis feugiat leo. Nullam eget congue eros. In hac habitasse platea dictumst. Cras in convallis magna. Duis laoreet vel orci vitae blandit. Nulla tempus venenatis justo et laoreet. Nam mollis ante gravida tellus imperdiet, ut feugiat enim tempus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Integer ultricies, nunc venenatis finibus placerat, libero massa efficitur est, nec lobortis nibh massa at diam. '
												/>
											</Container>
											<Form.Select
												value={auth.terms || 'no'}
												onChange={this.editor.handle('terms')} >
												<option value='no'>No I do not accept</option>
												<option value='yes'>I accept terms and and conditions</option>
											</ Form.Select>
										</Form.Block>
									</Form.Row>
								</span>
							}
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
			if (this.state.auth.terms !== 'yes')
				throw 'Please accept terms and conditions'
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