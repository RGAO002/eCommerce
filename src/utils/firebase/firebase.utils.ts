import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  NextOrObserver,
  User,
} from "firebase/auth"; //Import the functions you need from the SDKs you need

import {
  getFirestore,
  doc,
  getDoc,
  getDocs,
  setDoc,
  collection,
  writeBatch,
  query,
  QueryDocumentSnapshot,
} from "firebase/firestore"; //Import the functions you need from the SDKs you need

import { Category } from "../../store/categories/category.types";

const firebaseConfig = {
  apiKey: "AIzaSyAH3T-0wwmHzEtB0iHE2kpLdEWD1LlMTog",
  authDomain: "ecommerce-ebc14.firebaseapp.com",
  projectId: "ecommerce-ebc14",
  storageBucket: "ecommerce-ebc14.appspot.com",
  messagingSenderId: "744433173768",
  appId: "1:744433173768:web:226a802fda1f1e96c458bd",
  measurementId: "G-XYTP44CHMS",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig); //Initialize Firebase
//   const analytics = getAnalytics(app);
const provider = new GoogleAuthProvider(); //Create an instance of the Google provider object, provider can be other providers like Facebook, Twitter, Github, etc.

provider.setCustomParameters({ prompt: "select_account" }); //force user to select account

export const auth = getAuth(); //Get the auth service for the default app or a given app and export it
export const signInWithGooglePopup = () => signInWithPopup(auth, provider); //Sign in with popup
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, provider); //Sign in with redirect

export const db = getFirestore(); //Get the firestore service for the default app or a given app and export it

type ObjectToAdd = {
  title: string;
};
export const addCollectionAndDocuments = async <T extends ObjectToAdd>(
  collecctionKey: string,
  objectsToAdd: T[]
): Promise<void> => {
  //Add a collection and documents to the database
  const collectionRef = collection(db, collecctionKey); //Get the collection reference
  const batch = writeBatch(db); //Create a batch

  objectsToAdd.forEach((object) => {
    //Loop through the objects to add, in our case, each category of clothing
    const newDocRef = doc(collectionRef, object.title.toLowerCase()); //Create a new document reference
    batch.set(newDocRef, object); //Set the document reference
  });
  await batch.commit(); //Commit the batch
  // console.log("Collection added");
};

export const getCategoriesAndDocuments = async (): Promise<Category[]> => {
  const collectionRef = collection(db, "categories"); //Get the collection reference
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(
    (docSnapshot) => docSnapshot.data() as Category
  );
  // console.log(querySnapshot);
  // const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
  //   // console.log(docSnapshot);
  //   // console.log("data", docSnapshot.data());
  //   const { title, items } = docSnapshot.data();

  //   acc[title.toLowerCase()] = items;
  //   return acc;
  // }, {});

  // return categoryMap;
};

export type AdditionalInformation = {
  displayName?: string;
};

export type UserData = {
  createdAt: Date;
  displayName: string;
  email: string;
};

export const createUserDocumentFromAuth = async (
  userAuth: User,
  additionalInformation = {} as AdditionalInformation
): Promise<void | QueryDocumentSnapshot<UserData>> => {
  //Create a user document from the auth object
  if (!userAuth) return; //If the user auth object does not exist, return
  const userDocRef = doc(db, "users", userAuth.uid); //Get the user document reference, it takes 3 arguments: the firestore service, the collection name and the document id
  const userSnapshot = await getDoc(userDocRef); //Get the user document snapshot

  if (!userSnapshot.exists()) {
    //If the user document does not exist, set it inside of the database
    const { displayName, email } = userAuth; //Get the user display name and email
    const createdAt = new Date(); //Get the current date
    try {
      await setDoc(userDocRef, {
        //Create the user document
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("Error creating user", error);
    }
  }
  return userSnapshot as QueryDocumentSnapshot<UserData>; //Otherwise,return the user document reference
};

export const createAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => signOut(auth);

export const onAuthStateChangedListener = (callback: NextOrObserver<User>) => {
  return onAuthStateChanged(auth, callback);
};

export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe();
        resolve(userAuth);
      },
      reject
    );
  });
};
