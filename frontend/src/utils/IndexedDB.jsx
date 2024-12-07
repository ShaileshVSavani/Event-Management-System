// const DB_NAME = "EventImagesDB";
// const STORE_NAME = "images";

// export const openDB = () => {
//   return new Promise((resolve, reject) => {
//     const request = indexedDB.open(DB_NAME, 1);

//     request.onupgradeneeded = (e) => {
//       const db = e.target.result;
//       if (!db.objectStoreNames.contains(STORE_NAME)) {
//         db.createObjectStore(STORE_NAME, { keyPath: "imageId" });
//       }
//     };

//     request.onsuccess = () => resolve(request.result);
//     request.onerror = (e) => reject(e.target.error);
//   });
// };

// export const saveImageToDB = async (imageId, imageFile) => {
//   const db = await openDB();
//   const transaction = db.transaction(STORE_NAME, "readwrite");
//   const store = transaction.objectStore(STORE_NAME);
//   store.put({ imageId, imageFile });

//   return new Promise((resolve, reject) => {
//     transaction.oncomplete = () => resolve(true);
//     transaction.onerror = (e) => reject(e.target.error);
//   });
// };

// export const getImageFromDB = async (imageId) => {
//   const db = await openDB();
//   const transaction = db.transaction(STORE_NAME, "readonly");
//   const store = transaction.objectStore(STORE_NAME);
//   const request = store.get(imageId);

//   return new Promise((resolve, reject) => {
//     request.onsuccess = () => resolve(request.result?.imageFile || null);
//     request.onerror = (e) => reject(e.target.error);
//   });
// };








const DB_NAME = "EventImagesDB";
const STORE_NAME = "images";

export const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);

    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "imageId" });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = (e) => reject(e.target.error);
  });
};

export const saveImageToDB = async (imageId, imageFile) => {
  const db = await openDB();
  const transaction = db.transaction(STORE_NAME, "readwrite");
  const store = transaction.objectStore(STORE_NAME);
  store.put({ imageId, imageFile });

  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => resolve(true);
    transaction.onerror = (e) => reject(e.target.error);
  });
};

export const getImageFromDB = async (imageId) => {
  const db = await openDB();
  const transaction = db.transaction(STORE_NAME, "readonly");
  const store = transaction.objectStore(STORE_NAME);
  const request = store.get(imageId);

  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result?.imageFile || null);
    request.onerror = (e) => reject(e.target.error);
  });
};
