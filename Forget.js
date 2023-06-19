import { StyleSheet, Text, View, ImageBackground, Image, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

export default function Forget({ navigation }) {
  const handleOtp = () => {
    if (validateEmail()) {
      setError('');
      // Here you can add the code to send the OTP
      alert('OTP has been successfully sent!');
      navigation.navigate('Otp');
    }
  };

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const validateEmail = () => {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === '') {
      setError('Please enter your email address');
      return false;
    } else if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return false;
    }

    setError('');
    return true;
  };

  const handleChangeText = (text) => {
    setEmail(text);
    validateEmail();
  };

  return (
    <ImageBackground source={require('./Images/Loginbg.png')} style={styles.background}>
      <Image
      source={require('./Images/Arrowleft.png')}
      style={styles.arrow}
      />
      <View style={[styles.roundContainer]}>
        <Image source={require('./Images/Padlock.png')} style={styles.image} resizeMode="contain" />
      </View>
      <View style={styles.textcontainer}>
        <Text style={styles.title}>1.Forgot Password ?</Text>
        <Text style={styles.subtitle}>Please enter the email address associated with your account.</Text>
      </View>
      <View style={styles.inputcontainer}>
        <Text style={styles.inputtitle}>Email id*</Text>
        <View style={styles.inputWithIcon}>
          <Image source={require('./Images/Mail.png')} style={styles.icon} resizeMode="contain" />
          <TextInput
            style={styles.input}
            placeholder="Enter your Email here"
            value={email}
            onChangeText={handleChangeText}
          />
        </View>
        <Text style={[styles.errorMessage, error ? styles.error : null]}>{error}</Text>
      </View>
      <View style={styles.login}>
        <TouchableOpacity style={styles.loginButton} onPress={handleOtp}>
          <Text style={[styles.buttonText]}>Get OTP</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    resizeMode: 'center',
  },
  arrow: {
    position: 'absolute',
    top: 10,
    left: 10,
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  roundContainer: {
    width: 150,
    height: 150,
    borderRadius: 100,
    backgroundColor: '#FFFFFF',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 130,
    height: 130,
    borderRadius: 75,
    alignSelf: "center"
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 20,
    textAlign: "center"
  },
  subtitle: {
    fontSize: 14,
    color: '#FFFFFF',
    marginTop: 10,
    textAlign: "center"
  },
  input: {
    flex: 1,
    borderColor: 'gray',
    borderWidth: 1.5,
    borderColor: '#526ACE',
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: '#FFFF',
    borderRadius: 10,
    paddingLeft: 40,
  },
  inputcontainer: {
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
    paddingRight: 20,
    paddingLeft: 20,
  },
  inputtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  inputWithIcon: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  icon: {
    position: 'absolute',
    width: 30,
    height: 30,
    right: 10,
    zIndex: 1,
    top: 10,
  },
  textcontainer: {
    alignItems: 'flex-start',
    width: '100%',
    marginTop: 20,
    padding: 20
  },
  logincontainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  login: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  loginButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 20,
    alignSelf: 'flex-end',
    marginRight: 20,
    marginTop: 40,
    marginBottom: 20,
  },
  buttonText: {
    color: '#526ACE',
    fontWeight: 'bold',
  },
  errorMessage: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  error: {
  color: 'red',
  color: '#FF5151',
  fontWeight: 'bold',
  },
});
