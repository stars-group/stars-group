import * as React from 'react'
import { Link } from 'react-router-dom'
import * as numeral from 'numeraljs'

import { Kora, Store } from '../../kora'

import Container from '../../components/container'
import Text from '../../components/text'
import Button from '../../components/button'
import * as Form from '../../components/form'

export default class WaitlistPage extends React.Component<any, any> {
	constructor() {
		super()
	}
	componentDidMount() {
	}
	render() {
		return (
			<Container vertical justify-center align-center fill>
				<Container wrap align-center justify-center>
					<Container vertical grow style={{maxWidth: '50rem'}}>
						<Container mgn-b2 align-center>
							<Container mgn-r6>
								<a href='http://starsgroup.io'>
									<img height='90' src='https://storage.googleapis.com/stars-group/rise-ico-logo%20(1).png' />
								</a>
							</Container>
							<Container vertical>
								<Text uppercase size-6 weight-6 mgn-b2>All Set!</Text>
								<Text size-4 line-6>Please contact info@starsgroup.io for an update on the status of your application.</Text>
							</Container>
						</Container>
					</Container>
				</Container>
			</Container>
		)
	}
}