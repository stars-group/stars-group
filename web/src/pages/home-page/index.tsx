import './styles.css'
import * as React from 'react'

import Container from '../../components/container'
import Text from '../../components/text'
import Tag from '../../components/tag'
import Image from '../../components/image'
import { Modal } from '../../components/modal'
import * as Form from '../../components/form'

import { Kora, Store } from '../../kora'

import Header from '../../structures/header'

export default class HomePage extends React.Component<any, any> {
	constructor() {
		super()
		this.state = {}
	}
	componentDidMount() {
	}
	render() {
		return (
			<Container vertical>
				<Header />
				<Container justify-center pad-v8 border-b>
					<Container vertical wrap mgn-v8 pad-v2>
						<Container pad-v4 />
						<Text size-10 weight-5 fg-highlight mgn-b2>STARS Platform</Text>
						<Text size-10 weight-3 mgn-b2>Some amazing tag line</Text>
						<Text size-10 weight-3>Another great line</Text>
						<Container pad-v4 />
					</Container>
				</Container>
				<Container justify-center pad-v8>
					<Container vertical wrap>
						<Text size-5 mgn-b8 weight-5 uppercase>Featured Merchandise</Text>
						<Container grid>
							<Item
								name='Ball'
								image='https://m.media-amazon.com/images/S/aplus-media/vc/7895a621-9359-412d-92d2-94c15adc4c70.jpg'
							/>
							<Item
								name='Jersey'
								image='https://media.gq.com/photos/5772c8d4419f3a9d0ac977c4/16:9/pass/how-to-wear-a-soccer-jersey.jpeg'
							/>
							<Item
								name='Poster'
								image='https://i.pinimg.com/736x/d7/9c/3c/d79c3c544363fe815eccb58573c21aef--soccer-poster-soccer-art.jpg'
							/>
						</Container>
					</Container>
				</Container>
				<Container justify-center pad-v8>
					<Container vertical wrap>
						<Text size-5 mgn-b8 weight-5 uppercase>Upcoming Games</Text>
						<Container grid>
							<Item
								name='Chelsea vs ManU'
								image='https://m.media-amazon.com/images/S/aplus-media/vc/7895a621-9359-412d-92d2-94c15adc4c70.jpg'
							/>
							<Item
								name='Jersey'
								image='https://media.gq.com/photos/5772c8d4419f3a9d0ac977c4/16:9/pass/how-to-wear-a-soccer-jersey.jpeg'
							/>
							<Item
								name='Poster'
								image='https://i.pinimg.com/736x/d7/9c/3c/d79c3c544363fe815eccb58573c21aef--soccer-poster-soccer-art.jpg'
							/>
						</Container>
					</Container>
				</Container>
			</Container>
		)
	}
}

function Item(props) {
	return (
		<Container vertical>
			<Container border vertical>
				<Container style={{
					height: '15rem',
					backgroundPosition: 'center',
					backgroundSize: 'cover',
					backgroundImage: `url(${props.image})`,
				}} />
				<Container pad-6 vertical>
					<Text uppercase size-3-5 weight-5 mgn-b2>{props.name}</Text>
					<Text fg-gray line-6 size-3-5>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dapibus nisl a metus luctus bibendum. Nulla in quam sapien. Nullam eu dictum quam. Morbi dignissim dictum lacus, eu ultrices orci vestibulum ac.
					</Text>
				</Container>
			</Container>
		</Container>
	)
}