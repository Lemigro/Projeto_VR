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
    
    const btnColorMode = document.querySelector('#btn-color-mode');
    const btnShapeMode = document.querySelector('#btn-shape-mode');
    const btnDeleteMode = document.querySelector('#btn-delete-mode');
    
    const txtColor = document.querySelector('#txt-color');
    const txtShape = document.querySelector('#txt-shape');
    const txtDelete = document.querySelector('#txt-delete');

    let deleteModeActive = false;
    let colorModeActive = false;
    let shapeModeActive = false;

    // --- GERENCIAMENTO DE INTERFACE ---
    function atualizarVisualBotoes() {
        btnColorMode.setAttribute('material', 'color', colorModeActive ? '#FFA500' : '#8B4513');
        txtColor.setAttribute('value', colorModeActive ? 'MUDAR COR: ON' : 'MUDAR COR: OFF');
        
        btnShapeMode.setAttribute('material', 'color', shapeModeActive ? '#42A5F5' : '#1565C0');
        txtShape.setAttribute('value', shapeModeActive ? 'MUDAR FORMA: ON' : 'MUDAR FORMA: OFF');
        
        btnDeleteMode.setAttribute('material', 'color', deleteModeActive ? '#FF0000' : '#8B0000');
        txtDelete.setAttribute('value', deleteModeActive ? 'REMOVER: ON' : 'REMOVER: OFF');
    }

    btnColorMode.addEventListener('click', () => {
        colorModeActive = !colorModeActive;
        if (colorModeActive) { deleteModeActive = false; shapeModeActive = false; }
        atualizarVisualBotoes();
    });

    btnShapeMode.addEventListener('click', () => {
        shapeModeActive = !shapeModeActive;
        if (shapeModeActive) { deleteModeActive = false; colorModeActive = false; }
        atualizarVisualBotoes();
    });

    btnDeleteMode.addEventListener('click', () => {
        deleteModeActive = !deleteModeActive;
        if (deleteModeActive) { colorModeActive = false; shapeModeActive = false; }
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
                
            } else if (colorModeActive) {
                const novaCor = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
                console.log("Atualizando cor do item:", data.id);
                newItem.setAttribute('color', novaCor);
                data.color = novaCor;
                await DB.atualizarCor(data.id, novaCor);
                
            } else if (shapeModeActive) {
                const formas = ['a-box', 'a-sphere', 'a-cylinder', 'a-cone'];
                let indexAtual = formas.indexOf(data.shape);
                
                const novaForma = formas[(indexAtual + 1) % formas.length];
                console.log("Atualizando forma do item:", data.id, "para", novaForma);
                
                data.shape = novaForma;
                

                if(DB.atualizarForma) {
                    await DB.atualizarForma(data.id, novaForma);
                }
                
                newItem.parentNode.removeChild(newItem);
                renderizarItem(data);
            }
        });

        container.appendChild(newItem);
    };

    // --- LÓGICA DE CRIAÇÃO DE ITENS ---
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