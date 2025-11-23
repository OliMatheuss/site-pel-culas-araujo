/**
 * @fileoverview Script principal da aplicação frontend - Películas Araujo
 * 
 * Este script é responsável pela lógica do lado do cliente.
 * Inclui inicialização da página, manipulação do DOM e comunicação com a API.
 * 
 * @author Equipe Películas Araujo
 * @version 1.0.0
 * @date 2025
 */

// ============================================================================
// INICIALIZAÇÃO
// ============================================================================

/**
 * Log de inicialização - confirma que o script foi carregado
 * Útil para debugging e verificar se o JS está funcionando
 */
console.log('Películas Araujo - script inicial');

/**
 * Obtém referência ao elemento principal da aplicação
 * Este é o container onde o conteúdo dinâmico será inserido
 * @type {HTMLElement}
 */
const app = document.getElementById('app');

/**
 * Insere mensagem de boas-vindas no elemento app
 * insertAdjacentHTML permite inserir HTML sem sobrescrever o conteúdo existente
 * 'beforeend' insere antes do fechamento da tag (como último filho)
 */
app.insertAdjacentHTML('beforeend','<p>Projetinho pronto para desenvolvimento.</p>');
