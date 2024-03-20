import React, {useEffect, useState} from 'react';
import {
  Button,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from '../../style/styles';
import {
  calculateDday,
  formatDate,
  displayDday,
  formatDateTime,
} from '../../firebase/api';
import {singleQuery} from '../../firebase/firebase_func';

const GroupDetail = ({navigation, route}) => {
  const {data} = route.params ? route.params : {data: null};
  const [userList, setUserList] = useState(null);
  console.log(data ? data : 'no data');
  // 디데이 계산 및 표시
  var dday = calculateDday(formatDate(data?.group_time));

  useEffect(() => {
    let group_users = [];
    data?.group_users?.map(async user => {
      await singleQuery('user', 'uid', user).then(res => {
        group_users.push(res[0]);
      });
      setUserList(group_users);
    });
  }, [data]);
  return (
    <View style={styles.screenStyle}>
      <ScrollView style={styles.scrollViewStyle}>
        <Image
          source={require('../../assets/banner1.png')}
          style={styles.banner}
        />
        <View style={styles.contentStyle}>
          <View
            style={{
              width: '100%',
              flex: 1,
              gap: 20,
            }}>
            <View style={[{justifyContent: 'space-between'}, styles.rowBox]}>
              <Text style={{fontSize: 18, fontWeight: '600'}}>
                {data?.group_name}
              </Text>
              <View style={styles.d_daytag}>
                <Text style={styles.dayText}>{displayDday(dday)}</Text>
              </View>
            </View>
            <View style={styles.gap10}>
              <View style={styles.rowBox}>
                <View style={styles.icon18} />
                <Text style={{fontSize: 16}}>
                  {formatDateTime(data?.group_time)}
                </Text>
              </View>
              <View style={styles.rowBox}>
                <View style={styles.icon18} />
                <Text style={{fontSize: 16}}>{data?.group_place}</Text>
                <TouchableOpacity
                  style={styles.mapButton}
                  onPress={() => alert('지도보기')}>
                  <Text style={{fontSize: 14}}>지도보기</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.rowBox}>
                <View style={styles.icon18} />
                <Text style={{fontSize: 16}}>
                  {data?.group_price ? data?.group_price : '나누기'}
                </Text>
              </View>
              <View style={styles.rowBox}>
                <View style={styles.icon18} />
                <Text style={{fontSize: 16}}>
                  {data?.group_users?.length} / {data?.group_personnel} (
                  {data?.group_personnel - data?.group_users?.length}자리남음)
                </Text>
              </View>
            </View>

            <View style={{flex: 1, width: '50%'}}>
              <Text>{data?.group_target}</Text>
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
              <Text>참여인원 ( {data?.group_users?.length} )</Text>
            </View>
            <View gap={10}>
              {userList?.map((user, index) => (
                <View key={index} style={styles.rowBox}>
                  <View style={styles.Avartar30} />
                  <Text>{user?.user_name}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={[styles.buttonBox, styles.rowBox]}>
        <TouchableOpacity style={{flex: 1}} onPress={() => alert('좋아용')}>
          <Image
            source={require('../../assets/hearticon.png')}
            style={{width: 30, height: 30}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, {flex: 5}]}
          onPress={() => alert('참여하기')}>
          <Text style={styles.buttonText}>참여하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default GroupDetail;
