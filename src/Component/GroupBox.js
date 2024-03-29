import React from 'react';
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

export const userImg = require('../assets/icons/user.png');
export const mapImg = require('../assets/icons/map.png');
export const moneyImg = require('../assets/icons/money.png');
export const groupImg = require('../assets/GroupImage.png');

const GroupBox = ({item, index, userList, navigation}) => {
  const getUser = uid => {
    let tempUser = null;
    userList?.map(user => {
      if (user.doc_id === uid) {
        tempUser = user;
      }
    });

    // console.log(tempUser);

    return tempUser;
  };

  return (
    <TouchableOpacity
      key={index}
      style={[
        radius_md,
        p_3,
        {backgroundColor: whiteAlpha900, marginBottom: 10},
      ]}
      onPress={() =>
        navigation.navigate('Home', {
          screen: '모임상세',
          params: {data: item, userList: userList},
        })
      }>
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
              {formatDateTime(item.group_date)}
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
          {item.group_users?.map(
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
                </View>
              ),
          )}
          {item.group_users?.length > 3 && (
            <View>
              <Text
                style={{
                  fontSize: fs_sm,
                  color: blackAlpha500,
                  textAlign: 'center',
                  marginLeft: 10,
                }}>
                {'+'}
                {item.group_users?.length - 3}
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default GroupBox;
