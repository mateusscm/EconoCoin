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
  Button,
  Thumbnail
} from "native-base";
import { theme } from "../../config/_theme";
import IconM from "react-native-vector-icons/MaterialIcons";
import IconI from "react-native-vector-icons/Ionicons";
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
    borderLeftWidth: 10,
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

class ListCategories extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      // <Content style={{flex: 1}} scrollEnabled={false}>
        <View style={styles.standaloneRowFront}>
          <ListItem
            avatar
            style={{ borderBottomColor: "transparent", borderBottomWidth: 0.8}}
          >
            <Left>{/* <Thumbnail source={this.props.info.img} /> */}</Left>
            <Body
              style={{
                alignItems: "flex-start",
                justifyContent: "center",
                borderBottomColor: "transparent",
                borderBottomWidth: 0.8
              }}
            >
              <View>
                <Text style={{ fontSize: 20 }}>{this.props.info.value}</Text>
              </View>
            </Body>
            <Right
              style={{
                alignItems: "center",
                justifyContent: "flex-end",
                flex: 1,
                flexDirection: "row",
                borderBottomColor: "transparent",
                borderBottomWidth: 0.8
              }}
            >
              <Button transparent onPress={() => { this.props.navigation.navigate("DialogCategorie", { value: this.props.info.value, id: this.props.info.id }); }}>
                <IconM
                  color={styles.backTextWhite.color}
                  size={styles.backTextWhite.fontSize}
                  name="edit"
                />
              </Button>
              <Button transparent onPress={() => { this.props.onDelete(this.props.info); }}>
                <IconI
                  color={styles.backTextWhite.color}
                  size={styles.backTextWhite.fontSize}
                  name="ios-trash"
                />
              </Button>
            </Right>
          </ListItem>
        </View>
      // </Content >
    );
  }
}

export default ListCategories;
