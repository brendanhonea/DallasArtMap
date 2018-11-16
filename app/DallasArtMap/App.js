import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
import ArtMap from './components/ArtMap';
import Login from './components/Login';
import CreateUser from './components/CreateUser';
import AuthLoadingPage from "./components/AuthLoadingPage";

const AppStack = createStackNavigator({
  ArtMap: { screen: ArtMap }
}, {
    headerMode: 'none'
  });

const AuthStack = createStackNavigator({
  Login: { screen: Login },
  CreateUser: { screen: CreateUser }
}, {
    headerMode: 'none'
  });

export default createSwitchNavigator(
  {
    AuthLoading: AuthLoadingPage,
    App: AppStack,
    Auth: AuthStack
  },
  {
    initialRouteName: 'AuthLoading'
  }
);

