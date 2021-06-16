import { db } from '../../lib/db';

class Firebase {
  constructor() {
    this.users = db.collection('users');
    this.categories = db.collection('categories');
  }

  getUserData = async (userId) => {
    let userData = {};
    const ref = this.users.doc(userId);
    try {
      await ref.get().then((doc) => {
        if (doc.exists) {
          userData.uid = doc.id;
          userData = doc.data();
        }
      });
      return userData;
    } catch (e) {
      throw e;
    }
  };

  getCategories = async (userId) => {
    let data = [];
    const ref = this.categories.where('userId', '==', userId);
    try {
      await ref.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          data.push({ ...doc.data(), id: doc.id });
        });
      });
      return data;
    } catch (e) {
      throw e;
    }
  };
}

const Fire = new Firebase();
export default Fire;
