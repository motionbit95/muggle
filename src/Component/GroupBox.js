import React, {useEffect, useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import styles, {
  align_center,
  align_start,
  blackAlpha100,
  blackAlpha500,
  blackAlpha900,
  flex_row,
  fs_md,
  fs_sm,
  fw_bold,
  img_lg,
  img_md,
  img_sm,
  img_xs,
  justify_between,
  justify_center,
  m_2,
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
import {getUser, singleQuery, updateDocument} from '../firebase/firebase_func';
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

  const handleGoods = async gid => {
    if (!myInfo) return;
    if (!myInfo.goods) {
      myInfo.goods = [];
    }
    if (myInfo.goods.includes(gid)) {
      // 지우기
      myInfo.goods = myInfo.goods.filter(g => g !== gid);
      // setIcon(require('../assets/icons/heart.png'));
    } else {
      myInfo.goods.push(gid);
      // setIcon(require('../assets/icons/heart_fill.png'));
    }

    // console.log(myInfo.goods);

    await updateDocument('user', myInfo.doc_id, myInfo);
  };

  return (
    <>
      {item?.group_type !== '일상 모임' ? (
        <TouchableOpacity
          key={index + '_' + item.doc_id}
          style={[
            radius_md,
            p_2,
            {backgroundColor: '#FFF5F4', marginBottom: 10},
          ]}
          onPress={() => {
            // console.log({...item, gid: item.doc_id});
            navigation.navigate(
              '모임상세',

              {data: {...item, gid: item.doc_id}},
            );
          }}>
          <View style={[flex_row]}>
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
              </View>
            </View>
            <View
              style={[sp_1, justify_center, {marginLeft: 10, maxWidth: '60%'}]}>
              <Typography bold numberOfLines={1} size={'md'}>
                {item.group_name}
              </Typography>
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
                  <Typography bold size={'xs'} white>
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
                    {item.group_users?.length} / {item.group_personnel}
                  </Typography>
                </View>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => {
                handleGoods(item.doc_id);
              }}
              style={[
                img_sm,
                {
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: 30,
                  height: 30,
                  alignItems: 'center',
                  justifyContent: 'center',
                },
              ]}>
              <Image
                // style={[
                //   img_sm,
                //   {
                //     position: 'absolute',
                //     top: 4,
                //     right: 4,
                //     width: 30,
                //     height: 30,
                //   },
                // ]}
                style={{width: 21, height: 18}}
                source={
                  myInfo?.goods?.includes(item.doc_id)
                    ? require('../assets/icons/heart_fill.png')
                    : require('../assets/icons/heart.png')
                }
              />
            </TouchableOpacity>
          </View>
          {/* 유저 이미지 */}
          {/* <View style={[flex_row, sp_3]}>
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
          </View> */}
        </TouchableOpacity>
      ) : (
        <View>
          {groupUsers[0]?.user_gender !== myInfo?.user_gender && (
            <TouchableOpacity
              key={index + '_' + item.doc_id}
              style={[
                radius_md,
                p_2,
                flex_row,
                {backgroundColor: '#FFF5F4', marginBottom: 10, flex: 1},
              ]}
              onPress={() => {
                // console.log({...item, gid: item.doc_id});
                navigation.navigate(
                  '모임상세',

                  {data: {...item, gid: item.doc_id}},
                );
              }}>
              <View style={[flex_row, align_start, {flex: 3}]}>
                <Image
                  style={[radius_md, img_lg]}
                  source={
                    item?.group_image ? {uri: item?.group_image} : groupImg
                  }
                />
                <View style={[sp_1, justify_center, p_4, {maxWidth: '70%'}]}>
                  <Typography bold numberOfLines={1} size={'md'}>
                    {item.group_name}
                  </Typography>

                  <View style={[sp_1]}>
                    {/* <View style={[styles.rowBox, sp_2]}>
                      <Image style={{width: 16, height: 16}} source={mapImg} />
                      <Typography size={'sm'}>{item.group_place}</Typography>
                    </View> */}
                    <Typography numberOfLines={2} size={'sm'}>
                      {item?.group_target}
                    </Typography>
                  </View>
                </View>
              </View>
              <TouchableOpacity
                style={p_1}
                onPress={() => handleGoods(item.doc_id)}>
                <Image
                  style={{width: 22, height: 18}}
                  source={
                    myInfo?.goods?.includes(item.doc_id)
                      ? require('../assets/icons/heart_fill.png')
                      : require('../assets/icons/heart.png')
                  }
                />
              </TouchableOpacity>
            </TouchableOpacity>
          )}
        </View>
      )}
    </>
  );
};

export default GroupBox;
