import React from 'react';
import {Image, Touchable, TouchableOpacity, View} from 'react-native';
import Typography from '../../Component/Typography';
import {
  align_center,
  align_end,
  f_full,
  flex_column,
  flex_row,
  img_sm,
  justify_between,
  justify_end,
  p_3,
  sp_1,
  sp_2,
  sp_3,
  w_full,
} from '../../style/styles';

function Alarm(props) {
  const [isAlarm, setIsAlarm] = React.useState(true);
  const [isMarketing, setIsMarketing] = React.useState(true);
  return (
    <View style={[f_full, sp_2]}>
      <View style={[p_3, sp_3, {backgroundColor: 'white'}]}>
        <Typography light bold>
          알림 설정
        </Typography>
        <View style={[sp_3]}>
          <View style={[flex_row, justify_between, align_center, sp_3, w_full]}>
            <View style={[sp_2, {width: '70%'}]}>
              <Typography size="lg" bold>
                기기 알림 설정
              </Typography>
              <Typography light>
                참여 중인 모임의 중요 소식 및 머글 필수 공지 등 꼭 필요한 것만
                알려드려요
              </Typography>
            </View>
            <TouchableOpacity
              style={[align_end]}
              onPress={() => setIsAlarm(!isAlarm)}>
              <View style={{width: 20, height: 20, justifyContent: 'center'}}>
                <Image
                  source={
                    isAlarm
                      ? require('../../assets/checked.png')
                      : require('../../assets/unchecked.png')
                  }
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={[p_3, sp_3, {backgroundColor: 'white'}]}>
        <Typography light bold>
          마케팅
        </Typography>
        <View style={[sp_3]}>
          <View style={[flex_row, justify_between, align_center, sp_3, w_full]}>
            <View style={[sp_2, {width: '70%'}]}>
              <Typography size="lg" bold>
                혜택 정보 수신
              </Typography>
              <Typography light>
                개인 맞춤 혜택과 이벤트 소식을 앱푸시, 문자로 안내
              </Typography>
            </View>
            <TouchableOpacity
              style={[align_end]}
              onPress={() => setIsMarketing(!isMarketing)}>
              <View style={{width: 20, height: 20, justifyContent: 'center'}}>
                <Image
                  source={
                    isMarketing
                      ? require('../../assets/checked.png')
                      : require('../../assets/unchecked.png')
                  }
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

export default Alarm;
