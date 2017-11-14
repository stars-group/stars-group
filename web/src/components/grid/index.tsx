import './styles.css'
import * as React from 'react'
import Container from '../container'
import wrap from '../wrap'

interface IProps {
	children: any
	columns: number
}

export default function(props: IProps) {
	const {columns, children, ...rest} = props
	const width = 100 / columns
	return (
		<Container className='grid' {...rest}>
		{
			[].concat(children).map(item => (
				<Container block style={{flex: `0 0 ${width}%`}}>{item}</Container>
			))
		}
		</Container>
	)
}