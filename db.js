const API_URL = 'http://localhost:3000/api/itens';

export const DB = {
    ler: async () => {
        try {
            const response = await fetch(API_URL);
            return await response.json();
        } catch (error) {
            console.error("Erro ao ler do servidor:", error);
            return [];
        }
    },

    adicionar: async (item) => {
        try {
            await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(item)
            });
        } catch (error) {
            console.error("Erro ao adicionar:", error);
        }
    },

    atualizarCor: async (id, novaCor) => {
        try {
            await fetch(`${API_URL}/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ color: novaCor })
            });
        } catch (error) {
            console.error("Erro ao atualizar cor:", error);
        }
    },

    atualizarForma: async (id, novaForma) => {
        try {
            await fetch(`${API_URL}/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ shape: novaForma })
            });
        } catch (error) {
            console.error("Erro ao atualizar forma:", error);
        }
    },

    remover: async (id) => {
        try {
            await fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            });
        } catch (error) {
            console.error("Erro ao remover:", error);
        }
    }
};