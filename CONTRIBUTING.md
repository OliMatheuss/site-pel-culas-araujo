# 🤝 Guia de Contribuição

Obrigado por considerar contribuir para o **Películas Araujo**! Este guia fornece diretrizes e instruções para contribuir com o projeto.

## 📋 Código de Conduta

Este projeto adota um Código de Conduta para garantir um ambiente respeitoso para todos. Espera-se que todos os contribuidores sigam este código.

### Nossas Expectativas

- Use linguagem acolhedora e inclusiva
- Seja respeitoso com pontos de vista e experiências diferentes
- Aceite críticas construtivas
- Concentre-se no que é melhor para a comunidade
- Mostre empatia com outros membros da comunidade

## 🚀 Como Contribuir

### 1. Reportar Bugs

Antes de criar um relatório de bug, verifique se o problema já foi relatado. Se você encontrar um bug, crie um issue com as seguintes informações:

- **Título claro e descritivo**
- **Descrição detalhada do comportamento observado**
- **Comportamento esperado**
- **Passos para reproduzir o problema**
- **Exemplos específicos para demonstrar as etapas**
- **Capturas de tela, se aplicável**
- **Seu ambiente**: Sistema operacional, navegador, versão do Python, etc.

### 2. Sugerir Melhorias

Melhorias são sempre bem-vindas! Para sugerir uma melhoria:

- Use um **título claro e descritivo**
- Forneça uma **descrição detalhada**
- Liste **exemplos específicos** para demonstrar a melhoria
- Descreva o **comportamento esperado**
- Explique por que essa melhoria seria útil

### 3. Submeter Pull Requests

Para submeter um Pull Request:

1. **Fork o repositório** e crie uma branch a partir de `main`:
   ```bash
   git checkout -b feature/MinhaFeature
   ```

2. **Siga os padrões de código** do projeto:
   - Python: PEP 8, docstrings para todas as funções
   - JavaScript: ESLint, JSDoc comments
   - CSS: Comments descritivos, variáveis CSS

3. **Adicione comentários** ao seu código:
   - Docstrings em funções Python
   - JSDoc em funções JavaScript
   - Comentários em seções complexas

4. **Escreva testes** para seu código (quando aplicável):
   - Para Python: use pytest
   - Para JavaScript: use Jest

5. **Mantenha o histórico do Git limpo**:
   - Use commits com mensagens claras
   - Combine commits relacionados
   - Formato: `feat: descrição` ou `fix: descrição`

6. **Atualize a documentação**:
   - README.md se necessário
   - Adicione comentários no código
   - Atualize este arquivo de contribução se necessário

7. **Push para sua fork**:
   ```bash
   git push origin feature/MinhaFeature
   ```

8. **Abra um Pull Request**:
   - Descreva as mudanças claramente
   - Referencie issues relacionados
   - Adicione screenshots se relevante

## 📝 Padrões de Código

### Python (Backend)

```python
#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
Descrição breve do módulo

Descrição mais longa se necessário.

Autor: Nome
Data: 2025
"""

def funcao_exemplo(param1: str, param2: int) -> str:
    """
    Descrição breve da função.
    
    Descrição mais longa se necessário.
    
    Args:
        param1 (str): Descrição do primeiro parâmetro
        param2 (int): Descrição do segundo parâmetro
    
    Returns:
        str: Descrição do retorno
    
    Raises:
        ValueError: Quando algo específico acontece
    """
    # Comentário explicativo
    resultado = f"{param1}_{param2}"
    return resultado
```

### JavaScript (Frontend)

```javascript
/**
 * @fileoverview Descrição breve do arquivo
 * 
 * Descrição mais longa se necessário.
 * 
 * @author Nome
 * @version 1.0.0
 * @date 2025
 */

/**
 * Descrição breve da função
 * 
 * @param {string} param1 - Descrição do primeiro parâmetro
 * @param {number} param2 - Descrição do segundo parâmetro
 * @returns {string} Descrição do retorno
 */
function funcaoExemplo(param1, param2) {
    // Comentário explicativo
    const resultado = `${param1}_${param2}`;
    return resultado;
}
```

### CSS

```css
/**
 * @fileoverview Descrição breve dos estilos
 * 
 * @author Nome
 * @version 1.0.0
 * @date 2025
 */

/**
 * Seção: Descrição dos estilos
 * Comentário explicativo
 */
.classe-exemplo {
    /* Propriedade com comentário */
    color: var(--fg);
    /* Outra propriedade */
    font-size: 1rem;
}
```

## 🔧 Configuração de Desenvolvimento

### Configurar Ambiente Local

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/site-peliculas-araujo.git
   cd site-peliculas-araujo
   ```

2. Configure o backend:
   ```bash
   python -m venv backend/.venv
   backend\.venv\Scripts\Activate.ps1
   pip install -r backend/requirements.txt
   ```

3. Configure o frontend:
   ```bash
   npm install
   ```

### Executar Testes

```bash
# Python
pytest backend/tests/

# JavaScript
npm test
```

### Executar a Aplicação

```bash
# Backend em um terminal
npm run backend:start

# Frontend em outro terminal
npm start
```

## 📚 Recursos Úteis

- [Documentação do Flask](https://flask.palletsprojects.com/)
- [MDN Web Docs](https://developer.mozilla.org/)
- [PEP 8 - Style Guide for Python](https://www.python.org/dev/peps/pep-0008/)
- [Google JavaScript Style Guide](https://google.github.io/styleguide/javascriptguide.html)

## ❓ Dúvidas?

- Abra uma [issue](https://github.com/seu-usuario/site-peliculas-araujo/issues)
- Entre em contato pelo email: contato@peliculasaraujo.com

## 📄 Licença

Ao contribuir, você concorda que suas contribuições serão licenciadas sob a Licença MIT.

---

**Obrigado por contribuir com Películas Araujo!** 🎬
