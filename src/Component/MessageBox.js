import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {
  blackAlpha400,
  center,
  f_full,
  flex_row,
  justify_around,
  p_6,
  radius_2xl,
  sp_4,
  w_full,
} from '../style/styles';
import Typography from './Typography';

function MessageBox(props) {
  const handleOK = () => {
    props.onOK();
  };

  const handleCancel = () => {
    props.onCancel();
  };
  return (
    <View
      style={[
        f_full,
        center,
        {
          display: props.visible ? 'flex' : 'none',
          zIndex: 999,
          backgroundColor: blackAlpha400,
          position: 'absolute',
          top: 0,
          left: 0,
        },
      ]}>
      <View
        style={[
          center,
          radius_2xl,
          p_6,
          sp_4,
          {width: 300, backgroundColor: 'white'},
        ]}>
        <Typography bold size="lg">
          {props.message ? props.message : '확인하시겠습니까?'}
        </Typography>
        <View
          style={[flex_row, w_full, justify_around, {paddingHorizontal: 20}]}>
          {props.mode === 'confirm' && (
            <>
              <TouchableOpacity onPress={handleCancel}>
                <Typography size="md">취소</Typography>
              </TouchableOpacity>
              <Typography light>|</Typography>
            </>
          )}
          <TouchableOpacity onPress={handleOK}>
            <Typography size="md">확인</Typography>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default MessageBox;
