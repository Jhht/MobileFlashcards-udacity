import React from 'react';
import { View } from 'react-native';
import { MainNavigator } from './config/routes';
import deckReducer from './reducers/deckReducer';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'


const store = createStore(deckReducer, applyMiddleware(thunk))

 

const App = () => (
	 <Provider store={store}>
	    <View style={{ flex: 1 }}>
	      <MainNavigator />
	    </View>
	</Provider>
	);

export default App;