import React, {useEffect, useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import styles, {
  align_center,
  blackAlpha100,
  blackAlpha500,
  blackAlpha900,
  flex_row,
  fs_md,
  fs_sm,
  fw_bold,
  img_lg,
  justify_between,
  p_1,
  p_2,
  p_3,
  radius_full,
  radius_md,
  radius_sm,
  sp_2,
  sp_3,
  whiteAlpha900,
} from '../style/styles';
import {
  calculateDday,
  defaultFemale,
  defaultMale,
  displayDday,
  formatDate,
  formatDateTime,
  primary_color,
} from '../firebase/api';
import {getUser, singleQuery} from '../firebase/firebase_func';

export const userImg = require('../assets/icons/user.png');
export const mapImg = require('../assets/icons/map.png');
export const moneyImg = require('../assets/icons/money.png');
export const groupImg = require('../assets/GroupImage.png');

const GroupBox = ({item, index, navigation}) => {
  const [groupUsers, setGroupUsers] = useState([]);

  useEffect(() => {
    const getGroupUsers = async () => {
      let groupUsers = [];
      for (let i = 0; i < item.group_users?.length; i++) {
        const user = await singleQuery('user', 'uid', item.group_users[i]);
        groupUsers.push(user[0]);
      }
      setGroupUsers(groupUsers);
      console.log(groupUsers);
    };
    getGroupUsers();
  }, []);

  return (
    <TouchableOpacity
      key={index + '_' + item.doc_id}
      style={[
        radius_md,
        p_3,
        {backgroundColor: whiteAlpha900, marginBottom: 10},
      ]}
      onPress={() => {
        // console.log({...item, gid: item.doc_id});
        navigation.navigate('모임상세', {data: {...item, gid: item.doc_id}});
      }}>
      <View style={[flex_row, justify_between]}>
        <View style={{gap: 5}}>
          <Text
            style={{
              fontSize: fs_md,
              fontWeight: fw_bold,
              color: blackAlpha900,
            }}>
            {item.group_name}
          </Text>
          <View style={[flex_row, align_center, sp_2]}>
            <Text
              style={{
                fontSize: fs_sm,
                fontWeight: '400',
                color: blackAlpha500,
              }}>
              {formatDateTime(item.group_time)}
            </Text>
            <View
              style={[
                radius_sm,
                {
                  backgroundColor: primary_color,
                  paddingHorizontal: 5,
                  paddingVertical: 3,
                },
              ]}>
              <Text
                style={[
                  {
                    fontWeight: fw_bold,
                    fontSize: fs_sm,
                    color: whiteAlpha900,
                  },
                ]}>
                {displayDday(calculateDday(formatDate(item.group_time)))}
              </Text>
            </View>
          </View>

          <View style={{gap: 5}}>
            <View style={[styles.rowBox, {gap: 5}]}>
              <Image style={{width: 16, height: 16}} source={mapImg} />
              <Text style={{color: blackAlpha900, fontSize: fs_sm}}>
                {item.group_place}
              </Text>
            </View>
            <View style={[styles.rowBox, {gap: 5}]}>
              <Image style={{width: 16, height: 16}} source={moneyImg} />
              <Text style={{color: blackAlpha900, fontSize: fs_sm}}>
                {item.group_price}
              </Text>
              <Image style={{width: 16, height: 16}} source={userImg} />
              <Text style={{color: blackAlpha900, fontSize: fs_sm}}>
                {item.group_users.length} / {item.group_personnel}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={[
            img_lg,
            radius_md,
            {
              backgroundColor: blackAlpha100,
              overflow: 'hidden',
            },
          ]}>
          <Image source={groupImg} />
        </View>
      </View>
      {/* 유저 이미지 */}
      <View style={[flex_row, sp_3]}>
        <View
          style={[
            flex_row,
            align_center,
            radius_full,
            {paddingHorizontal: 10, backgroundColor: whiteAlpha900},
          ]}>
          {groupUsers?.map(
            (user, index) =>
              index < 3 && (
                <View
                  key={index}
                  style={[
                    flex_row,
                    radius_full,
                    p_1,
                    {backgroundColor: whiteAlpha900, marginLeft: -10},
                  ]}>
                  <Image
                    source={{
                      uri: user?.user_profile
                        ? user?.user_profile
                        : user?.user_gender === '남'
                        ? defaultMale
                        : defaultFemale,
                    }}
                    width={30}
                    height={30}
                    borderRadius={50}
                  />
                </View>
              ),
          )}
          {groupUsers?.length > 3 && (
            <View>
              <Text
                style={{
                  fontSize: fs_sm,
                  color: blackAlpha500,
                  textAlign: 'center',
                  marginLeft: 10,
                }}>
                {'+'}
                {groupUsers?.length - 3}
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default GroupBox;
