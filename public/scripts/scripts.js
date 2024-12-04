let activeInput = null;

// Add event listeners to track focus or click on input elements
document.querySelectorAll('input[type="text"]').forEach(input => {
    input.addEventListener('focus', () => {
        activeInput = input;
    });
    input.addEventListener('click', () => {
        activeInput = input;
    });
});

document.getElementById('superButton').addEventListener('click', () => {
    if (activeInput) {
        transformLastCharacter(activeInput, 'sup');
    }
});

document.getElementById('subButton').addEventListener('click', () => {
    if (activeInput) {
        transformLastCharacter(activeInput, 'sub');
    }
});

function transformLastCharacter(inputElement, type) {
    let text = inputElement.value;

    if (text.length === 0) return; // If no text, do nothing

    const lastChar = text.slice(-1);

    if (!/[0-9+\-]/.test(lastChar)) return; // Only transform numbers, +, or -

    let transformedChar;

    if (type === 'sup') {
        transformedChar = convertToSuperscript(lastChar);
    } else if (type === 'sub') {
        transformedChar = convertToSubscript(lastChar);
    }

    // Replace last character with its transformed version
    inputElement.value = text.slice(0, -1) + transformedChar;
}

function convertToSuperscript(char) {
    const superscriptMap = {
        '0': '⁰', '1': '¹', '2': '²', '3': '³',
        '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷',
        '8': '⁸', '9': '⁹', '+': '⁺', '-': '⁻'
    };
    return superscriptMap[char] || char; // Default to char if not in map
}

function convertToSubscript(char) {
    const subscriptMap = {
        '0': '₀', '1': '₁', '2': '₂', '3': '₃',
        '4': '₄', '5': '₅', '6': '₆', '7': '₇',
        '8': '₈', '9': '₉'
    };
    return subscriptMap[char] || char; // Default to char if not in map
}
