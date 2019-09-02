import React, { Component } from "react";
import { StyleSheet } from "react-native";
import {
  Content,
  Card,
  CardItem,
  Text,
  ListItem,
  Button,
  Icon
} from "native-base";
import InsideCardAccount from "./InsideCardAccount";

// const { width: WIDTH } = Dimensions.get("window");

const styles = StyleSheet.create({
  content: {
    width: "100%"
  },
  align: {
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    fontSize: 40,
    fontWeight: "bold"
  },
  subtext: {
    color: "grey"
  },
  border: {
    borderTopColor: "#cdcdcd",
    borderTopWidth: 0.5
  },
  mainTitle: {
    paddingTop: 10,
    paddingHorizontal: 18,
    paddingBottom: 5,
    fontWeight: "700",
    color: "#6e6e6e"
  }
});

class Accounts extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Content style={styles.content}>
        <Text style={styles.mainTitle}>CONTAS EXISTENTES</Text>
        {/* <InsideCardAccount />; */}
        {this.props.contas.map((conta, i) => {
          return <InsideCardAccount conta={conta} key={i} />;
        })}
        {/* {this.props.infos.map((info, i) => {
            return <InsideCardAccount info={info} key={i} />;
          })} */}
      </Content>
    );
  }
}

export default Accounts;
