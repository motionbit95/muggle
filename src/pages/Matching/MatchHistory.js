import React, {useEffect, useState} from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles, {
  align_center,
  align_end,
  blackAlpha100,
  blackAlpha200,
  blackAlpha300,
  blackAlpha500,
  blackAlpha700,
  blackAlpha900,
  f_full,
  flex_column,
  flex_row,
  fs_lg,
  fs_md,
  fs_sm,
  fw_bold,
  img_md,
  img_sm,
  justify_end,
  radius_full,
  sp_1,
  sp_2,
  sp_4,
  whiteAlpha900,
} from '../../style/styles';
import {getDocList, getUser, singleQuery} from '../../firebase/firebase_func';
import MatchBox from '../../Component/MatchBox';
import {
  defaultFemale,
  defaultMale,
  font_md,
  getDisplayAge,
  primary_color,
} from '../../firebase/api';
import auth from '@react-native-firebase/auth';

const MatchHistory = ({navigation}) => {
  const [userList, setUserList] = useState(null);
  const [matchings, setMatchings] = useState(null);

  useEffect(() => {
    if (!userList) {
      updateUser();
      getMatching();
    }
  }, []);

  const updateUser = async () => {
    let list = await getDocList('user');
    // console.log('유저리스트 ===> ', list);
    setUserList(list);
  };

  const getMatching = async () => {
    let sendMatching = [];
    await singleQuery('matching', 'sender', auth().currentUser.uid).then(
      res => {
        sendMatching = res;
      },
    );

    let receiveMatching = [];
    await singleQuery('matching', 'receiver', auth().currentUser.uid).then(
      res => {
        receiveMatching = res;
      },
    );

    let matchings = [...sendMatching, ...receiveMatching].sort((a, b) => {
      if (a.createdAt < b.createdAt) {
        return 1;
      }
      if (a.createdAt > b.createdAt) {
        return -1;
      }
      return 0;
    });
    console.log('matchings ===> ', matchings);
    setMatchings(matchings);
  };

  const MatchingBox = ({matching, index}) => {
    const [user, setUser] = React.useState({});
    React.useEffect(() => {
      getUser(
        matching?.receiver === auth().currentUser.uid
          ? matching?.sender
          : matching?.receiver,
      ).then(setUser);
    }, []);

    return (
      <View style={styles.matchBoxs}>
        <TouchableOpacity
          style={styles.matchBox}
          onPress={() => alert('매칭 태그')}>
          <View style={[styles.spaceBetween, styles.rowBox]}>
            <View style={styles.gap10}>
              <View style={styles.rowBox}>
                <View style={[styles.iconBox, styles.icon20]}>
                  <Image
                    style={img_sm}
                    source={
                      matching.matching_state < 2
                        ? require('../../assets/icons/check.png')
                        : matching.matching_state === 2
                        ? require('../../assets/icons/heart2.png')
                        : matching.matching_state === 400
                        ? require('../../assets/icons/x2.png')
                        : ''
                    }
                  />
                </View>
                <Text style={{fontSize: fs_md, color: blackAlpha900}}>
                  {matching.matching_state < 2
                    ? '매칭중'
                    : matching.matching_state === 2
                    ? '매칭완료'
                    : matching.matching_state === 400
                    ? '매칭거절'
                    : ''}
                </Text>
              </View>
              <View style={styles.rowBox}>
                <Image
                  style={[
                    styles.Avartar40,
                    radius_full,
                    {backgroundColor: blackAlpha300},
                  ]}
                  source={
                    user?.user_profile
                      ? user?.user_profile
                      : require('../../assets/avartar.png')
                  }
                />

                <View style={{gap: 10}}>
                  <View style={[flex_column, sp_1]}>
                    <Text
                      style={[
                        {
                          fontSize: fs_md,
                          fontWeight: fw_bold,
                          color: blackAlpha900,
                        },
                      ]}>
                      {user?.user_name}
                    </Text>
                    <View style={[flex_row, align_center, {gap: 5}]}>
                      <Text style={[{fontSize: fs_sm, color: blackAlpha700}]}>
                        {getDisplayAge(user?.user_birth)}세
                      </Text>
                      <Text
                        style={[
                          {
                            fontSize: fs_sm,
                            color: primary_color,
                            backgroundColor: whiteAlpha900,
                            borderRadius: 5,
                            padding: 5,
                          },
                        ]}>
                        {user?.user_gender}자
                      </Text>
                    </View>
                    <Text style={[{fontSize: fs_sm, color: blackAlpha700}]}>
                      {user?.user_place}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            {matching.matching_state < 2 && (
              <View style={styles.outlineTagBox}>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: 'bold',
                    color: 'rgba(255, 99, 79, 1)',
                  }}>
                  정산대기중
                </Text>
              </View>
            )}
            {matching.matching_state == 2 && (
              <View style={styles.outlineTagBox}>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: 'bold',
                    color: 'rgba(255, 99, 79, 1)',
                  }}>
                  정산완료
                </Text>
              </View>
            )}
            {matching.matching_state == 400 && (
              <View
                style={[
                  styles.outlineTagBox,
                  {
                    borderRadius: 20,
                    borderColor: blackAlpha500,
                    borderWidth: 1,
                  },
                ]}>
                <Text
                  style={{
                    fontSize: fs_md,
                    fontWeight: fw_bold,
                    color: blackAlpha500,
                  }}>
                  매칭거절
                </Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={[styles.screenStyle, styles.contentStyle]}>
      <ScrollView style={[styles.scrollViewStyle]}>
        <View>
          {matchings?.map((matching, index) => (
            <MatchingBox key={index} matching={matching} index={index} />
          ))}
          {/* {matchings?.map((matching, index) => (
            <MatchingBox key={index} matching={matching} index={index} />
          ))} */}
        </View>

        <View style={[justify_end]}>
          <View>
            <View>
              <Text style={{fontSize: fs_lg, fontWeight: fw_bold}}>
                커피 매칭 친구 추천
              </Text>
            </View>
            <ScrollView
              horizontal={true}
              contentContainerStyle={styles.horizontalScrollViewStyle}
              showsHorizontalScrollIndicator={false}>
              {userList?.map((user, index) => (
                <MatchBox
                  key={index}
                  user={user}
                  index={index}
                  navigation={navigation}
                />
              ))}
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default MatchHistory;
