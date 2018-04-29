import React, {Component} from 'React';
import {FlatList, View, Text, TextInput, TouchableOpacity, Button, Alert} from 'react-native'
import {addCardToDeck } from '../utils/api'
import {arrayFromObject} from '../utils/helpers'
import styled from 'styled-components/native';
import { connect } from 'react-redux'
import {addNewCard } from '../actions/deckActions'

class AddQuestionView extends Component{

	state = {
		question : '',
		answer : '',
	}

	handleOnPress = () => {
	    if (this.state.question.length < 2) {
	      return Alert.alert(
	        'Please, write a question',
	        { text: 'OK' },
	        { cancelable: false }
	      );
	    }

	    if (this.state.answer.length < 2) {
	      return Alert.alert(
	        'Please, write an answer',
	        { text: 'OK' },
	        { cancelable: false }
	      );
	    }

	    const { title, questions } = this.props.navigation.state.params;
	    const data = {
	      title,
	      questions,
	      question: this.state.question,
	      answer: this.state.answer,
	    };

	    const card = {
	    	question : this.state.question,
	    	answer: this.state.answer,
	    }

	    // action dispatch
	    this.props.addNewCard(data);

	    //api call to update
	    addCardToDeck(title, card)

	    this.props.navigation.goBack();
	 };

  render() {
    return (
      <View>
        <TextInput
          fieldLabel="What question would you like to add?"
          maxLength={100}
          placeholder="Question"
          onChangeText={question => this.setState({ question })}
        />
        <TextInput
          fieldLabel="What answer would you like to add?"
          maxLength={100}
          placeholder="Answer"
          onChangeText={answer => this.setState({ answer })}
        />
        <Button title="Submit" onPress={() => this.handleOnPress()} />
      </View>
    );
  }

}

function mapStateToProps (decks) {
  return {
    decks
  }
}

export default connect(mapStateToProps, {addNewCard})(AddQuestionView)