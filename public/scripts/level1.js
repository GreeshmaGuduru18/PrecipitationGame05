<<<<<<< HEAD
var quest
const questionsDiv = document.getElementById('questions');
document.addEventListener('DOMContentLoaded', async function () {
        const questions = await fetch('/api/getQuestions?level=1', {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            },
        }).then((res) => res.json())
        console.log("Questions -> ",questions.quest);
        if(questions.quest){
            quest = questions.quest;
            questionsDiv.innerHTML = "";
            quest.forEach(async (item, index) => {
               // console.log(item, item.questionText)
                let template = `<div class="question-container" id=${item.questionNumber} data-correct-option=${item.correctOption}>
                    <div class="set ${item.set == 1 ? "set-1" : "set-2"}">
                        ${item.set == 1 ? "Set 1" : "Set 2"}
                    </div>
                    <h3 class="questIndex">${index+1}</h3>
                    <div class="question">
                        ${item.questionText}
                    </div>
                    <div class="options">`;
            
                item.options.forEach((opt, index) => {
                    const isCorrect = (index + 1) == parseInt(item.correctOption);
                    template += `<button class="option" onclick="checkAnswer(this, '${opt}', ${isCorrect})">${opt}</button>`;
                });
            
                template += `</div>
                            <div class="question-actions">
                                    <button class="edit-button" onclick="editQuestion(this)">Edit</button>
                                    <button class="delete-button" onclick="deleteQuestion(this)">Delete</button>
                            </div>
                            </div>`;
                questionsDiv.innerHTML += template;
            });
            
        }
})




    async function deleteQuestion(button) {  
        const container = button.closest('.question-container');
        const questionNumber = container.id
        const deleteQuest = await fetch(`/api/deleteQuestion?questionNumber=${questionNumber}&level=1`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            },
        }).then((res) => res.json())
        if(deleteQuest.success){
            alert("Question deleted!");
            container.remove();
        } else {
            alert("Failed to delete question!");
        }

    }

    function openPopup() {
        document.getElementById('popup').classList.add('active');
        document.body.classList.add('modal-open');
    }
    
    function closePopup() {
        document.getElementById('popup').classList.remove('active');
        document.body.classList.remove('modal-open');
    }
    
    // Main function to add a new question with sub/super script formatting
    async function addNewQuestion() {
        const questionSet = document.getElementById('questionSet').value;
        const questionTextInput = document.getElementById('questionText').value;
        const option1Input = document.getElementById('option1').value;
        const option2Input = document.getElementById('option2').value;
        const option3Input = document.getElementById('option3').value;
        const correctOption = document.getElementById('correct-option').value;


        // Prepare data object for API request
        const data = {
            set: questionSet,
            questionText: questionTextInput,
            options: [option1Input, option2Input, option3Input],
            correctOption
        };

        console.log("Formatted Data:", data);

        try {
            // Send POST request to add a new question
            const response = await fetch('/api/addQuestion?level=1', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (result.response) {
                alert("Question added successfully!");
                // Clear input fields after successful submission
                document.getElementById('questionText').value = "";
                document.getElementById('option1').value = "";
                document.getElementById('option2').value = "";
                document.getElementById('option3').value = "";
                document.getElementById('correct-option').value = "";
                document.getElementById('questionSet').value = "";
                
                window.location.reload(true); // Reload page after adding question
                closePopup(); // Close popup if applicable
            } else {
                throw new Error("Failed to add question");
            }
        } catch (error) {
            console.error("Error adding question:", error);
            alert("Something went wrong while adding the question.");
        }
    }

    function checkAnswer(optionElement, optionValue, isCorrect) {
        const allOptions = optionElement.parentElement.querySelectorAll('.option');
        allOptions.forEach(option => option.disabled = true);

        if (isCorrect) {
            optionElement.classList.add('correct');
        } else {
            optionElement.classList.add('incorrect');
        }
    }

function convertHtmlToUnicode(text) {
    const superscriptMap = {
        '0': '⁰',
        '1': '¹',
        '2': '²',
        '3': '³',
        '4': '⁴',
        '5': '⁵',
        '6': '⁶',
        '7': '⁷',
        '8': '⁸',
        '9': '⁹',
        '+': '⁺',
        '-': '⁻'
    };

    return text
        .replace(/<sub>(.*?)<\/sub>/g, (_, subContent) =>
            subContent.split('').map(char => String.fromCharCode(8320 + parseInt(char))).join('')
        )
        .replace(/<sup>(.*?)<\/sup>/g, (_, supContent) =>
            supContent.split('').map(char => superscriptMap[char] || char).join('')
        );
}




function econvertHtmlToUnicode(text) {
    const superscriptMap = {
        '0': '⁰',
        '1': '¹',
        '2': '²',
        '3': '³',
        '4': '⁴',
        '5': '⁵',
        '6': '⁶',
        '7': '⁷',
        '8': '⁸',
        '9': '⁹',
        '+': '⁺',
        '-': '⁻'
    };

    return text
        .replace(/<sub>(.*?)<\/sub>/g, (_, subContent) =>
            subContent.split('').map(char => String.fromCharCode(8320 + parseInt(char))).join('')
        )
        .replace(/<sup>(.*?)<\/sup>/g, (_, supContent) =>
            supContent.split('').map(char => superscriptMap[char] || char).join('')
        );
}


function eformatChemicalText(rawText, isEquation = false) {
    if (isEquation) {
        const parts = rawText.split(/([+→,])/);
        return parts
            .map(part => {
                if (["+", "→", ","].includes(part)) return part;
                return part
                    .replace(/([A-Z][a-z]*)(\d+)/g, "$1<sub>$2</sub>") 
                    .replace(/\^(\d+)([-+]?)?/g, "<sup>$1$2</sup>");
            })
            .join("");
    } else {
        return rawText
            .replace(/([A-Z][a-z]*)(\d+)/g, "$1<sub>$2</sub>") 
            .replace(/\^(\d+)([-+]?)?/g, "<sup>$1$2</sup>");
    }
}


function econvertHtmlToPlainText(text) {
    return text
        .replace(/<sub>(.*?)<\/sub>/g, (_, subContent) => subContent)
        .replace(/<sup>(.*?)<\/sup>/g, (_, supContent) => `^${supContent}`);
}


// Function to format a chemical equation or compound without using '^'
function formatChemicalText(rawText, isEquation = false) {
    if (isEquation) {
        const parts = rawText.split(/([+→,])/);
        return parts.map(part => {
            if (["+", "→", ","].includes(part)) return part;
            return part
                .replace(/([A-Z][a-z]*)(\d+)/g, "$1<sub>$2</sub>");
        }).join("");
    } else {
        return rawText.replace(/([A-Z][a-z]*)(\d+)/g, "$1<sub>$2</sub>");
    }
}

// Function to convert HTML with sub/sup tags to plain text
function econvertHtmlToPlainText(text) {
    return text
        .replace(/<sub>(.*?)<\/sub>/g, (_, subContent) => subContent)
        .replace(/<sup>(.*?)<\/sup>/g, (_, supContent) => supContent);
}

// Function to convert formatted HTML text back to Unicode characters
function convertHtmlToUnicode(text) {
    const superscriptMap = {
        '0': '⁰', '1': '¹', '2': '²', '3': '³',
        '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷',
        '8': '⁸', '9': '⁹', '+': '⁺', '-': '⁻'
    };
    return text
        .replace(/<sub>(.*?)<\/sub>/g, (_, subContent) => subContent.split('').map(char => String.fromCharCode(8320 + parseInt(char))).join(''))
        .replace(/<sup>(.*?)<\/sup>/g, (_, supContent) => supContent.split('').map(char => superscriptMap[char] || char).join(''));
}


function editQuestion(button) {
    const container = button.closest('.question-container');
    const questionNumber = container.id;
    console.log("Edit level1 ", questionNumber);

    const questionText = container.querySelector('.question').innerText;
    const options = container.querySelectorAll('.option');
    const correctOption = container.dataset.correctOption;
    console.log(questionText.trim(), options)
    const popup = document.createElement('div');
    popup.classList.add('popup');
    popup.style.display = "block";

    const plainQuestionText = econvertHtmlToPlainText(questionText);

    popup.innerHTML = `
        <div class="popup-content" data-quest="${questionNumber}">
            <label>Question:</label>
            <input type="text" value="${questionText}" class="edit-question-input">
            <button id="superButton">Super</button>
            <button id="subButton">Sub</button>

            <label>Options:</label>
            <div id="options-container">
                ${Array.from(options).map((option, index) => `
                    <input type="text" value="${option.innerHTML}" class="edit-option-input" data-index="${index + 1}">
                `).join('')}
            </div>
            
            <label>Correct Option (Number):</label>
            <select class="edit-correct-option">
                <option value="1" ${correctOption == 1 ? 'selected' : ''}>Option 1</option>
                <option value="2" ${correctOption == 2 ? 'selected' : ''}>Option 2</option>
                <option value="3" ${correctOption == 3 ? 'selected' : ''}>Option 3</option>
            </select>
            
            <button class="save-btn">Save</button>
            <button class="close-btn">Close</button>
        </div>
    `;

    document.body.appendChild(popup);

    let activeInput = null;

    // Track the active input field
    popup.querySelectorAll('input[type="text"]').forEach(input => {
        input.addEventListener('focus', () => {
            activeInput = input;
        });
        input.addEventListener('click', () => {
            activeInput = input;
        });
    });

    // Add event listeners for superscript and subscript buttons
    popup.querySelector('#superButton').addEventListener('click', () => {
        if (activeInput) {
            transformLastCharacter(activeInput, 'sup');
        }
    });

    popup.querySelector('#subButton').addEventListener('click', () => {
        if (activeInput) {
            transformLastCharacter(activeInput, 'sub');
        }
    });

    popup.querySelector('.close-btn').addEventListener('click', () => {
        popup.remove();
    });

    popup.querySelector('.save-btn').addEventListener('click', async () => {
        const questionNumber = popup.querySelector('.popup-content').dataset.quest;

        const updatedQuestionRaw = popup.querySelector('.edit-question-input').value;
        const updatedOptionsRaw = Array.from(popup.querySelectorAll('.edit-option-input')).map(input => input.value);

        const updatedQuestion = updatedQuestionRaw
        const updatedOptions = updatedOptionsRaw

        const updatedCorrectOption = popup.querySelector('.edit-correct-option').value;

        const data = {
            questionNumber: questionNumber,
            questionText: updatedQuestion,
            options: updatedOptions,
            correctOption: updatedCorrectOption
        };

        console.log("Updated Data:", data);

        try {
            const response = await fetch(`/api/updateQuestion?questionNumber=${questionNumber}&level=1`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (result.response) {
                alert('Question updated successfully');
                popup.remove();
                window.location.reload(true);
            } else {
                throw new Error('Failed to update question');
            }
        } catch (error) {
            console.error("Error updating question:", error);
            alert('Error updating question');
        }
    });
}

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


=======
var quest
const questionsDiv = document.getElementById('questions');
document.addEventListener('DOMContentLoaded', async function () {
        const questions = await fetch('/api/getQuestions?level=1', {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            },
        }).then((res) => res.json())
        console.log("Questions -> ",questions.quest);
        if(questions.quest){
            quest = questions.quest;
            questionsDiv.innerHTML = "";
            quest.forEach(async (item, index) => {
               // console.log(item, item.questionText)
                let template = `<div class="question-container" id=${item.questionNumber} data-correct-option=${item.correctOption}>
                    <div class="set ${item.set == 1 ? "set-1" : "set-2"}">
                        ${item.set == 1 ? "Set 1" : "Set 2"}
                    </div>
                    <h3 class="questIndex">${index+1}</h3>
                    <div class="question">
                        ${item.questionText}
                    </div>
                    <div class="options">`;
            
                item.options.forEach((opt, index) => {
                    const isCorrect = (index + 1) == parseInt(item.correctOption);
                    template += `<button class="option" onclick="checkAnswer(this, '${opt}', ${isCorrect})">${opt}</button>`;
                });
            
                template += `</div>
                            <div class="question-actions">
                                    <button class="edit-button" onclick="editQuestion(this)">Edit</button>
                                    <button class="delete-button" onclick="deleteQuestion(this)">Delete</button>
                            </div>
                            </div>`;
                questionsDiv.innerHTML += template;
            });
            
        }
})




    async function deleteQuestion(button) {  
        const container = button.closest('.question-container');
        const questionNumber = container.id
        const deleteQuest = await fetch(`/api/deleteQuestion?questionNumber=${questionNumber}&level=1`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            },
        }).then((res) => res.json())
        if(deleteQuest.success){
            alert("Question deleted!");
            container.remove();
        } else {
            alert("Failed to delete question!");
        }

    }

    function openPopup() {
        document.getElementById('popup').classList.add('active');
        document.body.classList.add('modal-open');
    }
    
    function closePopup() {
        document.getElementById('popup').classList.remove('active');
        document.body.classList.remove('modal-open');
    }
    
    // Main function to add a new question with sub/super script formatting
    async function addNewQuestion() {
        const questionSet = document.getElementById('questionSet').value;
        const questionTextInput = document.getElementById('questionText').value;
        const option1Input = document.getElementById('option1').value;
        const option2Input = document.getElementById('option2').value;
        const option3Input = document.getElementById('option3').value;
        const correctOption = document.getElementById('correct-option').value;

        // Format question text and options with subscripts and superscripts
        const formattedQuestionText = convertHtmlToUnicode(formatChemicalText(questionTextInput, true));
        const formattedOption1 = convertHtmlToUnicode(formatChemicalText(option1Input));
        const formattedOption2 = convertHtmlToUnicode(formatChemicalText(option2Input));
        const formattedOption3 = convertHtmlToUnicode(formatChemicalText(option3Input));

        // Prepare data object for API request
        const data = {
            set: questionSet,
            questionText: formattedQuestionText,
            options: [formattedOption1, formattedOption2, formattedOption3],
            correctOption
        };

        console.log("Formatted Data:", data);

        try {
            // Send POST request to add a new question
            const response = await fetch('/api/addQuestion?level=1', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (result.response) {
                alert("Question added successfully!");
                // Clear input fields after successful submission
                document.getElementById('questionText').value = "";
                document.getElementById('option1').value = "";
                document.getElementById('option2').value = "";
                document.getElementById('option3').value = "";
                document.getElementById('correct-option').value = "";
                document.getElementById('questionSet').value = "";
                
                window.location.reload(true); // Reload page after adding question
                closePopup(); // Close popup if applicable
            } else {
                throw new Error("Failed to add question");
            }
        } catch (error) {
            console.error("Error adding question:", error);
            alert("Something went wrong while adding the question.");
        }
    }

    function checkAnswer(optionElement, optionValue, isCorrect) {
        const allOptions = optionElement.parentElement.querySelectorAll('.option');
        allOptions.forEach(option => option.disabled = true);

        if (isCorrect) {
            optionElement.classList.add('correct');
        } else {
            optionElement.classList.add('incorrect');
        }
    }

function convertHtmlToUnicode(text) {
    const superscriptMap = {
        '0': '⁰',
        '1': '¹',
        '2': '²',
        '3': '³',
        '4': '⁴',
        '5': '⁵',
        '6': '⁶',
        '7': '⁷',
        '8': '⁸',
        '9': '⁹',
        '+': '⁺',
        '-': '⁻'
    };

    return text
        .replace(/<sub>(.*?)<\/sub>/g, (_, subContent) =>
            subContent.split('').map(char => String.fromCharCode(8320 + parseInt(char))).join('')
        )
        .replace(/<sup>(.*?)<\/sup>/g, (_, supContent) =>
            supContent.split('').map(char => superscriptMap[char] || char).join('')
        );
}

// Function to format a chemical equation or compound
function formatChemicalText(rawText, isEquation = false) {
    if (isEquation) {
        const parts = rawText.split(/([+→,])/);
        return parts
            .map(part => {
                if (["+", "→", ","].includes(part)) return part;
                return part
                    .replace(/([A-Z][a-z]*)(\d+)/g, "$1<sub>$2</sub>")
                    .replace(/\^(\d+)([-+]?)?/g, "<sup>$1$2</sup>");
            })
            .join("");
    } else {
        return rawText
            .replace(/([A-Z][a-z]*)(\d+)/g, "$1<sub>$2</sub>")
            .replace(/\^(\d+)([-+]?)?/g, "<sup>$1$2</sup>");
    }
}


function econvertHtmlToUnicode(text) {
    const superscriptMap = {
        '0': '⁰',
        '1': '¹',
        '2': '²',
        '3': '³',
        '4': '⁴',
        '5': '⁵',
        '6': '⁶',
        '7': '⁷',
        '8': '⁸',
        '9': '⁹',
        '+': '⁺',
        '-': '⁻'
    };

    return text
        .replace(/<sub>(.*?)<\/sub>/g, (_, subContent) =>
            subContent.split('').map(char => String.fromCharCode(8320 + parseInt(char))).join('')
        )
        .replace(/<sup>(.*?)<\/sup>/g, (_, supContent) =>
            supContent.split('').map(char => superscriptMap[char] || char).join('')
        );
}


function eformatChemicalText(rawText, isEquation = false) {
    if (isEquation) {
        const parts = rawText.split(/([+→,])/);
        return parts
            .map(part => {
                if (["+", "→", ","].includes(part)) return part;
                return part
                    .replace(/([A-Z][a-z]*)(\d+)/g, "$1<sub>$2</sub>") 
                    .replace(/\^(\d+)([-+]?)?/g, "<sup>$1$2</sup>");
            })
            .join("");
    } else {
        return rawText
            .replace(/([A-Z][a-z]*)(\d+)/g, "$1<sub>$2</sub>") 
            .replace(/\^(\d+)([-+]?)?/g, "<sup>$1$2</sup>");
    }
}


function econvertHtmlToPlainText(text) {
    return text
        .replace(/<sub>(.*?)<\/sub>/g, (_, subContent) => subContent)
        .replace(/<sup>(.*?)<\/sup>/g, (_, supContent) => `^${supContent}`);
}


function editQuestion(button) {
    const container = button.closest('.question-container');
    const questionNumber = container.id;
    console.log("Edit level1 ", questionNumber);
    
    const questionText = container.querySelector('.question').innerHTML;
    const options = container.querySelectorAll('.option');
    const correctOption = container.dataset.correctOption;

    const popup = document.createElement('div');
    popup.classList.add('popup');
    popup.style.display = "block";

    const plainQuestionText = econvertHtmlToPlainText(questionText);
    
    popup.innerHTML = `
        <div class="popup-content" data-quest="${questionNumber}">
            <label>Question:</label>
            <input type="text" value="${plainQuestionText}" class="edit-question-input">
            
            <label>Options:</label>
            <div id="options-container">
                ${Array.from(options).map((option, index) => `
                    <input type="text" value="${econvertHtmlToPlainText(option.innerHTML)}" class="edit-option-input" data-index="${index + 1}">
                `).join('')}
            </div>
            
            <label>Correct Option (Number):</label>
            <select class="edit-correct-option">
                <option value="1" ${correctOption == 1 ? 'selected' : ''}>Option 1</option>
                <option value="2" ${correctOption == 2 ? 'selected' : ''}>Option 2</option>
                <option value="3" ${correctOption == 3 ? 'selected' : ''}>Option 3</option>
            </select>
            
            <button class="save-btn">Save</button>
            <button class="close-btn">Close</button>
        </div>
    `;

    document.body.appendChild(popup);

    popup.querySelector('.close-btn').addEventListener('click', () => {
        popup.remove();
    });

    popup.querySelector('.save-btn').addEventListener('click', async () => {
        const questionNumber = popup.querySelector('.popup-content').dataset.quest;
        
        const updatedQuestionRaw = popup.querySelector('.edit-question-input').value;
        const updatedOptionsRaw = Array.from(popup.querySelectorAll('.edit-option-input')).map(input => input.value);
        
        const updatedQuestion = eformatChemicalText(updatedQuestionRaw, true);
        const updatedOptions = updatedOptionsRaw.map(option => eformatChemicalText(option));
        
        const updatedCorrectOption = popup.querySelector('.edit-correct-option').value;

        const data = {
            questionNumber: questionNumber,
            questionText: updatedQuestion,
            options: updatedOptions,
            correctOption: updatedCorrectOption
        };

        console.log("Updated Data:", data);

        try {

            const response = await fetch(`/api/updateQuestion?questionNumber=${questionNumber}&level=1`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (result.response) {
                alert('Question updated successfully');
                popup.remove();
                window.location.reload(true);
            } else {
                throw new Error('Failed to update question');
            }
        } catch (error) {
            console.error("Error updating question:", error);
            alert('Error updating question');
        }
    });
}
>>>>>>> 089763f2c800b1537d4e03a1052f698eb45d58b4
