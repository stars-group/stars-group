import './styles.css'
import * as React from 'react'

import Container from '../../components/container'
import Text from '../../components/text'
import Tag from '../../components/tag'
import { Modal } from '../../components/modal'
import * as Form from '../../components/form'

import { Kora, Store } from '../../kora'

export default class HomePage extends React.Component<any, any> {
	constructor() {
		super()
		this.state = {}
	}
	componentDidMount() {
	}
	render() {
		return (
			<Container vertical align-center pad-8>
			</Container>
		)
	}
}