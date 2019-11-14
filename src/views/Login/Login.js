import React, { Component } from "react";
import {
  ImageBackground,
  View,
  StyleSheet,
  Image,
  Text,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Alert
} from "react-native";
import { connect } from "react-redux";

import { Spinner } from "native-base";

import bgImage from "./../../assets/img/bg.jpg";
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
      errorMessage: null,
      loading: false
    };
  }

  login = async () => {
    const { email, password } = this.state;
    this.setState({ loading: true });

    await FA.signInWithEmailAndPassword(email, password)
      .then(() => {
        this.props.navigation.navigate("Home");
        this.setState({ loading: false });
        this.props.get_info();
      })
      .catch(error => {
        this.setState({ errorMessage: error.message, loading: false });
        if (error.code === "auth/user-not-found") {
          Alert.alert(
            "Ops!",
            "Usuário não encontrado. Aproveite e cadastre-se!"
          );
        } else if (error.code === "auth/wrong-password") {
          Alert.alert(
            "Quase lá!",
            "E-mail ou senha incorretos! Verifique e tente novamente!"
          );
        } else {
          Alert.alert("Ué!", "Algo de errado não está certo! ;P");
        }
      });
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

          {/* <View style={styles.errorMessage}>
            {this.state.errorMessage && (
              <Text style={styles.error}>{this.state.errorMessage}</Text>
            )}
          </View> */}

          <View style={styles.inputContainer}>
            <Icon
              name={"ios-person"}
              size={28}
              color="#ffffff"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              autoCompleteType="email"
              autoCapitalize="none"
              keyboardType="email-address"
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
            {this.state.loading ? (
              <Spinner style={styles.spinner} color="green" />
            ) : (
              <Text style={styles.text}>Login</Text>
            )}
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

const login = () => ({ type: "LOGIN" });
const get_info_ = () => ({ type: "GET_INFO" });

const mapDispatchToProps = dispatch => {
  return {
    login: () => dispatch(login()),
    get_info: () => dispatch(get_info_())
  };
};

export default connect(null, mapDispatchToProps)(Login);
