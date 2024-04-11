import React from 'react';
import {View} from 'react-native';
import {center, f_full} from '../../style/styles';
import Typography from '../../Component/Typography';

function Alarm(props) {
  return (
    <View style={[f_full, center]}>
      <Typography>알림 내역이 없어요</Typography>
    </View>
  );
}

export default Alarm;
