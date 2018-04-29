import { ADD_NEW_CARD, ADD_NEW_DECK, GET_DECKS } from '../actions/deckActions';

const initialState = {
    React: {
      title: 'React',
      questions: [
        {
          question: 'What is React?',
          answer: 'A library for managing user interfaces'
        },
        {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event'
        }
      ]
    },
    JavaScript: {
      title: 'JavaScript',
      questions: [
        {
          question: 'What is a closure?',
          answer: 'The combination of a function and the lexical environment within which that function was declared.'
        }
      ]
    }
  }

const decks = (state = initialState, action) => {
  switch (action.type) {
    case GET_DECKS:
      return {
        ...state,
        ...action.data
      }
    case ADD_NEW_DECK:
      return {
        ...state,
        [action.data]: {
          title: action.data,
          quizLength: 0,
          questions: [],
        },
      };
    case ADD_NEW_CARD:
      const {title, questions, question, answer} = action.data;
      const newQuestions = JSON.parse(JSON.stringify(questions)).concat([ { question, answer } ]);

      return {
          ...state,
          [title]: {
            ...state[title], 
            quizLength: newQuestions.length,
            questions: newQuestions
          },
      };
    default:
      return state;
  }
};

export default decks;