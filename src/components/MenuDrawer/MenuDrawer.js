import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  Platform,
  Dimensions,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

export default class MenuDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  navLink(nav, text) {
    return (
      <TouchableOpacity
        style={{ height: 50 }}
        onPress={() => this.props.navigation.navigate(nav)}
      >
        <Text style={styles.link}>{text}</Text>
      </TouchableOpacity>
    );
  }

  logout = async () => {
    AsyncStorage.clear();
    this.props.navigation.navigate("AuthLoading");
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scroller}>
          <TouchableOpacity
            style={styles.topLinks}
            onPress={() => {
              this.props.navigation.navigate("Profile");
            }}
          >
            <View style={styles.profile}>
              <View style={styles.imgView}>
                <Image
                  style={styles.img}
                  source={require("../../assets/img/logo.png")}
                />
              </View>
              <View style={styles.profileText}>
                <Text style={styles.name}>Usuário 1</Text>
                <Text style={styles.subname}>Ver Perfil</Text>
              </View>
            </View>
          </TouchableOpacity>
          <View style={styles.bottomLinks}>
            {this.navLink("Home", "Home")}
            {this.navLink("Settings", "Settings")}
          </View>
        </ScrollView>
        <TouchableOpacity onPress={this.logout} style={styles.btnLogout}>
          <Text style={{ color: "#fff" }}>Sair</Text>
        </TouchableOpacity>
        <View style={styles.footer}>
          <Text style={styles.description}>EconoCoin</Text>
          <Text style={styles.version}>v1.0</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black"
  },
  scroller: {
    flex: 1
  },
  profile: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 25,
    borderBottomWidth: 1,
    borderBottomColor: "#777777"
  },
  profileText: {
    flex: 3,
    flexDirection: "column",
    justifyContent: "center"
  },
  name: {
    fontSize: 20,
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
  imgView: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20
  },
  img: {
    height: 70,
    width: 70,
    borderRadius: 50
  },
  topLinks: {
    height: 160,
    backgroundColor: "#59BF3F"
  },
  bottomLinks: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 10,
    paddingBottom: 450
  },
  link: {
    flex: 1,
    fontSize: 20,
    padding: 6,
    paddingLeft: 14,
    margin: 5,
    textAlign: "left"
  },
  footer: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white"
    // borderTopWidth: 1,
    // borderTopColor: "lightgray"
  },
  version: {
    flex: 1,
    textAlign: "right",
    marginRight: 20,
    color: "gray"
  },
  description: {
    flex: 1,
    marginLeft: 20,
    fontSize: 16
  },
  btnLogout: {
    backgroundColor: "black",
    height: 50,
    alignItems: "center",
    justifyContent: "center"
  }
});
