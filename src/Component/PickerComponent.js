import React, {useState} from 'react';
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {component_height, font_md} from '../firebase/api';

const DropDown = ({items, ...props}) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [selectedValue, setSelectedValue] = useState(props.defaultValue);

  function handleValueChange(value) {
    setSelectedValue(value);
    setOpenDropdown(false);
    props.onChangeValue(value);
  }

  return (
    <View>
      <TouchableOpacity onPress={() => setOpenDropdown(!openDropdown)}>
        <View style={styles.container}>
          <Text style={styles.text}>{selectedValue}</Text>
          <View style={{width: 20, height: 20, justifyContent: 'center'}}>
            <Image source={require('../assets/downarrow.png')} />
          </View>
        </View>
      </TouchableOpacity>
      <Modal
        visible={openDropdown}
        animationType="fade"
        transparent={true}
        style={styles.dropdown}>
        <View style={{flex: 1}}>
          <TouchableOpacity
            style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.2)'}}
            onPress={() => setOpenDropdown(false)}
          />
          <View style={styles.content}>
            <ScrollView>
              {items?.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={
                    item === selectedValue
                      ? styles.selected_button
                      : styles.button
                  }
                  onPress={() => handleValueChange(item)}>
                  <Text style={styles.text}>{item}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: component_height,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#dddddd',
  },
  dropdown: {
    top: component_height,
    width: 100,
  },
  content: {
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: '100%', // 모달의 너비를 화면 너비의 80%로 설정
    bottom: 0,
    height: 230,
    position: 'absolute',
    paddingTop: 20,
    paddingBottom: 60,
  },
  button: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  selected_button: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#f1f1f1',
  },
  text: {
    color: 'black',
    fontSize: font_md,
  },
});

export default DropDown;
