import React, { Component } from "react";
import {
  ImageBackground,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Picker
} from "react-native";

import bgImage from "./../../assets/img/background.jpg";
import Icon from "react-native-vector-icons/Ionicons";
import { theme } from "../../config/_theme";
import { ScrollView } from "react-native-gesture-handler";
// import DatePicker from "react-native-datepicker";
import * as firebase from "firebase";

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
    color: theme.palette.txtWithBg,
    fontSize: 20
  },
  frase: {
    color: theme.palette.txtWithBg,
    fontSize: 16
  },
  input: {
    width: "100%",
    height: 45,
    fontSize: 16,
    paddingLeft: 45,
    color: "rgba(255, 255, 255, 0.7)",
    borderBottomWidth: 1,
    borderBottomColor: theme.palette.txtWithBg
  },
  inputIcon: {
    position: "absolute",
    top: 8,
    left: 15
  },
  inputIconDate: {
    position: "absolute",
    top: 4,
    left: 15
  },
  inputContainer: {
    marginTop: 20
  },
  btnSignup: {
    width: "100%",
    height: 45,
    borderRadius: 25,
    backgroundColor: theme.palette.secondary,
    justifyContent: "center",
    marginTop: 80
  },
  signup: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 20,
    textAlign: "center"
  },
  sexo: {
    width: 150,
    color: theme.palette.txtWithBg,
    borderBottomColor: theme.palette.txtWithBg,
    borderBottomWidth: 1
  },
  line: {
    borderWidth: 1,
    borderColor: theme.palette.secondary,
    marginRight: 200,
    marginLeft: 20
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

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      errorMessage: null
    };
  }

  handleSignUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(userCredentials => {
        return (
          userCredentials.user.updateProfile({
            displayName: this.state.name
          }) && alert("acho que deu")
        );
      })
      .catch(error => this.setState({ errorMessage: error.message }));
  };

  render() {
    return (
      <ImageBackground
        source={bgImage}
        style={styles.backgroundContainer}
        imageStyle={{ opacity: 0.7 }}
      >
        <View style={styles.allCont}>
          <ScrollView>
            <View style={{ padding: 20, marginTop: 30 }}>
              <Text style={styles.text}>Faça seu cadastro</Text>
              <Text style={styles.subtext}>e acompanhe seus gastos!</Text>
            </View>
            <View style={styles.line} />
            <View style={styles.errorMessage}>
              {this.state.errorMessage && (
                <Text style={styles.error}>{this.state.errorMessage}</Text>
              )}
            </View>
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
                  onChangeText={name => this.setState({ name })}
                  value={this.state.name}
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
                  secureTextEntry={true}
                  placeholderTextColor={"rgba(255, 255, 255, 0.7)"}
                  underlineColorAndroid="transparent"
                  autoCapitalize="none"
                  onChangeText={password => this.setState({ password })}
                  value={this.state.password}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 20,
                  justifyContent: "space-between"
                }}
              >
                <Icon
                  name={"md-time"}
                  size={28}
                  color="#ffffff"
                  style={styles.inputIconDate}
                />
                <Text
                  style={{
                    color: "#fff",
                    paddingLeft: 45,
                    borderBottomWidth: 1,
                    borderBottomColor: "#fff"
                  }}
                >
                  22/08/2019
                </Text>
                <Picker
                  style={styles.sexo}
                  // selectedValue={this.props.operacao}
                  // onValueChange={op => {
                  //   this.props.attOperacao(op);
                  // }}
                >
                  <Picker.Item label="Masculino" value="masc" />
                  <Picker.Item label="Feminino" value="fem" />
                </Picker>
              </View>
            </View>
            <View style={{ marginHorizontal: 20 }}>
              <TouchableOpacity
                style={styles.btnSignup}
                onPress={this.handleSignUp}
              >
                <Text style={styles.signup}>Cadastrar</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </ImageBackground>
    );
  }
}

export default SignUp;
