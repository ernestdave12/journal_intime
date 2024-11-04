import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AddEntryScreen from './screens/AddEntryScreen'; 

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AddEntry">
        <Stack.Screen 
          name="AddEntry" 
          component={AddEntryScreen} 
          options={{ title: 'Ajouter une Entrée' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
