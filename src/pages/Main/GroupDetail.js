import React, {useEffect, useState} from 'react';
import {
  Button,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styles, {fs_md, img_md, img_sm, p_2} from '../../style/styles';
import {
  calculateDday,
  formatDate,
  displayDday,
  formatDateTime,
  defaultMale,
  defaultFemale,
} from '../../firebase/api';
import auth from '@react-native-firebase/auth';
import {singleQuery, updateDocument} from '../../firebase/firebase_func';

const GroupDetail = ({navigation, route}) => {
  const {data, userList} = route.params ? route.params : {data: null};
  // console.log(data ? data : 'no data');
  // 디데이 계산 및 표시
  var dday = calculateDday(formatDate(data?.group_time));
  const [myInfo, setMyInfo] = useState(null);
  const [icon, setIcon] = useState(require('../../assets/icons/heart.png'));

  const getUser = uid => {
    let tempUser = null;
    userList?.map(user => {
      if (user.doc_id === uid || user.uid === uid) {
        tempUser = user;
      }
    });

    return tempUser;
  };

  useEffect(() => {
    const getUsesrInfo = async user => {
      singleQuery('user', 'uid', auth().currentUser.uid).then(res => {
        setMyInfo(res[0]);
        if (res[0].goods.includes(data?.doc_id)) {
          setIcon(require('../../assets/icons/heart_fill.png'));
        }
      });
    };
    getUsesrInfo();
  }, []);

  const handleGoods = async gid => {
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

    console.log(myInfo.goods);

    await updateDocument('user', auth().currentUser.uid, myInfo);
  };

  return (
    <View style={styles.screenStyle}>
      <ScrollView style={styles.scrollViewStyle}>
        <Image
          // source={require('../../assets/banner1.png')}
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
              <Text style={{fontSize: 18, fontWeight: '600', color: 'black'}}>
                {data?.group_name}
              </Text>
              <View style={styles.d_daytag}>
                <Text style={styles.dayText}>{displayDday(dday)}</Text>
              </View>
            </View>
            <View style={styles.gap10}>
              <View style={styles.rowBox}>
                <Image
                  style={img_sm}
                  source={require('../../assets/icons/calendar.png')}
                />
                <Text style={{fontSize: 16, color: 'black'}}>
                  {formatDateTime(data?.group_time)}
                </Text>
              </View>
              <View style={styles.rowBox}>
                <Image
                  style={img_sm}
                  source={require('../../assets/icons/map.png')}
                />
                <Text style={{fontSize: 16, color: 'black'}}>
                  {data?.group_place}
                </Text>
                <TouchableOpacity
                  style={styles.mapButton}
                  onPress={() => alert('지도보기')}>
                  <Text style={{fontSize: 14, color: 'black'}}>지도보기</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.rowBox}>
                <Image
                  style={img_sm}
                  source={require('../../assets/icons/money.png')}
                />
                <Text style={{fontSize: 16, color: 'black'}}>
                  {data?.group_price ? data?.group_price : '나누기'}
                </Text>
              </View>
              <View style={styles.rowBox}>
                <Image
                  style={img_sm}
                  source={require('../../assets/icons/user.png')}
                />
                <Text style={{fontSize: 16, color: 'black'}}>
                  {data?.group_users?.length} / {data?.group_personnel} (
                  {data?.group_personnel - data?.group_users?.length}자리남음)
                </Text>
              </View>
            </View>

            <View style={{flex: 1}}>
              <Text style={{color: 'black', fontSize: fs_md}}>
                {data?.group_target}
              </Text>
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
              <Text style={{color: 'black'}}>
                참여인원 ( {data?.group_users?.length} )
              </Text>
            </View>
            <View gap={10}>
              {data.group_users?.map(
                (user, index) =>
                  index < 3 && (
                    <View key={index} style={styles.rowBox}>
                      <Image
                        source={{
                          uri: getUser(user)?.user_profile
                            ? getUser(user)?.user_profile
                            : getUser(user)?.user_gender === 'male' ||
                              getUser(user)?.user_gender === '남'
                            ? defaultMale
                            : defaultFemale,
                        }}
                        width={30}
                        height={30}
                        borderRadius={50}
                      />
                      <Text style={{fontSize: 14, color: 'black'}}>
                        {getUser(user)?.user_name}
                      </Text>
                    </View>
                  ),
              )}
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
          onPress={() =>
            navigation.navigate('Chat', {
              screen: '채팅룸',
              // params: {key: 'value'},
            })
          }>
          <Text style={styles.buttonText}>참여하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default GroupDetail;
