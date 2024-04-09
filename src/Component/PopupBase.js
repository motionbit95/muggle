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
import {
  align_end,
  btn_primary,
  center,
  flex_column,
  justify_end,
  p_3,
  w_full,
} from '../style/styles';
import Typography from './Typography';

const PopupBase = ({icon, contents, ...props}) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View>
      <TouchableOpacity style={w_full} onPress={() => setModalVisible(true)}>
        {props.button}
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={[w_full]}>
          <View
            style={[
              flex_column,
              justify_end,
              align_end,
              {backgroundColor: 'white'},
            ]}>
            <ScrollView height={'100%'}>{props.children}</ScrollView>
            <View style={[center, w_full, p_3, {marginBottom: 30}]}>
              <TouchableOpacity
                style={[btn_primary, w_full]}
                onPress={() => setModalVisible(false)}>
                <Typography white>닫기</Typography>
              </TouchableOpacity>
            </View>
          </View>
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
