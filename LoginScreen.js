import React, { useState,useEffect} from 'react';
import {
View,
StyleSheet,
TextInput,
Image,
Text,
TouchableOpacity,
ImageBackground,
ScrollView
} from 'react-native';

const LoginScreen = ({ navigation }) => {
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const [showPassword, setShowPassword] = useState(false);
const [usernameError, setUsernameError] = useState('');
const [passwordError, setPasswordError] = useState('');
const [rememberMe, setRememberMe] = useState(false);
useEffect(() => {
  setRememberMe(false);
}, []);
const handleLogin = () => {
if (validateForm()) {
navigation.navigate('HomeDrawer');
}
};
const validateForm = () => {
let isValid = true;
if (username.trim() === '') {
setUsernameError('Please enter a valid username');
isValid = false;
} 
else if (username === 'Vignesh'){
  setUsernameError('');
}
else {
  setUsernameError('Username must be a valid');
  isValid = false;
}
if (password.trim() === '') {
setPasswordError('Please enter a valid password');
isValid = false;
}
else if (password === '123456') {
  setPasswordError('')
}
else {
  setPasswordError('Password must be a valid');
  isValid = false;
}
return isValid;
};
const handleRememberMeToggle = () => {
  setRememberMe((prevState) => !prevState);
  setUsername('Vignesh')
  setPassword( '123456')
};

return (
<ScrollView style={styles.container}>
<ImageBackground source={require('./Images/Loginbg.png')} style={styles.background}>
<View style={styles.innercontainer}>
<View style={{ width: '100%', justifyContent: 'center', alignSelf: 'center' }}>
<View style={[styles.roundContainer]}>
<Image source={require('./Images/SmartFm.png')} style={styles.image} resizeMode="contain" />
</View>
<Text style={styles.title}>Welcome</Text>
<Text style={styles.subtitle}>Login to your account</Text>
</View>
<View style={styles.textContainer}>
<View style={styles.inputcontainer}>
<Text style={styles.inputtitle}>Username*</Text>
<View style={styles.inputWithIcon}>
<Image source={require('./Images/Usericon.png')} style={styles.icone} resizeMode="contain" />
<TextInput
style={styles.input}
placeholder="Enter your Username here"
value={username}
onChangeText={(text) => setUsername(text)}
/>
</View>
{usernameError !== '' && <Text style={styles.error}>{usernameError}</Text>}
<Text style={styles.inputtitle}>Password*</Text>
<View style={styles.inputWithIcon}>
<TextInput
style={styles.input}
placeholder="Enter your Password here"
value={password}
onChangeText={(text) => setPassword(text)}
secureTextEntry={!showPassword}
/>
<TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
<Image
source={showPassword ? require('./Images/eyeopen.png') : require('./Images/eyeclose.png')}
style={styles.icon}
resizeMode="contain"
/>
</TouchableOpacity>
</View>
{passwordError !== '' && <Text style={styles.error}>{passwordError}</Text>}
<View style={styles.checkboxContainer}>
<TouchableOpacity
  style={styles.checkbox}
  onPress={handleRememberMeToggle}
  activeOpacity={rememberMe ? 1 : 0.5}
>
  {rememberMe ? (
    <Image source={require('./Images/Checked.png')} style={styles.checkboxIcon} resizeMode="contain" />
  ) : null}
</TouchableOpacity>

<Text style={styles.checkboxLabel}>Remember me</Text>
<TouchableOpacity
style={styles.forgotPasswordButton}
onPress={() => {
navigation.navigate('Forget');
}}
>
<Text style={styles.forgotPasswordText}>Forgot Password</Text>
</TouchableOpacity>
</View>
</View>
<View style={styles.logincontainer}>
<View style={styles.design}></View>
<View style={styles.login}>
<TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
<Text style={styles.buttonText}>Login</Text>
</TouchableOpacity>
</View>
</View>
</View>
<View style={[styles.bottomcontainer,{ top: (!usernameError.includes(" ") && !passwordError.includes(" ")) ? '5%' : '0%' }]}>
<View style={styles.Regis}>
<Text>Don't have an account?</Text>
<TouchableOpacity style={styles.lo} onPress={handleLogin}>
<Text style={styles.Register}>Register</Text>
</TouchableOpacity>
</View>
<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
<Image source={require('./Images/Nanosoft.png')} style={styles.logos} resizeMode="contain" />
<Image source={require('./Images/SmartFm.png')} style={styles.logos} resizeMode="contain" />
</View>
</View>
</View>
</ImageBackground>
</ScrollView>
);
};

const styles = StyleSheet.create({
container: {
flex: 1,
backgroundColor: '#FFFFFF',
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
alignSelf: 'center',
},
textContainer: {
textAlign: 'center',
alignContent: 'center',
justifyContent: 'center',
alignItems: 'center',
width: '100%',
paddingHorizontal: 20,
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
marginBottom: 12,
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
bottom: -10,
},
icone: {
position: 'absolute',
width: 30,
height: 30,
right: 10,
zIndex: 1,
top: 11,
},
checkboxContainer: {
flexDirection: 'row',
alignItems: 'center',
justifyContent: 'flex-start',
marginTop: 30,
width: '100%',
},
checkbox: {
width: 20,
height: 20,
borderWidth: 1,
borderColor: 'gray',
marginRight: 10,
},
checkboxLabel: {
fontSize: 15,
color: '#FFFFFF',
},
forgotPasswordButton: {
marginLeft: 'auto',
},
forgotPasswordText: {
fontSize: 15,
color: '#FFFFFF',
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
bottomcontainer: {
justifyContent: 'space-between',
width: '100%',
paddingRight: 20,
paddingLeft: 20,
},
logos: {
width: 100,
height: 100,
alignSelf: 'center',
justifyContent: 'space-between',
alignItems: 'center',
},
Regis: {
fontSize: 14,
color: 'red',
flexDirection: 'row',
alignContent: 'center',
justifyContent: 'center',
alignItems: 'center',
width: '100%',
marginTop:30,
marginBottom:-25,
},
Register: {
color: 'red',
fontWeight: 'bold',
},
lo: {
paddingLeft: 10,
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
background: {
resizeMode: 'cover',
},
innercontainer: {
justifyContent: 'center',
alignItems: 'center',
width: '100%',
height: '100%',
},
error: {
color: 'red',
marginLeft:'20%',
color: '#FF5151',
fontWeight: 'bold',
textAlign: 'center',
},
checkboxIcon:{
  width: 30,
  height: 30,
  position: 'absolute',
  right: -5,
  bottom: 0,
  zIndex: 1,
  top: -7,
}
});

export default LoginScreen;