import React, {useEffect, useState} from 'react';
import {
  Button,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styles, {
  blackAlpha500,
  blackAlpha900,
  center,
  flex_row,
  fs_md,
  fw_bold,
  img_md,
  img_sm,
  p_2,
  radius_sm,
  w_full,
} from '../../style/styles';
import {
  calculateDday,
  formatDate,
  displayDday,
  formatDateTime,
  defaultMale,
  defaultFemale,
  primary_color,
} from '../../firebase/api';
import auth from '@react-native-firebase/auth';
import {singleQuery, updateDocument} from '../../firebase/firebase_func';
import Typography from '../../Component/Typography';

const GroupDetail = ({navigation, route}) => {
  const {data, userList} = route.params ? route.params : {data: null};
  // console.log(data ? data : 'no data');
  // 디데이 계산 및 표시
  var dday = calculateDday(formatDate(data?.group_time));
  const [myInfo, setMyInfo] = useState(null);
  const [icon, setIcon] = useState(require('../../assets/icons/heart.png'));
  const [groupUsers, setGroupUsers] = useState([]);

  useEffect(() => {
    const getUserInfo = async user => {
      singleQuery('user', 'uid', auth().currentUser.uid).then(res => {
        setMyInfo(res[0]);
        if (res[0].goods?.includes(data?.doc_id)) {
          setIcon(require('../../assets/icons/heart_fill.png'));
        }
      });
    };

    const getGroupUsers = async () => {
      let groupUsers = [];
      for (let i = 0; i < data.group_users?.length; i++) {
        const user = await singleQuery('user', 'uid', data.group_users[i]);
        groupUsers.push(user[0]);
      }
      setGroupUsers(groupUsers);
    };
    getGroupUsers();

    getUserInfo();
  }, []);

  const handleGoods = async gid => {
    if (!myInfo) return;
    if (!myInfo.goods) {
      myInfo.goods = [];
    }
    if (myInfo.goods.includes(gid)) {
      // 지우기
      myInfo.goods = myInfo.goods.filter(g => g !== gid);
      setIcon(require('../../assets/icons/heart.png'));
    } else {
      myInfo.goods.push(gid);
      setIcon(require('../../assets/icons/heart_fill.png'));
    }

    // console.log(myInfo.goods);

    await updateDocument('user', myInfo.doc_id, myInfo);
  };

  useEffect(() => {
    if (myInfo) handleView(data.doc_id);
  }, [myInfo]);

  const handleView = async gid => {
    if (!myInfo) return;
    if (!myInfo.views) {
      myInfo.views = [];
    }
    if (myInfo.views.includes(gid)) {
      // 지우기
      // myInfo.views = myInfo.views.filter(g => g !== gid);
    } else {
      myInfo.views.push(gid);
    }

    await updateDocument('user', myInfo.doc_id, myInfo);
  };

  const handleEnterGroup = async () => {
    if (!auth().currentUser) {
      alert('회원만 모임에 참가할 수 있습니다.');
      return;
    }

    if (!data.group_users) {
      data.group_users = [];
    }
    if (data.group_users.includes(auth().currentUser.uid)) {
      // 지우기
      // data.group_users = data.group_users.filter(
      //   g => g !== auth().currentUser.uid,
      // );
    } else {
      data.group_users.push(auth().currentUser.uid);
    }

    // console.log(data.group_users);

    await updateDocument('group', data.doc_id, data);

    navigation.navigate('채팅', {
      screen: '채팅룸',
      params: {data: {...data, gid: data.doc_id}, userList: userList},
    });
  };

  return (
    <View style={styles.screenStyle}>
      <ScrollView style={styles.scrollViewStyle}>
        <Image
          source={{uri: data?.group_image}}
          style={[styles.banner, {backgroundColor: '#d9d9d9'}]}
        />
        <View style={styles.contentStyle}>
          <View
            style={{
              width: '100%',
              flex: 1,
              gap: 20,
            }}>
            <View style={[{justifyContent: 'space-between'}, styles.rowBox]}>
              <Typography bold size="lg">
                {data?.group_name}
              </Typography>
              <View
                style={[
                  radius_sm,
                  {
                    backgroundColor: primary_color,
                    paddingHorizontal: 5,
                    paddingVertical: 3,
                  },
                ]}>
                <Typography white>{displayDday(dday)}</Typography>
              </View>
            </View>
            <View style={styles.gap10}>
              <View style={styles.rowBox}>
                <Image
                  style={img_sm}
                  source={require('../../assets/icons/calendar.png')}
                />
                <Typography>{formatDateTime(data?.group_time)}</Typography>
              </View>
              <View style={styles.rowBox}>
                <Image
                  style={img_sm}
                  source={require('../../assets/icons/map.png')}
                />
                <Typography>{data?.group_place}</Typography>
              </View>

              <View style={styles.rowBox}>
                <Image
                  style={img_sm}
                  source={require('../../assets/icons/money.png')}
                />
                <Typography>
                  {data?.group_price ? data?.group_price : '나누기'}
                </Typography>
              </View>
              <View style={styles.rowBox}>
                <Image
                  style={img_sm}
                  source={require('../../assets/icons/user.png')}
                />
                <Typography>
                  {data?.group_users?.length} / {data?.group_personnel} (
                  {data?.group_personnel - data?.group_users?.length}자리 남음)
                </Typography>
              </View>
            </View>

            <View style={{flex: 1}}>
              <Typography>{data?.group_target}</Typography>
            </View>
            <View style={styles.hr} />
          </View>
          <View
            style={{
              width: '100%',
              flex: 1,
              paddingTop: 20,
              gap: 20,
            }}>
            <View>
              <Typography bold>
                참여인원 ( {data?.group_users?.length} )
              </Typography>
            </View>
            <View
              style={{
                rowGap: 20,
                columnGap: 0,
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}>
              {groupUsers?.map((user, index) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('모임', {
                      screen: '유저',
                      params: {data: user, userList: userList},
                    })
                  }
                  style={[styles.rowBox, {width: '50%'}]}>
                  <View key={index} style={[flex_row, center]}>
                    <Image
                      source={{
                        uri: user?.user_profile
                          ? user?.user_profile
                          : user?.user_gender === '남'
                          ? defaultMale
                          : defaultFemale,
                        // ? user?.user_profile
                        // : user?.user_gender === 'male' ||
                        //   user?.user_gender === '남'
                        // ? defaultMale
                        // : defaultFemale,
                      }}
                      width={30}
                      height={30}
                      borderRadius={50}
                    />
                    <Typography black={user} light={!user}>
                      {user ? user?.user_name : '탈퇴한 회원입니다.'}
                    </Typography>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={[styles.buttonBox, styles.rowBox]}>
        <TouchableOpacity
          style={{flex: 1}}
          onPress={() => handleGoods(data.doc_id)}>
          <Image source={icon} style={img_md} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, {flex: 5}]}
          onPress={handleEnterGroup}>
          <Typography size="lg" bold>
            {data?.group_users.includes(auth().currentUser.uid)
              ? '채팅하기'
              : '참여하기'}
          </Typography>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default GroupDetail;
