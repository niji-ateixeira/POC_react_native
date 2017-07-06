import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  postContainer: {
    backgroundColor: 'white',
    padding: 10,
    margin: 10
  },
  postContainerDate: {
    alignItems: 'flex-end'
  },
  textDate: {
    fontSize: Metrics.text.small,
    color: 'gray'
  },
  containerAjout: {
    backgroundColor: 'white',
    padding: 10,
    margin: 10
  },
  modalCamera: {
    flex: 1,
    flexDirection: 'row'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  },
  photoRender: {
    height: 200,
    margin: 20
  }
})
