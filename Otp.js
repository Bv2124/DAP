import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';

export default function Otp({ navigation }) {
  const digit1Ref = useRef(null);
  const digit2Ref = useRef(null);
  const digit3Ref = useRef(null);
  const digit4Ref = useRef(null);
  const digit5Ref = useRef(null);
  const digit6Ref = useRef(null);

  const [digit1, setDigit1] = useState('');
  const [digit2, setDigit2] = useState('');
  const [digit3, setDigit3] = useState('');
  const [digit4, setDigit4] = useState('');
  const [digit5, setDigit5] = useState('');
  const [digit6, setDigit6] = useState('');
  const [Error,setError] = useState('');
  const handleVerifyOTP = () => {
    const enteredOTP = digit1 + digit2 + digit3 + digit4 + digit5 + digit6;
   if(enteredOTP === '123456'){
    navigation.navigate('NewPassword');
    setError('');
   }
   else if(enteredOTP === ''){
    setError('Please enter your OTP');
    setDigit1('');
    setDigit2('');
    setDigit3('');
    setDigit4('');
    setDigit5('');
    setDigit6('');
   }
   else{
    setError('OTP you have entered is wrong');
    setDigit1('');
    setDigit2('');
    setDigit3('');
    setDigit4('');
    setDigit5('');
    setDigit6('');
   }
  };

  return (
    <ImageBackground
      source={require('./Images/Loginbg.png')}
      style={styles.background}
    ><Image
    source={require('./Images/Arrowleft.png')}
    style={styles.arrow}
    />
      <View style={[styles.roundContainer]}>
        <Image
          source={require('./Images/Security.png')}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <View style={styles.textcontainer}>
        <Text style={styles.title}>2. Enter OTP</Text>
        <Text style={styles.subtitle}>
          Please enter the 6 digit code which has been sent to your email address.
        </Text>
      </View>
      <View style={styles.inputcontainer}>
        <View style={styles.otpContainer}>
          <TextInput
            style={styles.otpInput}
            ref={digit1Ref}
            maxLength={1}
            keyboardType="numeric"
            value={digit1}
            placeholder="-"
            onChangeText={(text) => {
              setDigit1(text);
              if (text.length === 1) {
                digit2Ref.current.focus();
              }
            }}
            onSubmitEditing={() => digit2Ref.current.focus()}
          />

          <TextInput
            style={styles.otpInput}
            ref={digit2Ref}
            maxLength={1}
            keyboardType="numeric"
            value={digit2}
            placeholder="-"
            onChangeText={(text) => {
              setDigit2(text);
              if (text.length === 1) {
                digit3Ref.current.focus();
              }
            }}
            onSubmitEditing={() => digit3Ref.current.focus()}
          />

          <TextInput
            style={styles.otpInput}
            ref={digit3Ref}
            maxLength={1}
            keyboardType="numeric"
            value={digit3}
            placeholder="-"
            onChangeText={(text) => {
              setDigit3(text);
              if (text.length === 1) {
                digit4Ref.current.focus();
              }
            }}
            onSubmitEditing={() => digit4Ref.current.focus()}
          />

          <TextInput
            style={styles.otpInput}
            ref={digit4Ref}
            maxLength={1}
            keyboardType="numeric"
            value={digit4}
            placeholder="-"
            onChangeText={(text) => {
              setDigit4(text);
              if (text.length === 1) {
                digit5Ref.current.focus();
              }
            }}
            onSubmitEditing={() => digit5Ref.current.focus()}
          />

          <TextInput
            style={styles.otpInput}
            ref={digit5Ref}
            maxLength={1}
            keyboardType="numeric"
            value={digit5}
            placeholder="-"
            onChangeText={(text) => {
              setDigit5(text);
              if (text.length === 1) {
                digit6Ref.current.focus();
              }
            }}
            onSubmitEditing={() => digit6Ref.current.focus()}
          />

          <TextInput
            style={styles.otpInput}
            ref={digit6Ref}
            maxLength={1}
            keyboardType="numeric"
            placeholder="-"
            value={digit6}
            onChangeText={(text) => {
              setDigit6(text);
            }}
            onSubmitEditing={handleVerifyOTP}
          />
        </View>
      </View>
      {Error !== '' && <Text style={styles.error}>{Error}</Text>}
      <View style={styles.login}>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleVerifyOTP}
        >
          <Text style={styles.buttonText}>Verify OTP</Text>
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
    width: 100,
    height: 100,
    borderRadius: 75,
    alignSelf: 'center',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#FFFFFF',
    marginTop: 10,
    textAlign: 'center',
  },
  inputcontainer: {
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
    paddingRight: 20,
    paddingLeft: 20,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  otpInput: {
    flex: 1,
    borderColor: 'gray',
    borderWidth: 1.5,
    borderColor: '#526ACE',
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: '#FFFF',
    borderRadius: 10,
    fontSize: 24,
    textAlign: 'center',
  },
  textcontainer: {
    alignItems: 'flex-start',
    width: '100%',
    marginTop: 20,
    padding: 20,
    textAlign:'left',
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
  error: {
    color: 'red',
    color: '#FF5151',
    fontWeight: 'bold',
    textAlign: 'center',
    },
});
