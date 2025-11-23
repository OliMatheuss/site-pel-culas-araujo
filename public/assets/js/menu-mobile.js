/**
 * =====================================================================
 * MENU-MOBILE.JS
 * =====================================================================
 * Funcionalidade do menu hambúrguer para dispositivos móveis
 * - Toggle (abrir/fechar) do menu
 * - Fechar ao clicar em um link
 * - Fechar ao redimensionar a tela
 */

/**
 * DOMContentLoaded
 * Aguarda carregamento da página antes de executar scripts
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('Script de menu mobile carregado!');
    
    // Inicializar hamburger menu
    inicializarMenuMobile();
});

/**
 * inicializarMenuMobile()
 * Configura os event listeners do menu hambúrguer
 */
function inicializarMenuMobile() {
    // Elementos do DOM
    const hamburger = document.querySelector('.hamburger-menu');
    const navbarMenu = document.querySelector('.navbar-menu');
    const links = document.querySelectorAll('.navbar-menu a');
    
    // Se não existir hamburger, retornar (não está em mobile)
    if (!hamburger) {
        console.log('Hamburger menu não encontrado - página desktop');
        return;
    }
    
    /**
     * Event: Click no botão hamburger
     * Toggle (abrir/fechar) o menu e o botão
     */
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('ativo');
        navbarMenu.classList.toggle('aberto');
        console.log('Menu toggled - estado:', hamburger.classList.contains('ativo') ? 'ABERTO' : 'FECHADO');
    });
    
    /**
     * Event: Click em um link do menu
     * Fechar menu após clicar em um link
     */
    links.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('ativo');
            navbarMenu.classList.remove('aberto');
            console.log('Link clicado - menu fechado');
        });
    });
    
    /**
     * Event: Redimensionamento da janela
     * Fechar menu se tela for redimensionada para desktop
     */
    window.addEventListener('resize', function() {
        // Se largura > 768px, fechar menu
        if (window.innerWidth > 768) {
            hamburger.classList.remove('ativo');
            navbarMenu.classList.remove('aberto');
            console.log('Tela redimensionada para desktop - menu fechado');
        }
    });
    
    /**
     * Event: Click fora do menu
     * Fechar menu se clicar fora dele
     */
    document.addEventListener('click', function(e) {
        const navbar = document.querySelector('.navbar');
        
        // Se o clique não for dentro da navbar e o menu estiver aberto
        if (!navbar.contains(e.target) && hamburger.classList.contains('ativo')) {
            hamburger.classList.remove('ativo');
            navbarMenu.classList.remove('aberto');
            console.log('Click fora - menu fechado');
        }
    });
    
    console.log('Menu mobile inicializado com sucesso!');
}
