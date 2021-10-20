import { openDB } from 'idb';

const DB_NAME = 'CHATCUS';
const STORE_NAME = 'CHAT';
const VERSION = 1;
//Create DB
let db;
const createDb = async () => {
  if (!window.indexedDB) {
    console.error(
      "Your browser doesn't support a stable version of IndexedDB. Older chat will not persist after refreshing the window",
    );
    return;
  }
  db = await openDB(DB_NAME, VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, {
          keyPath: 'id',
          autoIncrement: true,
        });
      }
    },
  });
  return true;
};

export const storeData = async (message) => {
  if (!db) {
    if (!(await createDb())) return;
  }
  const tx = db.transaction(STORE_NAME, 'readwrite');
  const store = await tx.objectStore(STORE_NAME);
  store.add(message);
  await tx.done;
  db.close();
};

export const getAllData = async () => {
  if (!db) {
    if (!(await createDb())) return;
  }
  const items = await db.transaction(STORE_NAME).objectStore(STORE_NAME).getAll();
  console.log(items);
  db.close();
  return items;
};

export const clearSavedChat = async () => {
  if (!db) {
    if (!(await createDb())) return;
  }
  const tx = db.transaction(STORE_NAME, 'readwrite');
  const store = await tx.objectStore(STORE_NAME);
  store.clear();
  console.log('clearing');
  await tx.done;
  db.close();
};
