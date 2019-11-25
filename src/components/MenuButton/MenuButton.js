import React, { Component } from "react";
import {
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  SafeAreaView
} from "react-native";
import { Icon, Header, Left, Body, Right, Button, Title } from "native-base";
import { theme } from "../../config/_theme";
import IconI from "react-native-vector-icons/Ionicons";
import Reactotron from "reactotron-react-native";

// const { width: WIDTH } = Dimensions.get("window");

const styles = StyleSheet.create({
  menu: {
    height: 60,
    backgroundColor: theme.palette.primary,
    elevation: 4
  },
  menuIcon: {
    zIndex: 9,
    position: "absolute",
    top: 10,
    left: 20
  },
  icon: {
    color: theme.palette.fontColorIcon,
    fontSize: 32
  }
});

function MenuButton(props) {
  // Reactotron.log(props.onPressIconMoney);
  return (
    <SafeAreaView>
      <Header style={styles.menu}>
        <StatusBar backgroundColor="black" barStyle="light-content" />
        <Left>
          <Button
            transparent
            onPress={() => props.navigation.toggleDrawer()}
            style={{ paddingHorizontal: 20 }}
          >
            <Icon type="Ionicons" name="md-menu" style={styles.icon} />
          </Button>
        </Left>
        <Body>
          <Title style={{ fontWeight: "bold" }}>{props.view}</Title>
        </Body>
        {props.view === "Visão Geral" ? (
          <Right>
            <TouchableOpacity
              style={{ paddingHorizontal: 20 }}
              onPress={props.onPressIconMoney}
            >
              <IconI
                name={props.visibility ? "ios-eye" : "ios-eye-off"}
                size={26}
                color="#ffffff"
              />
            </TouchableOpacity>
          </Right>
        ) : (
          <Right />
        )}
      </Header>
    </SafeAreaView>
  );
}

// class MenuButton extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {};
//   }
//   render() {
//     return (
//       <React.Fragment>
//         <Header style={styles.menu}>
//           <StatusBar backgroundColor="black" barStyle="light-content" />
//           <Left>
//             <Button
//               transparent
//               onPress={() => this.props.navigation.toggleDrawer()}
//               style={{ paddingHorizontal: 20 }}
//             >
//               <Icon type="Ionicons" name="md-menu" style={styles.icon} />
//             </Button>
//           </Left>
//           <Body>
//             <Title style={{ fontWeight: "bold" }}>{this.props.view}</Title>
//           </Body>
//           <Right />
//         </Header>
//       </React.Fragment>
//     );
//   }
// }

export default MenuButton;
