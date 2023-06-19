import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  } from 'react-native';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import Entry from './Entry';
import LoginScreen from './LoginScreen';
import Forget from './Forget';
import Otp from './Otp';
import NewPassword from './Newpassword';
import HomeScreen from './HomeScreen';
import List from './List';
import Register from './Register';
import Preview from './Preview';
import SQLIQ from './db';
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const WrappedEntry = gestureHandlerRootHOC(Entry);
const WrappedLoginScreen = gestureHandlerRootHOC(LoginScreen);
const WrappedForget = gestureHandlerRootHOC(Forget);
const WrappedOtp = gestureHandlerRootHOC(Otp);
const WrappedNewPassword = gestureHandlerRootHOC(NewPassword);
const WrappedHomeScreen = gestureHandlerRootHOC(HomeScreen);
const WrappedList = gestureHandlerRootHOC(List);
const WrappedRegister = gestureHandlerRootHOC(Register);
const WrappedSQLIQ = gestureHandlerRootHOC(SQLIQ);
const CustomDrawerContent = (props) => {
  const { navigation } = props;

  const CustomDrawerItem = ({ label, icon, onPress }) => {
    if (label === 'Home') {
      var itemStyle = styles.drawerItemHome;
    } else {
      itemStyle = styles.drawerItem;
    } 
   return (
    <TouchableOpacity onPress={onPress} style={itemStyle}>
      <View style={styles.drawerItemContainer}>
        <Image source={icon} style={styles.drawerItemIcon} />
        <Text style={styles.drawerItemLabel}>{label}</Text>
      </View>
    </TouchableOpacity>
  )}

  const drawerItems = [
    {
      label: 'Home',
      icon: require('./Images/Home.png'),
      onPress: () => navigation.navigate('Home'),
    },
    {
      label: 'Register',
      icon: require('./Images/Edit.png'),
      onPress: () => navigation.navigate('Register'),
    },
    {
      label: 'List',
      icon: require('./Images/Fixed.png'),
      onPress: () => navigation.navigate('List'),
    },
    {
      label: 'SQLIQ',
      icon: require('./Images/Fixed.png'),
      onPress: () => navigation.navigate('SQLIQ'),
    },
  ];

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <Image source={require('./Images/User.png')} style={styles.profileImage} />
        <Text style={styles.username}>Abraham Lincoln</Text>
      </View>
      <View style={styles.drawerContainer}>
        {drawerItems.map((item, index) => (
          <CustomDrawerItem
            key={index}
            label={item.label}
            icon={item.icon}
            onPress={item.onPress}
          />
        ))}
      </View>
      <View style={styles.logoutButtonContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')} style={styles.logoutButton}>
          <Image
            source={require('./Images/Logout.png')}
            style={styles.logoutimage}
          />
          <Text style={{fontSize: 16, fontWeight: '800',color:'white' }}>Logout</Text>
        </TouchableOpacity>
        <Text style={{marginTop:5,fontSize:16}}>A Smart Fm Product</Text>
      </View>
    </DrawerContentScrollView>
  );
};

const DrawerNavigator = ({navigation}) => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={WrappedHomeScreen} options={{ headerShown: false }}/>
      <Drawer.Screen
        name="Register"
        component={WrappedRegister}
        options={{
          title: 'Register Asset',
          headerStyle: { backgroundColor: '#526ACE' },
          headerTintColor: 'white',
          headerBackVisible: true,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Home")}
              style={styles.headerButton}
            >
              <Image
                source={require('./Images/Close.png')}
                style={styles.headerBackIcon}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Drawer.Screen
        name="List"
        component={WrappedList}
        options={{
          title: 'List of Assets',
          headerStyle: { backgroundColor: '#526ACE' },
          headerTintColor: 'white',
          headerBackVisible: true,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Home")}
              style={styles.headerButton}
            >
              <Image
                source={require('./Images/Close.png')}
                style={styles.headerBackIcon}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Drawer.Screen
        name="SQLIQ"
        component={WrappedSQLIQ}
        options={{
          title: 'SQLIQ',
          headerStyle: { backgroundColor: '#526ACE' },
          headerTintColor: 'white',
          headerBackVisible: true,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Home")}
              style={styles.headerButton}
            >
              <Image
                source={require('./Images/Close.png')}
                style={styles.headerBackIcon}
              />
            </TouchableOpacity>
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login Page">
        <Stack.Screen name="Login Page" component={WrappedEntry} options={{ headerShown: false }} />
        <Stack.Screen name="LoginScreen" component={WrappedLoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Forget" component={WrappedForget} options={{ headerShown: false }} />
        <Stack.Screen name="Otp" component={WrappedOtp} options={{ headerShown: false }} />
        <Stack.Screen name="NewPassword" component={WrappedNewPassword} options={{ headerShown: false }} />
        <Stack.Screen name="HomeDrawer" component={DrawerNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="Preview" component={Preview} options={{
          title: 'Preview Screen',
          headerStyle: { backgroundColor: '#526ACE' },
          headerTintColor: 'white',
          headerBackVisible: true,
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  header: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    padding: 16,
  },
  footerText: {
    fontSize: 16,
  },
  username:{
    color:'#526ACE',
    fontWeight: 'bold'
  },
  drawerItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius:50,
    backgroundColor:'lightgrey',
    marginVertical: 8,
    marginHorizontal: 16,
  },
  drawerItemLabel: {
    fontSize: 18,
    textAlign: 'center',
  },
  drawerItemIcon: {
    width: 25,
    height: 25,
    marginRight: 16,
  },
  logoutButtonContainer: {
    marginTop: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutButton:{
    flexDirection:'row',
    backgroundColor:'#526ACE',
    borderRadius:50,
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal:30,
    paddingVertical: 10,
    flexDirection:'row',
  },
  logoutimage: {
    width: 25,
    height: 25,
    marginRight:10
  },
  headerContainer: {
    alignItems: 'center',
    padding: 16,
  },
  container:{
    flex: 1,
    backgroundColor: 'white',
  },
  drawerItemContainer:{
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 2,
  },
  drawerContainer:{
    flex: 1,
    backgroundColor: 'white',
  },
  drawerItemHome:{
    backgroundColor: '#d1d8f5',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius:50,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  headerBackIcon:{
    width: 30,
    height: 25,
    marginLeft: 10,
  }
});





