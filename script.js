// Elementos do DOM
const inputN = document.getElementById('input-n');
const calculateBtn = document.getElementById('calculate-btn');
const returnBtn = document.getElementById('return-btn');
const resultSection = document.getElementById('result-section');
const resultContent = document.getElementById('result-content');
const themeAudio = document.getElementById('theme-audio');
const playAudioBtn = document.getElementById('play-audio');
const pauseAudioBtn = document.getElementById('pause-audio');

// Controles de áudio
playAudioBtn.addEventListener('click', () => {
  themeAudio.play();
});

pauseAudioBtn.addEventListener('click', () => {
  themeAudio.pause();
});

// Função para gerar sequência de Fibonacci até posição n
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

// Função para filtrar números pares
function filterEvens(sequence) {
  return sequence.filter(num => num % 2 === 0);
}

// Função para calcular MDC (Máximo Divisor Comum)
function gcd(a, b) {
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

// Função para calcular MMC (Mínimo Múltiplo Comum) entre dois números
function lcm(a, b) {
  if (a === 0 || b === 0) return 0;
  return Math.abs(a * b) / gcd(a, b);
}

// Função para calcular MMC de um array de números
function lcmArray(numbers) {
  // Remove o zero do cálculo
  const filteredNumbers = numbers.filter(n => n !== 0);

  if (filteredNumbers.length === 0) return 0;
  if (filteredNumbers.length === 1) return filteredNumbers[0];

  let result = filteredNumbers[0];

  for (let i = 1; i < filteredNumbers.length; i++) {
    result = lcm(result, filteredNumbers[i]);
  }

  return result;
}

// Função principal do desafio
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

// Função para exibir o resultado com animação
function displayResult(n, result) {
  resultContent.innerHTML = '';

  // Passo 1: Sequência de Fibonacci gerada
  const step1 = document.createElement('div');
  step1.className = 'calculation-step';
  step1.innerHTML = `
        <h3>🔢 Passo 1: Sequência de Fibonacci até posição ${n}</h3>
        <p>Gerando a sequência: F(0), F(1), F(2), ..., F(${n - 1})</p>
        <div class="sequence-display">
            ${result.sequence.map((num, idx) => `<span class="fib-number">F(${idx}) = ${num}</span>`).join('')}
        </div>
    `;
  resultContent.appendChild(step1);

  // Passo 2: Filtragem dos números pares
  const step2 = document.createElement('div');
  step2.className = 'calculation-step';
  step2.innerHTML = `
        <h3>👁️ Passo 2: Números Pares Vigiados</h3>
        <p>Filtrando apenas os números pares (divisíveis por 2) da sequência:</p>
        <div class="sequence-display">
            ${result.evens.map(num => `<span class="fib-number even">${num}</span>`).join('')}
        </div>
        <p style="margin-top: 0.5rem; font-size: 0.85rem; color: #00ff55;">
            ✓ ${result.evens.length} número(s) par(es) encontrado(s)
        </p>
    `;
  resultContent.appendChild(step2);

  // Passo 3: Cálculo do MMC
  const numbersForMmc = result.evens.filter(n => n !== 0);
  const step3 = document.createElement('div');
  step3.className = 'calculation-step';

  let mmcExplanation = '';
  if (numbersForMmc.length === 0) {
    mmcExplanation = '<p>Nenhum número válido para cálculo do MMC (todos são zero).</p>';
  } else if (numbersForMmc.length === 1) {
    mmcExplanation = `<p>Apenas um número para o cálculo: MMC = ${numbersForMmc[0]}</p>`;
  } else {
    mmcExplanation = `
            <p>Calculando MMC entre: ${numbersForMmc.join(', ')}</p>
            <p style="margin-top: 0.5rem; font-size: 0.85rem;">
                MMC(${numbersForMmc.join(', ')}) = ${result.mmc}
            </p>
            <p style="margin-top: 0.5rem; font-size: 0.8rem; color: #ffcccc;">
                O MMC é o menor número positivo que é múltiplo de todos os números dados.
            </p>
        `;
  }

  step3.innerHTML = `
        <h3>🔮 Passo 3: Magia do Cálculo MMC</h3>
        ${mmcExplanation}
    `;
  resultContent.appendChild(step3);

  // Resultado final em grid
  const finalGrid = document.createElement('div');
  finalGrid.className = 'results-grid';
  finalGrid.innerHTML = `
        <div class="result-card">
            <h4>📋 Pares da Sequência</h4>
            <div class="value">[${result.evens.join(', ')}]</div>
        </div>
        <div class="result-card">
            <h4>✨ MMC dos Pares</h4>
            <div class="value">${result.mmc}</div>
        </div>
    `;
  resultContent.appendChild(finalGrid);

  // Mensagem de sucesso
  const successMsg = document.createElement('div');
  successMsg.className = 'final-result';
  successMsg.innerHTML = `
        <h3>🎯 Fuga Concluída!</h3>
        <p style="margin-top: 0.5rem; font-size: 0.9rem; color: #ffcccc;">
            O herói decifrou os segredos dos ${result.evens.length} olhos vigilantes!
        </p>
    `;
  resultContent.appendChild(successMsg);

  // Mostra a seção de resultado
  resultSection.classList.add('active');

  // Scroll suave até o resultado
  setTimeout(() => {
    resultSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, 100);
}

// Event listener para o botão CALCULAR
calculateBtn.addEventListener('click', () => {
  const n = parseInt(inputN.value);

  // Validação
  if (!n || n <= 0) {
    alert('⚠️ Por favor, insira um número inteiro positivo válido!');
    return;
  }

  if (n > 50) {
    alert('⚠️ Por questões de desempenho, escolha um número até 50.');
    return;
  }

  // Executa o desafio
  const result = heroicEscapePlus(n);

  // Exibe o resultado
  displayResult(n, result);
});

// Event listener para o botão RETORNAR
returnBtn.addEventListener('click', () => {
  // Limpa o input
  inputN.value = '';

  // Esconde a seção de resultado
  resultSection.classList.remove('active');

  // Scroll de volta ao topo do container
  document.querySelector('.container').scrollTop = 0;
});

// Permitir calcular ao pressionar Enter no input
inputN.addEventListener('keypress', e => {
  if (e.key === 'Enter') {
    calculateBtn.click();
  }
});
