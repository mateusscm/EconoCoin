import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Content, Card, CardItem, Text, ListItem } from "native-base";
import ContentExtract from "./ContentExtract";

// const { width: WIDTH } = Dimensions.get("window");

const styles = StyleSheet.create({
  content: {
    width: "95%"
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
    paddingHorizontal: 10,
    paddingBottom: 5,
    fontWeight: "700",
    color: "#6e6e6e"
  }
});

class ExtractSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Content style={styles.content}>
        <Text style={styles.mainTitle}>RESUMO DE EXTRATO</Text>
        <Card>
          {this.props.infos.map((info, i) => {
            return <ContentExtract info={info} key={i} />;
          })}
          <CardItem style={{ justifyContent: "flex-end" }}>
            <Text>Total: R${this.props.total}</Text>
          </CardItem>
          <CardItem
            style={[styles.align, styles.border]}
            footer
            bordered
            button
            onPress={() => alert("This is Card Footer")}
          >
            <Text>Conferir Extrato</Text>
          </CardItem>
        </Card>
      </Content>
    );
  }
}

export default ExtractSummary;
