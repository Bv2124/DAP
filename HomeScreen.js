import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import { DrawerActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AssetComponent = ({ navigation,route }) => {
  const [totalAssets, setTotalAssets] = useState(0);
  const [approvedAssets, setApprovedAssets] = useState(0);
  const [rejectedAssets, setRejectedAssets] = useState(0);
  const [assetData, setAssetData] = useState([]);
   const handleupdate = () => {
 AsyncStorage.getItem('assetdata')
      .then((data) => {
        const parsedData = JSON.parse(data);
        const total = assetData.length;
        const approved = assetData.length/2;
        const rejected = assetData.length/3;
        setTotalAssets(total);
        setApprovedAssets(approved);
        setRejectedAssets(rejected);
        setAssetData(parsedData);
      })
      .catch((error) => {
        console.log('Error retrieving asset data:', error);
      });
   }
   useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      handleupdate();
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    handleupdate();
  }, [assetData]);
  const handleImageClick = () => {
    console.log('Image clicked');
  };
  const handleRegister = () => {
    navigation.navigate('Register');
  };
  const handlelist = () => {
    navigation.navigate('List');
  };

  const handlemenu = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  };
const handledb = () => {
  navigation.navigate('SQLIQ');
}
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handlemenu}>
          <Image source={require('./Images/Menu.png')} style={styles.menuIcon} />
        </TouchableOpacity>
        <View style={styles.title}>
          <Text style={styles.welcomeText}>Welcome</Text>
          <Text style={styles.headerText}>Abraham Lincoln</Text>
        </View>
        <View style={styles.headerIconsContainer}>
          <Image source={require('./Images/Alerts.png')} style={styles.headerIcon} />
          <Image source={require('./Images/User.png')} style={styles.headerIcon} />
        </View>
      </View>
      <View style={styles.sideMenu}>
        <View style={styles.sideMenuItem}>
          <View style={styles.firstCard}>
            <View style={{ width: '100%' }}>
              <Text style={[styles.cardtitle]}>Status</Text>
            </View>
            <View style={styles.Progresscontainer}>
              <TouchableOpacity onPress={handleImageClick} style={styles.P1}>
                <CircularProgress
                  value={totalAssets}
                  activeStrokeColor={'blue'}
                  maxValue={100}
                  radius={45}
                  progressValueColor={'black'}
                  inActiveStrokeColor={'grey'}
                  inActiveStrokeOpacity={0.2}
                />
                <Text>Total</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleImageClick} style={styles.P1}>
                <CircularProgress
                  value={approvedAssets}
                  activeStrokeColor={'green'}
                  maxValue={totalAssets}
                  radius={45}
                  progressValueColor={'black'}
                  inActiveStrokeColor={'grey'}
                  inActiveStrokeOpacity={0.2}
                />
                <Text>Approved</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleImageClick} style={styles.P1}>
                <CircularProgress
                  value={rejectedAssets}
                  activeStrokeColor={'red'}
                  maxValue={totalAssets}
                  radius={45}
                  progressValueColor={'black'}
                  inActiveStrokeColor={'grey'}
                  inActiveStrokeOpacity={0.2}
                />
                <Text>Rejected</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.cardtitle}>Quick Access</Text>
          <View style={styles.SecondCard}>
            <TouchableOpacity
              onPress={handleRegister}
              style={{ flexDirection: 'row', width: '54%', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center' }}>
              <Image source={require('./Images/Edit.png')} style={styles.headerIcon} />
              <Text style={styles.cardtitle}>Register Assets</Text>
            </TouchableOpacity>
            <View>
              <TouchableOpacity onPress={handledb}>
                <Image source={require('./Images/Add.png')} style={styles.headerIcon} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.ThirdCard}>
            <TouchableOpacity
              onPress={handlelist}
              style={{ flexDirection: 'row', width: '50%', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center' }}>
              <Image source={require('./Images/Fixed.png')} style={styles.headerIcon} />
              <Text style={styles.cardtitle}>List of Assets</Text>
            </TouchableOpacity>
            <View>
              <Text style={styles.cardtitle}>{totalAssets}</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.bottomcontainer}>
        <Image source={require('./Images/Assets.png')} style={styles.Assets} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
container: {
flex: 1,
},
header: {
flexDirection: 'row',
justifyContent: 'space-between',
alignItems: 'center',
padding: 10,
},
title: {
flexDirection: 'column',
justifyContent: 'space-between',
alignItems: 'flex-start',
padding: 10,
flex: 1,
},
menuIcon: {
width: 24,
height: 24,
},
welcomeText: {
color: '#526ACE'
},
cardtitle: {
fontSize: 16,
fontWeight: 'bold',
color: '#526ACE'
},
headerText: {
fontSize: 18,
fontWeight: 'bold',
color: '#526ACE'
},
headerIconsContainer: {
flexDirection: 'row',
},
headerIcon: {
width: 35,
height: 35,
marginLeft: 10,
},
sideMenu: {
paddingHorizontal: 10,
justifyContent: 'space-between',
},
sideMenuItem: {
paddingHorizontal: 5,
paddingVertical: 10,
justifyContent: 'space-between',
},
firstCard: {
backgroundColor: 'white',
borderRadius: 10,
padding: 15,
flexDirection: 'column',
alignItems: 'flex-start',
paddingVertical: 10,
marginVertical: 10,
},
SecondCard: {
backgroundColor: 'white',
borderRadius: 10,
padding: 15,
flexDirection: 'row',
alignItems: 'center',
justifyContent: 'space-between',
alignContent: 'center',
paddingVertical: 15,
marginVertical: 10,
},
ThirdCard: {
backgroundColor: 'white',
borderRadius: 10,
padding: 15,
flexDirection: 'row',
alignItems: 'center',
justifyContent: 'space-between',
alignContent: 'center',
marginVertical: 10,
},
cardIconsContainer: {
flexDirection: 'row',
marginRight: 10,
},
cardIcon: {
width: 24,
height: 24,
marginRight: 5,
},
cardTitle: {
fontSize: 16,
fontWeight: 'bold',
},
card: {
backgroundColor: 'white',
marginVertical: 10,
padding: 10,
borderRadius: 10,
},
cardIconContainer: {
flexDirection: 'row',
justifyContent: 'center',
},
cardIcon: {
width: 24,
height: 24,
},
cardTitle: {
fontSize: 16,
textAlign: 'center',
marginTop: 10,
},
assetListContainer: {
marginTop: 10,
},
Assets: {
width: 400,
height: 200,
},
bottomcontainer: {
flex: 1,
justifyContent: 'center',
alignItems: 'center',
},
Progresscontainer: {
justifyContent: 'space-between',
alignItems: 'center',
flexDirection: 'row',
width: '100%',
marginTop: 10,
},
P1: {
justifyContent: 'center',
flexDirection: 'column',
alignItems: 'center',
}
});

export default AssetComponent;