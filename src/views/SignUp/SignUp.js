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
import { DatePicker, Spinner, Label } from "native-base";
import bgImage from "./../../assets/img/bg.jpg";
import Icon from "react-native-vector-icons/Ionicons";
import { theme } from "../../config/_theme";
import { ScrollView } from "react-native-gesture-handler";
// import DatePicker from "react-native-datepicker";
import { FA, FFS } from "../../Firebase";
import Reactotron from "reactotron-react-native";

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
    color: theme.palette.button,
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
    // paddingLeft: 45,
    color: "black",
    backgroundColor: "white",
    borderRadius: 25,
    borderBottomWidth: 1,
    borderBottomColor: theme.palette.txtPrimary
  },
  inputIcon: {
    position: "absolute",
    top: 8,
    left: 15,
    color: "#000000"
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
    backgroundColor: theme.palette.button,
    justifyContent: "center",
    marginTop: 30
  },
  signup: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 20,
    textAlign: "center"
  },
  sexo: {
    width: 150,
    color: theme.palette.txtPrimary,
    width: "100%",
    paddingVertical: 0
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
  },
  date: {
    width: "100%",
    paddingLeft: 45
  }
});

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first: "",
      last: "",
      email: "",
      password: "",
      sexo: "feminino",
      visibility: true,
      data: new Date().toISOString().split("T")[0],
      errorMessage: null,
      loading: false
    };
  }

  handleSignUp = async () => {
    try {
      this.setState({ loading: true });
      let userCredentials = await FA.createUserWithEmailAndPassword(
        this.state.email,
        this.state.password
      );
      await FFS.collection("users")
        .doc(userCredentials.user.uid)
        .set({
          email: this.state.email,
          first: this.state.first,
          last: this.state.last,
          sexo: this.state.sexo,
          data: this.state.data,
          visibility: this.state.visibility,
          id: userCredentials.user.uid
        });
      let con = await FFS.collection("user_conta")
        .doc(userCredentials.user.uid)
        .collection("contas")
        .doc();
      let cat = await FFS.collection("user_categoria")
        .doc(userCredentials.user.uid)
        .collection("categorias")
        .doc();
      await cat.set({
        id: cat.id,
        value: "Padrão"
      });
      await con.set({
        nome: "Carteira",
        sigla: "Ca",
        balance: "0",
        id: con.id
      });
      this.setState({ loading: false });
      return (
        userCredentials.user.updateProfile({
          displayName: this.state.first
        }) && alert("acho que deu")
      );
    } catch (error) {
      console.log(error);
      this.setState({ loading: false });
    }
  };

  setDate = newDate => {
    this.setState({ data: newDate.toISOString().split("T")[0] });
  };

  render() {
    console.log(this.state.data);
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
                {/* <Icon
                  name={"ios-person"}
                  size={28}
                  color="#000000"
                  style={styles.inputIcon}
                /> */}
                <TextInput
                  style={styles.input}
                  placeholder={"Nome"}
                  placeholderTextColor={"rgba(0, 0, 0, 0.7)"}
                  underlineColorAndroid="transparent"
                  onChangeText={first => this.setState({ first })}
                  value={this.state.first}
                />
              </View>
              <View style={styles.inputContainer}>
                {/* <Icon
                  name={"ios-person"}
                  size={28}
                  color="#000000"
                  style={styles.inputIcon}
                /> */}
                <TextInput
                  style={styles.input}
                  placeholder={"Sobrenome"}
                  placeholderTextColor={"rgba(0, 0, 0, 0.7)"}
                  underlineColorAndroid="transparent"
                  onChangeText={last => this.setState({ last })}
                  value={this.state.last}
                />
              </View>
              <View style={styles.inputContainer}>
                {/* <Icon
                  name={"ios-person"}
                  size={28}
                  color="#000000"
                  style={styles.inputIcon}
                /> */}
                <TextInput
                  style={styles.input}
                  placeholder={"E-mail"}
                  autoCompleteType="email"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  placeholderTextColor={"rgba(0, 0, 0, 0.7)"}
                  underlineColorAndroid="transparent"
                  onChangeText={email => this.setState({ email })}
                  value={this.state.email}
                />
              </View>
              <View style={styles.inputContainer}>
                {/* <Icon
                  name={"ios-lock"}
                  size={28}
                  color="#000000"
                  style={styles.inputIcon}
                /> */}
                <TextInput
                  style={styles.input}
                  placeholder={"Senha"}
                  secureTextEntry={true}
                  placeholderTextColor={"rgba(0, 0, 0, 0.7)"}
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
                  justifyContent: "space-between",
                  borderRadius: 25,
                  backgroundColor: "white",
                  width: "100%"
                }}
              >
                <Picker
                  style={styles.sexo}
                  selectedValue={this.state.sexo}
                  onValueChange={ev => {
                    this.setState({ sexo: ev });
                  }}
                >
                  <Picker.Item label="Masculino" value="masculino" />
                  <Picker.Item label="Feminino" value="feminino" />
                </Picker>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 20,
                  justifyContent: "space-between",
                  borderRadius: 25,
                  backgroundColor: "white",
                  width: "100%"
                }}
              >
                <DatePicker
                  defaultDate={new Date(1997, 4, 4)}
                  minimumDate={new Date(1900, 1, 1)}
                  maximumDate={new Date(2001, 1, 1)}
                  locale={"en"}
                  timeZoneOffsetInMinutes={undefined}
                  modalTransparent={false}
                  animationType={"fade"}
                  androidMode={"default"}
                  placeHolderText={`Data de Nascimento: ${this.state.data
                    .toString()
                    .substr(4, 12)}`}
                  textStyle={{ color: "black" }}
                  placeHolderTextStyle={{ color: "black" }}
                  onDateChange={this.setDate}
                  disabled={false}
                  style={styles.date}
                />
              </View>
            </View>
            <View style={{ marginHorizontal: 20 }}>
              <TouchableOpacity
                style={styles.btnSignup}
                onPress={this.handleSignUp}
              >
                {/* <Text style={styles.signup}>Cadastrar</Text> */}
                {this.state.loading ? (
                  <Spinner style={styles.spinner} color="green" />
                ) : (
                  <Text style={styles.signup}>Criar</Text>
                )}
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </ImageBackground>
    );
  }
}

export default SignUp;
