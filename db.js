// const API_URL = 'http://localhost:3000/api/itens';

// export const DB = {
//     ler: async () => {
//         try {
//             const response = await fetch(API_URL);
//             return await response.json();
//         } catch (error) {
//             console.error("Erro ao ler do servidor:", error);
//             return [];
//         }
//     },

//     adicionar: async (item) => {
//         try {
//             await fetch(API_URL, {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(item)
//             });
//         } catch (error) {
//             console.error("Erro ao adicionar:", error);
//         }
//     },

//     atualizarCor: async (id, novaCor) => {
//         try {
//             await fetch(`${API_URL}/${id}`, {
//                 method: 'PATCH',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ color: novaCor })
//             });
//         } catch (error) {
//             console.error("Erro ao atualizar cor:", error);
//         }
//     },

//     atualizarForma: async (id, novaForma) => {
//         try {
//             await fetch(`${API_URL}/${id}`, {
//                 method: 'PATCH',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ shape: novaForma })
//             });
//         } catch (error) {
//             console.error("Erro ao atualizar forma:", error);
//         }
//     },

//     remover: async (id) => {
//         try {
//             await fetch(`${API_URL}/${id}`, {
//                 method: 'DELETE'
//             });
//         } catch (error) {
//             console.error("Erro ao remover:", error);
//         }
//     }
// };


import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getDatabase, ref, get, set, update, remove } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyABY1Egvu6ewu5sWG-JlnuWJ4UFwvdsmvk",
  authDomain: "vr-crud.firebaseapp.com",
  databaseURL: "https://vr-crud-default-rtdb.firebaseio.com",
  projectId: "vr-crud",
  storageBucket: "vr-crud.firebasestorage.app",
  messagingSenderId: "578663762313",
  appId: "1:578663762313:web:2e6b2a2add343e76237958",
  measurementId: "G-LMPRR2JV8G"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export const DB = {
    ler: async () => {
        try {
            const dbRef = ref(database, 'itens');
            const snapshot = await get(dbRef);
            if (snapshot.exists()) {
                const dados = snapshot.val();
                return Object.values(dados);
            } else {
                return [];
            }
        } catch (error) {
            console.error("Erro ao ler do Firebase:", error);
            return [];
        }
    },

    adicionar: async (item) => {
        try {
            const itemRef = ref(database, 'itens/' + item.id);
            await set(itemRef, item);
            console.log(`Item ${item.id} salvo no Firebase!`);
        } catch (error) {
            console.error("Erro ao adicionar no Firebase:", error);
        }
    },

    atualizarCor: async (id, novaCor) => {
        try {
            const itemRef = ref(database, 'itens/' + id);
            await update(itemRef, { color: novaCor });
        } catch (error) {
            console.error("Erro ao atualizar cor no Firebase:", error);
        }
    },

    atualizarForma: async (id, novaForma) => {
        try {
            const itemRef = ref(database, 'itens/' + id);
            await update(itemRef, { shape: novaForma });
        } catch (error) {
            console.error("Erro ao atualizar forma no Firebase:", error);
        }
    },

    remover: async (id) => {
        try {
            const itemRef = ref(database, 'itens/' + id);
            await remove(itemRef);
            console.log(`Item ${id} removido do Firebase!`);
        } catch (error) {
            console.error("Erro ao remover no Firebase:", error);
        }
    }
};