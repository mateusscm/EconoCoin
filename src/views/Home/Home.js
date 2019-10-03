import React, { Component } from "react";
import { StyleSheet, Text, ScrollView } from "react-native";
import { Container, View } from "native-base";
import FloatingButton from "./../../components/FloatingButton/FloatingButton";

import MenuButton from "./../../components/MenuButton/MenuButton";
import { theme } from "../../config/_theme";
import PreviewBalance from "../../components/PreviewBalance/PreviewBalance";
import ExtractSummary from "../../components/ExtractSummary/ExtractSummary";
import { FA, FFS } from "../../Firebase";

// import { infos } from "./../../data";

// const { width: WIDTH } = Dimensions.get("window");

const styles = StyleSheet.create({
  allCont: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: theme.palette.backgroundMain
  },
  opacity: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 1
  },
  text: {
    fontSize: 30,
    color: theme.palette.txtPrimary
  },
  line: {
    borderWidth: 1,
    borderColor: theme.palette.secondary,
    marginRight: 200,
    marginLeft: 20
  }
});

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      active: false,
      infos: []
    };
    this.toggleBtn = this.toggleBtn.bind(this);
  }

  componentDidMount() {
    this.getInfo();
  }

  getInfo = async () => {
    const user = await FA.currentUser;
    let temp = [];
    let resp = await FFS.collection("user_movimentacao")
      .doc(user.uid)
      .collection("movimentacoes")
      .limit(3)
      .get();

    if (!resp.empty) {
      resp.forEach(r => {
        temp.push(r.data());
      });
    }
    const newTotal = temp.reduce(
      (totalValue, inf) => totalValue + parseFloat(inf.balance),
      0
    );
    this.setState({ total: newTotal, infos: temp });
  };

  toggleBtn() {
    this.setState({ active: !this.state.active });
  }

  render() {
    return (
      <Container>
        <MenuButton view="Visão Geral" navigation={this.props.navigation} />
        <ScrollView style={{ width: "100%" }}>
          {/* <View style={this.state.active ? styles.opacity : null} /> */}
          <View style={styles.allCont}>
            <PreviewBalance view="Home" navigation={this.props.navigation} />
            <ExtractSummary
              view="Home"
              navigation={this.props.navigation}
              infos={this.state.infos}
              total={this.state.total}
            />
          </View>
        </ScrollView>
        <FloatingButton view="Home" navigation={this.props.navigation} />
      </Container>
    );
  }
}

export default Home;
