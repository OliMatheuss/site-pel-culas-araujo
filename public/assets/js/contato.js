/**
 * =====================================================================
 * CONTATO.JS
 * =====================================================================
 * Funcionalidade do formulário de contato
 * - Validação de campos
 * - Envio para backend API
 * - Feedback visual (sucesso/erro)
 * - Limpeza de formulário após envio
 */

/**
 * DOMContentLoaded
 * Aguarda carregamento da página antes de executar scripts
 * - Evita erro se DOM ainda não estiver pronto
 */
document.addEventListener('DOMContentLoaded', function() {
    
    // ====================================================================
    // ELEMENTOS DO DOM
    // ====================================================================
    
    /**
     * form - Formulário de orçamento
     * @type {HTMLFormElement}
     */
    const form = document.getElementById('orcamentoForm');
    
    /**
     * mensagemFeedback - Container para mensagens de sucesso/erro
     * @type {HTMLElement}
     */
    const mensagemFeedback = document.getElementById('mensagemFeedback');
    
    /**
     * inputNome - Campo de nome
     * @type {HTMLInputElement}
     */
    const inputNome = document.getElementById('nome');
    
    /**
     * inputTelefone - Campo de telefone
     * @type {HTMLInputElement}
     */
    const inputTelefone = document.getElementById('telefone');

    // ====================================================================
    // EVENTOS
    // ====================================================================

    /**
     * Listener: submit do formulário
     * Intercepta o envio, valida e envia para API
     * 
     * @event submit
     * @param {Event} e - Evento de submit
     */
    form.addEventListener('submit', async function(e) {
        e.preventDefault(); // Impede envio padrão (recarregar página)

        // Validação básica - verificar campos obrigatórios
        if (!validarFormulario()) {
            mostrarFeedback('Por favor, preencha todos os campos obrigatórios', 'erro');
            return;
        }

        // Coletar dados do formulário
        const dados = {
            nome: inputNome.value.trim(),
            telefone: inputTelefone.value.trim(),
            email: document.getElementById('email').value.trim(),
            tipo: document.getElementById('tipo').value,
            mensagem: document.getElementById('mensagem').value.trim()
        };

        // Enviar para backend
        await enviarOrcamento(dados);
    });

    // ====================================================================
    // FUNÇÕES
    // ====================================================================

    /**
     * validarFormulario()
     * Valida campos obrigatórios do formulário
     * 
     * @returns {boolean} true se válido, false caso contrário
     */
    function validarFormulario() {
        const nome = inputNome.value.trim();
        const telefone = inputTelefone.value.trim();
        const tipo = document.getElementById('tipo').value;
        const mensagem = document.getElementById('mensagem').value.trim();

        // Verificações
        if (!nome) {
            console.warn('Campo nome vazio');
            return false;
        }
        if (!telefone) {
            console.warn('Campo telefone vazio');
            return false;
        }
        if (!tipo) {
            console.warn('Campo tipo não selecionado');
            return false;
        }
        if (!mensagem) {
            console.warn('Campo mensagem vazio');
            return false;
        }

        // Nome deve ter pelo menos 3 caracteres
        if (nome.length < 3) {
            console.warn('Nome muito curto');
            return false;
        }

        // Telefone deve ter pelo menos 8 dígitos (sem formatação)
        const telefoneLimpo = telefone.replace(/\D/g, '');
        if (telefoneLimpo.length < 8) {
            console.warn('Telefone com poucos dígitos');
            return false;
        }

        return true;
    }

    /**
     * enviarOrcamento(dados)
     * Envia dados do formulário para API do backend
     * 
     * @async
     * @param {Object} dados - Dados do formulário
     * @param {string} dados.nome - Nome do cliente
     * @param {string} dados.telefone - Telefone do cliente
     * @param {string} dados.email - Email do cliente
     * @param {string} dados.tipo - Tipo de serviço
     * @param {string} dados.mensagem - Mensagem/detalhes do cliente
     */
    async function enviarOrcamento(dados) {
        try {
            console.log('Enviando orçamento:', dados);

            // URL da API - ajustar conforme necessário
            const urlAPI = 'http://localhost:5000/api/orcamento';

            /**
             * Realizar requisição POST
             * Headers: Content-Type application/json (JSON)
             * Body: dados do formulário em formato JSON
             */
            const response = await fetch(urlAPI, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dados)
            });

            // Verificar status da resposta
            if (response.ok) {
                /**
                 * Sucesso (status 200-299)
                 * - Limpar formulário
                 * - Mostrar mensagem de sucesso
                 * - Log no console
                 */
                console.log('Orçamento enviado com sucesso!');
                
                const resultado = await response.json();
                console.log('Resposta da API:', resultado);
                
                // Limpar campos do formulário
                form.reset();
                inputNome.focus();
                
                // Mostrar feedback positivo
                mostrarFeedback('✓ Orçamento enviado com sucesso! Entraremos em contato em breve.', 'sucesso');

                // Esconder mensagem após 5 segundos
                setTimeout(() => {
                    mensagemFeedback.style.display = 'none';
                }, 5000);

            } else {
                /**
                 * Erro HTTP (status 400-599)
                 * - Extrair mensagem de erro da resposta
                 * - Mostrar mensagem de erro
                 * - Log no console
                 */
                console.error('Erro ao enviar orçamento:', response.status, response.statusText);
                
                const resultado = await response.json();
                const mensagem = resultado.erro || 'Erro ao enviar orçamento. Tente novamente.';
                
                mostrarFeedback('✗ ' + mensagem, 'erro');
            }

        } catch (erro) {
            /**
             * Erro de conexão ou parsing
             * - Não conseguiu conectar à API
             * - Erro ao fazer parse JSON
             * - Erro geral da aplicação
             */
            console.error('Erro na requisição:', erro);

            // Se API não está rodando, sugerir alternativa
            if (erro.message.includes('Failed to fetch')) {
                mostrarFeedback(
                    '✗ Erro de conexão. Por favor, entre em contato pelo telefone: (11) 9999-9999',
                    'erro'
                );
            } else {
                mostrarFeedback('✗ Erro ao processar sua solicitação. Tente novamente.', 'erro');
            }
        }
    }

    /**
     * mostrarFeedback(mensagem, tipo)
     * Exibe mensagem de feedback (sucesso ou erro)
     * 
     * @param {string} mensagem - Texto da mensagem a exibir
     * @param {string} tipo - Tipo de feedback: 'sucesso' ou 'erro'
     */
    function mostrarFeedback(mensagem, tipo) {
        // Limpar classes anteriores
        mensagemFeedback.className = '';
        
        // Adicionar classe de tipo
        mensagemFeedback.classList.add(tipo);
        
        // Inserir mensagem
        mensagemFeedback.textContent = mensagem;
        
        // Fazer scroll até a mensagem
        mensagemFeedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        console.log(`[${tipo.toUpperCase()}] ${mensagem}`);
    }

    // ====================================================================
    // INICIALIZAÇÃO
    // ====================================================================
    
    console.log('Script de contato carregado com sucesso!');
});
