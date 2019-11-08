import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TextInput
} from "react-native";
import { Form, Item, Label, Input, Button } from "native-base";

import MenuButton from "./../../components/MenuButton/MenuButton";
import { theme } from "../../config/_theme";
import { FA } from "../../Firebase";
import { ScrollView } from "react-native-gesture-handler";
import bg from "./../../assets/img/bg.jpg";

const styles = StyleSheet.create({
  allCont: {
    flex: 1,
    backgroundColor: theme.palette.backgroundMain
  },
  scroller: {
    flex: 1
  },
  text: {
    fontSize: 30,
    color: theme.palette.txtPrimary
  },
  header: {
    height: 250,
    backgroundColor: theme.palette.secondary,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 0
  },
  profile: {
    flex: 1,
    alignItems: "center",
    paddingTop: 25
  },
  imgView: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20
  },
  img: {
    height: 150,
    width: 150,
    borderRadius: 50
  },
  profileText: {
    justifyContent: "center",
    marginBottom: 20
  },
  name: {
    fontSize: 30,
    paddingBottom: 5,
    color: "white",
    textAlign: "left"
  },
  subname: {
    fontSize: 16,
    paddingBottom: 5,
    color: "white",
    textAlign: "left"
  },
  data: {
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 10
  },
  description: {
    width: "100%",
    marginLeft: 0,
    paddingLeft: 0,
    paddingRight: 0,
    marginRight: 0
  },
  save: {
    flex: 1
  },
  btnLogout: {
    backgroundColor: "black",
    height: 50,
    alignItems: "center",
    justifyContent: "center"
  },
  txtBtn: {
    textTransform: "uppercase",
    color: "white"
  }
});

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      displayName: ""
    };
  }

  componentDidMount() {
    const { email, displayName } = FA.currentUser;

    this.setState({ email, displayName });
  }

  render() {
    return (
      <View style={styles.allCont}>
        <MenuButton view="Perfil" navigation={this.props.navigation} />
        <ScrollView style={styles.scroller}>
          <ImageBackground
            source={bg}
            imageStyle={{ opacity: 0.5 }}
            style={styles.header}
          >
            <View style={styles.profile}>
              <View style={styles.imgView}>
                <Image
                  style={styles.img}
                  source={require("../../assets/img/logo.png")}
                />
              </View>
              <View style={styles.profileText}>
                <Text style={styles.name}>{this.state.displayName}</Text>
                {/* <Text style={styles.subname}>Ver Perfil</Text> */}
              </View>
            </View>
          </ImageBackground>
          <View style={styles.data}>
            <Form>
              <Item stackedLabel style={styles.description}>
                <Label
                  style={{
                    fontSize: 18,
                    paddingLeft: 0,
                    color: "rgba(0, 0, 0, 0.5)"
                  }}
                >
                  Nome do usuário
                </Label>
                <TextInput
                  value={this.state.displayName}
                  style={{
                    fontSize: 18,
                    // paddingLeft: 5,
                    paddingVertical: 5,
                    width: "100%"
                  }}
                />
              </Item>
              <Item stackedLabel style={styles.description}>
                <Label
                  style={{
                    fontSize: 18,
                    paddingLeft: 0,
                    color: "rgba(0, 0, 0, 0.5)"
                  }}
                >
                  Email
                </Label>
                <TextInput
                  disabled
                  style={{
                    fontSize: 18,
                    // paddingLeft: 5,
                    paddingVertical: 5,
                    width: "100%",
                    borderBottomWidth: 1,
                    borderBottomColor: "#000"
                  }}
                  value={this.state.email}
                />
              </Item>
              {/* <Item stackedLabel style={styles.description}>
                <Label
                  style={{
                    fontSize: 18,
                    paddingLeft: 0,
                    color: "rgba(0, 0, 0, 0.5)"
                  }}
                >
                  Senha atual
                </Label>
                <TextInput
                  style={{
                    fontSize: 18,
                    // paddingLeft: 5,
                    paddingVertical: 5,
                    width: "100%"
                  }}
                  secureTextEntry={true}
                  // value={this.state.email}
                />
              </Item>
              <Item stackedLabel style={styles.description}>
                <Label
                  style={{
                    fontSize: 18,
                    paddingLeft: 0,
                    color: "rgba(0, 0, 0, 0.5)"
                  }}
                >
                  Nova Senha
                </Label>
                <TextInput
                  style={{
                    fontSize: 18,
                    // paddingLeft: 5,
                    paddingVertical: 5,
                    width: "100%"
                  }}
                  secureTextEntry={true}
                  // value={this.state.email}
                />
              </Item> */}
              <Button
                full
                style={{
                  backgroundColor: theme.palette.button,
                  marginVertical: 20
                }}
              >
                <Text style={styles.txtBtn}>Salvar</Text>
              </Button>
            </Form>
          </View>
        </ScrollView>
        {/* <View style={styles.save}>
            <TouchableOpacity onPress={this.logout} style={styles.btnLogout}>
              <Text style={{ color: "#fff" }}>Sair</Text>
            </TouchableOpacity>
          </View> */}
      </View>
    );
  }
}

export default Profile;
