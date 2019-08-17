import React from "react";
import { Platform, Dimensions } from "react-native";
import {
  createDrawerNavigator,
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator
} from "react-navigation";

import Home from "../views/Home/Home";
import Login from "../views/Login/Login";
import SignUp from "../views/SignUp/SignUp";
import Forget from "../views/Forget/Forget";
import Settings from "../views/Settings/Settings";
import AuthLoading from "../views/AuthLoading/AuthLoading";

import MenuDrawer from "../components/MenuDrawer/MenuDrawer";

const WIDTH = Dimensions.get("window").width;

const DrawerConfig = {
  drawerWidth: WIDTH * 0.83,
  contentComponent: ({ navigation }) => {
    return <MenuDrawer navigation={navigation} />;
  }
};

const DrawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen: Home
    },
    Settings: {
      screen: Settings
    }
  },
  DrawerConfig
);

const LoginNavigator = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      headerTransparent: true
    }
  },
  SignUp: {
    screen: SignUp,
    navigationOptions: {
      headerTransparent: true,
      headerTintColor: "#fff"
    }
  },
  Forget: {
    screen: Forget,
    navigationOptions: {
      headerTransparent: true,
      headerTintColor: "#fff"
    }
  }
});

const Navigator = createSwitchNavigator({
  AuthLoading: AuthLoading,
  Auth: LoginNavigator,
  Home: DrawerNavigator
});

export default createAppContainer(Navigator);
