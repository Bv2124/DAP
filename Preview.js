import React,{useState,useEffect} from 'react';
import { View, Text, StyleSheet,ScrollView,TouchableOpacity,Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Preview = ({ route,navigation }) => {
  const [assetdata,setassetdata]= useState([])
  const { assets,clearData } = route.params;
  const [showAlert, setShowAlert] = useState(false);
  useEffect(() => {
    setassetdata(assets)
    console.log(assets,"assets in the Preview Screen")
 }, [assets]);
 const handleConfirm = () => {
  console.log(assetdata, "assetdata in the Preview screen2");
  AsyncStorage.getItem('assetdata')
    .then((data) => {
      let existingData = data ? JSON.parse(data) : [];
      if (!Array.isArray(existingData)) {
        existingData = []; // Initialize as an empty array if not already an array
      }
      existingData.push(assetdata); // Add new data to the existing data
      AsyncStorage.setItem('assetdata', JSON.stringify(existingData));
      setShowAlert(true); // Show the alert card
      console.log("alert card")
      clearData();
      setTimeout(() => {
        setShowAlert(false); // Hide the alert card after a certain duration (e.g., 3 seconds)
        navigation.navigate('Home');
      }, 2000);
    })
    .catch((error) => {
      console.log('Error saving or retrieving data:', error);
    });
};

  const handleEdit = () => {
    navigation.navigate('Register');
  }
  return (
    <View style={styles.container}>
 <ScrollView>
      <Text style={[styles.heading,{marginTop:10}]}>Geography Details</Text>
      <View style={styles.card}>
  <Text style={styles.label}>ID:</Text>
  <Text style={styles.value}>{assetdata.id}</Text>
</View>

<View style={styles.card}>
  <Text style={styles.label}>Building:</Text>
  <Text style={styles.value}>{assetdata.Building}</Text>
</View>

<View style={styles.card}>
  <Text style={styles.label}>Floor:</Text>
  <Text style={styles.value}>{assetdata.Floor}</Text>
</View>

<View style={styles.card}>
  <Text style={styles.label}>Complaint Type:</Text>
  <Text style={styles.value}>{assetdata.Complaint}</Text>
</View>

<View style={styles.card}>
  <Text style={styles.label}>Nature:</Text>
  <Text style={styles.value}>{assetdata.Nature}</Text>
</View>

<View style={styles.card}>
  <Text style={styles.label}>Division:</Text>
  <Text style={styles.value}>{assetdata.Division}</Text>
</View>

<View style={styles.card}>
  <Text style={styles.label}>Discipline:</Text>
  <Text style={styles.value}>{assetdata.Discipline}</Text>
</View>

<View style={styles.card}>
  <Text style={styles.label}>Priority:</Text>
  <Text style={styles.value}>{assetdata.Priority}</Text>
</View>

<View style={styles.card}>
  <Text style={styles.label}>Status:</Text>
  <Text style={styles.value}>{assetdata.Status}</Text>
</View>
    </ScrollView>
    {showAlert && (
      <View style={styles.alertContainer}>
 <View style={styles.alertCard}>
 <Image
                source={require('./Images/Sucess.png')}
                style={styles.icone}
              />
            <Text style={styles.alertText}>Asset created successfully!</Text>
          </View>
      </View>
        )}
    <View style={{width:"100%", height:60,flexDirection:'row',justifyContent:'space-evenly'}}>
      <View style={{width:'50%',backgroundColor:'#526ACE',justifyContent:'center',alignContent:'center',alignItems:'center',flexDirection:'row'}}>
      <TouchableOpacity onPress={handleEdit} style={{flexDirection:'row'}}>
    <Image
                source={require('./Images/Edit.png')}
                style={styles.icon}
              />
      <Text style={{fontSize:18,fontWeight:"bold",color:"#ffffff",marginLeft:5}}>Edit</Text>
    </TouchableOpacity>
      </View>
      <View style={{width:'50%',backgroundColor:'#526ACE',justifyContent:'center',alignContent:'center',alignItems:'center',flexDirection:'row'}}>
      <TouchableOpacity onPress={handleConfirm} style={{flexDirection:'row'}}>
    <Image
                source={require('./Images/Confirm.png')}
                style={styles.icon}
              />
      <Text style={{fontSize:18,fontWeight:"bold",color:"#ffffff",marginLeft:5}}>Confirm</Text>
    </TouchableOpacity>
      </View>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#526ACE',
  },
  card: {
    backgroundColor: '#F6F6F6',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    marginHorizontal: 20,
    flexDirection:'row',
    justifyContent:'space-between',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  value: {
    fontSize: 16,
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    borderRadius: 8,
    marginTop: 8,
  },
  noImageText: {
    fontSize: 16,
    fontStyle: 'italic',
  },
  icon:{
    width:25,
    height:25,
    alignContent:'center'
  },
  alertContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  alertCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 26,
    alignItems: 'center',
  },
  alertText: {
    marginTop:10,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  icone:{
    width:50,
    height:50,
  }
});

export default Preview;
