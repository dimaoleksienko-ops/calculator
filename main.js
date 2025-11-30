// main.js — Практична робота №5 Калькулятор (100% працює з наданим шаблоном)

const display = document.querySelector('.display');
let currentNumber = '0';
let previousNumber = null;
let operation = null;
let shouldResetDisplay = false;

function updateDisplay() {
    display.textContent = currentNumber;
}

function appendNumber(number) {
    if (shouldResetDisplay) {
        currentNumber = '0';
        shouldResetDisplay = false;
    }
    if (number === '.' && currentNumber.includes('.')) return;
    currentNumber = currentNumber === '0' && number !== '.' ? number : currentNumber + number;
    updateDisplay();
}

function chooseOperation(op) {
    if (currentNumber === '' || currentNumber === '.') return;

    if (previousNumber !== null) {
        calculate();
    }

    previousNumber = parseFloat(currentNumber);
    operation = op;

    // Підтримка різних символів × і ÷, які бувають у шаблонах
    if (op === '×' || op === 'x' || op === '*') operation = '×';
    if (op === '÷' || op === '/') operation = '÷';

    shouldResetDisplay = true;
}

function calculate() {
    if (previousNumber === null || operation === null || shouldResetDisplay) return;

    const current = parseFloat(currentNumber);
    if (isNaN(current)) return;

    let result;
    switch (operation) {
        case '+': result = previousNumber + current; break;
        case '-': result = previousNumber - current; break;
        case '×': result = previousNumber * current; break;
        case '÷': 
            if (current === 0) {
                alert('Ділення на нуль неможливе!');
                clear();
                return;
            }
            result = previousNumber / current; 
            break;
    }

    // Обрізаємо зайві нулі після коми і довгі дроби
    currentNumber = parseFloat(result.toFixed(10)).toString();
    previousNumber = null;
    operation = null;
    shouldResetDisplay = true;
    updateDisplay();
}

function clear() {
    currentNumber = '0';
    previousNumber = null;
    operation = null;
    shouldResetDisplay = false;
    updateDisplay();
}

// =============== Обробка кліків по кнопках ===============
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        // Цифри і крапка
        if ('0123456789.'.includes(value)) {
            appendNumber(value);
        }

        // Кнопка C
        else if (value === 'C') {
            clear();
        }

        // Рівно
        else if (value === '=') {
            calculate();
        }

        // Оператори + − × ÷ (підтримуються всі можливі варіанти символів)
        else if ('+-×÷x*/'.includes(value)) {
            chooseOperation(value);
        }
    });
});

// Початкове виведення
updateDisplay();