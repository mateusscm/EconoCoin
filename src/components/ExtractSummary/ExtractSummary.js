import React, { Component } from "react";
import { StyleSheet, ImageBackground, View } from "react-native";
import { Content, Card, CardItem, Text, ListItem } from "native-base";
import ContentExtract from "./ContentExtract";
import Reactotron from "reactotron-react-native";

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
    color: "#000"
  },
  insideImage: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  price: {
    fontWeight: "bold",
    fontSize: 25,
    color: "green"
  },
  priceNeg: {
    fontWeight: "bold",
    fontSize: 25,
    color: "red"
  },
  total: {
    // fontWeight: "bold",
    fontSize: 25
  }
});

class ExtractSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    // Reactotron.log(this.props.infos.length, "INFOS");
    return (
      <Content style={styles.content}>
        {this.props.view === "Home" ? (
          <Text style={styles.mainTitle}>ÚLTIMAS 3 MOVIMENTAÇÕES</Text>
        ) : (
          <Text style={styles.mainTitle}>EXTRATO COMPLETO</Text>
        )}
        {this.props && this.props.infos.length > 0 ? (
          <Card style={{ zIndex: 0, paddingLeft: 0 }}>
            {this.props.infos.map((info, i) => {
              return <ContentExtract info={info} key={i} />;
            })}
            <CardItem style={{ justifyContent: "flex-end" }}>
              <Text style={styles.total}>Total: </Text>
              <Text
                style={this.props.total >= 0 ? styles.price : styles.priceNeg}
              >
                R${this.props.total}
              </Text>
            </CardItem>
          </Card>
        ) : (
          <Card style={{ zIndex: 0, paddingVertical: 10 }}>
            <ImageBackground
              imageStyle={{ opacity: 0.5 }}
              style={{ width: "100%", height: 300, marginTop: 10 }}
              source={require("./../../assets/img/empty_extract.png")}
            >
              <View style={styles.insideImage}>
                <Text>Você não possui extrato no momento</Text>
              </View>
            </ImageBackground>
          </Card>
        )}
      </Content>
    );
  }
}

export default ExtractSummary;
