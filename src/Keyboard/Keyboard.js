/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, TouchableHighlight} from 'react-native';




export default class Keyboard extends Component {
  constructor(props){
    super(props);
    
  }

  getButtons(){
    return this.props.buttons.map(
      (button, index) => 
        <TouchableHighlight onPress={() => this.props.buttonClicked(index)} key={index} underlayColor='white'>
          <View style={button.state == "Not-Pressed" ? styles.buttonNoClicked : (button.state == "Correct" ? 
            styles.buttonCorrect : styles.buttonNoCorrect)}>
            <Text style={styles.textButton}>{button.letter}</Text>
          </View>
          
        </TouchableHighlight>
      
    );
  }

  render() {
    return (
      <View style={styles.keyboard}>
        {this.getButtons()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  keyboard: {    
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonNoClicked: {
    margin: 10,
    width: 30,
    height: 30,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  buttonCorrect: {
    margin: 10,
    width: 30,
    height: 30,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green'
  },
  buttonNoCorrect: {
    margin: 10,
    width: 30,
    height: 30,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red'
  },
  textButton: {
    fontSize: 20,
    color: 'black'
  }
});