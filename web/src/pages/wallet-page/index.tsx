import * as React from 'react'
import { Link } from 'react-router-dom'
import * as numeral from 'numeraljs'

import { Kora, Store } from '../../kora'

import Container from '../../components/container'
import Text from '../../components/text'
import Button from '../../components/button'
import * as Form from '../../components/form'

interface IState {
	form: {
		address?: string
	}
}


export default class WalletPage extends React.Component<any, IState> {
	constructor() {
		super()
		this.state = {
			form: {}
		}
	}
	private editor = new Form.Editor<IState['form']>(this, 'form')
	componentDidMount() {
	}
	render() {
		const { form } = this.state
		const balance = numeral(Store.get(['token:balance', form.address]) || 0).format('0a')
		return (
			<Container vertical justify-center align-center mgn-t8 pad-t8>
				<Container wrap pad-v8 mgn-v8 align-center justify-center>
					<Container vertical grow pad-4 style={{maxWidth: '50rem'}}>
						<Container mgn-b2 align-center>
							<Container mgn-r6>
								<a href='http://starsgroup.io'>
									<img height='90' src='https://storage.googleapis.com/stars-group/rise-ico-logo%20(1).png' />
								</a>
							</Container>
							<Container vertical>
								<Text uppercase size-6 weight-6 mgn-b2>All Set!</Text>
								<Text size-4 line-6>Send Ether to the address listen below to purchase your STARS tokens (3360 STARS / ether). Once you've done that you can check your presale balance below.</Text>
							</Container>
						</Container>
						<Container border-h border-b mgn-v5 vertical >
							<Form.Row>
								<Form.Block>
									<Form.Label>Token Sale Address</Form.Label>
									<Text mgn-t>0x69dd512af946fe4aac434559d9349ec9f988d898</Text>
								</Form.Block>
							</Form.Row>
							<Form.Row>
								<Form.Block border-r style={{flex: '0 0 66.666666%'}}>
									<Form.Label>Check STARS Balance</Form.Label>
									<Form.Input
										value={form.address || ''}
										placeholder='Enter Ethereum address'
										onChange={this.editor.handle('address', this.address_changed)} />
								</Form.Block>
								<Form.Block>
									<Form.Label>Balance</Form.Label>
									<Form.Input
										disabled
										style={{color: '#1788DD'}}
										value={`${balance} STARS`}
										placeholder='0 STARS'
										onChange={this.editor.handle('email')} />
								</Form.Block>
							</Form.Row>
						</Container>
						<Container>
							<Link to='/auth/register'>
								<Text weight-5 fg-gray cursor>Not Registered?</Text>
							</Link>
						</Container>
					</Container>
				</Container>
			</Container>
		)
	}
	private address_changed = (address: string) => {
		if (address.length !== 42)
			return
		Kora.query_path(['token:balance', address])
	}
}