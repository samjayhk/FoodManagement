import React, { Component } from 'react'
import { graphql, QueryRenderer, createFragmentContainer } from 'react-relay'
import Relay from 'react-relay'
import environment from '../Environment'
import shallowequal from 'shallowequal'
import imageCompression from 'browser-image-compression'

import { Storage, API, graphqlOperation } from 'aws-amplify'

import styles from './styles.css'
import Search from './fragments/Search'

function getRandomInt() {
  return Math.floor(Math.random() * (100000 - 1 + 1)) + 1
}

class Searchs extends Component {
	constructor(props) {
		super(props)

		this.state = {
			name: '',
			expiry: '',
			keywords: '',
			result: '', resultButton: 'Next Step',
			currentTitle: 'Type Keywords', currentStep: 1, currentPage: 1, currentEnable: true,
			imageInfo: '', imageName: '', imageUrl: '', processStatus: 'pending',
			compressorSettings: { toWidth : 400, toHeight : 400, mimeType : 'image/png', mode : 'strict', quality : 0.6, grayScale : true, sepia : true, threshold : 127, vReverse : true, hReverse : true, speed : 'low' }
		}
		
	}
	
	shouldComponentUpdate (nextProps, nextState) {
		return !shallowequal(this.props, nextProps) || !shallowequal(this.state, nextState);
	}
	
	imageChange = e => {
		const file = e.target.files[0]
		if (!file) return
		this.setState({
		  currentEnable: false,
		  imageInfo: file,
		  imageName: getRandomInt() + file.name,
		  imageUrl: URL.createObjectURL(file)
		})
	}
	
	saveFile = () => {
		const objthis = this
		this.props.handleProgress(60)
		if (this.state.imageName === '') return
		imageCompression(this.state.imageInfo, 2, 400)
		.then(function (compressedFile) {
			objthis.setState({ processing: true })
			Storage.put(objthis.state.imageName, compressedFile, {
			  contentType: 'image/png'
			})
			.then (result => {
				objthis.props.handleProgress(80)
				const image = {
					imageInfo: objthis.state.imageName
				}
			  
				API.graphql(graphqlOperation(`
				  query($imageInfo: String!) {
					fetchObject(imageInfo: $imageInfo) {
					  data
					}
				  }
				`, image))
				.then(data => {
					objthis.props.handleProgress(100)
					const parsedData = JSON.parse(data.data.fetchObject.data)
					parsedData.Labels == undefined ? objthis.props.handleNotification('Image not recognized.') : ''
					
					objthis.setState({
						processStatus: 'done',
						currentEnable: false,
						keywords: parsedData.Labels != undefined ? parsedData.Labels.map((data => data.Name.toLowerCase())) : 'null'
					})
					
					Storage.remove(objthis.state.imageName)
					
				})
				.catch(error => {
				  console.log('error: ', error)
				})
				.catch(err => console.log(err))
			}) 
		})
		.catch(function (error) {
		  console.log(error.message);
		});
			/* */
	}
	
	handleClick = (t, o) => {
		switch (t) {
			case 0:
				this.setState({
					name: o,
					currentEnable: false
				})
				break
			case 1:
				this.setState({
					type: o,
					currentEnable: false
				})
				break
			case 2:
				this.setState({
					keywords: this.state.keywords == '' ? o : this.state.keywords + ',' + o,
					currentEnable: false
				})
				break
			default:
				break
		}
	}
	
	handleChange = event => {
		const target = event.target
		const name = target.name.toLowerCase()
		const value = target.value.toLowerCase()
		if (name == 'keywords') this.setState({currentEnable: false})
		this.setState({
		  [name]: value
		})
	}
	
	handleNext = (event) => {
		event.preventDefault()
		if (this.state.currentEnable) return
		this.setState({currentStep: this.state.currentStep + 1})
		switch (this.state.currentStep) {
			case 1:
				if (this.state.imageInfo != '') {
					this.props.handleProgress(40)
					this.setState({processStatus: 'uploading', currentEnable: true})
					this.saveFile()
				} else if (this.state.keywords != '') {
					this.setState({
						currentPage: 2,
						currentEnable: false,
						currentTitle: 'Search results',
						resultButton: 'Finish'
					})
				}
				break
			case 2:
				if (this.state.processStatus == 'done') {
					this.setState({
						currentEnable: false,
						currentPage: 2,
						currentTitle: 'Search results',
						resultButton: 'Finish'
					})
				} else {
					this.setState({
						name: '',
						expiry: '',
						keywords: '',
						result: '', resultButton: 'Next Step',
						currentTitle: 'Type Keywords', currentStep: 1, currentPage: 1, currentEnable: true,
						imageInfo: '', imageName: '', imageUrl: '', processStatus: 'pending'
					})	
				}
				break
			case 3:
				this.setState({
					name: '',
					expiry: '',
					keywords: '',
					result: '', resultButton: 'Next Step',
					currentTitle: 'Type Keywords', currentStep: 1, currentPage: 1, currentEnable: true,
					imageInfo: '', imageName: '', imageUrl: '', processStatus: 'pending'
				})	
				break
			default:
				break
		}
	}
	
  render() {
    return (
	<>
		<div className={styles.search_box_container}>
			<div className={styles.search_box}>
				<div className={styles.search_top}>
						{ this.state.currentPage == 1 ? (<div className={styles.search_top_title}><input type='text' placeholder="type keywords (apple,fruit,...)" name="keywords" value={this.state.keywords} onChange={this.handleChange} className={styles.change} /></div>) : (<div className={styles.search_top_title_result}>{this.state.currentTitle}</div>) }
					<div className={styles.search_top_right}>
						{this.state.currentPage} of 2
					</div>
				</div>
				<div className={styles.search_box_content}>
					{ this.state.currentPage == 1 ? this.state.imageInfo == '' ? (
					<div className={styles.search_box_content_container}>
						<div className={styles.search_box_content_browse}>
							<div className={styles.search_box_content_svg}>
								<input type="file" accept="image/*" onChange={this.imageChange} />
								<svg viewBox="0 0 50 50"><path className={styles.search_svg_fill} d="M14.81,25.4a4.45,4.45,0,0,1,.11-1,3.37,3.37,0,0,1,2.15-2.11l.45-.14.12-.69A4,4,0,0,1,18,20.28a3.35,3.35,0,0,1,2.74-1.62h.52l.16-.47a3.29,3.29,0,0,1,1.78-1.9,4.24,4.24,0,0,1,2.09-.15c.22.07.27,0,.38-.3a3.33,3.33,0,0,1,.68-.9,3,3,0,0,1,2.25-1h.59V10.45H2.05v7.89c0,8.54,0,8.56.53,9.37A2.87,2.87,0,0,0,4,28.88l.58.27,5.8.05,5.79.05.29.34.28.34V28.56L16,27.89A3.36,3.36,0,0,1,14.81,25.4Z"/><path className={styles.search_svg_fill} d="M29.22,8.3l0-1.88c0-1.82,0-1.89-.3-2.46A3,3,0,0,0,26.79,2.2c-.48-.13-2.08-.14-11.21-.14-8.11,0-10.76,0-11.1.13A3.15,3.15,0,0,0,2.35,4c-.24.51-.25.63-.28,2.41L2,8.3H29.22ZM5.92,5.92A1,1,0,0,1,4.2,5.2a.84.84,0,0,1,.28-.71A.84.84,0,0,1,5.2,4.2,1,1,0,0,1,5.92,5.92Zm4.43-.4a1.11,1.11,0,0,1-1,.73,1.08,1.08,0,0,1-1-.65.9.9,0,0,1,.27-1.15A1,1,0,0,1,10.35,5.52Zm3.71.57a.91.91,0,0,1-1.23-.17,1,1,0,0,1,.1-1.54,1,1,0,1,1,1.13,1.71Z"/><path className={styles.search_svg_fill} d="M29.18,16.16a1.17,1.17,0,0,0-1.6.61c-.19.42-.13.71.26,1.29A1,1,0,0,1,28,19.25a1.13,1.13,0,0,1-1.1.53,4.61,4.61,0,0,1-1-.82c-.87-.83-1.2-1-1.75-.75a1.12,1.12,0,0,0-.74,1.1c0,.42,0,.49.72,1.19,1,1,1.1,1.27.78,1.88a1.1,1.1,0,0,1-1.09.52,6.33,6.33,0,0,1-1.29-1.07c-.84-.82-1.11-1-1.42-1.08a1.17,1.17,0,0,0-1.25.66c-.32.65-.2.84,1.46,2.52a14.22,14.22,0,0,1,1.6,1.8,1,1,0,0,1-1,1.33c-.37,0-.46-.07-1.82-1.4a7.4,7.4,0,0,0-1.71-1.46,1.19,1.19,0,0,0-1.43,1.18v.44l2.92,2.94a41,41,0,0,1,3,3.22,1,1,0,0,1-1,1.32c-.37,0-.46-.06-1.76-1.34l-1.36-1.34,0,1.22A4.16,4.16,0,0,0,19,33.55a3.24,3.24,0,0,0,2.25,1.8,45,45,0,0,0,5.93,0,9.28,9.28,0,0,0,8.15-8.24,9.14,9.14,0,0,0-1.64-6.3A49.37,49.37,0,0,0,29.18,16.16Z"/><path d="M36.24,20.41a1.1,1.1,0,0,0-.35-1.54,1.9,1.9,0,0,0-.69-.12c-.42,0-.42,0-2.18-1.78l-1.77-1.78V9.92A40.76,40.76,0,0,0,31.1,4,5.36,5.36,0,0,0,27.23.15C26.33-.06,4.84,0,4,.16A5.62,5.62,0,0,0,.61,2.8C0,4,0,3.53,0,15.63S0,27.22.6,28.44a6.1,6.1,0,0,0,2.19,2.21c1.14.59,1.27.6,7.44.6,3.86,0,5.67,0,5.82-.1a2.22,2.22,0,0,0,.43-.36l.22-.27v1.27a5,5,0,0,0,1.43,4.05l.62.66v.6c0,.76.2,1.16.65,1.34a.78.78,0,0,0,.68,0,1.07,1.07,0,0,0,.72-.82c0-.2,0-.2,2.9-.17,1.86,0,3.25,0,3.84-.08a11.3,11.3,0,0,0,8.85-16.07C36.06,20.65,36.06,20.64,36.24,20.41ZM2.07,6.42c0-1.78,0-1.9.28-2.41A3.15,3.15,0,0,1,4.48,2.19c.34-.1,3-.13,11.1-.13,9.13,0,10.73,0,11.21.14A3,3,0,0,1,28.88,4c.26.57.27.64.3,2.46l0,1.88H2ZM16.7,29.24v.69l-.28-.34-.29-.34-5.79-.05-5.8-.05L4,28.88a2.87,2.87,0,0,1-1.38-1.17c-.53-.81-.53-.83-.53-9.37V10.45H29.2V14h-.59a3,3,0,0,0-2.25,1,3.33,3.33,0,0,0-.68.9c-.11.34-.16.37-.38.3a4.24,4.24,0,0,0-2.09.15,3.29,3.29,0,0,0-1.78,1.9l-.16.47h-.52A3.35,3.35,0,0,0,18,20.28a4,4,0,0,0-.37,1.13l-.12.69-.45.14a3.37,3.37,0,0,0-2.15,2.11,4.45,4.45,0,0,0-.11,1A3.36,3.36,0,0,0,16,27.89l.67.67Zm18.65-2.13a9.28,9.28,0,0,1-8.15,8.24,45,45,0,0,1-5.93,0A3.24,3.24,0,0,1,19,33.55a4.16,4.16,0,0,1-.25-1.71l0-1.22L20.09,32c1.3,1.28,1.39,1.34,1.76,1.34a1,1,0,0,0,1-1.32,41,41,0,0,0-3-3.22l-2.92-2.94v-.44a1.19,1.19,0,0,1,1.43-1.18A7.4,7.4,0,0,1,20,25.66c1.36,1.33,1.45,1.4,1.82,1.4a1,1,0,0,0,1-1.33,14.22,14.22,0,0,0-1.6-1.8c-1.66-1.68-1.78-1.87-1.46-2.52A1.17,1.17,0,0,1,21,20.75c.31.06.58.26,1.42,1.08a6.33,6.33,0,0,0,1.29,1.07,1.1,1.1,0,0,0,1.09-.52c.32-.61.22-.85-.78-1.88-.68-.7-.72-.77-.72-1.19a1.12,1.12,0,0,1,.74-1.1c.55-.23.88-.08,1.75.75a4.61,4.61,0,0,0,1,.82,1.13,1.13,0,0,0,1.1-.53,1,1,0,0,0-.13-1.19c-.39-.58-.45-.87-.26-1.29a1.17,1.17,0,0,1,1.6-.61,49.37,49.37,0,0,1,4.53,4.65A9.14,9.14,0,0,1,35.35,27.11Z"/><path d="M5.2,4.2a.84.84,0,0,0-.72.29.84.84,0,0,0-.28.71,1,1,0,0,0,1.72.72A1,1,0,0,0,5.2,4.2Z"/><path d="M8.71,4.45A.9.9,0,0,0,8.44,5.6a1.08,1.08,0,0,0,1,.65,1.11,1.11,0,0,0,1-.73A1,1,0,0,0,8.71,4.45Z"/><path d="M13.56,4.2a1,1,0,0,0-.63.18,1,1,0,0,0-.1,1.54.91.91,0,0,0,1.23.17A1,1,0,0,0,13.56,4.2Z"/><path d="M40.47,18.75H39.14l-.33.34a1,1,0,0,0-.2,1.22c.23.42.53.5,2,.5H42l.28-.29a1,1,0,0,0,.15-1.27C42.22,18.83,41.91,18.75,40.47,18.75Z"/><path d="M45.46,20.89a5.92,5.92,0,0,0,.59.21,3.67,3.67,0,0,1,.57.34c.65.43,1.17.46,1.55.11a1,1,0,0,0-.1-1.61,5.25,5.25,0,0,0-2.25-1.06c-.48-.05-.52,0-.85.29C44.35,19.8,44.56,20.56,45.46,20.89Z"/><path d="M48,24v1.38A7.61,7.61,0,0,0,48.06,27a1.05,1.05,0,0,0,1.66.19c.21-.23.23-.33.26-1.52a10,10,0,0,0,0-1.52,1,1,0,0,0-1.72-.42Z"/><path d="M50,30.31a1,1,0,0,0-1.72-.43l-.28.28v1.38a7.61,7.61,0,0,0,.11,1.61,1.05,1.05,0,0,0,1.66.19c.21-.23.23-.33.26-1.52A9.83,9.83,0,0,0,50,30.31Z"/><path d="M48.23,36l-.28.28v1.38c0,1.49.08,1.8.5,2a1,1,0,0,0,1.18-.15l.32-.28L50,38a10.13,10.13,0,0,0,0-1.53A1,1,0,0,0,48.23,36Z"/><path d="M20.8,42.57V41.2l-.28-.29a1.08,1.08,0,0,0-1.27-.14c-.42.23-.49.49-.5,1.95v1.35l.33.33a.94.94,0,0,0,1.22.19C20.72,44.37,20.8,44.07,20.8,42.57Z"/><path d="M49.89,42.46a1,1,0,0,0-1-.56.85.85,0,0,0-.71.28c-.28.29-.28.3-.28,1.52v1.23h.66a9.08,9.08,0,0,0,1-.06L50,44.8V43.74A5,5,0,0,0,49.89,42.46Z"/><path d="M22.63,47.6a3.72,3.72,0,0,1-.91-.64c-.49-.47-1-.59-1.41-.31a.92.92,0,0,0-.49.91c0,.4,0,.47.58,1a4,4,0,0,0,2.12,1.16.85.85,0,0,0,.68-.33C23.82,48.76,23.59,48.08,22.63,47.6Z"/><path d="M46.58,47.41c-.18.07-.5.19-.68.28a3.68,3.68,0,0,1-.81.21,1.27,1.27,0,0,0-1.1.83,1.12,1.12,0,0,0,.59,1.15c.3.14.43.15,1.05,0a4.2,4.2,0,0,0,2.22-1,1,1,0,0,0-.16-1.22A1,1,0,0,0,46.58,47.41Z"/><path d="M27.59,48c-1.36,0-1.41,0-1.69.25a.9.9,0,0,0-.27,1.15c.22.55.53.66,2,.66s1.74-.11,2-.66a.9.9,0,0,0-.27-1.15C29,48,28.94,48,27.59,48Z"/><path d="M33.74,48c-1.35,0-1.42,0-1.69.25a1,1,0,0,0-.27,1.17c.22.53.55.63,2,.63s1.74-.1,2-.65a.9.9,0,0,0-.27-1.15C35.15,48,35.1,48,33.74,48Z"/><path d="M39.9,48c-1.26,0-1.42,0-1.65.2a1,1,0,0,0-.32,1.2c.22.55.54.65,2,.65s1.74-.1,2-.65a.92.92,0,0,0-.28-1.15C41.3,48,41.25,48,39.9,48Z"/></svg>
							</div>
							Browse Image (max. 2MB)
						</div>
						<div className={styles.search_box_take_photo}>
							<input type="file" accept="image/*;capture=camera" capture="camera" onChange={this.imageChange} />
							<button className={styles.button_take}>Take Photo</button>
						</div>
					</div>) : (
						<div className={styles.search_box_content_list}>
							<div className={styles.container}>
								<div className={`${styles.row} ${styles.row_border}`}>
									<div className={`${styles.col_6} ${styles.search_box_content_list_title}`}>
										Image Name
									</div>
									<div className={`${styles.col_3} ${styles.search_box_content_list_title}`}>
										Sizes
									</div>
									<div className={`${styles.col_3} ${styles.search_box_content_list_title}`}>
										Status
									</div>
								</div>
								<div className={`${styles.row} ${styles.row_border}`}>
									<div className={styles.col_6}>
										{this.state.imageInfo.name}
									</div>
									<div className={styles.col_3}>
										{this.state.imageInfo.size}
									</div>
									<div className={styles.col_3}>
										{this.state.processStatus}
									</div>
								</div>
							</div>
						</div>
					) : ( this.state.currentPage == 2 ? (
					<div className={styles.search_selectlist}>
						<div className={styles.search_selectlist_layer}>
							<div className={styles.search_selectlist_container}>
								<div className={styles.container}>
									<div className={styles.row}>
										<QueryRenderer
											environment={environment}
											query={graphql`
											  query SearchsQuery($keywords: [String]!) {
												search {
													foodsConnection(keywords: $keywords) {
														edges {
															...Search
														}
													}
												}
											  }
											  `}
											variables={{
												keywords: Array.isArray(this.state.keywords) ? this.state.keywords : this.state.keywords.split(","),
											}}
											render={ ({ error, props }) => {
												if (props) {
													try {
														return <Search handleNotification={this.props.handleNotification} data={props.search.foodsConnection.edges} />
													} catch (e) {
														this.props.handleNotification('Something went wrong!')
													}
												}
												return ''
											}}
										  />
									</div>
								</div>
							</div>
						</div>
					</div>) : (''))}
				</div>
				<div className={styles.search_box_layer}>
					<div className={styles.search_bottom}>
						<button onClick={this.handleNext} className={styles.button_green}>{this.state.resultButton}</button>
					</div>
				</div>
			</div>
		</div>
	</>
    )
  }
}

export default Searchs