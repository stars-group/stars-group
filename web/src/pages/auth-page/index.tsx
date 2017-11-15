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
		contribution?: string
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
						<Container mgn-b2 align-center>
							<Container mgn-r6>
								<a href='http://starsgroup.io'>
									<img height='90' src='https://storage.googleapis.com/stars-group/rise-ico-logo%20(1).png' />
								</a>
							</Container>
							<Container vertical>
								<Text uppercase size-6 weight-6 mgn-b2>STARS Platform</Text>
								<Text size-4 line-6>Revolutionizing the financial infrastructure of professional football - check out our <Text fg-highlight><a href='https://storage.googleapis.com/stars-group/Stars%20Group%20ICO%20Overview.pdf'>summary</a></Text>.  Register below to take part in the Token Sale</Text>
							</Container>
						</Container>
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
											<Form.Label>Email</Form.Label>
											<Form.Input
												value={auth.email || ''}
												placeholder='Enter email'
												onChange={this.editor.handle('email')} />
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
											<Form.Label>Intended Contribution Amount</Form.Label>
											<Form.Input
												value={auth.contribution || ''}
												placeholder='$ USD'
												onChange={this.editor.handle('contribution')} />
										</Form.Block>
									</Form.Row>
									<Form.Row>
										<Form.Block>
											<Container>
												<Form.Label>
													Terms and Conditions -&nbsp;
													<Form.Label fg-highlight><a target='_blank' href='https://storage.googleapis.com/stars-group/Terms%20of%20Token%20Sale%20(1).pdf'>View</a></Form.Label>
												</Form.Label>
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