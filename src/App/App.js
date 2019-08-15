// import React from "react";
import {} from "react-native";
import {
  createSwitchNavigator,
  createAppContainer,
  createStackNavigator
} from "react-navigation";

// Importing Views
import Login from "../views/Login/Login";
import SignUp from "../views/SignUp/SignUp";
import Forget from "../views/Forget/Forget";
import AuthLoading from "../views/AuthLoading/AuthLoading";
import Home from "../views/Home/Home";

const LoginStackNavigator = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      headerTransparent: true
    }
  },
  SignUp: SignUp,
  Forget: Forget,
  Home: Home
});

const Navigator = createSwitchNavigator({
  AuthLoading: AuthLoading,
  Auth: LoginStackNavigator
});

export default createAppContainer(Navigator);
