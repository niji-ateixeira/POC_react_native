import { StackNavigator } from 'react-navigation'
import PostScreen from '../Containers/PostScreen'
import LaunchScreen from '../Containers/LaunchScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  PostScreen: {
    screen: PostScreen,
    navigationOptions: { title: 'Post' }
  },

  LaunchScreen: { screen: LaunchScreen }
}, {
  // Default config for all screens
  initialRouteName: 'PostScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default PrimaryNav
