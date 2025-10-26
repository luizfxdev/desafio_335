# 🧿 Labirinto Vigilante de Fibonacci

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Fibonacci](https://img.shields.io/badge/Fibonacci-Sequence-ff2400?style=for-the-badge)
![Math](https://img.shields.io/badge/Math-Algorithm-00ff55?style=for-the-badge)

> *"Em meio ao corredor infinito, apenas a matemática pode libertar o herói dos olhos vigilantes."*

## 📖 Descrição do Desafio

Em meio a um corredor infinito, o herói está cercado por olhos enigmáticos e criaturas sobrenaturais — preso em um ciclo de repetição, onde cada avanço ecoa pelas paredes do desconhecido. A cada passo de Fibonacci, a vigília silenciosa dos olhos apenas aumenta, tornando a jornada cada vez mais claustrofóbica e numericamente complicada.

Para escapar deste ciclo hipnótico, seu herói precisa decifrar os segredos dos números pares da sequência, enquanto uma nova camada de magia numérica é adicionada: o confronto do mínimo múltiplo comum (mmc) dos pares encontrados. A única chave para a saída está em desvendar a ordem, encontrar padrões e calcular grandezas ocultas sob vigilância constante.

### Desafio: `heroicEscapePlus(n)`

1. **Colete os pares vigiados**: Gere a sequência de Fibonacci até a posição n e filtre apenas os números pares (inclui o zero).
2. **Magia do Cálculo MMC**: Se encontrar ao menos dois números pares na lista, calcule o mínimo múltiplo comum (mmc) entre eles. Este será o número que ajudará o herói a despistar todos os olhos vigias do labirinto numérico.

## 🎵 Trilha Sonora

Este desafio foi desenvolvido ao som de **Hellraiser Theme - Christopher Young**, criando a atmosfera perfeita de mistério e tensão.

## 🎯 Exemplos de Entrada e Saída

### Exemplo 1
```javascript
heroicEscapePlus(10)
// Entrada: 10
// Sequência: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
// Pares: [0, 2, 8, 34]
// MMC: 136
```

### Exemplo 2
```javascript
heroicEscapePlus(15)
// Entrada: 15
// Sequência: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377]
// Pares: [0, 2, 8, 34, 144]
// MMC: 408
```

### Exemplo 3
```javascript
heroicEscapePlus(5)
// Entrada: 5
// Sequência: [0, 1, 1, 2, 3]
// Pares: [0, 2]
// MMC: 2
```

### Exemplo 4
```javascript
heroicEscapePlus(20)
// Entrada: 20
// Sequência: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181]
// Pares: [0, 2, 8, 34, 144, 610, 2584]
// MMC: 39672
```

### Exemplo 5
```javascript
heroicEscapePlus(12)
// Entrada: 12
// Sequência: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89]
// Pares: [0, 2, 8, 34]
// MMC: 136
```

## 💻 Função Principal

A solução do desafio é implementada através da função `heroicEscapePlus(n)`:

```javascript
function heroicEscapePlus(n) {
    // Gera a sequência de Fibonacci
    const fibSequence = generateFibonacci(n);
    
    // Filtra os números pares
    const evenNumbers = filterEvens(fibSequence);
    
    // Calcula o MMC (excluindo zero)
    const mmcResult = lcmArray(evenNumbers);
    
    return {
        sequence: fibSequence,
        evens: evenNumbers,
        mmc: mmcResult
    };
}
```

## 🔧 Lógica Técnica de Solução

### 1. Geração da Sequência de Fibonacci
```javascript
function generateFibonacci(n) {
    if (n <= 0) return [];
    if (n === 1) return [0];
    
    const sequence = [0, 1];
    
    for (let i = 2; i < n; i++) {
        const nextNum = sequence[i - 1] + sequence[i - 2];
        sequence.push(nextNum);
    }
    
    return sequence;
}
```
**Complexidade**: O(n) tempo, O(n) espaço
- Utiliza abordagem iterativa para evitar overhead de recursão
- Pré-aloca array base com [0, 1] para otimização
- Cada novo termo é a soma dos dois anteriores: F(n) = F(n-1) + F(n-2)

### 2. Filtragem de Números Pares
```javascript
function filterEvens(sequence) {
    return sequence.filter(num => num % 2 === 0);
}
```
**Complexidade**: O(n) tempo, O(k) espaço (onde k é o número de pares)
- Utiliza operador módulo (%) para verificar divisibilidade por 2
- Padrão na sequência de Fibonacci: todo terceiro número é par

### 3. Cálculo do MDC (Máximo Divisor Comum)
```javascript
function gcd(a, b) {
    while (b !== 0) {
        const temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}
```
**Complexidade**: O(log min(a, b))
- Implementa o **Algoritmo de Euclides**
- Base matemática: gcd(a, b) = gcd(b, a mod b)
- Eficiente para números grandes

### 4. Cálculo do MMC (Mínimo Múltiplo Comum)
```javascript
function lcm(a, b) {
    if (a === 0 || b === 0) return 0;
    return Math.abs(a * b) / gcd(a, b);
}
```
**Fórmula**: MMC(a, b) = |a × b| / MDC(a, b)
- Evita overflow usando divisão antes da multiplicação completa
- Trata casos especiais (zero)

### 5. MMC de Array
```javascript
function lcmArray(numbers) {
    const filteredNumbers = numbers.filter(n => n !== 0);
    
    if (filteredNumbers.length === 0) return 0;
    if (filteredNumbers.length === 1) return filteredNumbers[0];
    
    let result = filteredNumbers[0];
    
    for (let i = 1; i < filteredNumbers.length; i++) {
        result = lcm(result, filteredNumbers[i]);
    }
    
    return result;
}
```
**Complexidade**: O(n × log max(numbers))
- Aplica propriedade associativa: MMC(a, b, c) = MMC(MMC(a, b), c)
- Remove zeros para evitar resultado trivial
- Redução progressiva (fold) do array

## 🚀 Aplicações em Projetos Reais

### 1. **Sistemas de Agendamento e Sincronização**
- Calcular períodos de repetição de eventos
- Sincronizar ciclos de diferentes processos
- Determinar próximos momentos de encontro de tarefas periódicas

### 2. **Engenharia de Áudio/Vídeo**
- Sincronização de frames com diferentes taxas de atualização
- Cálculo de buffers para streaming
- Alinhamento de ondas sonoras em diferentes frequências

### 3. **Sistemas de Pagamento Recorrente**
- Calcular quando múltiplas assinaturas coincidem
- Otimizar processamento batch de cobranças
- Prever ciclos de faturamento comum

### 4. **Otimização de Recursos**
- Escalonamento de tarefas periódicas em servidores
- Cálculo de ciclos de manutenção preventiva
- Gerenciamento de inventário com reposições periódicas

### 5. **Criptografia e Segurança**
- Geração de padrões para chaves criptográficas
- Análise de periodicidade em sistemas de hash
- Implementação de algoritmos de embaralhamento

### 6. **Análise de Dados Financeiros**
- Identificação de padrões em séries temporais
- Análise de ciclos econômicos
- Previsão baseada em sequências matemáticas

## 🎨 Características do Projeto

- ✨ Interface temática com animações customizadas
- 🎵 Controles de áudio integrados
- 📱 Design totalmente responsivo
- 🔢 Cálculos matemáticos precisos
- 📊 Visualização passo a passo do algoritmo
- 🎯 Validação de entrada em tempo real

## 📦 Estrutura do Projeto

```
projeto/
├── index.html          # Interface principal
├── styles.css          # Estilos e animações
├── script.js           # Lógica do desafio
└── assets/
    ├── background.mp4  # Vídeo de fundo
    └── theme.mp3       # Trilha sonora
```

## 🛠️ Como Usar

1. Clone o repositório:
```bash
git clone https://github.com/luizfxdev/desafio_335.git
```

2. Adicione os arquivos de mídia na pasta `assets/`:
   - `background.mp4` - Vídeo de fundo
   - `theme.mp3` - Música tema (Hellraiser Theme)

3. Abra o arquivo `index.html` em seu navegador

4. Digite um número inteiro positivo (recomendado: 1-50)

5. Clique em **CALCULAR** para ver a magia acontecer!

## 🧮 Complexidade Computacional

| Operação | Complexidade de Tempo | Complexidade de Espaço |
|----------|----------------------|------------------------|
| Geração Fibonacci | O(n) | O(n) |
| Filtragem Pares | O(n) | O(k) |
| Cálculo MDC | O(log min(a,b)) | O(1) |
| Cálculo MMC Array | O(k × log max) | O(1) |
| **Total** | **O(n + k × log max)** | **O(n)** |

*Onde: n = posição na sequência, k = quantidade de números pares, max = maior número par*

## 🎓 Conceitos Matemáticos Aplicados

- **Sequência de Fibonacci**: F(n) = F(n-1) + F(n-2)
- **Algoritmo de Euclides**: Para cálculo eficiente do MDC
- **Propriedade do MMC**: MMC(a,b) × MDC(a,b) = a × b
- **Teoria dos Números**: Relações entre divisibilidade e múltiplos

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para:
- 🐛 Reportar bugs
- 💡 Sugerir novas features
- 🔧 Enviar pull requests
- ⭐ Dar uma estrela no projeto

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

---

## 👨‍💻 Autor

**Luiz Felipe de Oliveira**

- GitHub: [@luizfxdev](https://github.com/luizfxdev)
- Linkedin: [in/luizfxdev](https://www.linkedin.com/in/luizfxdev)
- Portfólio: [luizfxdev.com.br](https://luizfxdev.com.br)

---

⭐ Se este projeto te ajudou, considere dar uma estrela no repositório!

🔗 **Repositório**: [github.com/luizfxdev/desafio_335](https://github.com/luizfxdev/desafio_335)

***Não tem como voltar atrás. Assim que um limite é ultrapassado, tudo o que resta é buscar novos limites.*** (Hellraiser)
