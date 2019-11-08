import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import PreviewBalance from "./../../components/PreviewBalance/PreviewBalance";
import MenuButton from "./../../components/MenuButton/MenuButton";
import { Button, Tab, Tabs } from "native-base";
import { theme } from "../../config/_theme";
import Accounts from "../../components/Accounts/Accounts";
import Categories from "../../components/Categories/Categories";
import { ScrollView } from "react-native-gesture-handler";
import FloatingButton from "../../components/FloatingButton/FloatingButton";

import { contas, infos } from "./../../data";
import AddAccount from "../../components/FloatingButton/AddAccount";

// const { width: WIDTH } = Dimensions.get("window");

const styles = StyleSheet.create({
  allCont: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    paddingHorizontal: 10,
    backgroundColor: theme.palette.backgroundMain
  },
  text: {
    fontSize: 30,
    color: theme.palette.txtPrimary
  },
  fontColor: {
    color: "#fff",
    fontSize: 32
  }
});

class AccountBalance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogVisible: false
    };
    this.child = React.createRef();
  }

  showDialog = () => {
    this.setState({ dialogVisible: true });
  };

  handleCancel = () => {
    this.setState({ dialogVisible: false });
  };

  componentDidUpdate() {
    if (this.props.navigation.getParam("value", "") !== "") {
      this.child.current.update();
    }
  }

  render() {
    return (
      <React.Fragment>
        {/* <Button
          style={{
            position: "absolute",
            right: 10,
            top: 35,
            zIndex: 1000,
            width: 40,
            height: 40,
            backgroundColor: "#36a386",
            borderRadius: 50,
            alignItems: "center",
            justifyContent: "center"
          }}
          transparent
          onPress={() => alert("add")}
        >
          <Text style={styles.fontColor}>+</Text>
        </Button> */}
        <MenuButton
          view="Contas e Categorias"
          navigation={this.props.navigation}
        />
        <Tabs tabS>
          <Tab
            tabStyle={{ backgroundColor: theme.palette.secondary }}
            activeTabStyle={{ backgroundColor: theme.palette.secondary }}
            heading="Contas"
          >
            <ScrollView style={styles.allCont}>
              {/* <View style={styles.allCont}> */}
              {/* <PreviewBalance
                info={this.props.navigation.getParam("info")}
                navigation={this.props.navigation}
              /> */}
              <Accounts contas={contas} />
              {/* </View> */}
            </ScrollView>
            <AddAccount view="Conta" navigation={this.props.navigation} />
          </Tab>
          <Tab
            tabStyle={{ backgroundColor: theme.palette.secondary }}
            activeTabStyle={{ backgroundColor: theme.palette.secondary }}
            heading="Categorias"
          >
            <ScrollView style={styles.allCont}>
              {/* <View style={styles.allCont}> */}
              <Categories ref={this.child} navigation={this.props.navigation} />
              {/* </View> */}
            </ScrollView>
            <FloatingButton
              view="Categoria"
              navigation={this.props.navigation}
              showDialog={this.showDialog}
              handleCancel={this.handleCancel}
              dialogVisible={this.state.dialogVisible}
            />
          </Tab>
        </Tabs>
      </React.Fragment>
    );
  }
}

export default AccountBalance;
