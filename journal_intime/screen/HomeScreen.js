import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation })=> {
const [entries, setEntries] = useState([]);

useEffect(() => {
    const loadEntries = async () => {
    const savedEntries = await AsyncStorage.getItem('diaryEntries');
    if (savedEntries) setEntries(JSON.parse(savedEntries));
    };
    loadEntries();
}, []);

return (
    <View>
    <FlatList
        data={entries}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('EntryDetails', { entry: item })}>
            <Text>{item.date} - {item.title}</Text>
        </TouchableOpacity>
        )}
    />
    <Button title="Add New Entry" onPress={() => navigation.navigate('AddEntry')} />
    </View>
);
}

export default HomeScreen;
