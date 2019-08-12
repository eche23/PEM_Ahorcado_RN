/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image} from 'react-native';




export default class TextField extends Component {
  constructor(props){
    super(props);
    
  }

  getSpaces(){
    return this.props.screenWord.split('').join(' ');
  }

  render() {
    return (
      <Text style={styles.textField}>{this.getSpaces()}</Text>
    );
  }
}

const styles = StyleSheet.create({
  textField: {
    fontSize: 40,
    textAlign: 'center'
  }
});
