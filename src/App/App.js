import React from "react";
import {} from "react-native";
import {
  createSwitchNavigator,
  createAppContainer,
  createStackNavigator,
  createDrawerNavigator
} from "react-navigation";
import Icon from "react-native-vector-icons/Ionicons";

// Importing Views
import Login from "../views/Login/Login";
import SignUp from "../views/SignUp/SignUp";
import Forget from "../views/Forget/Forget";
// import AuthLoading from "../views/AuthLoading/AuthLoading";
import Home from "../views/Home/Home";

const HomeStackNavigator = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: ({ navigation }) => ({
        title: "Home"
      })
    }
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerLeft: (
          <Icon
            style={{ paddingLeft: 10 }}
            onPress={() => navigation.openDrawer()}
            name="md-menu"
            size={30}
          />
        )
      };
    }
  }
);

const AppDrawerNavigator = createDrawerNavigator({
  Home: {
    screen: HomeStackNavigator
  }
});

const Navigator = createSwitchNavigator({
  // AuthLoading: AuthLoading,
  Login: {
    screen: Login,
    navigationOptions: {
      headerTransparent: true
    }
  },
  SignUp: SignUp,
  Forget: Forget,
  Home: {
    screen: AppDrawerNavigator
  }
});

export default createAppContainer(Navigator);
