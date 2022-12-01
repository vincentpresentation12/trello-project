import { getDatabase, onValue, ref, set } from "firebase/database";
import {
  getDownloadURL,
  getStorage,
  ref as refB,
  uploadBytes,
} from "firebase/storage";
import { app } from "./app";

const database = getDatabase(app);
const storage = getStorage(app);

export const UploadFile = (file: string, name: string) => {
  return new Promise((resolve, reject) => {
    new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(xhr.response);
      };
      xhr.responseType = "blob";
      xhr.open("GET", file);
      xhr.send(null);
    }).then((blob: Blob) => {
      const storageRef = refB(storage, name);
      uploadBytes(storageRef, blob).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          resolve(getDownloadURL(storageRef));
        });
      });
    });
  });
};

export const AddPictureToTask = (id: string, picture: string) => {
  return new Promise((resolve, reject) => {
    const taskRef = ref(database, "task/" + id);
    onValue(taskRef, (snapshot) => {
      const data = snapshot.val();
      set(taskRef, {
        id: id,
        name: data.name,
        picture: picture,
        coloneTrello: data.coloneTrello,
      });
      resolve(true);
    });
  });
};
