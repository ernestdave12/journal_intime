import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen({ navigation }) {
  const [notes, setNotes] = useState([]);

  // Fonction pour charger les notes depuis AsyncStorage
  const loadNotes = async () => {
    try {
      const savedNotes = await AsyncStorage.getItem('journalEntries');
      const parsedNotes = savedNotes ? JSON.parse(savedNotes) : [];
      setNotes(parsedNotes);
    } catch (error) {
      console.error('Erreur lors de la récupération des notes:', error);
    }
  };

  // Charger les notes une fois au montage du composant
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadNotes);
    return unsubscribe;
  }, [navigation]);

  // Affichage de chaque note dans un composant
  const renderNote = ({ item }) => (
    <TouchableOpacity
      style={styles.noteContainer}
      onPress={() =>
        navigation.navigate('EntryDetails', {
          entryId: item.id,
          entryTitle: item.title,
          entryContent: item.content,
          entryDate: item.date,
        })
      }
    >
      <Text style={styles.noteTitle}>{item.title}</Text>
      <Text style={styles.noteDate}>{item.date}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Liste des Notes</Text>
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={renderNote}
        ListEmptyComponent={<Text>Aucune note trouvée.</Text>}
      />
      <Button title="Ajouter une nouvelle note" onPress={() => navigation.navigate('AddEntry')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  noteContainer: {
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 10,
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  noteDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
});
