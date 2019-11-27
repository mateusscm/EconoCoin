import React, { Component } from "react";
import { StyleSheet } from "react-native";
import {
  View,
  Card,
  CardItem,
  Body,
  Text,
  Right,
  Thumbnail
  // Icon,
  // Button
} from "native-base";
import Icon from "react-native-vector-icons/FontAwesome5";

const styles = StyleSheet.create({
  contentHome: {
    // width: 390,
    // width: 230,
    alignSelf: "center",
    marginRight: 10
  },
  contentAccount: {
    width: "100%"
  },
  align: {
    justifyContent: "center",
    alignItems: "flex-start"
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "green"
    // paddingTop: 10
  },
  titleNeg: {
    fontSize: 40,
    fontWeight: "bold",
    color: "red"
    // paddingTop: 10
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
    color: "#000",
    textTransform: "uppercase"
  },
  icon: {
    position: "absolute",
    right: 0,
    top: "30%",
    color: "rgba(0,0,0,0.2)"
  },
  hidden: {
    height: 37,
    backgroundColor: "#c9c9c9",
    width: 100,
    margin: 8
  }
});

const PreviewBalance = props => {
  let [info, setInfo] = React.useState({});

  React.useEffect(() => {
    if (props.info) setInfo(props.info);
  }, [props]);

  return (
    <View
      style={props.view === "Home" ? styles.contentHome : styles.contentAccount}
    >
      <Text style={styles.mainTitle}>{info.title}</Text>
      <Card style={{ zIndex: 0 }}>
        <CardItem header>
          <Body style={styles.align}>
            {!props.visibility ? (
              <View style={styles.hidden} />
            ) : (
              <Text style={!info.qtd >= 0 ? styles.title : styles.titleNeg}>
                {info.qtd}
              </Text>
            )}
            {/* <Text style={styles.subtext}>Atualização: 06/09/2019</Text> */}
          </Body>
          {props.view === "Home" ? (
            <Icon size={100} name={info.icon} style={styles.icon} />
          ) : (
            <Right>
              <Thumbnail source={require("./../../assets/img/logo.png")} />
            </Right>
          )}
        </CardItem>
      </Card>
    </View>
  );
};

export default PreviewBalance;
