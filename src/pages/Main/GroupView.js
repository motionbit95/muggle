import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  align_start,
  center,
  f_full,
  flex_row,
  flex_wrap,
  font_family_bold,
  img_lg,
  img_sm,
  m_1,
  p_1,
  p_3,
  sp_2,
  w_full,
} from '../../style/styles';
import GroupBox from '../../Component/GroupBox';
import Typography from '../../Component/Typography';
import {getDocList, singleQuery} from '../../firebase/firebase_func';
import auth from '@react-native-firebase/auth';
import {primary_color} from '../../firebase/api';
import MatchBox from '../../Component/MatchBox';
import Matching from '../Matching/Matching';

function GroupView({navigation, route}) {
  const {type, userList, title} = route.params
    ? route.params
    : {type: 'goods', userList: null, title: '', myInfo: null};
  const [myInfo, setMyInfo] = useState(null);
  const [goods, setGoods] = useState(null);
  const [favorite, setFavorite] = useState(null);

  const [tab, setTab] = useState(0);

  // 제목을 헤더 타이틀로 설정
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: title ? title : '찜 목록',
    });
  }, [navigation, title]);

  useEffect(() => {
    console.log(route.params);
    singleQuery('user', 'uid', auth().currentUser.uid).then(res => {
      setMyInfo(res[0]);
    });
  }, []);

  useEffect(() => {
    const getGroups = async () => {
      await getDocList('group').then(res => {
        let goodList = [];
        res.forEach(group => {
          if (type === 'goods') {
            myInfo?.goods?.forEach(async gid => {
              if (gid === group.doc_id) {
                goodList.push(group);
              }
            });
          } else {
            myInfo?.views?.forEach(async gid => {
              if (gid === group.doc_id) {
                goodList.push(group);
              }
            });
          }
        });
        setGoods(goodList);
      });
    };

    const getUsers = async () => {
      await getDocList('user').then(res => {
        let userList = [];
        res.forEach(user => {
          myInfo?.favorite?.forEach(async uid => {
            if (uid === user.doc_id) {
              console.log(uid, user.doc_id);
              userList.push(user);
              console.log(userList);
              setFavorite(userList);
            }
          });
        });
      });
    };

    getGroups();
    getUsers();
  }, [myInfo]);

  return (
    <View style={[f_full, {backgroundColor: 'white'}]}>
      {(!goods || goods?.length === 0) && (
        <View style={[f_full, center, flex_row, sp_2]}>
          <Typography light>모임 내역이 없습니다.</Typography>
        </View>
      )}
      <View
        style={[
          align_start,
          w_full,
          p_3,
          {paddingBottom: 0, backgroundColor: 'white'},
        ]}>
        <View style={[flex_row, sp_2]}>
          <TouchableOpacity
            style={[
              p_1,
              {
                flex: 1,
                borderBottomColor: tab === 0 ? primary_color : 'white',
                borderBottomWidth: 2,
              },
            ]}
            onPress={() => {
              setTab(0);
            }}>
            <View style={[center]}>
              <Typography bold red={tab === 0} light={tab !== 0}>
                {'일상'}
              </Typography>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              p_1,
              {
                flex: 1,
                borderBottomColor: tab === 1 ? primary_color : 'white',
                borderBottomWidth: 2,
              },
            ]}
            onPress={() => {
              setTab(1);
            }}>
            <View style={[center]}>
              <Typography bold red={tab === 1} light={tab !== 1}>
                {'커피'}
              </Typography>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              p_1,
              {
                flex: 1,
                borderBottomColor: tab === 2 ? primary_color : 'white',
                borderBottomWidth: 2,
              },
            ]}
            onPress={() => {
              setTab(2);
            }}>
            <View style={[center]}>
              <Typography bold red={tab === 2} light={tab !== 2}>
                {'클래스'}
              </Typography>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={[f_full, p_3]}>
        {goods?.map(
          (item, index) =>
            tab === 0 &&
            item?.group_type === '일상 모임' && (
              <GroupBox
                key={index}
                userList={userList}
                index={index}
                item={item}
                myInfo={myInfo}
                navigation={navigation}
              />
            ),
        )}
        {tab === 1 && (
          <FlatList
            data={favorite}
            renderItem={({item, index}) => (
              <View key={index} style={[m_1, {width: '48%'}]}>
                <MatchBox
                  view={'grid'}
                  key={index}
                  user={item}
                  index={index}
                  navigation={navigation}
                />
              </View>
            )}
            keyExtractor={item => item.id}
            numColumns={2} // 원하는 열의 수로 변경
          />
        )}
        {goods?.map(
          (item, index) =>
            tab === 2 &&
            item?.group_type === '원데이 클래스' && (
              <GroupBox
                key={index}
                userList={userList}
                index={index}
                item={item}
                myInfo={myInfo}
                navigation={navigation}
              />
            ),
        )}
      </ScrollView>
    </View>
  );
}

export default GroupView;
