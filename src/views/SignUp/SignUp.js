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
import DatePicker from "react-native-datepicker";

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
    backgroundColor: "#59BF3F",
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
    color: "#fff",
    borderBottomColor: "#fff",
    borderBottomWidth: 1
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
              <DatePicker
                style={{ width: 150 }}
                mode="date"
                showIcon={false}
                format="DD-MM-YYYY"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                androidMode="spinner"
                customStyles={{
                  dateInput: {
                    color: "#fff",
                    paddingLeft: 15,
                    borderWidth: 0,
                    borderBottomWidth: 1,
                    borderBottomColor: "#fff"
                  },
                  dateText: {
                    color: "#fff"
                  },
                  dateIcon: {
                    position: "absolute",
                    left: 0,
                    top: 4,
                    marginLeft: 0
                  }
                }}
              />
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
            <TouchableOpacity style={styles.btnSignup} onPress={this.login}>
              <Text style={styles.signup}>Cadastrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

export default SignUp;
