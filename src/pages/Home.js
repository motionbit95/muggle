import React, {Component, useEffect} from 'react';
import {Button, ScrollView, StyleSheet, Text, View} from 'react-native';
import {getDocList} from '../firebase/firebase_func';
const Home = () => {
  useEffect(() => {
    updateList();
  }, []);

  const updateList = async () => {
    let list = await getDocList('user');
    console.log('유저리스트 ===> ', list);
  };
  return (
    <ScrollView style={{width: '100%'}}>
      <View style={styles.screenStyle}>
        <View style={styles.headerStyle}>
          <Text style={{fontSize: 20}}>MUGGLE</Text>
          <Text style={{fontSize: 20}}>알림</Text>
        </View>

        <View style={styles.headerStyle}>
          <Text>식사모임</Text>
          <Text>클래스모임</Text>
          <Text>비즈니스모임</Text>
        </View>

        <View
          style={{
            backgroundColor: 'rgba(255, 206, 79, 1)',
            width: '100%',
            borderRadius: 10,
            height: 40,
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 20,
            gap: 10,
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', gap: 10, margin: 10}}>
            <Text>♠︎</Text>
            <Text>새로운 업데이트 소식 전해드릴게요.</Text>
          </View>
          <View>
            <Button
              color={'rgba(119, 119, 119, 1)'}
              style={{width: 24, height: 24}}
              onPress={() => alert('닫아!')}
              title="x"
            />
          </View>
        </View>
        <View
          style={{
            backgroundColor: '#8c8c8c',
            width: '100%',
            height: 320,
            marginBottom: 20,
            justifyContent: 'space-between',
            borderRadius: 20,
          }}>
          <View></View>
          <View style={{gap: 10, alignItems: 'center', marginBottom: 20}}>
            <Text style={{fontSize: 20, color: 'white'}}>Title</Text>
            <Text style={{fontSize: 16, color: 'white'}}>
              서브텍스트가 들어갑니다
            </Text>
            <View
              style={{
                backgroundColor: 'gray',
                padding: 5,
                borderRadius: 15,
                width: 60,
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 12, color: 'white'}}>3/8</Text>
            </View>
          </View>
        </View>
        <View
          style={{
            width: '100%',
            backgroundColor: '#d9d9d9',
            marginBottom: 20,
            gap: 20,
          }}>
          <View style={{gap: 10}}>
            <Text style={{fontSize: 20}}>식사모임</Text>
            <Text>서브텍스트가 들어갑니다.</Text>
          </View>
          <View
            style={{
              backgroundColor: 'rgba(255, 233, 230, 1)',
              borderRadius: 10,
              padding: 20,
            }}>
            <View
              style={{
                flexDirection: 'row',
                gap: 10,
                justifyContent: 'space-between',
              }}>
              <View style={{gap: 10}}>
                <Text>퇴근 후 역삼역에서 저녁 드실분</Text>
                <View style={{flexDirection: 'row', gap: 10}}>
                  <Text>2023.03.09(토) 17:00</Text>
                  <View
                    style={{
                      backgroundColor: 'rgba(255, 99, 79, 1)',
                      borderRadius: 5,
                      padding: 3,
                    }}>
                    <Text style={{fontSize: 12, color: 'white'}}>D-3</Text>
                  </View>
                </View>
                <Text>서울 강남 역삼동 골목오리집</Text>
                <Text>나누기 5/30</Text>
                <Text>이미지들</Text>
              </View>
              <View
                style={{
                  width: 100,
                  height: 100,
                  backgroundColor: 'red',
                  borderRadius: 10,
                }}
              />
            </View>
          </View>
          <View
            style={{
              backgroundColor: 'white',
              borderWidth: 1,
              borderColor: 'rgba(119, 119, 119, 1)',
              borderRadius: 10,
            }}>
            <Button
              color={'rgba(119, 119, 119, 1)'}
              style={{
                width: '100%',
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => alert('button눌렀엉')}
              title="더보기 >"
            />
          </View>
        </View>
        <View
          style={{
            width: '100%',
            backgroundColor: '#d9d9d9',
            marginBottom: 20,
            gap: 20,
          }}>
          <View style={{gap: 10}}>
            <Text style={{fontSize: 20}}>커피 매칭 친구 추천</Text>
            <Text>서브텍스트가 들어갑니다.</Text>
          </View>
          <View
            style={{
              width: 280,
              height: 300,
              backgroundColor: 'red',
              borderRadius: 20,
              padding: 20,
              justifyContent: 'space-between',
            }}>
            <View></View>
            <View style={{gap: 5}}>
              <View
                style={{
                  flexDirection: 'row',
                  borderWidth: 1,
                  borderColor: 'white',
                  borderRadius: 10,
                  width: 60,
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 5,
                }}>
                <Text>✭</Text>
                <Text style={{color: 'white', fontSize: 14}}>근처</Text>
              </View>

              <Text style={{color: 'white', fontSize: 22}}>장원영11</Text>
              <Text style={{color: 'white', fontSize: 18}}>
                서울특별시 강남구
              </Text>
              <View
                style={{
                  backgroundColor: 'rgba(255, 206, 79, 1)',
                  borderRadius: 10,
                  height: 56,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Button
                  color={'black'}
                  onPress={() => alert('button눌렀엉')}
                  title="커피 매칭 신청"
                />
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            width: '100%',
            backgroundColor: '#d9d9d9',
            marginBottom: 20,
            gap: 20,
          }}>
          <View style={{gap: 10}}>
            <Text style={{fontSize: 20}}>클래스 모임</Text>
            <Text>서브텍스트가 들어갑니다.</Text>
          </View>
          <View
            style={{
              backgroundColor: 'rgba(255, 233, 230, 1)',
              borderRadius: 10,
              padding: 20,
            }}>
            <View
              style={{
                flexDirection: 'row',
                gap: 10,
                justifyContent: 'space-between',
              }}>
              <View style={{gap: 10}}>
                <Text>자기계발 독서모임</Text>
                <View style={{flexDirection: 'row', gap: 10}}>
                  <Text>2023.03.09(토) 17:00</Text>
                  <View
                    style={{
                      backgroundColor: 'rgba(255, 99, 79, 1)',
                      borderRadius: 5,
                      padding: 3,
                    }}>
                    <Text style={{fontSize: 12, color: 'white'}}>D-3</Text>
                  </View>
                </View>
                <Text>코엑스 별마당 도서관</Text>
                <Text>18000 5/30</Text>
                <Text>이미지들</Text>
              </View>
              <View
                style={{
                  width: 100,
                  height: 100,
                  backgroundColor: 'red',
                  borderRadius: 10,
                }}
              />
            </View>
          </View>
          <View
            style={{
              backgroundColor: 'white',
              borderWidth: 1,
              borderColor: 'rgba(119, 119, 119, 1)',
              borderRadius: 10,
            }}>
            <Button
              color={'rgba(119, 119, 119, 1)'}
              style={{
                width: '100%',
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => alert('button눌렀엉')}
              title="더보기 >"
            />
          </View>
        </View>
        <View
          style={{
            width: '100%',
            backgroundColor: '#d9d9d9',
            marginBottom: 20,
            gap: 20,
          }}>
          <View style={{gap: 10}}>
            <Text style={{fontSize: 20}}>비즈니스 모임</Text>
            <Text>서브텍스트가 들어갑니다.</Text>
          </View>
          <View
            style={{
              backgroundColor: 'rgba(255, 233, 230, 1)',
              borderRadius: 10,
              padding: 20,
            }}>
            <View
              style={{
                flexDirection: 'row',
                gap: 10,
                justifyContent: 'space-between',
              }}>
              <View style={{gap: 10}}>
                <Text>카페 바이럴 마케터 모임</Text>
                <View style={{flexDirection: 'row', gap: 10}}>
                  <Text>2023.03.09(토) 17:00</Text>
                  <View
                    style={{
                      backgroundColor: 'rgba(255, 99, 79, 1)',
                      borderRadius: 5,
                      padding: 3,
                    }}>
                    <Text style={{fontSize: 12, color: 'white'}}>D-3</Text>
                  </View>
                </View>
                <Text>서울 강남 역삼동</Text>
                <Text>30000 5/30</Text>
                <Text>이미지들</Text>
              </View>
              <View
                style={{
                  width: 100,
                  height: 100,
                  backgroundColor: 'red',
                  borderRadius: 10,
                }}
              />
            </View>
          </View>
          <View
            style={{
              backgroundColor: 'white',
              borderWidth: 1,
              borderColor: 'rgba(119, 119, 119, 1)',
              borderRadius: 10,
            }}>
            <Button
              color={'rgba(119, 119, 119, 1)'}
              style={{
                width: '100%',
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => alert('button눌렀엉')}
              title="더보기 >"
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screenStyle: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  headerStyle: {
    width: '100%',
    height: 50,
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 20,
  },
});

export default Home;
