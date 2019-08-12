/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image} from 'react-native';




export default class Picture extends Component {
  constructor(props){
    super(props);

  }
  render() {
    return (
      <Image 
      style={styles.picture}  
      source={Pictures[this.props.failures.toString()]} />
    );
  }
}

const styles = StyleSheet.create({
  picture: {
    flex: 1,
    width: undefined, 
    height: undefined, 
    resizeMode: 'contain',
    margin: 20,
    borderColor: 'red',
    borderWidth: 1
  }
});

const Pictures = {
  '0':require('../../img/0.png'),
  '1':require('../../img/1.png'),
  '2':require('../../img/2.png'),
  '3':require('../../img/3.png'),
  '4':require('../../img/4.png'),
  '5':require('../../img/5.png'),
  '6':require('../../img/6.png')
};