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
			<Container fill vertical justify-center align-center>
				<Container wrap pad-8 align-center justify-center>
					<Container vertical grow pad-4 style={{maxWidth: '50rem'}}>
						<Text uppercase size-6 weight-6 mgn-b2>All Set!</Text>
						<Text size-4 line-6>Register for the ICO today blah blah blah</Text>
						<Container border-h border-b mgn-v5 vertical >
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