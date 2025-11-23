/**
 * @fileoverview Script de funcionalidade da página Catálogo
 * 
 * Implementa filtragem de produtos por categoria
 * 
 * @author Equipe Películas Araujo
 * @version 1.0.0
 * @date 2025
 */

// Aguarda o DOM estar carregado
document.addEventListener('DOMContentLoaded', function() {
    console.log('Catálogo carregado');
    
    // Obtém todos os botões de filtro
    const filtros = document.querySelectorAll('.filtro-btn');
    // Obtém todos os cards de produtos
    const produtos = document.querySelectorAll('.produto-card');
    
    /**
     * Adiciona evento de clique a cada botão de filtro
     */
    filtros.forEach(botao => {
        botao.addEventListener('click', function() {
            // Obtém a categoria do botão clicado
            const categoria = this.getAttribute('data-filtro');
            
            // Remove classe 'active' de todos os botões
            filtros.forEach(btn => btn.classList.remove('active'));
            
            // Adiciona classe 'active' ao botão clicado
            this.classList.add('active');
            
            // Filtra os produtos
            filtrarProdutos(categoria);
        });
    });
    
    /**
     * Função para filtrar produtos por categoria
     * 
     * @param {string} categoria - Categoria selecionada
     */
    function filtrarProdutos(categoria) {
        produtos.forEach(produto => {
            // Obtém a categoria do produto
            const produtoCategoria = produto.getAttribute('data-categoria');
            
            // Se a categoria é 'todas' ou corresponde, mostra o produto
            if (categoria === 'todas' || produtoCategoria === categoria) {
                produto.style.display = 'block';
                // Pequeno delay para animação
                setTimeout(() => {
                    produto.style.opacity = '1';
                }, 10);
            } else {
                produto.style.display = 'none';
            }
        });
    }
});
