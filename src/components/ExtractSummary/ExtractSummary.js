import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Content, Card, CardItem, Text, ListItem } from "native-base";
import ContentExtract from "./ContentExtract";

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
        {this.props.view === "Home" ? (
          <Text style={styles.mainTitle}>RESUMO DE EXTRATO</Text>
        ) : (
          <Text style={styles.mainTitle}>EXTRATO COMPLETO</Text>
        )}
        <Card style={{ zIndex: 0, marginBottom: 20 }}>
          {this.props.infos.map((info, i) => {
            return <ContentExtract info={info} key={i} />;
          })}
          <CardItem style={{ justifyContent: "flex-end" }}>
            <Text>Total: R${this.props.total}</Text>
          </CardItem>
          {this.props.view === "Home" ? (
            <CardItem
              style={[styles.align, styles.border]}
              footer
              bordered
              button
              onPress={() => this.props.navigation.navigate("Extract")}
            >
              <Text>Conferir Extrato Total</Text>
            </CardItem>
          ) : null}
        </Card>
      </Content>
    );
  }
}

export default ExtractSummary;
