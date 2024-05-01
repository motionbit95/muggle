import React, {useEffect, useState} from 'react';
import {Image, ScrollView, TouchableOpacity, View} from 'react-native';
import styles, {
  align_center,
  f_full,
  flex_column,
  flex_row,
  justify_between,
  justify_end,
  p_3,
  sp_2,
  sp_3,
  sp_4,
} from '../../style/styles';
import Typography from '../../Component/Typography';
import {getDocList} from '../../firebase/firebase_func';
import GroupBox from '../../Component/GroupBox';
import Geolocation from '@react-native-community/geolocation'; // 라이브러리 import
import firestore from '@react-native-firebase/firestore';

function MatchingView({navigation, myInfo}) {
  // const {myInfo} = route.params ? route.params : {myInfo: null};
  const [order, setOrder] = useState(0);
  const [groupList, setGroupList] = React.useState([]);

  const getGroups = async () => {
    const groupList = [];
    await getDocList('group').then(res => {
      res.forEach(
        group => group.group_type === '일상 모임' && groupList.push(group),
      );
      // console.log('groupList ==>', groupList);
      // 거리 순일 경우 소팅
      if (order === 1) {
        const newArray = [...groupList]; // groupList를 해당 배열로 대체해야 함
        Geolocation.getCurrentPosition(
          pos => {
            // console.log('pos ==>', pos.coords.latitude, pos.coords.longitude);
            // newArray.forEach(group => {
            //   console.log('group ==>', group.group_position);
            // });
            newArray.sort(
              (a, b) =>
                calculateDistance(
                  {
                    latitude: pos.coords.latitude,
                    longitude: pos.coords.longitude,
                  },
                  a.group_position,
                ) -
                calculateDistance(
                  {
                    latitude: pos.coords.latitude,
                    longitude: pos.coords.longitude,
                  },
                  b.group_position,
                ),
            );
            setGroupList(newArray);
          },
          error => {
            console.error(error);
          },
          {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
        );
      } else {
        setGroupList(groupList);
      }
    });
  };

  useEffect(() => {
    // console.log('order ==>', order);
    getGroups();
  }, [order]);

  useEffect(() => {
    firestore()
      .collection('group')
      .orderBy('createdAt', 'asc')
      .onSnapshot(querySnapshot => {
        getGroups();
      });
  }, []);

  const calculateDistance = (position1, position2) => {
    // console.log('position1 ==>', position1, 'position2 ==>', position2);
    // 두 지점 간의 거리를 계산하는 함수 (예: Haversine 공식 사용)
    const {latitude: lat1, longitude: lon1} = position1;
    const {latitude: lat2, longitude: lon2} = position2;
    const earthRadius = 6371; // 지구 반지름 (킬로미터)
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c;
    // console.log('distance ==>', distance);
    return distance;
  };
  return (
    <View style={[f_full, p_3, sp_2, justify_between]}>
      <View style={[flex_column, sp_2]}>
        <Typography size="xl" bold>
          둘만의 일상 데이트
        </Typography>
        <Typography light>다양한 주제의 모임에 참여해보세요.</Typography>
      </View>
      <View style={[flex_row, justify_end, sp_2]}>
        <TouchableOpacity onPress={() => setOrder(0)}>
          <Typography light={order !== 0}>최신순</Typography>
        </TouchableOpacity>
        <Typography light>|</Typography>
        <TouchableOpacity onPress={() => setOrder(1)}>
          <Typography light={order !== 1}>가까운순</Typography>
        </TouchableOpacity>
      </View>
      <View></View>
      <ScrollView>
        {groupList?.map((item, index) => (
          <GroupBox
            key={index}
            // userList={userList}
            index={index}
            item={item}
            navigation={navigation}
            myInfo={myInfo}
          />
        ))}
      </ScrollView>
      <View style={[flex_row, align_center, sp_3, {marginBottom: 10}]}>
        <TouchableOpacity
          style={[styles.button, {flex: 1}]}
          onPress={() =>
            navigation.navigate('일상모임생성', {data: {type: 'personal'}})
          }>
          <Typography size="lg" bold white>
            무료 1:1 모임 만들기
          </Typography>
        </TouchableOpacity>
        {/* <TouchableOpacity
          onPress={() =>
            navigation.navigate('마이', {
              screen: '활동내역',
              params: {myInfo: myInfo, tab: 0},
            })
          }>
          <Image
            source={require('../../assets/menuIcon.png')}
            style={{width: 40, height: 40}}
          />
        </TouchableOpacity> */}
      </View>
    </View>
  );
}

export default MatchingView;
