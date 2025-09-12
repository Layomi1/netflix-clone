import { FirebaseError, initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyCCzE6xAfpEi7-VJJyJ3Qol65H1HvH6b8A",
  authDomain: "netflix-clone-3b21d.firebaseapp.com",
  projectId: "netflix-clone-3b21d",
  storageBucket: "netflix-clone-3b21d.firebasestorage.app",
  messagingSenderId: "111150125797",
  appId: "1:111150125797:web:44b248811b180530bb7a0c",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name: string, email: string, password: string) => {
  try {
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = response.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
    toast.success("Signup Successful");
    return user;
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      toast.error(error.code.split("/")[1].split("-").join(" "));
    } else {
      toast.error("Login failed. Please try again.");
    }
    throw error;
  }
};

const login = async (email: string, password: string) => {
  try {
    const response = await signInWithEmailAndPassword(auth, email, password);
    toast.success("Login Successful");
    return response.user;
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      toast.error(error.code.split("/")[1].split("-").join(" "));
    } else {
      toast.error("Login failed. Please try again.");
    }
    throw error;
  }
};

const logout = async () => {
  await signOut(auth);
};

export { auth, db, signup, login, logout };
