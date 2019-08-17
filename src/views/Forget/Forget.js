import React, { Component } from "react";
import {
  ImageBackground,
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  TouchableOpacity
} from "react-native";

import bgImage from "./../../assets/img/background.jpg";
import Icon from "react-native-vector-icons/Ionicons";

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
    // justifyContent: "center",
    // alignItems: "center"
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
  },
  btnForget: {
    width: "100%",
    height: 45,
    borderRadius: 25,
    backgroundColor: "#59BF3F",
    justifyContent: "center",
    marginTop: 80
  },
  solicitar: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 20,
    textAlign: "center"
  }
});

class Forget extends Component {
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
            <Text style={styles.text}>Esqueceu a Senha?</Text>
            <Text style={styles.subtext}>
              Não se preocupe! Vamos te ajudar!
            </Text>
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
            <Text style={styles.subtext}>
              Digite seu E-mail no campo abaixo:
            </Text>
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
          </View>
          <View
            style={{
              borderWidth: 1,
              borderColor: "#59BF3F",
              marginLeft: 20,
              marginRight: 200,
              marginTop: 20
            }}
          />
          <View style={{ marginHorizontal: 20 }}>
            <TouchableOpacity style={styles.btnForget} onPress={this.login}>
              <Text style={styles.solicitar}>Solicitar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

export default Forget;
