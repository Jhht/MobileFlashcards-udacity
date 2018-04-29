import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const COLOUR_INFO = '#ff463f'

const QuizIncorrectButton = ( { label, onPress }) => (
		<TouchableOpacity onPress={onPress}>
            <Text style={{
	            backgroundColor: COLOUR_INFO,
				justifyContent: 'center',
				height: 30,
				textAlign: 'center',
				width: 200
            }}>{label}</Text>
    	</TouchableOpacity>
);

export default QuizIncorrectButton;