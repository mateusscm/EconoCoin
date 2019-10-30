import React, { Component } from "react";
import { StyleSheet } from "react-native";
import {
  Content,
  View,
  Text,
  ListItem,
  Left,
  Body,
  Right,
  Button
} from "native-base";
import { theme } from "../../config/_theme";
import Icon from "react-native-vector-icons/Ionicons";
// const { width: WIDTH } = Dimensions.get("window");

const styles = StyleSheet.create({
  allCont: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.palette.backgroundMain
  },
  text: {
    fontSize: 30,
    color: theme.palette.txtPrimary
  },
  standaloneRowFront: {
    backgroundColor: "#fff",
    justifyContent: "center",
    width: "100%",
    borderLeftColor: "#8BC645",
    borderLeftWidth: 10
  },
  standaloneRowBack: {
    alignItems: "center",
    backgroundColor: "#8BC645",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    borderColor: "white"
  },
  backTextWhite: {
    color: "#000",
    fontSize: 35
  }
});

class InsideCardAccounts extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Content scrollEnabled={false}>
        <View style={styles.standaloneRowFront}>
          <ListItem avatar>
            <Left style={{ alignItems: "center", justifyContent: "center" }}>
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 50,
                  backgroundColor: "#365280",
                  marginBottom: 10,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Text style={{ fontSize: 30, color: "white" }}>
                  {this.props.conta.sigla}
                </Text>
              </View>
            </Left>
            <Body
              style={{
                alignItems: "flex-start",
                justifyContent: "center",
                borderBottomColor: "#cdcdcd",
                borderBottomWidth: 0.8
              }}
            >
              <View style={{ width: 150 }}>
                <Text style={{ fontSize: 20 }}>{this.props.conta.nome}</Text>
                <Text note>R${this.props.conta.balance}</Text>
              </View>
            </Body>
            <Right
              style={{
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
                flexDirection: "row",
                justifyContent: "flex-end"
              }}
            >
              {/* <Button transparent onPress={() => alert("editando")}>
                <Icon
                  style={styles.backTextWhite}
                  type="MaterialIcons"
                  name="edit"
                />
              </Button> */}
              <Button
                transparent
                onPress={() => {
                  this.props.onDelete(this.props.conta);
                }}
              >
                <Icon
                  color={styles.backTextWhite.color}
                  size={styles.backTextWhite.fontSize}
                  name="ios-trash"
                />
              </Button>
            </Right>
          </ListItem>
        </View>
      </Content>
    );
  }
}

export default InsideCardAccounts;
