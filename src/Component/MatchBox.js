import React from 'react';

const MatchBox = () => {
  return (
    <View width="100%">
      <TouchableOpacity
        style={{
          backgroundColor: 'rgba(255, 233, 230, 1)',
          borderRadius: 10,
          padding: 20,
          gap: 10,
        }}
        onPress={() => navigation.navigate('모임')}>
        <View
          style={{
            flexDirection: 'row',
            gap: 10,
            justifyContent: 'space-between',
          }}>
          <View style={{gap: 10}}>
            <Text style={styles.boxTitleFont}>
              퇴근 후 역삼역에서 저녁 드실분
            </Text>
            <View style={{flexDirection: 'row', gap: 10}}>
              <Text style={styles.boxDateFont}>2023.03.09(토) 17:00</Text>
              <View
                style={{
                  backgroundColor: 'rgba(255, 99, 79, 1)',
                  borderRadius: 5,
                  paddingHorizontal: 8,
                  paddingVertical: 3,
                }}>
                <Text
                  style={{
                    fontSize: 12,
                    color: 'white',
                    fontWeight: 'bold',
                  }}>
                  D-3
                </Text>
              </View>
            </View>
            <View style={{gap: 5}}>
              <Text>서울 강남 역삼동 골목오리집</Text>
              <Text>나누기 5/30</Text>
            </View>
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
        <Text>이미지들</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MatchBox;
