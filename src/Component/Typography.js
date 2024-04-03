import React from 'react';
import {Text} from 'react-native';
import {
  blackAlpha500,
  blackAlpha900,
  font_family,
  fs_lg,
  fs_md,
  fs_sm,
  whiteAlpha900,
} from '../style/styles';

export function Typography(props) {
  return (
    <Text
      style={{
        fontFamily: font_family,
        fontSize:
          props.size === 'sm'
            ? fs_sm
            : props.size === 'md'
            ? fs_md
            : props.size === 'lg'
            ? fs_lg
            : fs_md,
        color: props.light
          ? blackAlpha500
          : props.white
          ? whiteAlpha900
          : blackAlpha900,
        fontWeight: props.bold ? 'bold' : 'normal',
      }}>
      {props.children}
    </Text>
  );
}

export default Typography;
