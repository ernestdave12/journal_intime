import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AddEntryScreen from './screens/AddEntryScreen';
import EntryDetailsScreen from './screens/EntryDetailScreen';

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
        <Stack.Screen 
          name="EntryDetails" 
          component={EntryDetailsScreen} 
          options={{ title: 'Détails de l\'Entrée' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
