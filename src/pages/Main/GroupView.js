import React, {useEffect, useState} from 'react';
import {Image, ScrollView, Text, View} from 'react-native';
import {center, f_full, flex_row, img_sm, p_3, sp_2} from '../../style/styles';
import GroupBox from '../../Component/GroupBox';
import Typography from '../../Component/Typography';
import {getDocList, singleQuery} from '../../firebase/firebase_func';
import auth from '@react-native-firebase/auth';

function GroupView({navigation, route}) {
  const {data, userList, title} = route.params
    ? route.params
    : {data: null, userList: null, title: ''};
  const [myInfo, setMyInfo] = useState(null);
  const [goods, setGoods] = useState(data);

  // 제목을 헤더 타이틀로 설정
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: title ? title : '찜모임',
    });
  }, [navigation, title]);

  useEffect(() => {
    if (!data) {
      singleQuery('user', 'uid', auth().currentUser.uid).then(res => {
        setMyInfo(res[0]);
      });
    }
  }, [data]);

  useEffect(() => {
    const getGroups = async () => {
      await getDocList('group').then(res => {
        let goodList = [];
        res.forEach(group => {
          myInfo?.goods?.forEach(async gid => {
            if (gid === group.doc_id) {
              goodList.push(group);
              console.log(new Date(), '찜했습니다.', goodList);
              setGoods(goodList);
            }
          });
        });
      });
    };

    getGroups();
  }, [myInfo]);

  return (
    <View style={[f_full, {backgroundColor: 'white'}]}>
      {(!goods || goods?.length === 0) && (
        <View style={[f_full, center, flex_row, sp_2]}>
          <Typography light>모임 내역이 없습니다.</Typography>
        </View>
      )}
      <ScrollView style={[f_full, p_3]}>
        {goods?.map((item, index) => (
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
