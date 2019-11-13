import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  Platform,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  ImageBackground
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { Icon } from "native-base";
import { theme } from "../../config/_theme";
import { FA, FFS } from "../../Firebase";
import bg from "./../../assets/img/bg.jpg";

const MenuDrawer = props => {
  const [first, setFirst] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [id, setUsrId] = React.useState("");

  React.useEffect(() => {
    const getUser = async () => {
      const usr = await FA.currentUser;
      const ref = await FFS.collection("users")
        .doc(usr.uid)
        .get();
      if (ref.exists) {
        const u = ref.data();
        setEmail(u.email);
        setFirst(u.first);
        setUsrId(u.id);
      }
    };
    getUser();
  }, []);

  const navLink = (nav, text, typeIcon, icon) => {
    return (
      <TouchableOpacity
        style={{
          height: 50,
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 10
        }}
        onPress={() => props.navigation.navigate(nav)}
      >
        <Icon style={styles.linkColor} type={typeIcon} name={icon} />
        <Text style={[styles.link, styles.linkColor]}>{text}</Text>
      </TouchableOpacity>
    );
  };

  const logout = async () => {
    AsyncStorage.clear();
    FA.signOut();
    props.navigation.navigate("AuthLoading");
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroller}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("Profile");
          }}
        >
          <ImageBackground
            source={bg}
            imageStyle={{ opacity: 0.5 }}
            style={styles.topLinks}
          >
            <View style={styles.profile}>
              <View style={styles.imgView}>
                <Image
                  style={styles.img}
                  source={require("../../assets/img/logo.png")}
                />
              </View>
              <View style={styles.profileText}>
                <Text style={styles.name}>{first}</Text>
                <Text style={styles.subname}>Ver Perfil</Text>
              </View>
            </View>
          </ImageBackground>
        </TouchableOpacity>
        <View style={styles.bottomLinks}>
          {navLink("Home", "Visão Geral", "MaterialIcons", "dashboard")}
          {navLink(
            "AccountBalance",
            "Contas e Categorias",
            "MaterialIcons",
            "playlist-add"
          )}
          {navLink(
            "Extract",
            "Extrato",
            "MaterialIcons",
            "account-balance-wallet"
          )}
          {navLink(
            "Indicators",
            "Indicadores",
            "MaterialCommunityIcons",
            "chart-areaspline"
          )}
        </View>
      </ScrollView>
      <TouchableOpacity onPress={logout} style={styles.btnLogout}>
        <Text style={{ color: "#fff" }}>Sair</Text>
      </TouchableOpacity>
      <View style={styles.footer}>
        <Text style={styles.description}>EconoCoin</Text>
        <Text style={styles.version}>v1.0</Text>
      </View>
    </View>
  );
};

export default MenuDrawer;

// export default class MenuDrawer extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       email: "",
//       first: ""
//     };
//   }

//   async componentDidMount() {
//     const { email, first } = FA.currentUser;

//     this.setState({ email, first });
//   }

//   navLink(nav, text, typeIcon, icon) {
//     return (
//       <TouchableOpacity
//         style={{
//           height: 50,
//           flexDirection: "row",
//           alignItems: "center",
//           paddingHorizontal: 10
//         }}
//         onPress={() => this.props.navigation.navigate(nav)}
//       >
//         <Icon style={styles.linkColor} type={typeIcon} name={icon} />
//         <Text style={[styles.link, styles.linkColor]}>{text}</Text>
//       </TouchableOpacity>
//     );
//   }

//   logout = async () => {
//     AsyncStorage.clear();
//     FA.signOut();
//     this.props.navigation.navigate("AuthLoading");
//   };

//   render() {
//     return (
//       <View style={styles.container}>
//         <ScrollView style={styles.scroller}>
//           <TouchableOpacity
//             onPress={() => {
//               this.props.navigation.navigate("Profile");
//             }}
//           >
//             <ImageBackground
//               source={bg}
//               imageStyle={{ opacity: 0.5 }}
//               style={styles.topLinks}
//             >
//               <View style={styles.profile}>
//                 <View style={styles.imgView}>
//                   <Image
//                     style={styles.img}
//                     source={require("../../assets/img/logo.png")}
//                   />
//                 </View>
//                 <View style={styles.profileText}>
//                   <Text style={styles.name}>{this.state.first}</Text>
//                   <Text style={styles.subname}>Ver Perfil</Text>
//                 </View>
//               </View>
//             </ImageBackground>
//           </TouchableOpacity>
//           <View style={styles.bottomLinks}>
//             {this.navLink("Home", "Visão Geral", "MaterialIcons", "dashboard")}
//             {this.navLink(
//               "AccountBalance",
//               "Contas e Categorias",
//               "MaterialIcons",
//               "playlist-add"
//             )}
//             {this.navLink(
//               "Extract",
//               "Extrato",
//               "MaterialIcons",
//               "account-balance-wallet"
//             )}
//             {this.navLink(
//               "Indicators",
//               "Indicadores",
//               "MaterialCommunityIcons",
//               "chart-areaspline"
//             )}
//           </View>
//         </ScrollView>
//         <TouchableOpacity onPress={this.logout} style={styles.btnLogout}>
//           <Text style={{ color: "#fff" }}>Sair</Text>
//         </TouchableOpacity>
//         <View style={styles.footer}>
//           <Text style={styles.description}>EconoCoin</Text>
//           <Text style={styles.version}>v1.0</Text>
//         </View>
//       </View>
//     );
//   }
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.palette.bgTxtSideMenu
  },
  scroller: {
    flex: 1
  },
  profile: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 25
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
    backgroundColor: theme.palette.secondary
  },
  bottomLinks: {
    flex: 1,
    backgroundColor: theme.palette.bgTxtSideMenu,
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
  linkColor: {
    color: theme.palette.textSideMenu
  },
  footer: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.palette.bgTxtSideMenu
  },
  version: {
    flex: 1,
    textAlign: "right",
    marginRight: 20,
    color: theme.palette.textSideMenu
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
