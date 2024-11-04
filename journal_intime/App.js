import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AddEntryScreen from './screens/AddEntryScreen';
import EntryDetailsScreen from './screens/EntryDetailScreen';
import HomeScreen from './screens/HomeScreen';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';


const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
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
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;

