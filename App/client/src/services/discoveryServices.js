const { db } = require('../firebase');
import { collection, query, where, limit, getDocs } from 'firebase/firestore';

async function fetchIdsOfInteractedWithUsers(currentUserUid) {
    // TODO
}

async function matchUsers(fromUid, toUid) {
    const docRef = db.collection('interactions').doc(`${fromUid}_${toUid}`);
    const doc = await docRef.get();
}

async function loadInitialQueue(currentUserUid) {
    try {
        const profilesRef = collection(db, 'profiles');
        const q = query(profilesRef, limit(20));

        const snapshot = await getDocs(q);
        console.log('Raw snapshot size:', snapshot.size);

        const profiles = snapshot.docs
            .map(doc => ({ id: doc.id, ...doc.data() }))
            .filter(profile => profile.uid !== currentUserUid); // filter out self client-side

        console.log('Filtered profiles:', profiles.length);
        return profiles;
    } catch (error) {
        console.error('Error message:', error.message);
        throw error;
    }
}

module.exports = { loadInitialQueue, matchUsers };