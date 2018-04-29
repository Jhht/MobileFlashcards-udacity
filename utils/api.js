import { AsyncStorage } from 'react-native';
import { Notifications, Permissions } from 'expo';

const DECKS_KEY = 'mobileFlashCards:decks';
const NOTIFICATIONS_KEY = 'mobileFlashCards:notifications'


export function fetchDecksApi( decks ) {
  return {
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
}

export function fetchDecks () {
	let results = AsyncStorage.getItem(DECKS_KEY)

	return JSON.parse(results);
}

export function saveDeckTitle( title ){

	let deck = {
		title : title,
		questions : []
	}

	return AsyncStorage.mergeItem(DECKS_KEY, JSON.stringify({
		[title]: deck
	}));
}

export function addCardToDeck( title, card){

	return AsyncStorage.getItem(DECKS_KEY, (err, result) => {
        let decks = JSON.parse(result);

        let newQuestions = JSON.parse(JSON.stringify(decks[title].questions));
        newQuestions[newQuestions.length] = card;

        const value = JSON.stringify({
            [title]: {title: title, questions: newQuestions},
        });

        AsyncStorage.mergeItem(DECKS_KEY, value);
    });

}


export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATIONS_KEY).then(Notifications.cancelAllScheduledNotificationsAsync);
}


function createNotification() {
  return {
    title: 'Time to learn!',
    body: ' Come on! Is time to learn something new!',
  };
}


export function setLocalNotification(chosenTime) {
  AsyncStorage.getItem(NOTIFICATIONS_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
          if (status === 'granted') {
            Notifications.cancelAllScheduledNotificationsAsync();

            Notifications.scheduleLocalNotificationAsync(createNotification(), {
              time: chosenTime,
              repeat: 'day',
            });

            AsyncStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(true));
          }
        });
      }
    });
}