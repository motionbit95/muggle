import firestore from '@react-native-firebase/firestore';

export const getDocList = async collectionId => {
  const list = [];
  const querySnapshot = await firestore().collection(collectionId).get();
  querySnapshot.forEach(doc => {
    list.push(doc.data());
  });
  return list;
};
