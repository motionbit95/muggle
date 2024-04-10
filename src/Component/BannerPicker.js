import React, {useState} from 'react';
import {View, Image, Alert, TouchableOpacity, Text} from 'react-native';
import storage from '@react-native-firebase/storage';
import {launchImageLibrary} from 'react-native-image-picker';

import {PermissionsAndroid} from 'react-native';
import {
  center,
  f_full,
  flex_column,
  fs_lg,
  radius_lg,
  sp_2,
} from '../style/styles';
import Typography from './Typography';

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
      <TouchableOpacity onPress={handleChoosePhoto}>
        {imageUri ? (
          <Image
            style={[
              // radius_full,
              radius_lg,
              f_full,
              {height: 200, backgroundColor: '#d9d9d9'},
            ]}
            source={imageUri ? {uri: imageUri} : null}
          />
        ) : (
          <View
            style={[
              f_full,
              center,
              sp_2,
              {
                height: 200,
                borderRadius: 10,
                borderWidth: 2,
                borderStyle: 'dashed',
                marginBottom: 10,
              },
            ]}>
            <Image
              source={require('../assets/AiOutlinePicture.png')}
              style={{width: 50, height: 50, opacity: 0.5}}
            />
            <Typography light>우리 모임의 사진을 올려보세요.</Typography>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default BannerPicker;
