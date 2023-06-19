import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import Geolocation from '@react-native-community/geolocation';
import { BottomSheetModalProvider, BottomSheetModal } from '@gorhom/bottom-sheet';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Register = ({ navigation, route }) => {
  const [toeditdata, setToeditdata] = useState('')
  const [expandedLocation, setExpandedLocation] = useState(false)
  const [expandedPrimary, setExpandedPrimary] = useState(false);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [imageUri, setImageUri] = useState('');
  const bottomSheetModalRefLocation = useRef(null);
  const bottomSheetModalRefBuilding = useRef(null);
  const bottomSheetModalRefFloor = useRef(null);
  const bottomSheetModalRefSpot = useRef(null);
  const bottomSheetModalRefComplainttype = useRef(null);
  const bottomSheetModalRefDiscipline = useRef(null);
  const bottomSheetModalRefDivision = useRef(null);
  const bottomSheetModalRefNature = useRef(null);
  const [buildingdata, setBuildingdata] = useState([])
  const [floordata, setFloordata] = useState([])
  const [spotdata, setSpotdata] = useState([])
  const [locationdata, setLocationdata] = useState([])
  const [complainttypedata, setComplainttypedata] = useState([])
  const [disciplinedata, setDisciplinedata] = useState([])
  const [divisiondata, setDivisiondata] = useState([])
  const [naturedata, setNaturedata] = useState([])
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedBuilding, setSelectedBuilding] = useState('');
  const [selectedFloor, setSelectedFloor] = useState('');
  const [selectedSpot, setSelectedSpot] = useState('');
  const [selectedComplainttype, setSelectedComplainttype] = useState('');
  const [selectedDiscipline, setSelectedDiscipline] = useState('');
  const [selectedDivision, setSelectedDivision] = useState('');
  const [selectedNature, setSelectedNature] = useState('');
  const [Expandedcamera, setExpandedcamera] = useState(false);
  const [camera, setCamera] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('')
  const [selectedPriority, setSelectedPriority] = useState('')
  const [assetstate, setAssetstate] = useState('ADD ASSET')
  const [id, setId] = useState(new Date().getTime())
  const handleClearData = () => {
    setSelectedLocation('');
    setSelectedBuilding('');
    setSelectedFloor('');
    setSelectedSpot('');
    setSelectedComplainttype('');
    setSelectedDiscipline('');
    setSelectedDivision('');
    setSelectedNature('');
    setExpandedPrimary(false);
    console.log("clearing")
  };
  useEffect(() => {
    setExpandedPrimary(false);
    setExpandedLocation(false);
  }, []);

  useEffect(() => {
    if (route.params) {
      const { toedit } = route.params;

      console.log(toedit, "toedit")

      setToeditdata(toeditdata);
      if (toedit) {
        setAssetstate("SAVE ASSET")
        setSelectedDiscipline(toedit.Discipline);
        setSelectedDivision(toedit.Division);
        setSelectedBuilding(toedit.Building);
        setSelectedComplainttype(toedit.ComplaintType);
        setSelectedFloor(toedit.Floor);
        setSelectedNature(toedit.Nature);
        setId(toedit.id)
      }
    }
  }, [route.params]);
  const handleEditData = () => {
    let EditedData = {
      "id": id,
      "Building": selectedBuilding,
      "Floor": selectedFloor,
      "Complaint": selectedComplainttype,
      "Nature": selectedNature,
      "Division": selectedDivision,
      "Discipline": selectedDiscipline,
      "Priority": selectedPriority,
      "Status": selectedStatus
    };
    setAssetstate("ADD ASSET");
    console.log(EditedData, "EditedData");

    AsyncStorage.getItem('assetdata')
      .then((data) => {
        const assetdata = JSON.parse(data);
        const updatedAssetdata = assetdata.map((item) => {
          if (item.id === EditedData.id) {
            return { ...item, ...EditedData };
          }
          return item;
        });
        AsyncStorage.setItem('assetdata', JSON.stringify(updatedAssetdata));
        handleClearData()
        navigation.navigate("Home")
      })
      .catch((error) => {
        console.error(error);
      });
  };


  const handleAssetData = () => {
    let AddedData = {
      "id": id,
      "Building": selectedBuilding,
      "Floor": selectedFloor,
      "Complaint": selectedComplainttype,
      "Nature": selectedNature,
      "Division": selectedDivision,
      "Discipline": selectedDiscipline,
      "Priority": selectedPriority,
      "Status": selectedStatus
    }
    console.log(AddedData, "AddedData");
    navigation.navigate('Preview', { assets: AddedData, clearData: handleClearData });
  }
  const handleStatusChange = (status) => {
    setSelectedStatus(status);
    switch (status) {
      case 'Completed':
        break;
      case 'onProcess':
        break;
      case 'havingIssues':
        break;
    }
  }
  const handlePriorityChange = (priority) => {
    setSelectedPriority(priority);
    switch (priority) {
      case 'Low':
        break;
      case 'Medium':
        break;
      case 'High':
        break;
    }
  }

  const dropdownOptions_Status = ['Completed', 'On Process', 'Having Issues'];
  const dropdownOptions_Priority = ['Low', 'Medium', 'High'];
  const handleExpandPrimary = () => {
    setExpandedPrimary(!expandedPrimary);
  };
  const handleExpandcamera = () => {
    setExpandedcamera(!Expandedcamera);
  }
  const handlecameraoption = () => {
    setCamera(!camera);
  }
  const handleLocationOptionSelect = (location) => {
    setSelectedLocation(location.LocalityName);
    bottomSheetModalRefLocation.current?.dismiss();
  };
  const handleBuildingOptionSelect = (building) => {
    setSelectedBuilding(building.BuildingName);
    bottomSheetModalRefBuilding.current?.dismiss();
  };
  const handleFloorOptionSelect = (floor) => {
    setSelectedFloor(floor.FloorName);
    bottomSheetModalRefFloor.current?.dismiss();
  };
  const handleSpotOptionSelect = (spot) => {
    setSelectedSpot(spot.SpotName);
    bottomSheetModalRefSpot.current?.dismiss();
  };
  const handleComplainttypeOptionSelect = (complainttype) => {
    setSelectedComplainttype(complainttype.CCMComplaintTypeName);
    bottomSheetModalRefComplainttype.current?.dismiss();
  };
  const handleNatureOptionSelect = (nature) => {
    setSelectedNature(nature.ComplaintNatureName);
    bottomSheetModalRefNature.current?.dismiss();
  };
  const handleDisciplineOptionSelect = (discipline) => {
    setSelectedDiscipline(discipline.DisciplineName);
    bottomSheetModalRefDiscipline.current?.dismiss();
  }
  const handleDivisionOptionSelect = (division) => {
    setSelectedDivision(division.DivisionName);
    bottomSheetModalRefDivision.current?.dismiss();
  };
  const handlenext = () => {
    handleAssetData()
  }
  const handlesave = (value) => {
    const apiUrl = 'http://13.127.67.252:5040/ReachCommonSelect_API/';
    const requestData = {
      data: {
        "p1": null,
        "p2": "55",
        "p3": null,
        "p4": null,
        "p5": null,
        "p6": "",
        "p7": null,
        "p8": null,
        "p9": null,
        "p10": null,
        "PageIndex_int": 1,
        "PageSize_int": 10,
        "Type_varchar": value,
        "UserGroupKey": "2075",
        "UserAccessKey": "48"
      },
    };
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        "Token_IDPK": 548713,
        "Token_Name": "TokenName"
      },
      body: JSON.stringify(requestData)
    })
      .then(response => response.json())
      .then(data => {
        if (value === "LocalityIDPK") {
          setLocationdata(data.Output.data);
          bottomSheetModalRefLocation.current?.present()
        } else if (value === "BuildingIDPK") {
          setBuildingdata(data.Output.data);
          bottomSheetModalRefBuilding.current?.present();
        } else if (value === "FloorIDPK") {
          setFloordata(data.Output.data);
          bottomSheetModalRefFloor.current?.present();
        } else if (value === "SpotIDPK") {
          setSpotdata(data.Output.data);
          bottomSheetModalRefSpot.current?.present();
        }
        else if (value === "CCMComplaintTypeIDPK") {
          setComplainttypedata(data.Output.data);
          bottomSheetModalRefComplainttype.current?.present();
        }
        else if (value === "DisciplineIDPK") {
          setDisciplinedata(data.Output.data);
          bottomSheetModalRefDiscipline.current?.present();
        }
        else if (value === "DIVISIONIDPK") {
          setDivisiondata(data.Output.data);
          bottomSheetModalRefDivision.current?.present();
        }
        else if (value === "ComplaintNatureIDPK") {
          setNaturedata(data.Output.data);
          bottomSheetModalRefNature.current?.present();
        }
      })
      .catch(error => {
        console.error(error);
        // Handle any errors that occur during the API call
      })
      .finally(() => {
        bottomSheetModalRefLocation.current?.dismiss();
        bottomSheetModalRefBuilding.current?.dismiss();
        bottomSheetModalRefFloor.current?.dismiss();
        bottomSheetModalRefSpot.current?.dismiss();
        bottomSheetModalRefComplainttype.current?.dismiss();
        bottomSheetModalRefDiscipline.current?.dismiss();
        bottomSheetModalRefDivision.current?.dismiss();
        bottomSheetModalRefNature.current?.dismiss();
        // Dismiss the bottom sheet after the API call is completed
      });
  };
  const handleExpandLocation = () => {
    setExpandedLocation((prevExpanded) => !prevExpanded);
  };
  const handleCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLatitude(latitude.toString());
        setLongitude(longitude.toString());
      },
      (error) => {
        console.log(error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };
  const handleImageUpload = () => {
    const options = {
      maxHeight: 500,
      maxWidth: 500,
      saveToPhotos: true,
      mediaType: 'photo',
      includeBase64: false,
    };
    console.log("camera", camera)
    if (camera === true) {
      launchCamera(options, (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('Image picker error:', response.error);
        } else if (response.assets && response.assets.length > 0) {
          var imageUri = { uri: 'data:image/png;base64,' + response.base64 }
          setImageUri(imageUri);
          console.log(imageUri);
        }
        else {
          var imageUri = { uri: 'data:image/png;base64,' + response.base64 }
          setImageUri(imageUri);
          console.log(imageUri);
        }
      });
    }
    else{
      launchImageLibrary(options, (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('Image picker error:', response.error);
        } else if (response.assets && response.assets.length > 0) {
          const imageUri = response.assets[0].uri;
          setImageUri(imageUri);
        }
      });
    }
  };
  return (
    <BottomSheetModalProvider>
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity onPress={handleExpandLocation} style={styles.dropdown}>
          <View style={styles.dropdowncontainer}>
            <Text style={styles.dropdownText}>
              {'Geography Location Details'}
            </Text>
            <Image
              source={expandedLocation ? require('./Images/Up.png') : require('./Images/Down.png')}
              style={styles.imageIcon}
            />
          </View>
        </TouchableOpacity>
        {expandedLocation && (
          <View style={styles.card}>
            <View style={{ flexDirection: 'row', width: '100%' }}>
              <View style={{ flexDirection: 'row', width: '90%' }}>
                <TouchableOpacity onPress={() => handlesave("LocalityIDPK")} style={{ width: '100%' }}>
                  <Text style={styles.label}>Location:</Text>
                  <Text style={styles.input}>{selectedLocation}</Text>
                </TouchableOpacity>
              </View>
              {selectedLocation && (
              <View style={{ flexDirection: 'row', width: '10%', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => { setSelectedLocation('') }} style={{ width: '10%' }}>
                  <Image
                    source={require('./Images/Cancel.png')}
                    style={styles.cancel}
                  />
                </TouchableOpacity>
              </View>
              )}
            </View>
            {locationdata && (
              <BottomSheetModal
                ref={bottomSheetModalRefLocation}
                snapPoints={['25%', '50%']}
                index={1}
                enablePanDownToClose={true}
                enablePanUpToClose={true}
                enableSwipeToClose={true}
                swipeDirection={['left', 'right']}
                swipeThreshold={100}
              >
                {locationdata && locationdata.map((datae, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.locationOption}
                    onPress={() => handleLocationOptionSelect(datae)} // pass the location data instead of location
                  >
                    <ScrollView>
                      <Text style={styles.locationOptionText}>{datae.LocalityName}</Text>
                    </ScrollView>
                  </TouchableOpacity>
                ))}
              </BottomSheetModal>
            )}
            <View style={{ flexDirection: 'row', width: '100%' }}>
              <View style={{ flexDirection: 'row', width: '90%' }}>
                <TouchableOpacity onPress={() => handlesave("BuildingIDPK")} style={{ width: '100%' }}>
                  <Text style={styles.label}>Building:</Text>
                  <Text style={styles.input}>{selectedBuilding}</Text>
                </TouchableOpacity>
              </View>
              {selectedBuilding && (
              <View style={{ flexDirection: 'row', width: '10%', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => { setSelectedBuilding('') }} style={{ width: '10%' }}>
                  <Image
                    source={require('./Images/Cancel.png')}
                    style={styles.cancel}
                  />
                </TouchableOpacity>
              </View>
              )}
            </View>
            {buildingdata && (
              <BottomSheetModal
                ref={bottomSheetModalRefBuilding}
                snapPoints={['25%', '50%']}
                index={1}
                enablePanDownToClose={true}
                enablePanUpToClose={true}
                enableSwipeToClose={true}
                swipeDirection={['left', 'right']}
                swipeThreshold={100}
              >
                {buildingdata && buildingdata.map((data, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.locationOption}
                    onPress={() => handleBuildingOptionSelect(data)} // pass the location data instead of location
                  >
                    <ScrollView>
                      <Text style={styles.locationOptionText}>{data.BuildingName}</Text>
                    </ScrollView>
                  </TouchableOpacity>
                ))}
              </BottomSheetModal>
            )}
            <View style={{ flexDirection: 'row', width: '100%' }}>
              <View style={{ flexDirection: 'row', width: '90%' }}>
                <TouchableOpacity onPress={() => handlesave("FloorIDPK")} style={{ width: '100%' }}>
                  <Text style={styles.label}>Floor:</Text>
                  <Text style={styles.input}>{selectedFloor}</Text>
                </TouchableOpacity>
              </View>
              {selectedFloor && (
              <View style={{ flexDirection: 'row', width: '10%', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => { setSelectedFloor('') }} style={{ width: '10%' }}>
                  <Image
                    source={require('./Images/Cancel.png')}
                    style={styles.cancel}
                  />
                </TouchableOpacity>
              </View>
              )}
            </View>
            {floordata && (
              <BottomSheetModal
                ref={bottomSheetModalRefFloor}
                snapPoints={['25%', '50%']}
                index={1}
                enablePanDownToClose={true}
                enablePanUpToClose={true}
                enableSwipeToClose={true}
                swipeDirection={['left', 'right']}
                swipeThreshold={100}
              >
                {floordata && floordata.map((data, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.locationOption}
                    onPress={() => handleFloorOptionSelect(data)} // pass the location data instead of location
                  >
                    <ScrollView>
                      <Text style={styles.locationOptionText}>{data.FloorName}</Text>
                    </ScrollView>
                  </TouchableOpacity>
                ))}
              </BottomSheetModal>
            )}
            <View style={{ flexDirection: 'row', width: '100%' }}>
              <View style={{ flexDirection: 'row', width: '90%' }}>
                <TouchableOpacity onPress={() => handlesave("SpotIDPK")} style={{ width: '100%' }}>
                  <Text style={styles.label}>Spot:</Text>
                  <Text style={styles.input}>{selectedSpot}</Text>
                </TouchableOpacity>
              </View>
              {selectedSpot && (
              <View style={{ flexDirection: 'row', width: '10%', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => { setSelectedSpot('') }} style={{ width: '10%' }}>
                  <Image
                    source={require('./Images/Cancel.png')}
                    style={styles.cancel}
                  />
                </TouchableOpacity>
              </View>
              )}
            </View>
            {spotdata && (
              <BottomSheetModal
                ref={bottomSheetModalRefSpot}
                snapPoints={['25%', '50%']}
                index={1}
                enablePanDownToClose={true}
                enablePanUpToClose={true}
                enableSwipeToClose={true}
                swipeDirection={['left', 'right']}
                swipeThreshold={100}
              >
                {spotdata && spotdata.map((data, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.locationOption}
                    onPress={() => handleSpotOptionSelect(data)} // pass the location data instead of location
                  >
                    <ScrollView>
                      <Text style={styles.locationOptionText}>{data.SpotName}</Text>
                    </ScrollView>
                  </TouchableOpacity>
                ))}
              </BottomSheetModal>
            )}
            <TouchableOpacity onPress={handleCurrentLocation} style={styles.currentLocation}>
              <Text style={styles.currentLocationText}>Use my current location</Text>
            </TouchableOpacity>

            <Text style={styles.label}>Latitude: {latitude}</Text>
            <Text style={styles.label}>Longitude: {longitude}</Text>
          </View>
        )}
        <TouchableOpacity onPress={handleExpandPrimary} style={styles.dropdown}>
          <View style={styles.dropdowncontainer}>
            <Text style={styles.dropdownText}>
              {'Primary Details'}
            </Text>
            <Image
              source={expandedPrimary ? require('./Images/Up.png') : require('./Images/Down.png')}
              style={styles.imageIcon}
            />
          </View>
        </TouchableOpacity>
        {expandedPrimary && (
          <View style={styles.card}>
            <View style={{ flexDirection: 'row', width: '100%' }}>
              <View style={{ flexDirection: 'row', width: '90%' }}>
                <TouchableOpacity onPress={() => handlesave("CCMComplaintTypeIDPK")} style={{ width: '100%' }}>
                  <Text style={styles.label}>Complaint Type:</Text>
                  <Text style={styles.input}>{selectedComplainttype}</Text>
                </TouchableOpacity>
              </View>
              {selectedComplainttype && (
              <View style={{ flexDirection: 'row', width: '10%', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => { setSelectedComplainttype('') }} style={{ width: '10%' }}>
                  <Image
                    source={require('./Images/Cancel.png')}
                    style={styles.cancel}
                  />
                </TouchableOpacity>
              </View>
              )}
            </View>
            {complainttypedata && (
              <BottomSheetModal
                ref={bottomSheetModalRefComplainttype}
                snapPoints={['25%', '50%']}
                index={1}
                enablePanDownToClose={true}
                enablePanUpToClose={true}
                enableSwipeToClose={true}
                swipeDirection={['left', 'right']}
                swipeThreshold={100}
              >
                {complainttypedata && complainttypedata.map((data, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.locationOption}
                    onPress={() => handleComplainttypeOptionSelect(data)} // pass the location data instead of location
                  >
                    <ScrollView>
                      <Text style={styles.locationOptionText}>{data.CCMComplaintTypeName}</Text>
                    </ScrollView>
                  </TouchableOpacity>
                ))}
              </BottomSheetModal>
            )}
            <View style={{ flexDirection: 'row', width: '100%' }}>
              <View style={{ flexDirection: 'row', width: '90%' }}>
                <TouchableOpacity onPress={() => handlesave("ComplaintNatureIDPK")} style={{ width: '100%' }}>
                  <Text style={styles.label}>Complaint Nature:</Text>
                  <Text style={styles.input}>{selectedNature}</Text>
                </TouchableOpacity>
              </View>
              {selectedNature && (
              <View style={{ flexDirection: 'row', width: '10%', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => { setSelectedNature('') }} style={{ width: '10%' }}>
                  <Image
                    source={require('./Images/Cancel.png')}
                    style={styles.cancel}
                  />
                </TouchableOpacity>
              </View>
              )}
            </View>
            {naturedata && (
              <BottomSheetModal
                ref={bottomSheetModalRefNature}
                snapPoints={['25%', '50%']}
                index={1}
                enablePanDownToClose={true}
                enablePanUpToClose={true}
                enableSwipeToClose={true}
                swipeDirection={['left', 'right']}
                swipeThreshold={100}
              >
                {naturedata && naturedata.map((data, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.locationOption}
                    onPress={() => handleNatureOptionSelect(data)} // pass the location data instead of location
                  >
                    <ScrollView>
                      <Text style={styles.locationOptionText}>{data.ComplaintNatureName}</Text>
                    </ScrollView>
                  </TouchableOpacity>
                ))}
              </BottomSheetModal>
            )}
            <View style={{ flexDirection: 'row', width: '100%' }}>
              <View style={{ flexDirection: 'row', width: '90%' }}>
                <TouchableOpacity onPress={() => handlesave("DIVISIONIDPK")} style={{ width: '100%' }}>
                  <Text style={styles.label}>Division :</Text>
                  <Text style={styles.input}>{selectedDivision}</Text>
                </TouchableOpacity>
              </View>
              {selectedDivision && (
              <View style={{ flexDirection: 'row', width: '10%', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => { setSelectedDivision('') }} style={{ width: '10%' }}>
                  <Image
                    source={require('./Images/Cancel.png')}
                    style={styles.cancel}
                  />
                </TouchableOpacity>
              </View>
                  )}
            </View>
            {divisiondata && (
              <BottomSheetModal
                ref={bottomSheetModalRefDivision}
                snapPoints={['25%', '50%']}
                index={1}
                enablePanDownToClose={true}
                enablePanUpToClose={true}
                enableSwipeToClose={true}
                swipeDirection={['left', 'right']}
                swipeThreshold={100}
              >
                {divisiondata && divisiondata.map((data, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.locationOption}
                    onPress={() => handleDivisionOptionSelect(data)} // pass the location data instead of location
                  >
                    <ScrollView>
                      <Text style={styles.locationOptionText}>{data.DivisionName}</Text>
                    </ScrollView>
                  </TouchableOpacity>
                ))}
              </BottomSheetModal>
            )}
            <View style={{ flexDirection: 'row', width: '100%' }}>
              <View style={{ flexDirection: 'row', width: '90%' }}>
                <TouchableOpacity onPress={() => handlesave("DisciplineIDPK")} style={{ width: '100%' }}>
                  <Text style={styles.label}>Discipline :</Text>
                  <Text style={styles.input}>{selectedDiscipline}</Text>
                </TouchableOpacity>
              </View>
              {selectedDiscipline && (
                <View style={{ flexDirection: 'row', width: '10%', alignItems: 'center' }}>
                  <TouchableOpacity onPress={() => { setSelectedDiscipline('') }} style={{ width: '10%' }}>
                    <Image
                      source={require('./Images/Cancel.png')}
                      style={styles.cancel}
                    />
                  </TouchableOpacity>
                </View>
              )}
            </View>
            {disciplinedata && (
              <BottomSheetModal
                ref={bottomSheetModalRefDiscipline}
                snapPoints={['25%', '50%']}
                index={1}
                enablePanDownToClose={true}
                enablePanUpToClose={true}
                enableSwipeToClose={true}
                swipeDirection={['left', 'right']}
                swipeThreshold={100}
              >
                {disciplinedata && disciplinedata.map((data, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.locationOption}
                    onPress={() => handleDisciplineOptionSelect(data)} // pass the location data instead of location
                  >
                    <ScrollView>
                      <Text style={styles.locationOptionText}>{data.DisciplineName}</Text>
                    </ScrollView>
                  </TouchableOpacity>
                ))}
              </BottomSheetModal>
            )}
            <View style={{ justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row' }}>
              <Text style={[styles.label, { marginTop: -10 }]}>Priority:</Text>
              <SelectDropdown
                data={dropdownOptions_Priority}
                defaultButtonText='Pick Priority'
                buttonStyle={[styles.card, { width: "50%", height: '70%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent', borderWidth: 1, borderRadius: 4, elevation: 0, padding: 0, borderColor: '#ccc' }]}
                onSelect={(Priority) => handlePriorityChange(Priority)}
              />
            </View>
            <View style={{ justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row' }}>
              <Text style={[styles.label, { marginTop: -10 }]}>Status:</Text>
              <SelectDropdown
                data={dropdownOptions_Status}
                defaultButtonText='Pick Status'
                buttonStyle={[styles.card, { width: "50%", height: '70%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent', borderWidth: 1, borderRadius: 4, elevation: 0, padding: 0, borderColor: '#ccc' }]}
                onSelect={(status) => handleStatusChange(status)}
              />
            </View>
            <TouchableOpacity onPress={handleExpandcamera} style={styles.dropdown}>
              <View style={styles.dropdowncontainer}>
                <Text style={styles.dropdownText}>{'Attach Image'}</Text>
                <Image
                  source={Expandedcamera ? require('./Images/Up.png') : require('./Images/Down.png')}
                  style={styles.imageIcon}
                />
              </View>
            </TouchableOpacity>
            {Expandedcamera && (
              <TouchableOpacity style={styles.card} onPress={handleImageUpload}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <TouchableOpacity onPress={handlecameraoption}>
                    <Image source={require('./Images/Camera.png')} style={styles.cameraimage} />
                  </TouchableOpacity>
                  <Text>Capture / Add</Text>
                  {imageUri ? (
                    <TouchableOpacity onPress={() => setImageUri('')}>
                      <Image source={require('./Images/Cancel.png')} style={styles.addimage} />
                    </TouchableOpacity>
                  ) : (
                    <Image source={require('./Images/Add.png')} style={styles.addimage} />
                  )}
                </View>
                {imageUri && (
                  <View style={styles.carde}>
                    <Image source={{ uri: imageUri }} style={styles.Showimage} />
                  </View>
                )}
              </TouchableOpacity>
            )
            }
          </View>
        )}
        <TouchableOpacity onPress={() => (assetstate === "ADD ASSET" ? handleAssetData() : assetstate === "SAVE ASSET" ? handleEditData() : null)} style={styles.button}>
          <Text style={styles.buttonText}>{assetstate}</Text>
        </TouchableOpacity>
      </ScrollView>
      <TouchableOpacity style={{ width: "100%", height: 60, backgroundColor: '#526ACE', justifyContent: "center", alignSelf: "center" }} onPress={handlenext}>
        <Text style={{ fontSize: 18, fontWeight: "bold", alignSelf: "center", color: "#ffffff" }}>Next</Text>
      </TouchableOpacity>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  dropdown: {
    backgroundColor: '#f5f5f5',
    paddingVertical: 5,
    paddingHorizontal: 16,
    borderRadius: 8,
    width: '100%',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 2,
  },
  dropdownText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#006',
    flexDirection: 'row',
    width: '100%',
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 2,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 6,
    marginBottom: 16,
  },
  currentLocation: {
    marginBottom: 16,
  },
  currentLocationText: {
    color: '#0066cc',
  },
  imageUpload: {
    marginBottom: 16,
  },
  imageUploadText: {
    color: '#0066cc',
  },
  uploadedImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 16,
    borderRadius: 8,
  },
  button: {
    backgroundColor: 'green',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    shadowColor: '#000',
    justifyContent: 'center',
    flexDirection: 'row',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 2,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  imageIcon: {
    width: 24,
    height: 24,
  },
  dropdowncontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  locationOption: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationOptionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0066cc',
  },
  cancel: {
    width: 20,
    height: 20,
    position: 'absolute',
    left: '30%',
    bottom: '-20%',
    marginLeft: 10
  },
  cameraimage: {
    width: 25,
    height: 25,
    marginRight: 10
  },
  addimage: {
    width: 25,
    height: 25,
  },
  carde: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Showimage: {
    width: 150,
    height: 150,
  },
});

export default Register;

