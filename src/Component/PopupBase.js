import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {blackAlpha900, fs_sm, fs_xs} from '../style/styles';

const PopupBase = ({icon, contents}) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          width: 30,
          height: 30,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => setModalVisible(true)}>
        <Image source={icon} />
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={[styles.centeredView]}>
          <ScrollView>
            <View
              style={[
                styles.modalView,
                {paddingTop: Platform.OS === 'ios' ? 50 : 20},
              ]}>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Image
                  source={require('../assets/icons/_x.png')}
                  style={{width: 20, height: 20}}
                />
              </TouchableOpacity>
              <Text style={{color: blackAlpha900, fontSize: fs_xs}}>
                {contents}
              </Text>
              <Button title="Close" onPress={() => setModalVisible(false)} />
            </View>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    alignItems: 'flex-end',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
});

export default PopupBase;
