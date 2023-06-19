import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import Navigation from './Navigation';

const App = () => {
  const [splashVisible, setSplashVisible] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setSplashVisible(false);
    }, 3000); // 3000 milliseconds (3 seconds)
  }, []);

  return (
    <>
      {splashVisible ? (
        <View style={styles.container}>
          <View style={styles.roundContainer}>
            <Image
              source={require('./Images/SmartFm.png')}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
        </View>
      ) : (
       <Navigation/>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#526ACE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  roundContainer: {
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
});

export default App;
