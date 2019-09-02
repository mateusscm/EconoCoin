import React, { Component } from "react";
import { StyleSheet } from "react-native";
import {
  ListItem,
  Body,
  Text,
  Right,
  Thumbnail,
  Left,
  Container
} from "native-base";

// const { width: WIDTH } = Dimensions.get("window");

const styles = StyleSheet.create({});

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
            color: "#cdcdcd",
            fontSize: 12,
            paddingTop: 5
          }}
        >
          -`${this.props.info.data}`-
        </Text>
        <ListItem avatar>
          <Left>
            <Thumbnail source={this.props.info.img} />
          </Left>
          <Body>
            <Text>{this.props.info.local}</Text>
            <Text note>{this.props.info.categoria}</Text>
          </Body>
          <Right>
            <Text>R${this.props.info.gasto}</Text>
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
