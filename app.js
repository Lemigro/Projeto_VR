import { DB } from './db.js';

window.addEventListener('DOMContentLoaded', () => {
    const scene = document.querySelector('a-scene');
    if (scene.hasLoaded) { 
        init(); 
    } else { 
        scene.addEventListener('loaded', init); 
    }
});

async function init() {
    const container = document.querySelector('#inventory-container');
    const btnCreate = document.querySelector('#btn-create');
    const btnUpdateMode = document.querySelector('#btn-update-mode');
    const btnDeleteMode = document.querySelector('#btn-delete-mode');
    const txtUpdate = document.querySelector('#txt-update');
    const txtDelete = document.querySelector('#txt-delete');

    let deleteModeActive = false;
    let updateModeActive = false;

    // --- GERENCIAMENTO DE INTERFACE ---
    function atualizarVisualBotoes() {
        btnUpdateMode.setAttribute('material', 'color', updateModeActive ? '#FFA500' : '#8B4513');
        txtUpdate.setAttribute('value', updateModeActive ? 'INSPECIONAR: ON' : 'INSPECIONAR: OFF');
        
        btnDeleteMode.setAttribute('material', 'color', deleteModeActive ? '#FF0000' : '#8B0000');
        txtDelete.setAttribute('value', deleteModeActive ? 'REMOVER: ON' : 'REMOVER: OFF');
    }

    btnUpdateMode.addEventListener('click', () => {
        updateModeActive = !updateModeActive;
        if (updateModeActive) deleteModeActive = false;
        atualizarVisualBotoes();
    });

    btnDeleteMode.addEventListener('click', () => {
        deleteModeActive = !deleteModeActive;
        if (deleteModeActive) updateModeActive = false;
        atualizarVisualBotoes();
    });

    // --- FUNÇÃO DE RENDERIZAÇÃO ---
    const renderizarItem = (data) => {
        const tagForma = data.shape || 'a-box';
        const newItem = document.createElement(tagForma);
        
        newItem.setAttribute('id', String(data.id));
        newItem.setAttribute('class', 'clickable');
        newItem.setAttribute('color', data.color);
        newItem.setAttribute('position', data.position);
        newItem.setAttribute('scale', '0.5 0.5 0.5');
        newItem.setAttribute('shadow', 'cast: true');

        const label = document.createElement('a-text');

        const refId = String(data.id).slice(-5);
        label.setAttribute('value', `REF: ${refId}`);
        label.setAttribute('align', 'center');
        label.setAttribute('position', '0 0.8 0');
        label.setAttribute('scale', '0.6 0.6 0.6');
        label.setAttribute('color', '#FFFFFF');
        newItem.appendChild(label);

        newItem.addEventListener('mouseenter', () => {
            newItem.setAttribute('scale', '0.6 0.6 0.6');
        });
        newItem.addEventListener('mouseleave', () => {
            newItem.setAttribute('scale', '0.5 0.5 0.5');
        });

        newItem.addEventListener('click', async (evt) => {
            evt.stopPropagation();
            
            if (deleteModeActive) {
                console.log("Removendo item:", data.id);
                await DB.remover(data.id);
                newItem.parentNode.removeChild(newItem);
            } else if (updateModeActive) {
                const novaCor = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
                console.log("Atualizando cor do item:", data.id);
                newItem.setAttribute('color', novaCor);
                await DB.atualizarCor(data.id, novaCor);
            }
        });

        container.appendChild(newItem);
    };

    // --- LÓGICA DE CRIAÇÃO DE BOXES---
    btnCreate.addEventListener('click', async () => {
        const totalNaTela = container.children.length;

        const espacamento = 2.2;
        const colunas = 4;
        const x = (totalNaTela % colunas) * espacamento - 3; 
        const z = -Math.floor(totalNaTela / colunas) * espacamento - 5; 
    
        const formas = ['a-box', 'a-sphere', 'a-cylinder', 'a-cone'];
        const formaEscolhida = formas[Math.floor(Math.random() * formas.length)];
    
        const novoItem = {
            id: 'item-' + Date.now(),
            color: '#4CC3D9',
            shape: formaEscolhida,
            position: `${x} 0.5 ${z}`
        };

        renderizarItem(novoItem);
        
        await DB.adicionar(novoItem);
    });

    // --- CARREGAMENTO INICIAL DO BANCO ---
    try {
        const dadosIniciais = await DB.ler();
        if (dadosIniciais && Array.isArray(dadosIniciais)) {
            container.innerHTML = ''; 
            dadosIniciais.forEach(item => renderizarItem(item));
            console.log("Itens carregados do banco:", dadosIniciais.length);
        }
    } catch (error) {
        console.error("Erro ao carregar dados iniciais:", error);
    }
}