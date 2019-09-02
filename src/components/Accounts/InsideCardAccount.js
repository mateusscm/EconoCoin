import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { SwipeListView, SwipeRow } from "react-native-swipe-list-view";
import {
  Content,
  View,
  Text,
  ListItem,
  Left,
  Body,
  Right,
  Button,
  Icon
} from "native-base";
import { theme } from "../../config/_theme";

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
    borderRightColor: "#8BC645",
    borderRightWidth: 10
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
    color: "#FFF",
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
        <SwipeRow leftOpenValue={0} rightOpenValue={-150}>
          <View style={styles.standaloneRowBack}>
            <Text style={styles.backTextWhite}></Text>
            <Right
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "flex-end",
                justifyContent: "flex-end",
                width: 150,
                paddingRight: 15
              }}
            >
              <Button transparent onPress={() => alert("editando")}>
                <Icon
                  style={styles.backTextWhite}
                  type="MaterialIcons"
                  name="edit"
                />
              </Button>
              <Button transparent onPress={() => alert("excluindo")}>
                <Icon
                  style={styles.backTextWhite}
                  type="Ionicons"
                  name="ios-trash"
                />
              </Button>
            </Right>
          </View>
          <View style={styles.standaloneRowFront}>
            <ListItem avatar>
              <Left style={{ alignItems: "center", justifyContent: "center" }}>
                <View
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 50,
                    backgroundColor: "#cd0293",
                    marginBottom: 10,
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <Text style={{ fontSize: 30 }}>{this.props.conta.sigla}</Text>
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
                <Text style={{ fontSize: 20 }}>{this.props.conta.nome}</Text>
              </Body>
              <Right style={{ alignItems: "center", justifyContent: "center" }}>
                <Text style={{ fontSize: 20, color: "#cdcdcd" }}>
                  R${this.props.conta.saldo}
                </Text>
              </Right>
            </ListItem>
          </View>
        </SwipeRow>
      </Content>
    );
  }
}

export default InsideCardAccounts;
