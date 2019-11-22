import React, { Component } from "react";
import { Text } from "react-native";

import { Fab, Icon, Button } from "native-base";
import { theme } from "../../config/_theme";
// import DialogCreate from "../DialogCreate/DialogCreate";

// const { width: WIDTH } = Dimensions.get("window");

class FloatingButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active1: false
    };
    this.goToNavigate = this.goToNavigate.bind(this);
  }

  goToNavigate(nav, p) {
    if (p !== "") {
      this.props.navigation.navigate(nav, p);
    } else {
      this.props.navigation.navigate(nav);
    }

    this.setState({
      active1: !this.state.active1,
      active2: !this.state.active2
    });
  }

  render() {
    return (
      <>
        {this.props.view === "Home" || this.props.view === "Extract" ? (
          <Fab
            active={this.state.active1}
            direction="up"
            containerStyle={{}}
            style={{
              backgroundColor: theme.palette.button,
              zIndex: 1000,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 12
              },
              shadowOpacity: 0.58,
              shadowRadius: 16.0,

              elevation: 24
            }}
            position="bottomRight"
            onPress={() => this.setState({ active1: !this.state.active1 })}
          >
            <Icon
              name={this.state.active1 ? "ios-close" : "ios-add"}
              style={{ fontSize: 30 }}
            />
            {this.state.active1 ? (
              <Button
                style={{ backgroundColor: "#821d20" }}
                onPress={() => this.goToNavigate("HomeNewExpense", "")}
              >
                <Text
                  style={
                    this.state.active1
                      ? {
                          display: "flex",
                          position: "absolute",
                          left: -105,
                          // left: -115,
                          backgroundColor: "rgba(0,0,0,0.5)",
                          color: theme.palette.fontColorIcon,
                          padding: 5,
                          borderRadius: 5
                        }
                      : { display: "none" }
                  }
                >
                  Nova Despesa
                </Text>
                <Icon type="MaterialCommunityIcons" name="arrow-down" />
              </Button>
            ) : null}
            {this.state.active1 ? (
              <Button
                style={{ backgroundColor: "#14c6cc" }}
                onPress={() => this.goToNavigate("HomeNewIncome", "")}
              >
                <Text
                  style={
                    this.state.active1
                      ? {
                          display: "flex",
                          position: "absolute",
                          left: -100,
                          // left: -110,
                          backgroundColor: "rgba(0,0,0,0.5)",
                          color: theme.palette.fontColorIcon,
                          padding: 5,
                          borderRadius: 5
                        }
                      : { display: "none" }
                  }
                >
                  Nova Receita
                </Text>
                <Icon type="MaterialCommunityIcons" name="arrow-up" />
              </Button>
            ) : null}
            {this.state.active1 ? (
              <Button
                style={{ backgroundColor: "#8f34eb" }}
                onPress={() => this.goToNavigate("HomeNewTransf", "")}
              >
                <Text
                  style={
                    this.state.active1
                      ? {
                          display: "flex",
                          position: "absolute",
                          left: -140,
                          // left: -140,
                          backgroundColor: "rgba(0,0,0,0.5)",
                          color: theme.palette.fontColorIcon,
                          padding: 5,
                          borderRadius: 5
                        }
                      : { display: "none" }
                  }
                >
                  Nova Transferência
                </Text>
                <Icon type="MaterialCommunityIcons" name="swap-vertical" />
              </Button>
            ) : null}
          </Fab>
        ) : (
          <>
            <Fab
              active={this.state.active2}
              direction="up"
              containerStyle={{}}
              style={{
                backgroundColor: theme.palette.button,
                zIndex: 1000,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 12
                },
                shadowOpacity: 0.58,
                shadowRadius: 16.0,

                elevation: 24
              }}
              position="bottomRight"
              onPress={() =>
                this.goToNavigate("DialogCategorie", {
                  type: "newCat",
                  value: ""
                })
              }
            >
              <Icon name={"ios-add"} style={{ fontSize: 30 }} />
            </Fab>
            {/* <DialogCreate
              dialogVisible={this.props.dialogVisible}
              showDialog={this.props.showDialog}
              handleCancel={this.props.handleCancel}
            /> */}
            {/* <Dialog.Container visible={this.props.dialogVisible}>
              <Dialog.Title>Adicionando Categoria</Dialog.Title>
              <Dialog.Input label="Nome da Categoria" onChangeText={e => {this.setState({newCategorie: e.target.value})}} />
              <Dialog.Button
                label="Cancelar"
                onPress={() => this.props.handleCancel()}
              />
              <Dialog.Button
                label="Adicionar"
                onPress={() => this.createCategorie()}
              />
            </Dialog.Container> */}
          </>
        )}
      </>
    );
  }
}

export default FloatingButton;
