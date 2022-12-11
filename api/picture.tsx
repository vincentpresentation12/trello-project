import { child, get, getDatabase, onValue, ref, set } from "firebase/database";
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

//use the upload file function to upload the file to firebase storage in card in colone
export const AddPictureToCard = (id: string, cardId: string, picture: any) => {
  return new Promise((resolve, reject) => {
    let spNomUri = picture.split("/");
    let nom = spNomUri[spNomUri.length - 1];
    UploadFile(picture, nom).then((url) => {
      const coloneTrelloRef = ref(database);
      get(child(coloneTrelloRef, "coloneTrello/" + id))
        .then((snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            let cards = data.cards;
            cards.map((card: any) => {
              if (card.id === cardId) {
                card.picture = url;
              }
            });
            set(coloneTrelloRef, {
              name: data.name,
              cards: cards,
              userId: data.userId,
            });
            resolve(true);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  });
};
