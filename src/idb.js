import { openDB } from 'idb'

const dbPromise = openDB('habit-pwa', 1, {
  upgrade(db) {
    db.createObjectStore('habits', { keyPath: 'id' });
    db.createObjectStore('actions', { autoIncrement: true });
  }
});

export const idb = {
  async getHabits() {
    return (await dbPromise).getAll('habits');
  },
  async saveHabits(list) {
    const db = await dbPromise;
    const tx = db.transaction('habits', 'readwrite');
    list.forEach(h => tx.store.put(h));
    return tx.done;
  },
  async queueAction(action) {
    return (await dbPromise).add('actions', action);
  },
  async getActions() {
    return (await dbPromise).getAll('actions');
  },
  async clearActions() {
    return (await dbPromise).clear('actions');
  }
}
