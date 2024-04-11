import React, {useEffect} from 'react';
import {Image, ScrollView, Text, View} from 'react-native';
import {center, f_full, flex_row, img_sm, p_3, sp_2} from '../../style/styles';
import GroupBox from '../../Component/GroupBox';
import Typography from '../../Component/Typography';

function GroupView({navigation, route}) {
  const {data, userList, title} = route.params
    ? route.params
    : {data: null, userList: null, title: ''};

  // 제목을 헤더 타이틀로 설정
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: title ? title : '찜모임',
    });
  }, [navigation, title]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <View style={[f_full, {backgroundColor: 'white'}]}>
      {(!data || data?.length === 0) && (
        <View style={[f_full, center, flex_row, sp_2]}>
          <Typography light>모임 내역이 없습니다.</Typography>
        </View>
      )}
      <ScrollView style={[f_full, p_3]}>
        {data?.map((item, index) => (
          <GroupBox
            key={index}
            userList={userList}
            index={index}
            item={item}
            navigation={navigation}
          />
        ))}
      </ScrollView>
    </View>
  );
}

export default GroupView;
