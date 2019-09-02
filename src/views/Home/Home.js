import React, { Component } from "react";
import { StyleSheet, Text, ScrollView } from "react-native";
import { Container, View } from "native-base";
import FloatingButtonHome from "./../../components/FloatingButtonHome/FloatingButtonHome";

import MenuButton from "./../../components/MenuButton/MenuButton";
import { theme } from "../../config/_theme";
import PreviewBalance from "../../components/PreviewBalance/PreviewBalance";
import ExtractSummary from "../../components/ExtractSummary/ExtractSummary";

import burger from "./../../assets/img/burger.png";
import shirt from "./../../assets/img/shirt.png";

// const { width: WIDTH } = Dimensions.get("window");

const styles = StyleSheet.create({
  allCont: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: theme.palette.backgroundMain
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

const infos = [
  {
    data: "28/08/2019",
    img: "./../../assets/img/burger.png",
    local: "Lanchonete Kastor",
    categoria: "Alimentação",
    gasto: 28.0
  },
  {
    data: "29/08/2019",
    img: "./../../assets/img/shirt.png",
    local: "Riachuelo",
    categoria: "Roupas",
    gasto: 125.9
  }
  // {
  //   data: '',
  //   img: {},
  //   local: '',
  //   categoria: '',
  //   gasto: ''
  // },
  // {
  //   data: '',
  //   img: {},
  //   local: '',
  //   categoria: '',
  //   gasto: ''
  // },
];

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0
    };
  }

  componentDidMount() {
    const newTotal = infos.reduce(
      (totalValue, inf) => totalValue + inf.gasto,
      0
    );
    this.setState({ total: newTotal });
  }

  render() {
    return (
      <Container>
        <MenuButton navigation={this.props.navigation} />
        <View style={styles.allCont}>
          <PreviewBalance view="Home" navigation={this.props.navigation} />
          <ExtractSummary view="Home" infos={infos} total={this.state.total} />
          <FloatingButtonHome navigation={this.props.navigation} />
        </View>
      </Container>
    );
  }
}

export default Home;
