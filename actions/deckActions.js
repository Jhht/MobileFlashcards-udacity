export const ADD_NEW_CARD = 'ADD_NEW_CARD';
export const GET_DECKS = 'GET_DECKS'
export const ADD_NEW_DECK = 'ADD_NEW_DECK';

export const getDecks = data => ({
	type: GET_DECKS,
	data,
});

export const addNewCard = data => ({
  type: ADD_NEW_CARD,
  data,
});

export const addNewDeck = data => ({
  type: ADD_NEW_DECK,
  data,
});