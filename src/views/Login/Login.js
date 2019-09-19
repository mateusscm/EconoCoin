import React, { Component } from "react";
import {
  ImageBackground,
  View,
  StyleSheet,
  Image,
  Text,
  TextInput,
  Dimensions,
  TouchableOpacity
} from "react-native";
// import { Toast } from "native-base";

import bgImage from "./../../assets/img/background.jpg";
import logo from "./../../assets/img/logo.png";

import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-community/async-storage";
import { theme } from "../../config/_theme";

import { FA } from "../../Firebase";

const { width: WIDTH } = Dimensions.get("window");

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: null,
    height: null
  },
  allCont: {
    flex: 1,
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center"
  },
  logo: {
    width: 120,
    height: 120
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 50
  },
  logoText: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 10
  },
  input: {
    width: WIDTH - 55,
    height: 45,
    borderRadius: 25,
    fontSize: 16,
    paddingLeft: 45,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    color: "rgba(255, 255, 255, 0.7)",
    marginHorizontal: 25
  },
  inputIcon: {
    position: "absolute",
    top: 8,
    left: 37
  },
  inputContainer: {
    marginTop: 10
  },
  brnEye: {
    position: "absolute",
    top: 8,
    right: 37
  },
  btnLogin: {
    width: WIDTH - 55,
    height: 45,
    borderRadius: 25,
    backgroundColor: theme.palette.secondary,
    justifyContent: "center",
    marginTop: 20
  },
  text: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 20,
    textAlign: "center"
  },
  text2: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 16,
    textAlign: "center"
  },
  containerActions: {
    width: WIDTH - 55,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10
  },
  errorMessage: {
    // height: 72,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 30
  },
  error: {
    color: "#E9446A",
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center"
  }
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPass: true,
      press: false,
      email: "",
      password: "",
      errorMessage: null
    };
  }

  login = async () => {
    const { email, password } = this.state;

    FA.signInWithEmailAndPassword(email, password)
      .then(() => this.props.navigation.navigate("Home"))
      .catch(error => this.setState({ errorMessage: error.message }));
  };

  showPass = () => {
    if (this.state.press === false) {
      this.setState({ showPass: false, press: true });
    } else {
      this.setState({ showPass: true, press: false });
    }
  };

  render() {
    return (
      <ImageBackground
        source={bgImage}
        style={styles.backgroundContainer}
        imageStyle={{ opacity: 0.7 }}
      >
        <View style={styles.allCont}>
          <View style={styles.logoContainer}>
            <Image source={logo} style={styles.logo} />
            <Text style={styles.logoText}>Bem-vindo!</Text>
          </View>

          <View style={styles.errorMessage}>
            {this.state.errorMessage && (
              <Text style={styles.error}>{this.state.errorMessage}</Text>
            )}
          </View>

          <View style={styles.inputContainer}>
            <Icon
              name={"ios-person"}
              size={28}
              color="#ffffff"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder={"E-mail"}
              placeholderTextColor={"rgba(255, 255, 255, 0.7)"}
              underlineColorAndroid="transparent"
              onChangeText={email => this.setState({ email })}
              value={this.state.email}
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon
              name={"ios-lock"}
              size={28}
              color="#ffffff"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder={"Senha"}
              secureTextEntry={this.state.showPass}
              placeholderTextColor={"rgba(255, 255, 255, 0.7)"}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              value={this.state.password}
              onChangeText={password => this.setState({ password })}
            />

            <TouchableOpacity
              style={styles.brnEye}
              onPress={this.showPass.bind(this)}
            >
              <Icon
                name={this.state.press === false ? "ios-eye" : "ios-eye-off"}
                size={26}
                color="#ffffff"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.btnLogin} onPress={this.login}>
            <Text style={styles.text}>Login</Text>
          </TouchableOpacity>

          <View style={styles.containerActions}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Forget")}
            >
              <Text style={styles.text2}>Esqueceu a senha?</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("SignUp")}
            >
              <Text style={styles.text2}>Cadastre-se!</Text>
            </TouchableOpacity>
          </View>
          <View></View>
        </View>
      </ImageBackground>
    );
  }
}

export default Login;
