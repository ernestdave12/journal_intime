import React from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EntryDetailsScreen({ route, navigation }) {
  const { entryId, entryTitle, entryContent, entryDate } = route.params;

  // Function to delete the entry
  const deleteEntry = async () => {
    try {
      const existingEntries = await AsyncStorage.getItem('journalEntries');
      const entries = existingEntries ? JSON.parse(existingEntries) : [];

      // Filter out the entry to delete
      const updatedEntries = entries.filter(entry => entry.id !== entryId);

      // Save the updated list
      await AsyncStorage.setItem('journalEntries', JSON.stringify(updatedEntries));
      Alert.alert('Succès', 'Entrée supprimée.');
      
      // Navigate back after deletion
      navigation.navigate('Home');
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'entrée:', error);
    }
  };

  const confirmDelete = () => {
    Alert.alert(
      'Confirmer la suppression',
      'Êtes-vous sûr de vouloir supprimer cette entrée?',
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Supprimer', onPress: deleteEntry, style: 'destructive' }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Détails de l'Entrée</Text>
      <Text style={styles.entryTitle}>{entryTitle}</Text>
      <Text style={styles.entryContent}>{entryContent}</Text>
      <Text style={styles.entryDate}>{entryDate}</Text>
      <Button title="Supprimer l'entrée" onPress={confirmDelete} />
      <Button title="Retour" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  entryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  entryContent: {
    fontSize: 16,
    marginBottom: 20,
  },
  entryDate: {
    fontSize: 16,
    marginBottom: 20,
  },
});
