import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";

import MenuButton from "./../../components/MenuButton/MenuButton";
import { theme } from "../../config/_theme";

const styles = StyleSheet.create({
  allCont: {
    flex: 1,
    backgroundColor: theme.palette.backgroundMain
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
  description: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

class Profile extends Component {
  render() {
    return (
      <View style={styles.allCont}>
        <MenuButton navigation={this.props.navigation} />
        <View style={styles.header}>
          <View style={styles.profile}>
            <View style={styles.imgView}>
              <Image
                style={styles.img}
                source={require("../../assets/img/logo.png")}
              />
            </View>
            <View style={styles.profileText}>
              <Text style={styles.name}>Usuário 1</Text>
              {/* <Text style={styles.subname}>Ver Perfil</Text> */}
            </View>
          </View>
        </View>
        <View style={styles.description}>
          <Text style={styles.text}>Profile</Text>
        </View>
      </View>
    );
  }
}

export default Profile;
