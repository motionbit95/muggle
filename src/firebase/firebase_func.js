import firestore from '@react-native-firebase/firestore';

export const getDocList = async collectionId => {
  const list = [];
  const querySnapshot = await firestore().collection(collectionId).get();
  querySnapshot.forEach(doc => {
    if (
      collectionId !== 'user' ||
      (collectionId === 'user' && doc.data().user_phone)
    )
      list.push(doc.data());
  });
  return list;
};

export const addDocument = async (collection_name, data) => {
  try {
    // Firestore 컬렉션에 문서 추가
    const docRef = await firestore().collection(collection_name).add(data);
    console.log('문서가 성공적으로 추가되었습니다.', docRef.id);
  } catch (error) {
    console.error('문서 추가 중 오류:', error);
  }
};

export const singleQuery = async (collection_name, key, value) => {
  const list = [];
  const querySnapshot = await firestore()
    .collection(collection_name)
    .where(key, '==', value)
    .get();

  querySnapshot.forEach(doc => {
    list.push(doc.data());
  });

  return list;
};
