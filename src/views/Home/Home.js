import React, { Component } from "react";
import { StyleSheet, ScrollView, RefreshControl } from "react-native";
import { Container, View, Spinner, Text } from "native-base";
import FloatingButton from "./../../components/FloatingButton/FloatingButton";

import MenuButton from "./../../components/MenuButton/MenuButton";
import { theme } from "../../config/_theme";
import PreviewBalance from "../../components/PreviewBalance/PreviewBalance";
import ExtractSummary from "../../components/ExtractSummary/ExtractSummary";
import { FA, FFS } from "../../Firebase";
import { connect, useDispatch, useSelector } from "react-redux";
import Reactotron from "reactotron-react-native";
import { get_info } from "../../Store/Action/info";
// import Charts from "../../components/Charts/Charts";
import { TouchableOpacity } from "react-native-gesture-handler";
// import { infos } from "./../../data";

// const { width: WIDTH } = Dimensions.get("window");

const styles = StyleSheet.create({
  allCont: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    paddingHorizontal: 10,
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
  },
  spinner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.palette.backgroundMain
  },
  buttonConta: {
    marginVertical: 10,
    backgroundColor: "transparent",
    flex: 1,
    alignItems: "flex-end"
  },
  txtBtn: {
    color: theme.palette.button,
    fontWeight: "bold",
    textDecorationLine: "underline"
  },
  margin: {
    marginBottom: 70
  }
});

function Home(props) {
  const dispatch = useDispatch();
  const info_r = useSelector(state => state.info.information);
  let [_ref, setRef] = React.useState({ empty: true });
  let [refreshing, setRefreshing] = React.useState(false);
  // let [showMoney, setShowMoney] = React.useState(true);
  let [id, setUsrId] = React.useState("");
  let [visibility, setVisibility] = React.useState(null);
  let [infos, setInfos] = React.useState([]);
  let [total, setTotal] = React.useState(0);
  let [loading, setLoading] = React.useState(false);
  let [info, setInfo] = React.useState([
    {
      title: "Saldo",
      qtd: ""
    },
    {
      title: "Receitas do mês",
      qtd: ""
    },
    {
      title: "Despesas do mês",
      qtd: ""
    },
    {
      title: "Balanço do mês",
      qtd: ""
    }
  ]);

  React.useEffect(() => {
    const getUser = async () => {
      const usr = await FA.currentUser;
      const ref = await FFS.collection("users")
        .doc(usr.uid)
        .get();
      if (ref.exists) {
        const u = ref.data();
        setVisibility(u.visibility);
        setUsrId(u.id);
        Reactotron.log(u.visibility, "aaaa");
      }
    };
    getUser();
  }, []);

  async function getD() {
    setLoading(true);
    setInfo(info_r.info);
    if (info_r && info_r.ref) {
      setInfos(info_r.ref.infos);
      setTotal(info_r.ref.newTotal);
    }
    setLoading(false);
  }

  React.useEffect(() => {
    dispatch(get_info());
    getD();
    //eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    getD();
    //eslint-disable-next-line
  }, [info_r]);

  function _onRefresh() {
    setRefreshing(true);
    dispatch(get_info()).then(() => {
      setRefreshing(false);
    });
    getD().then(() => {
      setRefreshing(false);
    });
  }

  const onPressIconMoney = async () => {
    setVisibility(!visibility);
    await FFS.collection("users")
      .doc(id)
      .update({ visibility });
  };

  return (
    <Container>
      <MenuButton
        view="Visão Geral"
        navigation={props.navigation}
        onPressIconMoney={onPressIconMoney}
        visibility={visibility}
      />
      {!loading ? (
        <>
          <ScrollView
            style={styles.allCont}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={_onRefresh} />
            }
          >
            {/* <View style={this.state.active ? styles.opacity : null} /> */}
            {/* <View style={styles.allCont}> */}
            <View>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                <PreviewBalance
                  view="Home"
                  navigation={props.navigation}
                  info={info[0]}
                  visibility={visibility}
                />
                <PreviewBalance
                  view="Home"
                  navigation={props.navigation}
                  info={info[1]}
                  visibility={visibility}
                />
                <PreviewBalance
                  view="Home"
                  navigation={props.navigation}
                  info={info[2]}
                  visibility={visibility}
                />
                <PreviewBalance
                  view="Home"
                  navigation={props.navigation}
                  info={info[3]}
                  visibility={visibility}
                />
              </ScrollView>
            </View>
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate("AccountBalance", { info: info[0] })
              }
              style={styles.buttonConta}
            >
              <Text style={styles.txtBtn}>Conferir Contas</Text>
            </TouchableOpacity>
            {/* <Charts /> */}
            <ExtractSummary
              view="Home"
              navigation={props.navigation}
              infos={infos}
              total={total}
            />
            <TouchableOpacity
              onPress={() => props.navigation.navigate("Extract")}
              style={styles.buttonConta}
            >
              <Text style={[styles.txtBtn, styles.margin]}>
                Conferir Extrato Total
              </Text>
            </TouchableOpacity>
            {/* </View> */}
          </ScrollView>
          {/* <View style={{height: 100}}> */}
          <FloatingButton view="Home" navigation={props.navigation} />
        </>
      ) : (
        <Spinner style={styles.spinner} color="green" />
      )}
      {/* </View> */}
    </Container>
  );
}

const mapStateToProps = store => ({
  info: store.info.info
});

export default connect(mapStateToProps)(Home);
