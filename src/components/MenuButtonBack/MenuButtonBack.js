import React, { Component } from "react";
import { StyleSheet, StatusBar } from "react-native";
import {
  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Title,
  Text
} from "native-base";
import { theme } from "../../config/_theme";

// const { width: WIDTH } = Dimensions.get("window");

const styles = StyleSheet.create({
  menuPattern: {
    height: 60,
    backgroundColor: theme.palette.primary,
    elevation: 4
  },
  menuTransf: {
    height: 60,
    backgroundColor: "#6223a1",
    elevation: 4
  },
  menuReceita: {
    height: 60,
    backgroundColor: "#0f8387",
    elevation: 4
  },
  menuDespesa: {
    height: 60,
    backgroundColor: "#821d20",
    elevation: 4
  },
  menuIcon: {
    zIndex: 9,
    position: "absolute",
    top: 10,
    left: 20
  }
});

class MenuButtonBack extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <React.Fragment>
        <Header
          style={
            this.props.view === "Transferência"
              ? styles.menuTransf
              : this.props.view === "Receita"
              ? styles.menuReceita
              : this.props.view === "Despesa"
              ? styles.menuDespesa
              : styles.menuPattern
          }
        >
          <StatusBar backgroundColor="black" barStyle="light-content" />
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon
                type="MaterialIcons"
                name="close"
                style={{ color: theme.palette.fontColorIcon, fontSize: 30 }}
              />
            </Button>
          </Left>
          <Body>
            <Title>{this.props.view}</Title>
          </Body>
          <Right />
          {/* <Text style={{ color: "white", marginRight: 10 }}>SALVAR</Text>
          </Right> */}
        </Header>
      </React.Fragment>
      // <View style={styles.menu}>
      //   <Icon
      //     name="md-menu"
      //     color="#fff"
      //     size={32}
      //     style={styles.menuIcon}
      //     onPress={() => this.props.navigation.toggleDrawer()}
      //   />
      // </View>
    );
  }
}

export default MenuButtonBack;
