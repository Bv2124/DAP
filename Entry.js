import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, Image, Text, TouchableOpacity, Animated } from 'react-native';

const Entry = ({navigation}) => {
  const [entityKey, setEntityKey] = useState('');
  const [containerPosition] = useState(new Animated.Value(0));
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    animateEntryScreen();
  }, []);

  const animateEntryScreen = () => {
    Animated.timing(containerPosition, {
      toValue: -200,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  const handleSubmit = () => {
    if (entityKey === '') {
    navigation.navigate("LoginScreen")
      console.log('Navigating to Profile Screen');
    } else {
      // Set error message
      setErrorMessage("Contact your admin if you don't have any entity key!");
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.roundContainer, { transform: [{ translateY: containerPosition }] }]}>
        <Image
          source={require('./Images/SmartFm.png')}
          style={styles.image}
          resizeMode="contain"
        />
      </Animated.View>
      <View style={styles.textContainer}>
        <Text style={styles.welcomeText}>Getting Started</Text>
        <Text style={styles.descriptionText}>Please enter your entity to explore our app</Text>
        <Text style={styles.inputTitle}>Entity Key</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your entity key"
          value={entityKey}
          onChangeText={setEntityKey}
        />
        {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#526ACE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  roundContainer: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  descriptionText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  inputTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'left',
    alignSelf: 'flex-start',
    marginLeft: 20,
  },
  input: {
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1.5,
    borderColor:'#526ACE',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  submitButton: {
    backgroundColor: '#526ACE',
    paddingHorizontal: 50,
    paddingVertical: 10,
    borderRadius: 20,
    alignSelf: 'flex-end',
    marginRight: 20,
    marginTop: 40,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  textContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: 'white',
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    height: '45%',
    justifyContent: 'flex-start',
    textAlign:'left',
    alignItems:'flex-start'
  },
  errorMessage: {
    color: 'red',
    marginBottom: 10,
    marginLeft: 20,
  },
});

export default Entry;
