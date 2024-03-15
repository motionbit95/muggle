import React from 'react';
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
const MeetingForm = ({navigation}) => {
  return (
    <View style={styles.screenStyle}>
      <ScrollView style={{width: '100%'}}>
        <View
          style={{
            width: '100%',
            height: undefined,
            aspectRatio: 16 / 9,
            backgroundColor: 'red',
          }}
        />
        <View
          style={{
            width: '100%',
            flex: 1,
            padding: 20,
            gap: 20,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>
              퇴근 후 역삼역 근처에서 저녁
            </Text>
            <View
              style={{
                backgroundColor: 'rgba(255, 99, 79, 1)',
                borderRadius: 5,
                padding: 3,
              }}>
              <Text style={{fontSize: 12, color: 'white'}}>D-3</Text>
            </View>
          </View>
          <View>
            <View style={{gap: 10}}>
              <View style={{flexDirection: 'row', gap: 10}}>
                <View style={{width: 18, height: 18, backgroundColor: 'red'}} />
                <Text style={{fontSize: 16}}>2023.03.09(토) 17:00</Text>
              </View>
              <View style={{flexDirection: 'row', gap: 10}}>
                <View style={{width: 18, height: 18, backgroundColor: 'red'}} />
                <Text style={{fontSize: 16}}>서울 강남 역삼동</Text>
                <TouchableOpacity
                  style={{
                    backgroundColor: 'rgba(238, 238, 238, 1)',
                    borderRadius: 5,
                    height: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 3,
                  }}
                  onPress={() => alert('지도보기')}>
                  <Text>지도보기</Text>
                </TouchableOpacity>
              </View>

              <View style={{flexDirection: 'row', gap: 10}}>
                <View style={{width: 18, height: 18, backgroundColor: 'red'}} />
                <Text style={{fontSize: 16}}>나누기</Text>
              </View>
              <View style={{flexDirection: 'row', gap: 10}}>
                <View style={{width: 18, height: 18, backgroundColor: 'red'}} />
                <Text style={{fontSize: 16}}>5 / 30 (25자리남음)</Text>
              </View>
            </View>
          </View>
          <View width="50%">
            <Text>
              여기 삼겹살 진짜 맛있어요 퇴근 후 같이 드시러 가실 분~! 밥값은
              나누기입니다.
            </Text>
          </View>
          <View style={{borderBottomColor: 'gray', borderBottomWidth: 1}} />
        </View>
        <View
          style={{
            width: '100%',
            padding: 20,
            backgroundColor: 'yellow',
            flex: 1,
          }}>
          <View>
            <Text>참여인원 5</Text>
          </View>
          <View gap={10}>
            <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
              <View
                style={{
                  width: 30,
                  height: 30,
                  backgroundColor: 'red',
                  borderRadius: 50,
                }}
              />
              <Text>홍길동</Text>
            </View>
            <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
              <View
                style={{
                  width: 30,
                  height: 30,
                  backgroundColor: 'red',
                  borderRadius: 50,
                }}
              />
              <Text>홍길동</Text>
            </View>
            <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
              <View
                style={{
                  width: 30,
                  height: 30,
                  backgroundColor: 'red',
                  borderRadius: 50,
                }}
              />
              <Text>홍길동</Text>
            </View>
            <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
              <View
                style={{
                  width: 30,
                  height: 30,
                  backgroundColor: 'red',
                  borderRadius: 50,
                }}
              />
              <Text>홍길동</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 10,
          borderTopWidth: 1,
          borderColor: '#f1f1f1',
        }}>
        <View
          style={{
            width: '20%',
            borderRadius: 10,
            height: 56,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Button onPress={() => alert('button눌렀엉')} title="🤍" />
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: 'rgba(255, 206, 79, 1)',
            width: '80%',
            borderRadius: 10,
            height: 56,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => alert('button눌렀엉')}>
          <Text style={{color: 'black'}}>참여하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MeetingForm;

const styles = StyleSheet.create({
  screenStyle: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});
