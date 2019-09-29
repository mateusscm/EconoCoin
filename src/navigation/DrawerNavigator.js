import React from "react";
import { Platform, Dimensions } from "react-native";
import {
  createDrawerNavigator,
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator
} from "react-navigation";

import Home from "../views/Home/Home";
import HomeNewExpense from "../views/Home/HomeNewExpense";
import HomeNewIncome from "../views/Home/HomeNewIncome";
import HomeNewTransf from "../views/Home/HomeNewTransf";
import Login from "../views/Login/Login";
import SignUp from "../views/SignUp/SignUp";
import Forget from "../views/Forget/Forget";
import Settings from "../views/Settings/Settings";
import AuthLoading from "../views/AuthLoading/AuthLoading";
import Profile from "../views/Profile/Profile";
import AccountBalance from "../views/AccountBalance/AccountBalance";
import Extract from "../views/Extract/Extract";

import MenuDrawer from "../components/MenuDrawer/MenuDrawer";
import DialogCategorie from "../components/DialogCategorie/DialogCategorie";
import DialogAccount from "../components/DialogAccount/DialogAccount";

const WIDTH = Dimensions.get("window").width;

const DrawerConfig = {
  drawerWidth: WIDTH * 0.83,
  contentComponent: ({ navigation }) => {
    return <MenuDrawer navigation={navigation} />;
  }
};

const HomeStack = createStackNavigator(
  {
    Home: Home,
    HomeNewExpense: HomeNewExpense,
    HomeNewIncome: HomeNewIncome,
    HomeNewTransf: HomeNewTransf,
    DialogCategorie: DialogCategorie,
    DialogAccount: DialogAccount
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false
    }
  }
);

const DrawerNavigator = createDrawerNavigator(
  {
    Home: HomeStack,
    AccountBalance: {
      screen: AccountBalance
    },
    Settings: {
      screen: Settings
    },
    Profile: {
      screen: Profile
    },
    Extract: {
      screen: Extract
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

const Navigator = createSwitchNavigator(
  {
    AuthLoading: AuthLoading,
    Auth: LoginNavigator,
    Home: DrawerNavigator
  },
  {
    initialRouteName: "AuthLoading"
  }
);

export default createAppContainer(Navigator);
