import { StyleSheet, Text, View, ImageBackground, Image, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

export default function NewPassword({ navigation }) {
  const [newPassword, setNewPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [confirmpasswordError, setconfirmPasswordError] = useState('');
  const [showconfirmPassword, setShowconfirmPassword] = useState('');

  const handleNewPasswordChange = (text) => {
    setNewPassword(text);
    validatePassword(text, confirmpassword);
  };

  const handleConfirmPasswordChange = (text) => {
    setConfirmPassword(text);
    validatePassword(newPassword, text);
  };

  const validatePassword = (newPassword, confirmPassword) => {
    if (newPassword.trim() === '') {
      setPasswordError('Please enter a newPassword');
    } else if (newPassword.length < 8) {
      setPasswordError('Password must contain at least 8 characters');
    } else if (newPassword === '12345678') {
      setPasswordError('');
    }

    if (confirmPassword.trim() === '') {
      setconfirmPasswordError('Please enter the same password');
    } else if (newPassword === confirmPassword) {
      setconfirmPasswordError('');
    } else {
      setconfirmPasswordError('Password must be same as above');
    }
  };

  const handleSave = () => {
    validatePassword(newPassword, confirmpassword);

    if (passwordError === '' && confirmpasswordError === '') {
      navigation.navigate('HomeScreen');
    }
  };

  return (
    <ImageBackground source={require('./Images/Loginbg.png')} style={styles.background}>
      <Image
      source={require('./Images/Arrowleft.png')}
      style={styles.arrow}
      />      
      <View style={[styles.roundContainer]}>
        <Image source={require('./Images/Password.png')} style={styles.image} resizeMode="contain" />
      </View>
      <View style={styles.textcontainer}>
        <Text style={styles.title}>3.Create New Password</Text>
      </View>
      <View style={styles.inputcontainer}>
        <Text style={styles.inputtitle}>New Password</Text>
        <View style={styles.inputWithIcon}>
          <TextInput
            style={styles.input}
            placeholder="Enter your new password"
            value={newPassword}
            onChangeText={handleNewPasswordChange}
            secureTextEntry={!showconfirmPassword}
            maxLength={12}
          />
          <TouchableOpacity onPress={() => setShowconfirmPassword(!showconfirmPassword)}>
            <Image
              source={showconfirmPassword ? require('./Images/eyeopen.png') : require('./Images/eyeclose.png')}
              style={styles.icon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        {passwordError !== '' && <Text style={styles.error}>{passwordError}</Text>}
        <Text style={styles.inputtitle}>Confirm Password</Text>
        <View style={styles.inputWithIcon}>
          <TextInput
            style={styles.input}
            placeholder="Re-enter your password"
            value={confirmpassword}
            onChangeText={handleConfirmPasswordChange}
            secureTextEntry={!showPassword}
            maxLength={12}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={showPassword ? require('./Images/eyeopen.png') : require('./Images/eyeclose.png')}
              style={styles.icon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        {confirmpasswordError !== '' && <Text style={styles.error}>{confirmpasswordError}</Text>}
      </View>
      <View style={styles.save}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.buttonText}>Save</Text>
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
  arrow: {
    position: 'absolute',
    top: 10,
    left: 10,
    width: 30,
    height: 30,
    resizeMode: 'contain',
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
    padding: 20,
  },
  savecontainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  save: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  saveButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 20,
    alignSelf: 'flex-end',
    marginRight: 20,
    marginBottom: 20,
  },
  buttonText: {
    color: '#526ACE',
    fontWeight: 'bold',
  },
  icon: {
    position: 'absolute',
    width: 30,
    height: 30,
    right: 10,
    bottom: -6,
  },
  error: {
    color: 'red',
    marginLeft:'20%',
    color: '#FF5151',
    fontWeight: 'bold',
    textAlign: 'center',
    },
});
