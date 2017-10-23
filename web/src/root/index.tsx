import './reset.css'
import './styles.css'
import * as React from 'react'
import { Kora, Store } from '../kora'

import Container from '../components/container'

export default class Root extends React.Component<any, any> {
	constructor() {
		super()
	}
	componentDidMount() {
		Store.onChanged.add(() => {
			this.forceUpdate()
		})
		Kora.query_path([])
	}
	render() {
		return (
			<Container vertical>
				{
					React.cloneElement(this.props.children)
				}
			</Container>
		)
	}
}
