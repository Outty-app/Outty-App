const { db } = require('./firebase');

//async funcion to create and store unique user profile data
async function createProfile (uid, profileData){
    try{
       //creates a reference to the specific user document in the profiles collection
       const docRef = db.collection('profiles').doc(uid);
       const doc = await docRef.get();
       if(doc.exists){
          return ('doc exists')
       }
          await docRef.set(profileData);
          return ('profile created');
    }catch (error) {
        console.log(error)
       return ('invalid data')
    }
};

//async function to get user profile data
async function getProfile (uid) {
    try {
        //creates a reference to the specific user document in the profiles collection
        const docRef = db.collection('profiles').doc(uid);
        const doc = await docRef.get();
        if(doc.exists) {
            return doc.data();
        } else {
            return ('Profile not found');
        }
    } catch(error) {
        console.log(error);
        return ('invalid data');
    }
}

//async function to update user profile data
async function updateProfile (uid, updatedData) {
    try{
        //creates a reference to the specific user document in the profiles collection
        const docRef = db.collection('profiles').doc(uid);
        const doc = await docRef.get();
        if(doc.exists) {
            const update = await docRef.update(updatedData);
            return ('Profile successfully updated ')
        } else {
            return ('Profile not found')
        }
    }catch (error) {
        console.log(error);
        return ('invalid Data')
    }
}

//async function to delete user profile data
async function deleteProfile (uid) {
    try{
        //creates a reference to the specific user document in the profiles collection
        const docRef = db.collection('profiles').doc(uid);
        const doc = await docRef.get();
        if(doc.exists) {
            await docRef.delete()
            return ('Profile successfully deleted ')
        } else {
            return ('Profile not found')
        }
    }catch (error) {
        console.log(error);
        return ('invalid Data')
    }
}

module.exports = { createProfile, getProfile, updateProfile, deleteProfile };
