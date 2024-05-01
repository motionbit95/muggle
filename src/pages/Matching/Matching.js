import React, {useRef, useState} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  f_full,
  flex_column,
  flex_row,
  justify_between,
  justify_end,
  radius_2xl,
  sp_3,
  sp_4,
} from '../../style/styles';
import {getDisplayAge} from '../../firebase/api';
import {updateDocument} from '../../firebase/firebase_func';
import Swiper from 'react-native-swiper';
import Typography from '../../Component/Typography';
import ConnectButtons from '../../Component/ConnectButtons';

const Matching = ({navigation, myInfo, userList, ...props}) => {
  const [swiperIndex, setSwiperIndex] = useState(0);
  const swipeRef = useRef();

  const handleFavorite = async uid => {
    if (!myInfo) return;
    if (!myInfo.favorite) {
      myInfo.favorite = [];
    }
    if (myInfo.favorite.includes(uid)) {
      // 지우기
      myInfo.favorite = myInfo.favorite.filter(g => g !== uid);
      // setIcon(require('../../assets/icons/heart.png'));
    } else {
      myInfo.favorite.push(uid);
      // setIcon(require('../../assets/icons/heart_fill.png'));
    }

    // console.log(myInfo.goods);

    await updateDocument('user', myInfo.doc_id, myInfo);
  };

  return (
    <Swiper
      ref={swipeRef}
      style={{
        backgroundColor: 'white',
        height: '100%',
        marginHorizontal: '-10%',
      }}
      loop={true}
      index={swiperIndex + 1}
      showsPagination={false}>
      {userList ? (
        userList?.map(
          (item, index) =>
            myInfo?.user_gender !== item?.user_gender &&
            item?.user_view_profile && (
              <View style={[f_full, {padding: 10}]}>
                <Image src={item?.user_profile} style={[f_full, radius_2xl]} />
                <LinearGradient
                  style={[
                    radius_2xl,
                    f_full,
                    {position: 'absolute', top: 0, left: 0, margin: 10},
                  ]}
                  colors={['rgba(0,0,0,0)', 'rgba(0,0,0,1)']}>
                  <View
                    style={[
                      f_full,
                      justify_end,
                      {
                        paddingBottom: 60,
                        paddingHorizontal: 20,
                      },
                    ]}>
                    <View style={[flex_row, justify_between]}>
                      <View style={[flex_row]}>
                        <View style={[justify_end]}>
                          <View style={[flex_column, sp_3, {marginLeft: 24}]}>
                            <Typography white bold size="2xl">
                              {item?.user_name}{' '}
                              {getDisplayAge(item?.user_birth)}
                            </Typography>
                            <Typography white size="md">
                              {item?.user_place?.[0]}
                            </Typography>
                          </View>
                        </View>
                      </View>
                      <View style={[flex_row, sp_4]}>
                        <TouchableOpacity
                          onPress={() => handleFavorite(item?.doc_id)}
                          // style={[{position: 'absolute', top: 10, right: 10}]}
                        >
                          <Image
                            style={{width: 48, height: 48}}
                            source={
                              myInfo?.favorite?.includes(item.doc_id)
                                ? require('../../assets/icons/heart_fill_2.png')
                                : require('../../assets/icons/heart_2.png')
                            }
                          />
                        </TouchableOpacity>
                        <ConnectButtons
                          size={50}
                          user={item}
                          navigation={navigation}
                        />
                      </View>
                    </View>
                  </View>
                </LinearGradient>
              </View>
            ),
        )
      ) : (
        <View style={f_full}></View>
      )}
    </Swiper>
  );
};

export default Matching;
