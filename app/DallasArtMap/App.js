import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
import ArtMap from './src/components/ArtMap';
import Login from './src/components/Login';
import CreateUser from './src/components/CreateUser';
import AuthLoadingPage from "./src/components/AuthLoadingPage";

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

