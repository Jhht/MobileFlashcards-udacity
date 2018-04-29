import React, { Component } from 'React'
import {FlatList, View, Text, Button, StyleSheet, TouchableOpacity} from 'react-native'
import {arrayFromObject} from '../utils/helpers'
import { connect } from 'react-redux'
import styled from 'styled-components/native';
import QuizCorrectButton from '../components/QuizCorrectButton'
import QuizIncorrectButton from '../components/QuizIncorrectButton'
import QuizStandardButton from '../components/QuizStandardButton'
import {clearLocalNotification} from '../utils/api';


const StyledView = styled.View`
  flex: 1;
`;

const StyledTitleText = styled.Text`
  font-size: 20;
  padding-vertical: 15;
  padding-horizontal: 15;
  text-align: center;
`;


class QuizRunningView extends Component {


	state = {
        questionIndex: 0,
        correctAnswers: 0,
        showAnswer : false,
    };

    onHandleCorrect = () => {
        const {questionIndex, correctAnswers} = this.state;
        this.setState({questionIndex: questionIndex + 1, correctAnswers: correctAnswers + 1, showAnswer: false});
    };

    onHandleStartQuiz = () => {
        this.setState({questionIndex: 0, correctAnswers: 0, showAnswer: false});
    };

    backToDeck = () => {
        this.props.navigation.goBack();

    }

    onHandleIncorrect = () => {
        this.setState({questionIndex: this.state.questionIndex + 1});
    };

    onHandleshowAnswer = () => {
        this.setState({showAnswer: !this.state.showAnswer});
    };



	
	render(){
		
        //clear notification
        clearLocalNotification();

		const {questionIndex, correctAnswers, showAnswer} = this.state;
        const {questions} = this.props.navigation.state.params;
        const isAvaliable = questionIndex < questions.length;
        const qLeft = (questionIndex + 1);

        return (
            <View style={{flex: 1}}>
                {isAvaliable ? (
                    <View style={styles.container}>
                        <View style={[styles.group, {justifyContent: 'flex-start', flex: 1}]}>
                            <View>
                                <StyledTitleText>{qLeft} / {questions.length}</StyledTitleText>
                            </View>
                        </View>
                        <View style={[styles.group, {flex: 6}]}>
                            <View>
                                {showAnswer ? (
                                    <View style={{alignItems: 'center'}}>
                                        <StyledTitleText style={{fontSize: 36}}>{questions[questionIndex].answer}</StyledTitleText>

                                        <TouchableOpacity onPress={this.onHandleshowAnswer}>
                                            <StyledTitleText style={{fontSize: 18, color: '#70dd2f'}}>Question</StyledTitleText>
                                        </TouchableOpacity>

                                    </View>) : (
                                    <View style={{alignItems: 'center'}}>
                                        <StyledTitleText style={{fontSize: 36}}>{questions[questionIndex].question}</StyledTitleText>

                                        <TouchableOpacity onPress={this.onHandleshowAnswer}>
                                            <StyledTitleText style={{fontSize: 15, color: '#ff463f'}}>Answer</StyledTitleText>
                                        </TouchableOpacity>

                                    </View>
                                )}
                            </View>
                        </View>

                        <View style={{alignItems: 'center', justifyContent: 'space-around', flex: 2}}>
                            <View style={styles.container}>
                                <QuizCorrectButton label='Correct' onPress={this.onHandleCorrect}  />
                                <QuizIncorrectButton label='Inorrect' onPress={this.onHandleIncorrect}  />
                            </View>
                        </View>
                    </View>
                ) : (
                    <View style={styles.container}>
                        <Text>Score: {correctAnswers}</Text>

                        <View style={{alignItems: 'center', justifyContent: 'space-around', flex: 6}}>
                            <View style={styles.container}>
                                <QuizCorrectButton label='Start Quiz' onPress={this.onHandleStartQuiz}  />
                                <QuizIncorrectButton label='Back to Deck' onPress={this.backToDeck}  />
                            </View>

                        </View>
                    </View>
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
    }
});

export default (QuizRunningView)

