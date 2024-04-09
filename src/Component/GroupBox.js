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
  img_sm,
  justify_between,
  justify_center,
  p_1,
  p_2,
  p_3,
  p_4,
  radius_full,
  radius_md,
  radius_sm,
  sp_1,
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
import Typography from './Typography';

export const userImg = require('../assets/icons/user.png');
export const mapImg = require('../assets/icons/map.png');
export const moneyImg = require('../assets/icons/money.png');
export const groupImg = require('../assets/GroupImage.png');

const GroupBox = ({item, index, myInfo, navigation}) => {
  const [groupUsers, setGroupUsers] = useState([]);

  useEffect(() => {
    const getGroupUsers = async () => {
      let groupUsers = [];
      for (let i = 0; i < item.group_users?.length; i++) {
        const user = await singleQuery('user', 'uid', item.group_users[i]);
        groupUsers.push(user[0]);
      }
      setGroupUsers(groupUsers);
      // console.log(groupUsers);
    };
    getGroupUsers();
  }, []);

  return (
    <>
      {item?.group_type !== '일상 모임' ? (
        <TouchableOpacity
          key={index + '_' + item.doc_id}
          style={[
            radius_md,
            p_2,
            {backgroundColor: whiteAlpha900, marginBottom: 10},
          ]}
          onPress={() => {
            // console.log({...item, gid: item.doc_id});
            navigation.navigate(
              '모임상세',

              {data: {...item, gid: item.doc_id}},
            );
          }}>
          <View style={[flex_row, justify_between]}>
            <View style={[sp_1, justify_center]}>
              <Typography bold>{item.group_name}</Typography>
              <View style={[flex_row, align_center, sp_2]}>
                <Typography size={'sm'} light bold>
                  {formatDateTime(item.group_time)}
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
                  <Typography bold size={'sm'} white>
                    {displayDday(calculateDday(formatDate(item.group_time)))}
                  </Typography>
                </View>
              </View>

              <View style={sp_1}>
                <View style={[styles.rowBox, sp_2]}>
                  <Image style={{width: 16, height: 16}} source={mapImg} />
                  <Typography size={'sm'}>{item.group_place}</Typography>
                </View>
                <View style={[styles.rowBox, sp_2]}>
                  <Image style={{width: 16, height: 16}} source={moneyImg} />
                  <Typography size={'sm'}>{item.group_price}</Typography>
                  <Image style={{width: 16, height: 16}} source={userImg} />
                  <Typography size={'sm'}>
                    {item.group_users.length} / {item.group_personnel}
                  </Typography>
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
              <View>
                <Image
                  style={{width: '100%', height: '100%'}}
                  source={
                    item?.group_image ? {uri: item?.group_image} : groupImg
                  }
                />
                <Image
                  style={[
                    img_sm,
                    {
                      position: 'absolute',
                      top: 4,
                      right: 4,
                      width: 30,
                      height: 30,
                    },
                  ]}
                  source={
                    myInfo?.goods?.includes(item.doc_id)
                      ? require('../assets/icons/heart_fill.png')
                      : require('../assets/icons/heart.png')
                  }
                />
              </View>
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
                  <Typography
                    size={'sm'}
                    light
                    style={{
                      textAlign: 'center',
                      marginLeft: 10,
                    }}>
                    {'+'}
                    {groupUsers?.length - 3}
                  </Typography>
                </View>
              )}
            </View>
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          key={index + '_' + item.doc_id}
          style={[
            radius_md,
            p_4,
            {backgroundColor: '#FFF5F4', marginBottom: 10},
          ]}
          onPress={() => {
            // console.log({...item, gid: item.doc_id});
            navigation.navigate(
              '모임상세',

              {data: {...item, gid: item.doc_id}},
            );
          }}>
          <View style={[flex_row, justify_between]}>
            <View style={[sp_1, justify_center, {maxWidth: '70%'}]}>
              <Typography bold numberOfLines={1}>
                {item.group_name}
              </Typography>

              <View style={[sp_1]}>
                <View style={[styles.rowBox, sp_2]}>
                  <Image style={{width: 16, height: 16}} source={mapImg} />
                  <Typography size={'sm'}>{item.group_place}</Typography>
                </View>
                <Typography numberOfLines={2}>{item?.group_target}</Typography>
              </View>
            </View>
            <View
              style={[
                img_lg,
                radius_md,
                {
                  maxWidth: '30%',
                  // backgroundColor: blackAlpha100,
                  overflow: 'hidden',
                },
              ]}>
              <View>
                <Image
                  style={[radius_full, {width: '100%', height: '100%'}]}
                  source={
                    item?.group_image ? {uri: item?.group_image} : groupImg
                  }
                />
              </View>
            </View>
          </View>
          <Image
            style={[
              img_sm,
              {
                position: 'absolute',
                top: 4,
                right: 4,
                width: 30,
                height: 30,
              },
            ]}
            source={
              myInfo?.goods?.includes(item.doc_id)
                ? require('../assets/icons/heart_fill.png')
                : require('../assets/icons/heart.png')
            }
          />
        </TouchableOpacity>
      )}
    </>
  );
};

export default GroupBox;
