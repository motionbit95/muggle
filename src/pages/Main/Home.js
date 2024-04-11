import React, {useEffect, useRef, useState} from 'react';
import {Dimensions, Image, TouchableOpacity, View} from 'react-native';
import {getDocList} from '../../firebase/firebase_func';
import {
  align_center,
  align_start,
  btn_secondary,
  f_full,
  flex_row,
  img_xxs,
  justify_between,
  justify_center,
  sp_2,
  under_button,
} from '../../style/styles';

// icon
import _x from '../../assets/icons/_x.png';
import Typography from '../../Component/Typography';

import auth from '@react-native-firebase/auth';
import {SafeAreaView} from 'react-native-safe-area-context';
import firestore from '@react-native-firebase/firestore';
import MatchingView from './MatchingView';
import Matching from '../Matching/Matching';
import ClassView from './ClassView';

export const group_category = ['일상', '커피', '클래스'];
const Home = ({navigation}) => {
  const [userList, setUserList] = useState(null);
  const [myInfo, setMyInfo] = useState(null);

  const [muggleGroupList, setMuggleGroupList] = useState(null);
  const [muggleClassList, setMuggleClassList] = useState(null);
  const [muggleBusinessList, setMuggleBusinessList] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(group_category[0]);

  useEffect(() => {
    if (!userList) updateUser();

    if (!muggleGroupList || !muggleClassList || !muggleBusinessList)
      updateGroup();
  }, []);

  const [screenWidth, setScreenWidth] = useState(
    Dimensions.get('window').width,
  );
  const [screenHeight, setScreenHeight] = useState(
    Dimensions.get('window').height,
  );

  const handleScreenSizeChange = ({window}) => {
    setScreenWidth(window.width);
    setScreenHeight(window.height);
  };

  useEffect(() => {
    Dimensions.addEventListener('change', handleScreenSizeChange);
    return () => {
      // Dimensions.removeEventListener('change', handleScreenSizeChange);
    };
  }, []);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(async user => {
      if (user) {
        updateUser();
        updateGroup();
      } else {
        // console.log('없음!!');
        navigation.navigate('Account', {screen: '휴대폰 본인인증'});
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const updateUser = async () => {
    let list = await getDocList('user');
    // console.log('유저리스트 ===> ', list);
    setUserList(list);

    setMyInfo(list.find(user => user.uid === auth().currentUser?.uid));
  };

  const [goods, setGoods] = useState(null);

  useEffect(() => {
    const getGroups = async () => {
      await getDocList('group').then(res => {
        let goodList = [];
        res.forEach(group => {
          myInfo?.goods?.forEach(async gid => {
            if (gid === group.doc_id) {
              goodList.push(group);
              // console.log(new Date(), '찜했습니다.', goodList);
              setGoods(goodList);
            }
          });
        });
      });
    };

    getGroups();
  }, [myInfo]);

  const updateGroup = async () => {
    let list = await getDocList('group');
    // console.log('그룹리스트 ===> ', list);

    let muggleGroupList = list.filter(
      group => group.group_type === group_category[0],
    );
    let muggleClassList = list.filter(
      group => group.group_type === group_category[2],
    );
    let muggleBusinessList = list.filter(
      group => group.group_type === group_category[3],
    );

    setMuggleGroupList(muggleGroupList);
    setMuggleClassList(muggleClassList);
    setMuggleBusinessList(muggleBusinessList);
  };

  useEffect(() => {
    firestore()
      .collection('group')
      .onSnapshot(() => {
        updateGroup();
        console.log('그룹이 업데이트 되었습니다!!!');
      });

    firestore()
      .collection('user')
      .onSnapshot(() => {
        updateUser();
        console.log('유저가 업데이트 되었습니다!!!');
      });

    auth().onAuthStateChanged(async user => {
      if (!user) {
        navigation.navigate('Account', {screen: '휴대폰 본인인증'});
      }
    });
  }, []);

  return (
    <View style={{backgroundColor: 'white'}}>
      <SafeAreaView>
        {/* HEADER */}
        <View
          style={[
            flex_row,
            justify_between,
            align_center,
            {marginTop: 10, paddingHorizontal: 20},
          ]}>
          <View style={[flex_row, align_center]}>
            <Image
              source={require('../../assets/muggle.png')}
              style={{height: 25, width: 93}}
            />
            <View
              style={[
                align_start,
                // w_full,
                {paddingHorizontal: 10},
              ]}>
              <View style={[flex_row, sp_2]}>
                {group_category.map((category, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      console.log('category ===> ', category, index);
                      setSelectedGroup(category);
                    }}>
                    <View style={[under_button(selectedGroup === category)]}>
                      <Typography
                        bold
                        black={selectedGroup === category}
                        light={selectedGroup !== category}>
                        {category}
                      </Typography>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
          <View style={flex_row}>
            <TouchableOpacity
              style={{marginRight: 10}}
              onPress={() => alert('알림 페이지 전달')}>
              <Image
                style={{width: 24, height: 24}}
                source={require('../../assets/Notification.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={[f_full, {paddingBottom: 100}]}>
          {selectedGroup === '일상' && (
            <MatchingView myInfo={myInfo} navigation={navigation} />
          )}
          {selectedGroup === '커피' && (
            <Matching userList={userList} index={0} navigation={navigation} />
          )}
          {selectedGroup === '클래스' && (
            <ClassView myInfo={myInfo} navigation={navigation} />
          )}
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Home;
