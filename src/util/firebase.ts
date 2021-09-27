import { Category } from '@material-ui/icons';
import { db } from '../../lib/db';
import moment from 'moment';

class Firebase {
  users: firebase.default.firestore.CollectionReference;
  categories: firebase.default.firestore.CollectionReference;
  sounds: firebase.default.firestore.CollectionReference;

  constructor() {
    this.users = db.collection('users');
    this.categories = db.collection('categories');
    this.sounds = db.collection('sounds');
  }

  getUserData = async (userId: string) => {
    let userData = {};
    const ref = this.users.doc(userId);
    try {
      await ref.get().then((doc) => {
        if (doc.exists) {
          userData = {
            uid: doc.id,
            ...doc.data(),
          };
        }
      });
      return userData;
    } catch (e) {
      throw e;
    }
  };

  getCategories = async (userId: string) => {
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

  getCategory = async (id: string) => {
    let data: Category = {
      name: null,
      time: null,
      userId: null,
    };
    const ref = this.categories.doc(id);
    try {
      await ref.get().then((doc) => {
        if (doc.exists) {
          data = {
            id: doc.id,
            name: doc.data().name,
            time: doc.data().time,
            userId: doc.data().userId,
          };
        }
      });
      return data;
    } catch (e) {
      throw e;
    }
  };

  updateCategory = async (id: string, data: Category) => {
    try {
      await this.categories.doc(id).update(data);
    } catch (e) {
      throw e;
    }
  };

  deleteCategory = async (id: string) => {
    try {
      await this.categories.doc(id).delete();
    } catch (e) {
      throw e;
    }
  };

  createCategory = async (data: Category) => {
    try {
      await this.categories.doc().set(data);
    } catch (e) {
      throw e;
    }
  };

  getSounds = async () => {
    let data = {
      breakData: [],
      chime: '',
    };
    let breakData = [];
    const ref = this.sounds;
    const breakRef = ref.where('type', '==', 'break');
    try {
      await breakRef.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          breakData.push(doc.data().url);
        });
      });
      data.breakData = breakData;
      await ref
        .doc('chime')
        .get()
        .then((doc) => {
          if (doc.exists) {
            data.chime = doc.data().url;
          }
        });
      return data;
    } catch (e) {
      throw e;
    }
  };

  getSeries = async (userId: string): Promise<Series[]> => {
    const getRecords = async (userId: string, categoryId: string): Promise<IRecord[]> => {
      let data: IRecord[] = [];
      const ref = this.users.doc(userId).collection('record').where('categoryId', '==', categoryId);
      try {
        const querySnapshot = await ref.get();
        await Promise.all(
          querySnapshot.docs.map((doc) => {
            if (doc.exists) {
              console.log(moment(doc.data().date).startOf('day').valueOf());
              data.push({ x: moment(doc.data().date).startOf('day').valueOf(), y: doc.data().time });
            }
          }),
        );
        const groupBy = (array, getKey) =>
          Array.from(
            array.reduce((map, cur, idx, src) => {
              const key = getKey(cur, idx, src);
              const list = map.get(key);
              if (list) list.push(cur);
              else map.set(key, [cur]);
              return map;
            }, new Map()),
          );
        const result = groupBy(data, (i) => i.x).map(([date, data]) => ({
          x: date,
          y: data.reduce((sum, i) => sum + i.y, 0),
        }));
        return result;
      } catch (e) {
        throw e;
      }
    };

    let series: Series[] = [];
    const ref = this.categories.where('userId', '==', userId);
    try {
      await ref.get().then(async function (querySnapshot) {
        await Promise.all(
          querySnapshot.docs.map(async (doc) => {
            if (doc.exists) {
              const records = await getRecords(userId, doc.id);
              series.push({ name: doc.data().name, data: records });
            }
          }),
        );
      });
      return series;
    } catch (e) {
      throw e;
    }
  };

  /**
   * 作業時間の記録
   * @param userId
   * @param {string} categoryId
   * @param {number} time
   * @return {Promise<void>}
   */
  setRecord = async (userId: string, categoryId: string, time: number): Promise<void> => {
    try {
      const now = new Date().getTime();
      await this.users.doc(userId).collection('record').doc().set({
        categoryId: categoryId,
        date: now,
        time: time,
      });
    } catch (e) {
      throw e;
    }
  };
}

const Fire = new Firebase();
export default Fire;
