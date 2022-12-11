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
      userId: data.userId,
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
    const coloneTrelloRef = ref(database);
    get(child(coloneTrelloRef, "coloneTrello/" + id))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          let cards = data.cards;
          if (cards === undefined || cards === null) {
            cards = [];
          }
          cards.push(card);
          set(ref(database, "coloneTrello/" + id), {
            name: data.name,
            cards: cards,
            userId: data.userId,
          });
          resolve(true);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  });
};
//get card by id colone
export const GetCardByColoneTrello = (id: string) => {
  return new Promise((resolve, reject) => {
    const coloneTrelloRef = ref(database, "coloneTrello/" + id);
    onValue(coloneTrelloRef, (snapshot) => {
      const data = snapshot.val();
      resolve(data.cards);
    });
  });
};

//get colone with ccard by userid
export const GetColoneTrelloWithCard = (userId: string) => {
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

//delete card in colone
export const DeleteCardInColoneTrello = (id: string, cardId: string) => {
  return new Promise((resolve, reject) => {
    const coloneTrelloRef = ref(database);
    get(child(coloneTrelloRef, "coloneTrello/" + id))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          let cards = data.cards;
          if (cards === undefined || cards === null) {
            cards = [];
          }
          cards = cards.filter((card) => card.id !== cardId);
          set(ref(database, "coloneTrello/" + id), {
            name: data.name,
            cards: cards,
            userId: data.userId,
          });
          resolve(true);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  });
};

//edit card
export const EditCardInColoneTrello = (id: string, card: CardInterface) => {
  return new Promise((resolve, reject) => {
    const coloneTrelloRef = ref(database);
    get(child(coloneTrelloRef, "coloneTrello/" + id))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          let cards = data.cards;
          if (cards === undefined || cards === null) {
            cards = [];
          }
          cards = cards.map((card) => {
            if (card.id === card.id) {
              return card;
            }
            return card;
          });
          set(ref(database, "coloneTrello/" + id), {
            name: data.name,
            cards: cards,
            userId: data.userId,
          });
          resolve(true);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  });
};
