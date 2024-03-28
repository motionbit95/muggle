import React, {useRef, useState} from 'react';
import {
  View,
  Button,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles, {
  blackAlpha900,
  btn_secondary,
  center,
  flex_row,
  fs_md,
  justify_between,
  justify_start,
  sp_2,
  sp_3,
  w_full,
} from '../style/styles';
import {formatDateTime} from '../firebase/api';

const DateTimeInput = props => {
  const [dateTime, setDateTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [mode, setMode] = useState('date');

  const onChange = (event, selectedDate) => {
    setShowPicker(Platform.OS === 'ios');

    if (selectedDate) {
      setDateTime(selectedDate);
      props.onChange(selectedDate);
    }
  };

  const showDateTimePicker = mode => {
    setShowPicker(true);
    setMode(mode);
  };

  const dateimeRef = useRef();

  return (
    <View>
      {Platform.OS === 'android' ? (
        <View style={[flex_row, sp_3, w_full]}>
          <TouchableOpacity
            style={[styles.contentBox, {flex: 1}]}
            onPress={() => showDateTimePicker('date')}>
            <Text style={{color: blackAlpha900, fontSize: fs_md}}>
              {formatDateTime(dateTime).split(' ')[0]}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.contentBox, {flex: 1}]}
            onPress={() => showDateTimePicker('time')}>
            <Text style={{color: blackAlpha900, fontSize: fs_md}}>
              {formatDateTime(dateTime).split(' ')[1]}
            </Text>
          </TouchableOpacity>
          {showPicker && (
            <DateTimePicker
              ref={dateimeRef}
              value={dateTime}
              mode={mode} // 날짜와 시간을 함께 선택
              is24Hour={true} // 24시간 표시 여부
              display="default" // 기본 시간 선택기 사용
              onChange={onChange}
            />
          )}
        </View>
      ) : (
        <View style={[flex_row, w_full, justify_start, {marginLeft: -10}]}>
          <DateTimePicker
            value={dateTime}
            mode={'date'} // 날짜와 시간을 함께 선택
            is24Hour={true} // 24시간 표시 여부
            display="default" // 기본 시간 선택기 사용
            onChange={onChange}
          />
          <DateTimePicker
            value={dateTime}
            mode={'time'} // 날짜와 시간을 함께 선택
            is24Hour={true} // 24시간 표시 여부
            display="default" // 기본 시간 선택기 사용
            onChange={onChange}
          />
        </View>
      )}
    </View>
  );
};

export default DateTimeInput;
