import { AppRegistry } from "react-native";
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
import ArtMap from './components/ArtMap';
import Login from './components/Login';
import AuthLoadingPage from "./components/AuthLoadingPage";

const AppStack = createStackNavigator({
  ArtMap: { screen: ArtMap }
});

const AuthStack = createStackNavigator({
  Login: { screen: Login }
})

export default createSwitchNavigator(
  {
    AuthLoading: AuthLoadingPage,
    App: AppStack,
    Auth: AuthStack
  },
  {
    initialRouteName:'AuthLoading'
  }
);

