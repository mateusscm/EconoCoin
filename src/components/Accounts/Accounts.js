import React, { Component } from "react";
import { StyleSheet, Alert, RefreshControl, ScrollView } from "react-native";
import { Content, Text, Spinner } from "native-base";
import InsideCardAccount from "./InsideCardAccount";
import { FA, FFS } from "../../Firebase";
import Reactotron from "reactotron-react-native";
import { theme } from "../../config/_theme";
import { connect } from "react-redux";

// const { width: WIDTH } = Dimensions.get("window");

const styles = StyleSheet.create({
  allCont: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    paddingHorizontal: 10,
    backgroundColor: theme.palette.backgroundMain
  },
  content: {
    width: "100%",
    paddingBottom: 50
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
    this.state = {
      contas: [],
      loading: false,
      refreshing: false
    };
  }

  _onRefresh() {
    this.setState({ refreshing: true });
    this.props.update().then(() => {
      this.setState({ refreshing: false });
    });
  }

  onDelete = info => {
    Alert.alert("Confirmando", "Tem certeza que deseja excluir esta Conta?", [
      {
        text: "NÃO",
        // onPress: () => console.warn("NO Pressed"),
        style: "cancel"
      },
      {
        text: "SIM",
        onPress: async () => {
          try {
            let user = await FA.currentUser;
            await FFS.collection("user_conta")
              .doc(user.uid)
              .collection("contas")
              .doc(info.id)
              .delete();

            this.props.update();
          } catch (err) {
            if (err) {
              alert("Algo deu errado! Tente novamente mais tarde.");
            }
          }
        }
      }
    ]);
  };

  render() {
    return (
      <ScrollView
        style={styles.allCont}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}
          />
        }
      >
        <Content style={styles.content}>
          <Text style={styles.mainTitle}>CONTAS EXISTENTES</Text>
          {!this.state.loading ? null : <Spinner color="green" />}
          {this.props && this.props.contas && this.props.contas.length > 0
            ? this.props.contas.map((conta, i) => {
                return (
                  <InsideCardAccount
                    conta={conta}
                    key={i}
                    onDelete={e => {
                      this.onDelete(e);
                    }}
                  />
                );
              })
            : null}
          {/* {this.props.infos.map((info, i) => {
            return <InsideCardAccount info={info} key={i} />;
          })} */}
        </Content>
      </ScrollView>
    );
  }
}

const mapStateToProps = store => ({
  contas:
    store && store.cc && store.cc.cc && store.cc.cc.contas
      ? store.cc.cc.contas
      : [],
});

export default connect(mapStateToProps)(Accounts);
