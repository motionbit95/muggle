import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import styles from '../style/styles';
import {
  calculateDday,
  displayDday,
  font_sm,
  font_xs,
  formatDate,
  formatDateTime,
} from '../firebase/api';

const userImg = require('../assets/icons/user.png');
const mapImg = require('../assets/icons/map.png');
const moneyImg = require('../assets/icons/money.png');
const groupImg = require('../assets/GroupImage.png');

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
      style={styles.matchBox}
      onPress={() =>
        navigation.navigate('Home', {
          screen: '모임상세',
          params: {data: item},
        })
      }>
      <View style={[styles.spaceBetween, styles.rowBox]}>
        <View style={{gap: 5}}>
          <Text
            style={{
              fontSize: font_sm,
              fontWeight: '600',
              color: 'black',
            }}>
            {item.group_name}
          </Text>
          <View style={styles.rowBox}>
            <Text
              style={{
                fontSize: font_xs,
                fontWeight: '400',
                color: 'gray',
              }}>
              {formatDateTime(item.group_date)}
            </Text>
            <View
              style={{
                backgroundColor: 'rgba(255, 99, 79, 1)',
                borderRadius: 5,
                paddingHorizontal: 8,
                paddingVertical: 3,
              }}>
              <Text
                style={{
                  fontSize: font_xs,
                  color: 'white',
                  fontWeight: 'bold',
                }}>
                {displayDday(calculateDday(formatDate(item.group_time)))}
              </Text>
            </View>
          </View>

          <View style={{gap: 5}}>
            <View style={[styles.rowBox, {gap: 5}]}>
              <Image style={{width: 16, height: 16}} source={mapImg} />
              <Text style={{color: 'black', fontSize: font_xs}}>
                {item.group_place}
              </Text>
            </View>
            <View style={[styles.rowBox, {gap: 5}]}>
              <Image style={{width: 16, height: 16}} source={moneyImg} />
              <Text style={{color: 'black', fontSize: font_xs}}>
                {item.group_price}
              </Text>
              <Image style={{width: 16, height: 16}} source={userImg} />
              <Text style={{color: 'black', fontSize: font_xs}}>
                {item.group_users.length} / {item.group_personnel}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            width: 100,
            height: 100,
            backgroundColor: 'gray',
            borderRadius: 10,
            overflow: 'hidden',
          }}>
          <Image source={groupImg} />
        </View>
      </View>
      <View>
        <View
          style={{
            flexDirection: 'row',
            gap: 10,
          }}>
          <View
            style={[
              styles.rowBox,
              {
                gap: -5,
                backgroundColor: 'white',
                borderRadius: 20,
                padding: 3,
              },
            ]}>
            {item.group_users.map(
              (user, index) =>
                index < 3 && (
                  <View key={index} style={styles.rowBox}>
                    <Image
                      source={{uri: getUser(user)?.user_profile}}
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
                    marginLeft: 10,
                    fontSize: 12,
                    color: 'gray',
                    textAlign: 'center',
                  }}>
                  {'+'}
                  {item.group_user.length - 3}
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default GroupBox;
