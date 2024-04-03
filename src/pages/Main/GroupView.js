import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import {f_full, p_3} from '../../style/styles';
import GroupBox from '../../Component/GroupBox';

function GroupView({navigation, route}) {
  const {data, userList, title} = route.params
    ? route.params
    : {data: null, userList: null, title: ''};

  // 제목을 헤더 타이틀로 설정
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: title,
    });
  }, [navigation, title]);

  return (
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
  );
}

export default GroupView;
