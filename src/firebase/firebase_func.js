import firestore from '@react-native-firebase/firestore';

export const getDocList = async collectionId => {
  const list = [];
  const querySnapshot = await firestore()
    .collection(collectionId)
    .limit(10)
    .get();
  querySnapshot.forEach(doc => {
    list.push(doc.data());
  });
  return list;
};
