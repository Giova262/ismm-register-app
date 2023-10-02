// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL
 } from "firebase/storage";
import {v4} from 'uuid';



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBT4FSQ9L5komcMJxsxlLQpSksgopmmz8c",
  authDomain: "ismm-224c4.firebaseapp.com",
  projectId: "ismm-224c4",
  storageBucket: "ismm-224c4.appspot.com",
  messagingSenderId: "808316359624",
  appId: "1:808316359624:web:c677c18d61012805b926fd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export async function uploadFile(file, nombreFoto) {
  const storageRef = ref(storage, `personas/${nombreFoto}`);
  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef)
}
