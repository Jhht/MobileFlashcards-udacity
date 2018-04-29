import React, { Component } from 'React'
import {FlatList, View, Text, Button, StyleSheet} from 'react-native'
import {arrayFromObject} from '../utils/helpers'
import { connect } from 'react-redux'
import styled from 'styled-components/native';


const StyledView = styled.View`
  flex: 1;
`;

const StyledTitleText = styled.Text`
  font-size: 20;
  padding-vertical: 15;
  padding-horizontal: 15;
  text-align: center;
`;

const StyledQuestionsNumText = styled.Text`
  font-size: 16;
  font-style: italic;
  padding-vertical: 15;
  padding-horizontal: 15;
  text-align: center;
`;

const StyledButtonWrapper = styled.View`
  margin-vertical: 50;
  padding-top: 20;
  padding-horizontal: 25;
  padding-bottom: 25;
`;



class QuizView extends Component {


	componentDidMount(){
		console.log('Props quiz ' + JSON.stringify(this.props))
	}

	
	render(){
		const { title } = this.props.navigation.state.params;
		const { questions } = this.props.decks[title];
		console.log('Props quiz render' + JSON.stringify(this.props.decks[title].questions))


	 	return (
	    	<StyledView>
	      		<StyledTitleText>Quiz: {this.props.decks[title].title}</StyledTitleText>
	      		<StyledTitleText>{this.props.decks[title].questions.length} cards</StyledTitleText>
	      		<StyledButtonWrapper>
		        	<Button
		          		title="Start quiz"
		          		onPress={() =>
		            		this.props.navigation.navigate('QuizRunning', {
		              			title,
		              			questions,
		            	})
		          	}
		        	/>
			        <Button
			          title="Add new question"
			          onPress={() => this.props.navigation.navigate('NewCard', { title, questions})}
			        />
			        <Button
			          title="Home"
			          onPress={() => this.props.navigation.navigate('Home')}
			        />
	      		</StyledButtonWrapper>
	    	</StyledView>
	  	);
	}	
}



function mapStateToProps (decks) {
  return {
    decks
  }
}
export default connect(
  mapStateToProps
)(QuizView)

