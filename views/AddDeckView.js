import React, {Component} from 'React';
import {FlatList, View, Text, TextInput, TouchableOpacity, Button, Alert} from 'react-native'
import {saveDeckTitle } from '../utils/api'
import {arrayFromObject} from '../utils/helpers'
import styled from 'styled-components/native';
import { connect } from 'react-redux'
import {addNewDeck } from '../actions/deckActions'

const StyledButtonWrapper = styled.View`
  margin-vertical: 50;
  padding-top: 20;
  padding-horizontal: 25;
  padding-bottom: 25;
`;


class AddDeckView extends Component{

	state = {
    	title: '',
  	};

  	handleOnPress = (payload) => {
    	if (this.state.title.length < 1) {
      		return Alert.alert(
        		'Your question',
        		'needs more than 1 character.',
        		{ text: 'OK' },
        		{ cancelable: true }
      		);
    	}
	    const { title } = this.state;
	    //add
	    saveDeckTitle(title);
	    this.props.addNewDeck(title);
	    this.props.navigation.goBack();

  };

	render(){
		return (
			<View>
		        <TextInput
		          fieldLabel="What is the title of your new deck?"
		          maxLength={50}
		          placeholder="Deck title"
		          onChangeText={title => this.setState({ title })}
		        />
		        <Button
				   	title="Submit"
				    onPress={this.handleOnPress}
				/>
				<Button
				    title="Home"
				    onPress={() => this.props.navigation.navigate('HomeView')}
				/>
     	 	</View>
		)
	}

}

function mapStateToProps (decks) {
  return {
    decks
  }
}
export default connect(
  mapStateToProps,
  { addNewDeck }
)(AddDeckView)