import React, { } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
// import Spinner from 'react-spinner-material';
import * as constants from './constants';
import ImageGallery from 'react-image-gallery';
import { RingLoader } from 'react-spinners';
import { css } from '@emotion/core';

class App extends React.Component {

   constructor() {
      super();
      this.state = {
         loading: false,
         images: [
            {
               original: 'http://lorempixel.com/1000/600/nature/2/',
               thumbnail: 'http://lorempixel.com/250/150/nature/2/'
            }
            //https://sumeyyaarar.com/wp-content/uploads/2018/07/empty_baslik.png
         ]
      }
   }

   componentDidMount() {
      // if (this.upload !== undefined)
      // this.upload.addEventListener('change', async (e) => {

      // })
      const rowTool = document.getElementById('rowTool')
      this.setState({ rowToolHeight: rowTool.getBoundingClientRect().height })
   }

   uploadImage = async (e) => {
      const files = e.target.files
      if (files.length === 0)
         return false

      this.setState({ loading: true })
      const form = new FormData()

      for (const file of files) {
         form.append('images', file, file.name)
      }

      const response = await fetch(`${constants.BASE_URL}/api/upload`, {
         method: 'POST',
         body: form
      })

      if (response.status === 201) {
         alert('Uploaded successfully')

         let json = await response.json()

         const imgs = json.images.map(res => {
            const url = `${constants.BASE_URL}/${res}`
            return {
               original: url,
               thumbnail: url
            }
         })

         this.setState({ images: imgs })
         console.log(imgs)
      }
      // this.setState({images: response.json()})
      else {
         alert('Something went wrong')
      }
      this.setState({ loading: false })
   }

   onUploadClick = () => {
      console.log(constants.BASE_URL)
      this.upload.click()
      // this.setState({ loading: !this.state.loading })
   }

   handleChange = async (e) => {
      await this.uploadImage(e.target.files)
      // this.setState({ file: URL.createObjectURL(temp) })
   }

   render() {
      return (
         <Container fluid={true} >
            {this.state.loading ?
               <div
                  className='position-absolute flex-row d-flex justify-content-center align-items-center'
                  style={{
                     visibility: this.state.loading,
                     zIndex: 100,
                     top: 0,
                     left: 0,
                     bottom: 0,
                     right: 0,
                     backgroundColor: 'rgba(188, 188, 188, 0.5)'
                  }}>
                  {/* <div className='flex-row d-flex justify-content-center' style={{flex: 1, backgroundColor: 'rgba(188, 188, 188, 0.5)'}}> */}
                  <RingLoader
                     css={override}
                     sizeUnit={"px"}
                     size={150}
                     color={'#c91a1a'}
                     loading={this.state.loading}
                  />
                  {/* </div> */}
               </div> :
               undefined
            }

            <div>
               <Row id='rowTool' style={style.rowtool}>
                  <Col />
                  <Col md='auto' className='flex-row d-flex justify-content-center'>
                     <Button
                        variant='primary'
                        className='btn-lg'
                        onClick={this.onUploadClick}
                        style={style.button}
                     >
                        Open
                     </Button>
                     <input onChange={this.uploadImage} multiple={true} type='file' ref={(ref) => this.upload = ref} style={{ display: 'none' }} />
                  </Col>
                  {/* <Col md='auto' className='flex-row d-flex justify-content-center'>
                     <Button
                        variant='warning'
                        className='btn-lg'
                        onClick={this.getDetection}
                        style={style.button}
                     >
                        Detect
                     </Button>
                  </Col> */}
                  {/* <Col /> */}
               </Row>
               <Row
                  id='rowImg'
                  style={{ backgroundColor: 'darkgray', minHeight: window.innerHeight - this.state.rowToolHeight }}
                  className='justify-content-center'>
                  <div className='img-container d-flex'>
                     <ImageGallery
                        items={this.state.images}
                        thumbnailPosition="top"
                        showPlayButton={false}
                        showFullscreenButton={false}
                        showNav={true}
                     />
                  </div>
               </Row>
            </div>
         </Container>
      );
   }
}

const override = css`
   display: block;
   margin: 0 auto;
   border-color: red;
`;

const style = {
   button: {
      width: 200
   },
   rowtool: {
      paddingTop: 20,
      paddingBottom: 20
   }
}

export default App;
