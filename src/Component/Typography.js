import React from 'react';
import {Platform, Text} from 'react-native';
import {
  blackAlpha500,
  blackAlpha900,
  font_family,
  font_family_bold,
  fs_2xl,
  fs_3xl,
  fs_lg,
  fs_md,
  fs_sm,
  fs_xl,
  fs_xs,
  whiteAlpha900,
} from '../style/styles';
import {primary_color} from '../firebase/api';

export function Typography(props) {
  return (
    <Text
      {...props}
      style={{
        textAlign: props.center ? 'center' : 'left',
        fontFamily:
          Platform.OS === 'ios'
            ? font_family
            : props.bold
            ? font_family_bold
            : font_family,
        fontSize:
          props.size === 'xs'
            ? fs_xs
            : props.size === 'sm'
            ? fs_sm
            : props.size === 'md'
            ? fs_md
            : props.size === 'lg'
            ? fs_lg
            : props.size === 'xl'
            ? fs_xl
            : props.size === '2xl'
            ? fs_2xl
            : props.size === '3xl'
            ? fs_3xl
            : fs_md,
        color: props.light
          ? blackAlpha500
          : props.white
          ? whiteAlpha900
          : props.red
          ? primary_color
          : props.color
          ? props.color
          : blackAlpha900,
        fontWeight:
          Platform.OS === 'ios' ? (props.bold ? 'bold' : 'normal') : 'normal',
      }}>
      {props.children}
    </Text>
  );
}

export default Typography;
