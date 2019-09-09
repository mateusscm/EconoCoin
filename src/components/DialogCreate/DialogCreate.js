import React, { Component } from "react";
import { StyleSheet } from "react-native";
import Dialog from "react-native-dialog";

// const { width: WIDTH } = Dimensions.get("window");

const styles = StyleSheet.create({});

class DialogCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Dialog.Container visible={this.props.dialogVisible}>
        <Dialog.Title>Account delete</Dialog.Title>
        <Dialog.Description>
          Do you want to delete this account? You cannot undo this action.
        </Dialog.Description>
        <Dialog.Button
          label="Cancel"
          onPress={() => this.props.handleCancel()}
        />
        <Dialog.Button label="Delete" onPress={() => alert("deletando")} />
      </Dialog.Container>
    );
  }
}

export default DialogCreate;
