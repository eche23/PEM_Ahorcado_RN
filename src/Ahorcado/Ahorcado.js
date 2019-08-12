/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  Platform, 
  StyleSheet, 
  Text, 
  View, 
  Modal, 
  TouchableHighlight
} from 'react-native';

import Picture from '../Picture/Picture';
import TextField from '../TextField/TextField';
import Keyboard from '../Keyboard/Keyboard';

export default class Ahorcado extends Component {
  constructor(props){
    super(props);

    this.buttonClicked = this.buttonClicked.bind(this);
    let word = this.getWord();
    
    this.state={
      numSuccess: 0,
      failures: 0,
      word: word,
      screenWord: this.inicializeWord(word),
      buttons: this.getButtons(),
      modalVisibility: false,
      result: '',
      points: 0
    }
    //console.log(numSuccess)
  }

  reset(){
    let word = this.getWord();

    this.setState({
      numSuccess: 0,
      failures: 0,
      word: word,
      screenWord: this.inicializeWord(word),
      buttons: this.getButtons(),
      modalVisibility: false,
      result: ''
    });
  }


  getWord(){
    let WORDS = ["PEM", "ANDROID", "IOS", "XCODE", "REACT-NATIVE", "MULTIDISPOSITIVOS", "VSCODE"];
    return WORDS[Math.floor(Math.random() * WORDS.length)];
  }

  inicializeWord(word){
    let inicializeWord = "";
    for(let i=0; i<word.length; i++){
        inicializeWord += "_";
      
    }
    return inicializeWord;
  }

  getButtons(){
    let LETTERS = [ "A", "B", "C", "D", "E", "F", "G", 
                    "H", "I", "J", "K", "L", "M", "N",
                    "Ñ", "O", "P", "Q", "R", "S", "T",
                    "U", "V", "W", "X", "Y", "Z", "-" 
                  ];
    return LETTERS.map((l) => ({letter: l, state: 'Not-Pressed'}));
  }

  buttonClicked(i){
    let buttonsAux = this.state.buttons;
    let letter = buttonsAux[i].letter;
    

    if(this.success(letter)){
      buttonsAux[i].state = "Correct";
      this.setState((prevState) => ({
        buttons: buttonsAux
        
      }));
    } else {
      buttonsAux[i].state = "No-Correct";
      this.setState((prevState) => ({
        buttons: buttonsAux,
        failures: ++prevState.failures
      }));
    }
  }

  success(letter){
    
    let success = false;
    for(let i=0; i<this.state.word.length; i++){
      if(letter == this.state.word.substr(i, 1)){
        this.setState((prevState) => ({
          numSuccess: ++prevState.numSuccess,
          screenWord: prevState.screenWord.substr(0, i) + letter + prevState.screenWord.substr(i + 1)
        }));
        success = true;
      }
    }
    
    return success;
  }

  componentDidUpdate(){
    if(this.state.failures == 6){
      this.setState({
        modalVisibility: true,
        result: 'Loser',
        failures: 0
      });
    }

    if(this.state.word.length == this.state.numSuccess){
      this.setState({
        modalVisibility: true,
        result: 'Winner',
        numSuccess: 0,
        points: 6-this.state.failures+this.state.points
      });
    }
  }

  render() {
    
    return (
      <View style={styles.content}>
      {this.getModal()}
        <View style={styles.picture}>
          <Picture failures={this.state.failures}/>
        </View>
        <View style={styles.textField}>
          <TextField screenWord={this.state.screenWord}/>
        </View>
        <View style={styles.keyboard}>
          <Keyboard buttons={this.state.buttons} buttonClicked={this.buttonClicked}/>
        </View>
        <View style={styles.textPoints}>
          <Text>Points:{this.state.points}</Text>
        </View>
      </View>
    );
  }

  getModal(){
    return (
      <Modal  animationType="fade"
              transparent={true}
              visible={this.state.modalVisibility}
              onRequestClose={() => {this.reset();}}>
        <View style={styles.modalContainer}>
          <View style={styles.innerModalContainer}>
            <Text style={styles.text}>{this.state.result}</Text>

            <TouchableHighlight onPress={() => { this.reset(); }}
                                style={styles.button}>
              <Text style={styles.textButton}>NEXT</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'black'
  },
  picture: {
    flex: 4,
    justifyContent: 'center',
    backgroundColor: 'gray'
  },
  textField: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  keyboard: {
    flex: 3,
    justifyContent: 'center',
    backgroundColor: 'gray'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.9)'
  },
  innerModalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 20
  },
  button: {
    flexWrap: 'wrap',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 20
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  textButton: {
    fontSize: 20,
    color: 'black'
  },
  textPoints: {
    fontSize: 20,
    backgroundColor: 'white',
    
  }
  
  });