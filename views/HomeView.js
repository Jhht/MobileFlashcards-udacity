import React, {Component} from 'React';
import {FlatList, View, Text} from 'react-native'
import {fetchDecks } from '../utils/api'
import {arrayFromObject} from '../utils/helpers'
import styled from 'styled-components/native';
import { connect } from 'react-redux'
import { getDecks } from '../actions/deckActions'
import {setLocalNotification} from '../utils/api';


const StyledTouchableOpacity = styled.TouchableOpacity`
  padding-vertical: 15;
  
`;

const StyleditleText = styled.Text`
  font-size: 34;
  font-weight: bold;
  padding-horizontal: 15;
  text-align: center;
`;


const StyledItemTitleText = styled.Text`
  font-size: 28;
  font-weight: bold;
  padding-horizontal: 15;
  text-align: center;
`;

const StyledItemCardText = styled.Text`
  font-size: 24;
  font-style: italic;
  padding-horizontal: 15;
  text-align: center;
`;


class HomeView extends Component {

  state = {
    decks : {}
  }

  componentDidMount(){

    //set local notification
    setLocalNotification();
    
    this.props.getDecks(this.fetchDecks);
  }

  
  renderItem = ({ item }) => {
     const { title, questions } = item;
        return (
          <StyledTouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('Quiz', {
                title,
                questions,
              })
            }>
            <StyledItemTitleText>{title}</StyledItemTitleText>
            <StyledItemCardText>{questions.length} cards</StyledItemCardText>
          </StyledTouchableOpacity>
        );
  }

  render() {

    let decksArray = arrayFromObject(this.props.decks)

    console.log('Every deck here state ' + JSON.stringify(decksArray))

    decksArray.map( (item ) => { console.log(' ---- ' + JSON.stringify(item)) })

    
     
     return(
      <View>
        <StyleditleText> DECKS </StyleditleText>
        <FlatList data={decksArray} renderItem={this.renderItem} keyExtractor={item => item.title}/>
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
  { getDecks }
)(HomeView)