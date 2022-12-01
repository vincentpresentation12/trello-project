import { app } from "./app";
import { uuidv4 } from "@firebase/util";
import { child, get, getDatabase, onValue, ref, set } from "firebase/database";
import { CardInterface } from "../interface/cardInterface";
import { ColoneInterface } from "../interface/coloneInterface";
import { getAuth } from "firebase/auth";

const database = getDatabase(app);
//create colonne with userid
export const AddColoneTrello = (data: ColoneInterface) => {
  return new Promise((resolve, reject) => {
    const user = getAuth().currentUser;
    const coloneTrelloRef = ref(database, "coloneTrello/" + uuidv4());
    set(coloneTrelloRef, {
      name: data.name,
      cards: data.cards,
      userId: user.uid,
    });
    resolve(true);
  });
};

export const GetColoneTrello = (userId: string) => {
  return new Promise((resolve, reject) => {
    const coloneTrelloRef = ref(database, "coloneTrello");
    onValue(coloneTrelloRef, (snapshot) => {
      const data = snapshot.val();
      const colones = [];
      for (const key in data) {
        if (data[key].userId === userId) {
          colones.push({ id: key, ...data[key] });
        }
      }
      resolve(colones);
    });
  });
};

export const EditColoneTrello = (id: string, data: ColoneInterface) => {
  return new Promise((resolve, reject) => {
    const coloneTrelloRef = ref(database, "coloneTrello/" + id);
    set(coloneTrelloRef, {
      name: data.name,
      cards: data.cards,
    });
    resolve(true);
  });
};
// delete colone with uuid
export const DeleteColoneTrello = (id: string) => {
  return new Promise((resolve, reject) => {
    const coloneTrelloRef = ref(database, "coloneTrello/" + id);
    set(coloneTrelloRef, null);
    resolve(true);
  });
};

// add task in colone
export const AddCardToColoneTrello = (id: string, card: CardInterface) => {
  return new Promise((resolve, reject) => {
    const coloneTrelloRef = ref(database, "coloneTrello/" + id);
    onValue(coloneTrelloRef, (snapshot) => {
      const data = snapshot.val();
      const cards = data.cards;
      cards.push(card);
      set(coloneTrelloRef, {
        id: id,
        name: data.name,
        picture: data.picture,
        cards: cards,
      });
      resolve(true);
    });
  });
};
// get all colone with id by user id
