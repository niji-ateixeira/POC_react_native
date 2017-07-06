import React from 'react'
import { View, ScrollView, Text, KeyboardAvoidingView, ListView, Button, TextInput, Modal, Image } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
import postRedux from '../Redux/postRedux'
import photoRedux from '../Redux/photoRedux'
import moment from 'moment'
import Camera from 'react-native-camera'

// Styles
import styles from './Styles/PostScreenStyle'

class PostScreenScreen extends React.Component {
  // Definitions des state de base
  constructor (props) {
    super(props)
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      dataSource: ds.cloneWithRows(props.postStore.posts),
      textPost: null,
      modalVisible: false
    }
  }
  // losque le store est modifier, l'affichage est mis à jour
  componentWillReceiveProps (nextProps) {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.setState({ dataSource: ds.cloneWithRows(nextProps.postStore.posts) })
  }
  // Function permettant l'ajout de post
  addPost = () => {
    var d = new Date()
    this.props.addPost({
      text: this.state.textPost,
      date: d.getDate(),
      photo: this.props.photoStore.photo
    })
    this.props.resetPhoto()
  }
  // Function permettant de gérer l'affichage de la modal
  setModalVisible = (visible) => {
    this.setState({modalVisible: visible})
  }
  // Function permettant la prise de photo
  takePicture = () => {
    this.camera.capture({metadata: {}})
      .then((data) => {
        this.props.addPhoto(data)
        this.setModalVisible(false)
      })
      .catch(err => console.error(err))
  }
  // Déclaration d'une modal permettant l'affichage de l'appareil photo
  modalCamera = () => {
    return (
      <Modal
        animationType={'slide'}
        transparent={false}
        visible={this.state.modalVisible}>

        <Camera
          ref={(cam) => {
            this.camera = cam
          }}
          captureTarget={Camera.constants.CaptureTarget.memory}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}>
          <Text style={styles.capture} onPress={this.takePicture.bind(this)}>Prendre la photo</Text>
        </Camera>
      </Modal>
    )
  }
  // Affichage
  render () {
    return (
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView behavior='position'>
          {/* Lisview des différents posts */}
          <ListView
            enableEmptySections
            dataSource={this.state.dataSource}
          /* Rendu pour chaque post */
            renderRow={(rowData) => {
              return (
                <View style={styles.postContainer}>
                  {this.displayPhoto(rowData.photo)}
                  <Text>{rowData.text}</Text>
                  <View style={styles.postContainerDate}>
                    <Text style={styles.textDate} >{moment().startOf(rowData.date).fromNow()}</Text>
                  </View>
                </View>
              )
            }
          } />
          {/* Partie ajout de post */}
          <View style={styles.containerAjout}>
            {this.displayPhoto(this.props.photoStore.photo)}
            <TextInput
              multiline
              numberOfLines={5}
              style={{height: 80, borderColor: 'gray', borderWidth: 1, padding: 10}}
              underlineColorAndroid='rgba(0,0,0,0)'
              onChangeText={(textPost) => this.setState({textPost})}
              value={this.state.textPost} />
            <Button
              onPress={this.addPost}
              title='Add Post'
              color='#841584' />
            <Button
              onPress={this.setModalVisible}
              title='PHOTO'
              color='#841584' />
          </View>
        </KeyboardAvoidingView>
        {this.modalCamera()}
      </ScrollView>
    )
  }
  // Fonction qui retourne ou pas l'affichage d'une photo si elle existe
  displayPhoto = (photo) => {
    if (photo === null) {
      return null
    } else {
      return (
        <Image
          resizeMode={'contain'}
          source={{
            isStatic: true,
            uri: photo
          }}
          style={styles.photoRender} />
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    postStore: state.postStore,
    photoStore: state.photoStore
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addPost: (post) => dispatch(postRedux.addPost(post)),
    addPhoto: (data) => dispatch(photoRedux.addPhoto(data)),
    resetPhoto: () => dispatch(photoRedux.resetPhoto())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostScreenScreen)
