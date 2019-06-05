import React, { Component } from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";

export default class ModalScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

  render() {
    return (
      <Modal
        visible={this.state.visible}
        animationType={"slide"}
      >
        <Text>Say something modal here!!</Text>
      </Modal>
    );
  }
}
