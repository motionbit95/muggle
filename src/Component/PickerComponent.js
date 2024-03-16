import React from 'react';
import {Text, View} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const DropDown = () => {
  return (
    <View>
      <RNPickerSelect
        onValueChange={value => console.log(value)}
        placeholder={{
          label: '전체',
          inputLabel: '전체',
          value: 'all',
          key: '1',
        }}
        items={[
          {label: '서울', value: 'seoul', inputLabel: '서울 ', key: '2'},
          {label: '경기', value: 'gyeonggi', inputLabel: '경기 ', key: '3'},
          {label: '강원', value: 'gwangwon', inputLabel: '강원 ', key: '4'},
        ]}
      />
    </View>
  );
};

export default DropDown;
