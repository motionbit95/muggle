import React, {useState} from 'react';
import {View, Button, Image, Alert, TouchableOpacity, Text} from 'react-native';
import storage from '@react-native-firebase/storage';
import ImagePicker, {launchImageLibrary} from 'react-native-image-picker';

import {PermissionsAndroid} from 'react-native';
import styles, {
  blackAlpha900,
  btn_normal,
  btn_primary,
  f_full,
  flex_column,
  radius_full,
  sp_2,
} from '../style/styles';

const BannerPicker = props => {
  const [imageUri, setImageUri] = useState(
    props.defaultValue ? props.defaultValue : null,
  );

  const handleChoosePhoto = async () => {
    const options = {
      noData: true,
    };

    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use the photo library');
          launchImageLibrary(options, response => {
            if (response.didCancel) {
              console.log('User cancelled photo picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            } else {
              const source = {uri: response.assets[0].uri};
              setImageUri(source.uri);
              uploadImage(source.uri);
            }
          });
        } else {
          console.log('Camera permission denied');
        }
      } catch (err) {
        // console.warn(err);
      }
    } else {
      launchImageLibrary(options, response => {
        if (response.assets[0].uri) {
          setImageUri(response.assets[0].uri);
          uploadImage(response.assets[0].uri);
          // Handle image selection
        } else if (response.error) {
          Alert.alert('Error', response.error);
        }
      });
    }

    // You can also use as a promise without 'callback':
    // const result = await launchImageLibrary(options);
    // console.log(result);
  };

  const uploadImage = async uri => {
    const filename = uri.substring(uri.lastIndexOf('/') + 1);
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;

    console.log('uploadUri ===> ', uploadUri);
    const task = storage().ref(filename).putFile(uploadUri);

    try {
      await task;
      console.log('Image uploaded successfully');
      const url = await storage().ref(filename).getDownloadURL();
      console.log('Image URL:', url);
      // 여기서 URL을 사용하거나 상태로 저장할 수 있습니다.
      props.onChangeValue(url);
    } catch (error) {
      console.error('Error uploading image: ', error);
      Alert.alert('Error', 'Failed to upload image');
    }
  };

  return (
    <View style={(flex_column, sp_2)}>
      <Image
        style={[
          // radius_full,
          f_full,
          {height: 150, backgroundColor: '#d9d9d9'},
        ]}
        source={imageUri ? {uri: imageUri} : null}
      />
      <TouchableOpacity style={btn_normal} onPress={handleChoosePhoto}>
        <Text style={{color: blackAlpha900}}>모임 배너 이미지 선택</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BannerPicker;
