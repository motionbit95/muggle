import React, {useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {
  center,
  f_full,
  flex_column,
  justify_between,
  p_3,
  p_4,
  radius_md,
  sp_2,
  w_full,
} from '../../style/styles';
import Typography from '../../Component/Typography';
import {singleQuery} from '../../firebase/firebase_func';

import auth from '@react-native-firebase/auth';
import {formatDateTime} from '../../firebase/api';

function Alarm(props) {
  const [alarmList, setAlarmList] = useState([]);
  useEffect(() => {
    const getAlarms = async () => {
      singleQuery('alarm', 'user_id', auth().currentUser.uid).then(res => {
        setAlarmList(res);
        console.log(res);
      });
    };
    getAlarms();
  }, []);
  return (
    <>
      {alarmList?.length !== 0 ? (
        <ScrollView style={[p_3, sp_2]}>
          {alarmList?.map((alarm, index) => (
            <AlarmBox key={index} data={alarm} />
          ))}
        </ScrollView>
      ) : (
        <View style={[f_full, center]}>
          <Typography>알림 내역이 없어요</Typography>
        </View>
      )}
    </>
  );
}

function AlarmBox({data}) {
  return (
    <View
      style={[
        radius_md,
        flex_column,
        p_4,
        sp_2,
        w_full,
        justify_between,
        {
          backgroundColor: 'white',
        },
      ]}>
      <Typography>{data?.alarm_message}</Typography>
      <Typography light size="sm">
        {formatDateTime(data?.createAt)}
      </Typography>
    </View>
  );
}

export default Alarm;
