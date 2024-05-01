import React from 'react';
import {Dimensions, FlatList, Image, ScrollView, View} from 'react-native';
import Typography from '../../Component/Typography';
import Swiper from 'react-native-swiper';
import {
  align_center,
  center,
  flex_row,
  img_md,
  img_sm,
  justify_between,
  justify_center,
  p_1,
  p_2,
  p_4,
  radius_md,
  radius_sm,
  sp_12,
  sp_16,
  sp_2,
  sp_4,
  sp_6,
  sp_8,
  t_align_center,
  w_full,
} from '../../style/styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {formatCurrency, primary_color} from '../../firebase/api';

function Heart(props) {
  // 50까지 숫자를 만들어주는 코드 ( 데이터 )
  const arr = [
    {count: 9000, hot: true, price: 188000, sale: '-45%'},
    {count: 5000, hot: false, price: 129000, sale: '-32%'},
    {count: 2400, hot: true, price: 68000, sale: '-25%'},
    {count: 1800, hot: false, price: 52000, sale: '-23%'},
    {count: 1200, hot: false, price: 36000, sale: '-21%'},
    {count: 500, hot: false, price: 16000, sale: '-15%'},
    {count: 200, hot: false, price: 7600, sale: ''},
  ];
  return (
    <ScrollView style={[sp_2, {backgroundColor: 'white'}]}>
      <View style={[center, {height: 250}]}>
        <Swiper autoplay={true} loop={true} autoplayTimeout={3}>
          <View
            style={[
              justify_center,
              align_center,
              w_full,
              p_4,
              sp_8,
              {height: 250, backgroundColor: 'white'},
            ]}>
            <Image
              style={{width: Dimensions.get('window').width, height: 60}}
              source={require('../../assets/testImage.png')}></Image>
            <Typography center bold size="2xl">
              {'다양한 모임에 참석하여\n매력적인 상대를 만나보세요.'}
            </Typography>
          </View>
          <View
            style={[
              justify_center,
              align_center,
              w_full,
              p_4,
              sp_8,
              {height: 250, backgroundColor: 'white'},
            ]}>
            <Typography center bold size="2xl">
              {'호감가는 상대에게\n채팅을 걸어보세요'}
            </Typography>
          </View>
        </Swiper>
      </View>
      <FlatList
        keyExtractor={item => item.count}
        data={arr}
        renderItem={({item}) => <Item item={item} />}
      />
      <View style={p_2}>
        <Typography>
          환불은 구매일로부터 7일 이내 미사용 하트만 가능합니다.
        </Typography>
      </View>

      <View style={[p_2, {marginTop: 20}]}>
        <Typography bold size="2xl">
          {'무료 하트 받기'}
        </Typography>
        <View
          style={[flex_row, p_4, justify_between, {backgroundColor: 'white'}]}>
          <View
            style={[flex_row, sp_2, align_center, {backgroundColor: 'white'}]}>
            <Image style={img_md} source={require('../../assets/heart.png')} />
            <Typography bold size="2xl">
              {100}
            </Typography>
          </View>
          <View
            style={[
              flex_row,
              sp_2,
              align_center,
              p_1,
              {
                paddingHorizontal: 10,
                backgroundColor: 'white',
                borderWidth: 1,
                borderRadius: 5,
                borderColor: '#d9d9d9',
              },
            ]}>
            <Image style={img_sm} source={require('../../assets/kakao.png')} />
            <Typography>친구초대</Typography>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const Item = ({item}) => {
  return (
    <View style={[flex_row, p_4, justify_between, {backgroundColor: 'white'}]}>
      <View style={[flex_row, sp_2, align_center, {backgroundColor: 'white'}]}>
        <Image style={img_md} source={require('../../assets/heart.png')} />
        <Typography bold size="2xl">
          {item.count}
        </Typography>
        {item.hot && (
          <View
            style={[
              p_1,
              radius_md,
              {paddingHorizontal: 10, backgroundColor: primary_color},
            ]}>
            <Typography white bold>
              BEST
            </Typography>
          </View>
        )}
      </View>
      <View
        style={[
          flex_row,
          sp_2,
          align_center,
          justify_center,
          radius_md,
          {width: 130, paddingHorizontal: 10, backgroundColor: '#939393'},
        ]}>
        <Typography bold white>
          {formatCurrency(item.price)}
        </Typography>
        {item.sale && <Typography>{item.sale}</Typography>}
      </View>
    </View>
  );
};

export default Heart;
