/**
 * =====================================================================
 * ADMIN.JS
 * =====================================================================
 * Funcionalidade do Admin Dashboard
 * - Gerenciamento de orçamentos
 * - Navegação entre seções
 * - CRUD operations
 * - Persistência com localStorage
 */

// ========================================================================
// DADOS - Simulando banco de dados com localStorage
// ========================================================================

/**
 * Estrutura de dados de orçamento
 * @type {Object}
 * id: string (único)
 * nome: string
 * telefone: string
 * email: string
 * tipo: string
 * mensagem: string
 * status: string (pendente, aprovado, rejeitado)
 * data: string (ISO format)
 */

/**
 * Carrega orçamentos do localStorage
 * @returns {Array} Array de orçamentos
 */
function carregarOrcamentos() {
    const dados = localStorage.getItem('orcamentos');
    return dados ? JSON.parse(dados) : [];
}

/**
 * Salva orçamentos no localStorage
 * @param {Array} orcamentos - Array de orçamentos
 */
function salvarOrcamentos(orcamentos) {
    localStorage.setItem('orcamentos', JSON.stringify(orcamentos));
    console.log('Orçamentos salvos:', orcamentos.length);
}

/**
 * Carrega configurações do localStorage
 * @returns {Object} Objeto com configurações
 */
function carregarConfigurações() {
    const dados = localStorage.getItem('config');
    return dados ? JSON.parse(dados) : {
        emailAdmin: 'admin@peliculasaraujo.com',
        telefonePrincipal: '(11) 9999-9999',
        enderecoEmpresa: 'São Paulo, SP',
        notificacaoEmail: true
    };
}

/**
 * Salva configurações no localStorage
 * @param {Object} config - Objeto com configurações
 */
function salvarConfigurações(config) {
    localStorage.setItem('config', JSON.stringify(config));
    console.log('Configurações salvas');
}

// ========================================================================
// INICIALIZAÇÃO
// ========================================================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('Admin Dashboard iniciado');
    
    // Inicializar funcionalidades
    inicializarNavegacao();
    inicializarEventos();
    carregarDashboard();
    carregarConfiguracoes();
    
    // Dados de exemplo (remover em produção)
    criarDadosExemplo();
});

// ========================================================================
// NAVEGAÇÃO
// ========================================================================

/**
 * inicializarNavegacao()
 * Configura os event listeners de navegação
 */
function inicializarNavegacao() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            const secao = this.getAttribute('data-section');
            
            // Remover classe active de todos
            navItems.forEach(ni => ni.classList.remove('active'));
            this.classList.add('active');
            
            // Ocultar todas as seções
            document.querySelectorAll('.section-content').forEach(sec => {
                sec.classList.remove('active');
            });
            
            // Mostrar seção selecionada
            const section = document.getElementById(secao);
            if (section) {
                section.classList.add('active');
                
                // Atualizar título
                const h2 = section.querySelector('h2');
                document.getElementById('pageTitle').textContent = h2 ? h2.textContent : 'Dashboard';
            }
            
            // Atualizar dados se necessário
            if (secao === 'orcamentos') {
                carregarOrcamentosTabela();
            }
            
            console.log('Navegação para:', secao);
        });
    });
}

// ========================================================================
// DASHBOARD
// ========================================================================

/**
 * carregarDashboard()
 * Carrega dados para o dashboard principal
 */
function carregarDashboard() {
    const orcamentos = carregarOrcamentos();
    
    // Calcular estatísticas
    const total = orcamentos.length;
    const abertos = orcamentos.filter(o => o.status === 'pendente').length;
    const aprovados = orcamentos.filter(o => o.status === 'aprovado').length;
    const rejeitados = orcamentos.filter(o => o.status === 'rejeitado').length;
    
    // Atualizar cards
    document.getElementById('totalOrcamentos').textContent = total;
    document.getElementById('orcamentosAbertos').textContent = abertos;
    document.getElementById('orcamentosAprovados').textContent = aprovados;
    document.getElementById('orcamentosRejeitados').textContent = rejeitados;
    
    // Mostrar últimos orçamentos
    mostrarUltimosOrcamentos(orcamentos);
    
    console.log('Dashboard carregado - Total:', total);
}

/**
 * mostrarUltimosOrcamentos(orcamentos)
 * Exibe os últimos 5 orçamentos no dashboard
 * @param {Array} orcamentos - Array de orçamentos
 */
function mostrarUltimosOrcamentos(orcamentos) {
    const container = document.getElementById('ultimosOrcamentos');
    
    if (orcamentos.length === 0) {
        container.innerHTML = '<p class="empty-state">Nenhum orçamento registrado</p>';
        return;
    }
    
    // Ordenar por data (mais recente primeiro)
    const recentes = orcamentos
        .sort((a, b) => new Date(b.data) - new Date(a.data))
        .slice(0, 5);
    
    container.innerHTML = recentes.map(orcamento => `
        <div class="orcamento-item" onclick="abrirModal('${orcamento.id}')">
            <div class="orcamento-header">
                <span class="orcamento-cliente">📋 ${orcamento.nome}</span>
                <span class="orcamento-status ${orcamento.status}">${formatarStatus(orcamento.status)}</span>
            </div>
            <div class="orcamento-info">
                <strong>Telefone:</strong> ${orcamento.telefone} | 
                <strong>Tipo:</strong> ${orcamento.tipo} | 
                <strong>Data:</strong> ${formatarData(orcamento.data)}
            </div>
        </div>
    `).join('');
}

// ========================================================================
// TABELA DE ORÇAMENTOS
// ========================================================================

/**
 * carregarOrcamentosTabela()
 * Carrega e exibe todos os orçamentos em tabela
 */
function carregarOrcamentosTabela() {
    const orcamentos = carregarOrcamentos();
    renderizarTabela(orcamentos);
}

/**
 * renderizarTabela(orcamentos)
 * Renderiza a tabela de orçamentos
 * @param {Array} orcamentos - Array de orçamentos a exibir
 */
function renderizarTabela(orcamentos) {
    const tbody = document.getElementById('tabelaOrcamentos');
    
    if (orcamentos.length === 0) {
        tbody.innerHTML = '<tr class="empty-row"><td colspan="8" class="empty-state">Nenhum orçamento encontrado</td></tr>';
        return;
    }
    
    tbody.innerHTML = orcamentos.map(orcamento => `
        <tr>
            <td>${orcamento.id.substring(0, 8)}</td>
            <td>${orcamento.nome}</td>
            <td>${orcamento.telefone}</td>
            <td>${orcamento.email || '-'}</td>
            <td>${orcamento.tipo}</td>
            <td><span class="orcamento-status ${orcamento.status}">${formatarStatus(orcamento.status)}</span></td>
            <td>${formatarData(orcamento.data)}</td>
            <td class="acoes-celula">
                <button class="btn-acao btn-ver" onclick="abrirModal('${orcamento.id}')">👁️ Ver</button>
                <button class="btn-acao btn-deletar" onclick="deletarOrcamento('${orcamento.id}')">🗑️ Del</button>
            </td>
        </tr>
    `).join('');
}

/**
 * formatarStatus(status)
 * Formata texto do status com emoji
 * @param {string} status - Status (pendente, aprovado, rejeitado)
 * @returns {string} Status formatado
 */
function formatarStatus(status) {
    const statusMap = {
        'pendente': '⏳ Pendente',
        'aprovado': '✅ Aprovado',
        'rejeitado': '❌ Rejeitado'
    };
    return statusMap[status] || status;
}

/**
 * formatarData(dataISO)
 * Formata data ISO para brasileiro
 * @param {string} dataISO - Data em formato ISO
 * @returns {string} Data formatada (DD/MM/YYYY)
 */
function formatarData(dataISO) {
    const data = new Date(dataISO);
    return data.toLocaleDateString('pt-BR');
}

// ========================================================================
// FILTROS
// ========================================================================

/**
 * inicializarEventos()
 * Configura event listeners de filtros e ações
 */
function inicializarEventos() {
    // Filtro por cliente
    document.getElementById('filtroCliente').addEventListener('input', aplicarFiltros);
    
    // Filtro por status
    document.getElementById('filtroStatus').addEventListener('change', aplicarFiltros);
    
    // Botão exportar
    document.getElementById('btnExportar').addEventListener('click', exportarOrcamentos);
    
    // Modal - close
    document.querySelector('.modal-close').addEventListener('click', fecharModal);
    
    // Modal - click fora
    document.getElementById('modalOrcamento').addEventListener('click', function(e) {
        if (e.target === this) fecharModal();
    });
    
    // Modal - atualizar status
    document.getElementById('btnAtualizarStatus').addEventListener('click', atualizarStatus);
    
    // Modal - enviar email
    document.getElementById('btnEnviarEmail').addEventListener('click', enviarEmail);
    
    // Modal - deletar
    document.getElementById('btnExcluir').addEventListener('click', function() {
        const id = document.getElementById('detalhesId').textContent;
        deletarOrcamento(id);
        fecharModal();
    });
    
    // Logout
    document.getElementById('btnLogout').addEventListener('click', logout);
    
    // Menu toggle mobile
    document.querySelector('.btn-menu-toggle').addEventListener('click', toggleSidebar);
    
    // Salvar configurações
    document.getElementById('btnSalvarConfig').addEventListener('click', salvarConfig);
}

/**
 * aplicarFiltros()
 * Aplica filtros na tabela de orçamentos
 */
function aplicarFiltros() {
    let orcamentos = carregarOrcamentos();
    
    const cliente = document.getElementById('filtroCliente').value.toLowerCase();
    const status = document.getElementById('filtroStatus').value;
    
    // Filtrar por cliente
    if (cliente) {
        orcamentos = orcamentos.filter(o => o.nome.toLowerCase().includes(cliente));
    }
    
    // Filtrar por status
    if (status) {
        orcamentos = orcamentos.filter(o => o.status === status);
    }
    
    renderizarTabela(orcamentos);
    console.log('Filtros aplicados - Resultados:', orcamentos.length);
}

/**
 * exportarOrcamentos()
 * Exporta orçamentos para CSV
 */
function exportarOrcamentos() {
    const orcamentos = carregarOrcamentos();
    
    if (orcamentos.length === 0) {
        alert('Nenhum orçamento para exportar');
        return;
    }
    
    // Criar CSV
    let csv = 'ID,Cliente,Telefone,Email,Tipo,Status,Data\n';
    orcamentos.forEach(o => {
        csv += `${o.id},"${o.nome}","${o.telefone}","${o.email}","${o.tipo}","${o.status}","${o.data}"\n`;
    });
    
    // Download
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `orcamentos_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    
    console.log('Orçamentos exportados:', orcamentos.length);
}

// ========================================================================
// MODAL
// ========================================================================

let orcamentoAtualId = null;

/**
 * abrirModal(id)
 * Abre modal com detalhes do orçamento
 * @param {string} id - ID do orçamento
 */
function abrirModal(id) {
    const orcamentos = carregarOrcamentos();
    const orcamento = orcamentos.find(o => o.id === id);
    
    if (!orcamento) {
        console.error('Orçamento não encontrado:', id);
        return;
    }
    
    orcamentoAtualId = id;
    
    // Preencher dados
    document.getElementById('detalhesId').textContent = id;
    document.getElementById('detalhesCliente').textContent = orcamento.nome;
    document.getElementById('detalhesTelefone').textContent = orcamento.telefone;
    document.getElementById('detalhesEmail').textContent = orcamento.email || '-';
    document.getElementById('detalhesTipo').textContent = orcamento.tipo;
    document.getElementById('detalhesMensagem').textContent = orcamento.mensagem;
    document.getElementById('detalhesData').textContent = formatarData(orcamento.data);
    document.getElementById('detalhesStatus').value = orcamento.status;
    
    // Mostrar modal
    document.getElementById('modalOrcamento').classList.add('ativo');
    
    console.log('Modal aberto para:', orcamento.nome);
}

/**
 * fecharModal()
 * Fecha o modal
 */
function fecharModal() {
    document.getElementById('modalOrcamento').classList.remove('ativo');
    orcamentoAtualId = null;
}

/**
 * atualizarStatus()
 * Atualiza status do orçamento
 */
function atualizarStatus() {
    if (!orcamentoAtualId) return;
    
    const novoStatus = document.getElementById('detalhesStatus').value;
    const orcamentos = carregarOrcamentos();
    
    const index = orcamentos.findIndex(o => o.id === orcamentoAtualId);
    if (index !== -1) {
        orcamentos[index].status = novoStatus;
        salvarOrcamentos(orcamentos);
        carregarDashboard();
        carregarOrcamentosTabela();
        alert('✅ Status atualizado com sucesso!');
        fecharModal();
        console.log('Status atualizado:', novoStatus);
    }
}

/**
 * deletarOrcamento(id)
 * Deleta um orçamento
 * @param {string} id - ID do orçamento
 */
function deletarOrcamento(id) {
    if (!confirm('Tem certeza que deseja deletar este orçamento?')) return;
    
    let orcamentos = carregarOrcamentos();
    orcamentos = orcamentos.filter(o => o.id !== id);
    
    salvarOrcamentos(orcamentos);
    carregarDashboard();
    carregarOrcamentosTabela();
    alert('✅ Orçamento deletado com sucesso!');
    console.log('Orçamento deletado:', id);
}

/**
 * enviarEmail()
 * Simula envio de email (em produção, integrar com backend)
 */
function enviarEmail() {
    const cliente = document.getElementById('detalhesCliente').textContent;
    const email = document.getElementById('detalhesEmail').textContent;
    
    if (email === '-') {
        alert('⚠️ Este orçamento não possui email');
        return;
    }
    
    alert(`📧 Email seria enviado para: ${email}\n\n(Em produção, integrar com backend)`);
    console.log('Email simulado para:', email);
}

// ========================================================================
// CONFIGURAÇÕES
// ========================================================================

/**
 * carregarConfiguracoes()
 * Carrega configurações no formulário
 */
function carregarConfiguracoes() {
    const config = carregarConfigurações();
    
    document.getElementById('emailAdmin').value = config.emailAdmin;
    document.getElementById('telefonePrincipal').value = config.telefonePrincipal;
    document.getElementById('enderecoEmpresa').value = config.enderecoEmpresa;
    document.getElementById('notificacaoEmail').checked = config.notificacaoEmail;
}

/**
 * salvarConfig()
 * Salva configurações
 */
function salvarConfig() {
    const config = {
        emailAdmin: document.getElementById('emailAdmin').value,
        telefonePrincipal: document.getElementById('telefonePrincipal').value,
        enderecoEmpresa: document.getElementById('enderecoEmpresa').value,
        notificacaoEmail: document.getElementById('notificacaoEmail').checked
    };
    
    salvarConfigurações(config);
    alert('✅ Configurações salvas com sucesso!');
    console.log('Configurações salvas');
}

// ========================================================================
// UTILITÁRIOS
// ========================================================================

/**
 * toggleSidebar()
 * Toggle sidebar em mobile
 */
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('aberto');
}

/**
 * logout()
 * Fazer logout
 */
function logout() {
    if (confirm('Tem certeza que deseja fazer logout?')) {
        alert('Logout realizado!');
        window.location.href = '../index.html';
    }
}

/**
 * criarDadosExemplo()
 * Cria dados de exemplo no primeiro acesso
 */
function criarDadosExemplo() {
    const orcamentos = carregarOrcamentos();
    
    // Se já temos dados, não criar novos
    if (orcamentos.length > 0) return;
    
    // Dados de exemplo
    const exemplos = [
        {
            id: 'OR0001',
            nome: 'João Silva',
            telefone: '(11) 98765-4321',
            email: 'joao@email.com',
            tipo: 'automotivo',
            mensagem: 'Gostaria de proteger os vidros do meu carro',
            status: 'pendente',
            data: new Date(Date.now() - 86400000).toISOString()
        },
        {
            id: 'OR0002',
            nome: 'Maria Santos',
            telefone: '(11) 91234-5678',
            email: 'maria@email.com',
            tipo: 'predial',
            mensagem: 'Preciso de película para meu escritório',
            status: 'aprovado',
            data: new Date(Date.now() - 172800000).toISOString()
        }
    ];
    
    salvarOrcamentos(exemplos);
    carregarDashboard();
}
