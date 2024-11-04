import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddEntryScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const saveEntry = async () => {
    try {
      const entry = {
        id: Date.now().toString(),
        title,
        content,
        date: new Date().toLocaleDateString(),
      };

      // Récupérer les entrées existantes
      const existingEntries = await AsyncStorage.getItem('journalEntries');
      const entries = existingEntries ? JSON.parse(existingEntries) : [];

      // Ajouter la nouvelle entrée
      entries.push(entry);

      // Sauvegarder les entrées mises à jour
      await AsyncStorage.setItem('journalEntries', JSON.stringify(entries));

      // Naviguer vers la page d'accueil
      navigation.navigate('Home');
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de l\'entrée:', error);
    }
  };

  const handleSave = () => {
    if (title && content) {
      saveEntry();
    } else {
      alert('Veuillez remplir tous les champs.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Titre</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Titre de l'entrée"
      />
      <Text style={styles.label}>Contenu</Text>
      <TextInput
        style={styles.input}
        value={content}
        onChangeText={setContent}
        placeholder="Contenu de l'entrée"
        multiline
      />
      <Button title="Enregistrer" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});
