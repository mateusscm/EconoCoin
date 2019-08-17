import React, { Component } from "react";
import {
  ImageBackground,
  View,
  Text,
  StyleSheet,
  TextInput
} from "react-native";

import bgImage from "./../../assets/img/background.jpg";
import Icon from "react-native-vector-icons/Ionicons";

// const { width: WIDTH } = Dimensions.get("window");

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
    backgroundColor: "rgba(0,0,0,0.7)"
  },
  text: {
    color: "#59BF3F",
    fontSize: 25,
    fontWeight: "bold"
  },
  subtext: {
    color: "#fff",
    fontSize: 20
  },
  frase: {
    color: "#fff",
    fontSize: 16
  },
  input: {
    width: "100%",
    height: 45,
    fontSize: 16,
    paddingLeft: 45,
    color: "rgba(255, 255, 255, 0.7)",
    borderBottomWidth: 1,
    borderBottomColor: "white"
  },
  inputIcon: {
    position: "absolute",
    top: 8,
    left: 15
  },
  inputContainer: {
    marginTop: 20
  }
});

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <ImageBackground
        source={bgImage}
        style={styles.backgroundContainer}
        imageStyle={{ opacity: 0.7 }}
      >
        <View style={styles.allCont}>
          <View style={{ padding: 20, marginTop: 30 }}>
            <Text style={styles.text}>Faça seu cadastro</Text>
            <Text style={styles.subtext}>e acompanhe seus gastos!</Text>
          </View>
          <View
            style={{
              borderWidth: 1,
              borderColor: "#59BF3F",
              marginRight: 200,
              marginLeft: 20
            }}
          />
          <View style={{ padding: 20 }}>
            <Text style={styles.frase}>Insira alguns dados abaixo:</Text>
            <View style={styles.inputContainer}>
              <Icon
                name={"ios-person"}
                size={28}
                color="#ffffff"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder={"Nome Completo"}
                placeholderTextColor={"rgba(255, 255, 255, 0.7)"}
                underlineColorAndroid="transparent"
              />
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
                secureTextEntry={true}
                placeholderTextColor={"rgba(255, 255, 255, 0.7)"}
                underlineColorAndroid="transparent"
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
                placeholder={"Insira a senha novamente"}
                secureTextEntry={true}
                placeholderTextColor={"rgba(255, 255, 255, 0.7)"}
                underlineColorAndroid="transparent"
              />
            </View>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

export default SignUp;
