/**
 * =====================================================================
 * PORTFOLIO.JS
 * =====================================================================
 * Funcionalidade da página de portfólio
 * - Filtros de categoria
 * - Modal de detalhes de projetos
 * - Animações e efeitos
 */

/**
 * Dados dos projetos
 * Array com informações de cada projeto para exibição no modal
 * 
 * @type {Array<Object>}
 */
const projetos = [
    {
        id: 1,
        titulo: 'Proteção de Vidros - BMW X5',
        categoria: 'automotivo',
        descricao: 'Aplicação profissional de película de proteção solar em veículo premium',
        area: '2.5 m²',
        data: 'Janeiro 2025',
        tipo: 'Proteção Solar Premium',
        imagem: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=400&h=300&fit=crop',
        detalhes: 'Aplicação completa de película de proteção solar com 99% de bloqueio UV. Redução de calor em 50% e proteção contra raios UV infravermelhos. Acabamento premium com sistema anti-bolhas.'
    },
    {
        id: 2,
        titulo: 'Insulfilm Premium - Audi A4',
        categoria: 'automotivo',
        descricao: 'Instalação de película premium com proteção UV e térmica',
        area: '2.2 m²',
        data: 'Dezembro 2024',
        tipo: 'Insulfilm Premium',
        imagem: 'https://images.unsplash.com/photo-1605559424843-9e4c3febdc3d?w=400&h=300&fit=crop',
        detalhes: 'Película de última geração com filtragem de calor. Proporciona conforto total no interior do veículo com redução de 70% na temperatura interna. Instalação com garantia de 5 anos.'
    },
    {
        id: 3,
        titulo: 'Revestimento Comercial - Edifício Office',
        categoria: 'predial',
        descricao: 'Aplicação em fachada inteira com 5.000+ m² de película',
        area: '5.000 m²',
        data: 'Outubro 2024',
        tipo: 'Película Espelhada Comercial',
        imagem: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&h=300&fit=crop',
        detalhes: 'Projeto de grande escala com película espelhada de proteção solar. Projeto completo incluindo isolamento térmico, privacidade e estética arquitetônica. Redução de 40% na transmissão de calor.'
    },
    {
        id: 4,
        titulo: 'Proteção de Privacidade - Apartamento Residencial',
        categoria: 'residencial',
        descricao: 'Película decorativa com proteção solar em ambiente interior',
        area: '15 m²',
        data: 'Setembro 2024',
        tipo: 'Película Decorativa',
        imagem: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop',
        detalhes: 'Aplicação de película decorativa em vidros de ambientes internos. Proporciona privacidade durante o dia, beleza estética e proteção solar. Personalização conforme preferência do cliente.'
    },
    {
        id: 5,
        titulo: 'Branding Comercial - Loja Varejo',
        categoria: 'predial',
        descricao: 'Adesivos com logo e película de proteção para fachada',
        area: '20 m²',
        data: 'Agosto 2024',
        tipo: 'Película com Branding',
        imagem: 'https://images.unsplash.com/photo-1562621838-a9f54b6a16e9?w=400&h=300&fit=crop',
        detalhes: 'Projeto integrado de branding com película de proteção solar. Adesivos vinil com logomarca da loja e elementos de design. Combina proteção solar com identidade visual forte.'
    },
    {
        id: 6,
        titulo: 'Frota Corporativa - 12 Veículos',
        categoria: 'automotivo',
        descricao: 'Proteção solar completa em frota de empresa logística',
        area: '30 m²',
        data: 'Julho 2024',
        tipo: 'Proteção Solar Corporativa',
        imagem: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
        detalhes: 'Projeto de frota corporativa com 12 veículos. Padronização de películas de proteção solar em todos os veículos. Manutenção programada e garantia empresarial por 3 anos.'
    },
    {
        id: 7,
        titulo: 'Proteção Solar - Casa Terrea',
        categoria: 'residencial',
        descricao: 'Redução de calor em 40% com película de proteção térmica',
        area: '25 m²',
        data: 'Junho 2024',
        tipo: 'Proteção Térmica Residencial',
        imagem: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop',
        detalhes: 'Instalação em casa térrea com foco na redução de calor. Película de proteção térmica com bloqueio infravermelhos. Economia mensal de até 20% em ar-condicionado.'
    },
    {
        id: 8,
        titulo: 'Película Espelhada - Prédio Executivo',
        categoria: 'predial',
        descricao: 'Acabamento espelhado com segurança e conforto térmico',
        area: '3.000 m²',
        data: 'Maio 2024',
        tipo: 'Película Espelhada Premium',
        imagem: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&h=300&fit=crop',
        detalhes: 'Prédio executivo com película espelhada de alta qualidade. Proporciona privacidade, proteção térmica e acabamento premium. Customização conforme projeto arquitetônico do prédio.'
    }
];

/**
 * DOMContentLoaded
 * Aguarda carregamento da página antes de executar scripts
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('Script de portfólio carregado com sucesso!');
    
    // Inicializar funcionalidades
    inicializarFiltros();
    inicializarModal();
});

// ========================================================================
// FUNCIONALIDADES DE FILTRO
// ========================================================================

/**
 * inicializarFiltros()
 * Configura event listeners nos botões de filtro
 * Adiciona o listener de click em cada botão
 */
function inicializarFiltros() {
    const botoesFiltro = document.querySelectorAll('.filtro-btn');
    
    /**
     * Iterar sobre cada botão de filtro
     * Adicionar listener de click
     */
    botoesFiltro.forEach(botao => {
        botao.addEventListener('click', function() {
            const categoria = this.getAttribute('data-filtro');
            
            // Remover classe active de todos os botões
            botoesFiltro.forEach(btn => btn.classList.remove('active'));
            
            // Adicionar classe active ao botão clicado
            this.classList.add('active');
            
            // Filtrar itens do portfólio
            filtrarPortfolio(categoria);
        });
    });
    
    console.log('Filtros inicializados: ' + botoesFiltro.length + ' botões');
}

/**
 * filtrarPortfolio(categoria)
 * Filtra itens do portfólio por categoria
 * 
 * @param {string} categoria - Categoria a filtrar ('todos', 'automotivo', 'predial', 'residencial')
 */
function filtrarPortfolio(categoria) {
    const items = document.querySelectorAll('.portfolio-item');
    
    /**
     * Iterar sobre cada item do portfólio
     * - Se categoria é 'todos', mostrar todos os itens
     * - Se categoria corresponde ao data-categoria do item, mostrar
     * - Caso contrário, ocultar
     */
    items.forEach(item => {
        const itemCategoria = item.getAttribute('data-categoria');
        
        if (categoria === 'todos' || itemCategoria === categoria) {
            item.classList.remove('hidden');
            // Pequena animação de entrada
            item.style.animation = 'none';
            setTimeout(() => {
                item.style.animation = 'slideUp 0.3s ease';
            }, 10);
        } else {
            item.classList.add('hidden');
        }
    });
    
    console.log('Filtrando por categoria: ' + categoria);
}

// ========================================================================
// FUNCIONALIDADES DE MODAL
// ========================================================================

/**
 * inicializarModal()
 * Configura event listeners para abrir e fechar modal
 * - Click nos botões "Ver Detalhes"
 * - Click no X de fechar
 * - Click fora do modal
 */
function inicializarModal() {
    const modal = document.getElementById('portfolioModal');
    const botoesDetalhes = document.querySelectorAll('.btn-portfolio-detalhes');
    const modalClose = document.querySelector('.modal-close');
    
    /**
     * Event: Click nos botões "Ver Detalhes"
     */
    botoesDetalhes.forEach(botao => {
        botao.addEventListener('click', function(e) {
            e.preventDefault();
            const projetoId = this.getAttribute('data-projeto');
            abrirModal(projetoId);
        });
    });
    
    /**
     * Event: Click no X de fechar
     */
    modalClose.addEventListener('click', fecharModal);
    
    /**
     * Event: Click fora do modal (no backdrop)
     */
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            fecharModal();
        }
    });
    
    /**
     * Event: Tecla ESC para fechar modal
     */
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            fecharModal();
        }
    });
    
    console.log('Modal inicializado: ' + botoesDetalhes.length + ' botões');
}

/**
 * abrirModal(projetoId)
 * Abre o modal com detalhes do projeto
 * 
 * @param {number|string} projetoId - ID do projeto a exibir
 */
function abrirModal(projetoId) {
    const modal = document.getElementById('portfolioModal');
    
    // Encontrar projeto nos dados
    const projeto = projetos.find(p => p.id === parseInt(projetoId));
    
    if (!projeto) {
        console.error('Projeto não encontrado:', projetoId);
        return;
    }
    
    // Preencher dados do modal
    document.getElementById('modalImg').src = projeto.imagem;
    document.getElementById('modalTitulo').textContent = projeto.titulo;
    document.getElementById('modalCategoria').textContent = projeto.categoria.charAt(0).toUpperCase() + projeto.categoria.slice(1);
    document.getElementById('modalCategoria').className = 'categoria-badge ' + projeto.categoria;
    document.getElementById('modalDescricao').textContent = projeto.descricao;
    document.getElementById('modalArea').textContent = projeto.area;
    document.getElementById('modalData').textContent = projeto.data;
    document.getElementById('modalTipo').textContent = projeto.tipo;
    document.getElementById('modalDetalhesCompletos').textContent = projeto.detalhes;
    
    // Exibir modal
    modal.classList.add('ativo');
    
    // Impedir scroll do body quando modal está aberto
    document.body.style.overflow = 'hidden';
    
    console.log('Modal aberto para projeto:', projeto.titulo);
}

/**
 * fecharModal()
 * Fecha o modal
 */
function fecharModal() {
    const modal = document.getElementById('portfolioModal');
    
    // Ocultar modal
    modal.classList.remove('ativo');
    
    // Permitir scroll do body novamente
    document.body.style.overflow = 'auto';
    
    console.log('Modal fechado');
}

// ========================================================================
// ANIMAÇÃO slideUp (referência)
// ========================================================================

/**
 * Nota: A animação slideUp está definida em portfolio.css
 * @keyframes slideUp {
 *     from {
 *         opacity: 0;
 *         transform: translateY(50px);
 *     }
 *     to {
 *         opacity: 1;
 *         transform: translateY(0);
 *     }
 * }
 */
