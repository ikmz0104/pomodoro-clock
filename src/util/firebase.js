import { db } from '../../lib/db';

class Firebase {
    constructor() {
        this.users = db.collection('users');
        this.categories = db.collection('categories');
        this.sounds = db.collection('sounds');
    }

    getUserData = async(userId) => {
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

    getCategories = async(userId) => {
        let data = [];
        const ref = this.categories.where('userId', '==', userId);
        try {
            await ref.get().then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    data.push({...doc.data(), id: doc.id });
                });
            });
            return data;
        } catch (e) {
            throw e;
        }
    };

    getCategory = async(id) => {
        let data = {};
        const ref = this.categories.doc(id);
        try {
            await ref.get().then((doc) => {
                if (doc.exists) {
                    data.id = doc.id;
                    data = doc.data();
                }
            });
            return data;
        } catch (e) {
            throw e;
        }
    };

    updateCategory = async(id, data) => {
        try {
            await this.categories.doc(id).update(data);
        } catch (e) {
            throw e;
        }
    };

    deleteCategory = async(id) => {
        try {
            await this.categories.doc(id).delete();
        } catch (e) {
            throw e;
        }
    };

    createCategory = async(data) => {
        try {
            await this.categories.doc().set(data);
        } catch (e) {
            throw e;
        }
    };

    getSounds = async() => {
        let data = {};
        let breakData = [];
        const ref = this.sounds;
        const breakRef = ref.where('type', '==', 'break');
        try {
            await breakRef.get().then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
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

    getSeries = async(userId) => {
        const getRecords = async(userId, categoryId) => {
            console.log(categoryId) //categoryIdは2つともちゃんと取れてる
            let data = [];
            let tasksId = [categoryId];
            console.log(tasksId[0], tasksId[1])
            const ref = db.collection('users').doc(userId).collection('record').where('categoryId', '==', categoryId);
            try {
                const querySnapshot = await ref.get();
                await Promise.all(
                    querySnapshot.docs.map((doc) => {
                        if (doc.exists) {
                            data.push({ x: doc.data().date, y: doc.data().time });
                        }
                    }),

                    console.log(data)
                );
                return data1;
            } catch (e) {
                throw e;
            }
        };

        let series = [];
        const ref = this.categories.where('userId', '==', userId);
        try {
            await ref.get().then(async function(querySnapshot) {
                await Promise.all(
                    querySnapshot.docs.map(async(doc) => {
                        if (doc.exists) {
                            const records = await getRecords(userId, doc.id);
                            series.push({ name: doc.data().name, data: records });
                        }
                    }),
                );
            });
            console.log('return');
            return series;
        } catch (e) {
            throw e;
        }
    };
}

const Fire = new Firebase();
export default Fire;