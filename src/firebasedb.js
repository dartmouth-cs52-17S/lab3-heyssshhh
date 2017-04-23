import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyD9LJO6ECrhBL_2ZF_JAnKfrKHrzmaQYTU',
  authDomain: 'reactnotes-b8568.firebaseapp.com',
  databaseURL: 'https://reactnotes-b8568.firebaseio.com',
  projectId: 'reactnotes-b8568',
  storageBucket: 'reactnotes-b8568.appspot.com',
  messagingSenderId: '329688405381',

  rules: {
    '.read': true,
    '.write': true,
  },
};

firebase.initializeApp(config);

export function fetchNotes(callback) {
  firebase.database().ref('notes').on('value', (snapshot) => {
    callback(snapshot.val());
  });
}

export function fetchZ(callback) {
  firebase.database().ref('topZ').on('value', (snapshot) => {
    callback(snapshot.val());
  });
}

export function updateZ(topZ) {
  firebase.database().ref('topZ').set({ topZ });
}

export function addNote(note) {
  firebase.database().ref().child('notes/').push(note);
}

export function removeNote(id) {
  firebase.database().ref('notes').child(id).remove();
}

export function updateNote(id, field) {
  firebase.database().ref('notes').child(id).update(field);
}
