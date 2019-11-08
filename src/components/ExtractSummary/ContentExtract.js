import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { ListItem, Body, Text, Right, Thumbnail, Left } from "native-base";
import logo from "./../../assets/img/logo.png";

// const { width: WIDTH } = Dimensions.get("window");

const styles = StyleSheet.create({
  price: {
    fontWeight: "bold",
    fontSize: 25,
    color: "green"
  },
  priceNeg: {
    fontWeight: "bold",
    fontSize: 25,
    color: "red"
  }
});

class ContentExtract extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <Text
          style={{
            textAlign: "center",
            color: "#919191",
            fontSize: 12,
            paddingTop: 5,
            fontWeight: "bold"
          }}
        >
          -{this.props.info.data}-
        </Text>
        <ListItem avatar>
          <Left>
            <Thumbnail source={logo} />
          </Left>
          <Body>
            <Text style={{ fontWeight: "bold" }}>
              {this.props.info.descricao}
            </Text>
            <Text note>{this.props.info.categoria}</Text>
            <Text note>{this.props.info.conta}</Text>
          </Body>
          <Right>
            <Text
              style={
                this.props.info.balance >= 0 ? styles.price : styles.priceNeg
              }
            >
              R${this.props.info.balance}
            </Text>
          </Right>
        </ListItem>
        {/* <CardItem header>
          <Body style={styles.align}>
            <Text style={styles.title}>{this.props.info.data}</Text>
            <Text style={styles.subtext}>{this.props.info.local}</Text>
          </Body>
          <Right>
            <Thumbnail source={this.props.info.img} />
          </Right>
        </CardItem> */}
      </>
    );
  }
}

export default ContentExtract;
