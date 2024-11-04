import { createStackNavigator } from '@react-navigation/stack';
import AddEntryScreen from './screens/AddEntryScreen';
import HomeScreen from './screens/HomeScreen';

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="AddEntry" component={AddEntryScreen} />
    </Stack.Navigator>
  );
}
