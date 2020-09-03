import firebase from 'firebase/app'
import 'firebase/firestore'

import { firebaseConfig } from './config'

export const initializeDB = () => {
    if (firebase.apps.length === 0) {
      const fbConfig = firebaseConfig
      console.log('[firebase] init')
      firebase.initializeApp(fbConfig)
      return firebase.firestore()
    } else {
      return firebase.firestore()
    }
}
