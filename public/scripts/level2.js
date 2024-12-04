document.addEventListener('DOMContentLoaded', async function () {
    const questionsDiv = document.getElementById('questions');
    const questions = await fetch('/api/getQuestions?level=2', {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
    }).then((res) => res.json());

    console.log("Questions -> ", questions.quest);
    if (questions.quest) {
        const quest = questions.quest;
        questionsDiv.innerHTML = "";
        quest.forEach((item, index) => {
            let template = `<div class="question-container" id=${item.questionNumber} data-correct-option=${item.correctOption}>
                <h3 class="questIndex">${index + 1}</h3>
                <div class="question statement">
                    ${item.statement}
                </div>
                <div class="question" id="question">
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
});

function editQuestion(button) {
    const container = button.closest('.question-container');
    const questionNumber = container.id;
    const statement = container.querySelector('.statement').innerText;
    const questionText = container.querySelector('#question').innerText;
    const options = container.querySelectorAll('.option');
    const correctOption = container.dataset.correctOption;

    const popup = document.createElement('div');
    popup.classList.add('popup');
    popup.style.display = "block";

    popup.innerHTML = `
        <div class="popup-content" data-quest="${questionNumber}">
            <label>Statement:</label>
            <input type="text" value="${statement}" class="edit-statement">
            <label>Question:</label>
            <input type="text" value="${questionText}" class="edit-question-input">
            <button id="superButton">Super</button>
            <button id="subButton">Sub</button>

            <label>Options:</label>
            <div id="options-container">
                ${Array.from(options).map((option, index) => `
                    <input type="text" value="${option.innerText}" class="edit-option-input" data-index="${index + 1}">
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
        const updatedStatement = popup.querySelector('.edit-statement').value;
        const updatedQuestionRaw = popup.querySelector('.edit-question-input').value;
        const updatedOptionsRaw = Array.from(popup.querySelectorAll('.edit-option-input')).map(input => input.value);
        
        // Format text with chemical notation
        const updatedQuestion = formatChemicalText(updatedQuestionRaw, true);
        const updatedOptions = updatedOptionsRaw.map(option => formatChemicalText(option));

        const updatedCorrectOption = popup.querySelector('.edit-correct-option').value;

        const data = {
            statement: updatedStatement,
            questionNumber: questionNumber,
            questionText: updatedQuestion,
            options: updatedOptions,
            correctOption: updatedCorrectOption
        };

        console.log("Updated Data:", data);

        try {
            const response = await fetch(`/api/updateQuestion?questionNumber=${questionNumber}&level=2`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (result.response) {
                alert('Question updated successfully');
                popup.remove();
                window.location.reload(true);
            } else {
                alert('Error updating question');
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

async function deleteQuestion(button) {  
   const container = button.closest('.question-container');
   const questionNumber = container.id;
   
   try { 
     const deleteQuestResponse= await fetch(`/api/deleteQuestion?questionNumber=${questionNumber}&level=2`, { method:"GET", headers:{ Accept:"application/json" }, }); 
     const deleteQuestResult= await deleteQuestResponse.json(); 

     if(deleteQuestResult.success){ 
         alert("Question deleted!"); 
         container.remove(); 
     } else{ 
         alert("Failed to delete question!"); 
     } 

   } catch(error){ 
       console.error("Error deleting question:", error); 
       alert("Error deleting question"); 
   }
}

async function addNewQuestion() { 
   try { 
       const statementValueElement= document.getElementById("statement"); 
       const statementValue= statementValueElement.value; 
       const questionTextValueElement= document.getElementById("questionText"); 
       const questionTextValue= questionTextValueElement.value; 
       const option1ValueElement= document.getElementById("option1"); 
       const option1Value= option1ValueElement.value; 
       const option2ValueElement= document.getElementById("option2"); 
       const option2Value= option2ValueElement.value; 
       const option3ValueElement= document.getElementById("option3"); 
       const option3Value= option3ValueElement.value; 
       const correctOptionValueElement= document.getElementById("correct-option"); 
       const correctOptionValue= correctOptionValueElement.value; 

       // Format text with chemical notation
       const formattedStatement= formatChemicalText(statementValue); 
       const formattedQuestionText= formatChemicalText(questionTextValue,true); 
       const formattedOptions=[formatChemicalText(option1Value), formatChemicalText(option2Value), formatChemicalText(option3Value)];

       // Prepare data object for API request
       let data={ statement: formattedStatement, questionText: formattedQuestionText, options: formattedOptions, correctOption: correctOptionValue }; 

       console.log(data); 

       // Send POST request to add a new question
       let addQuestResponse= await fetch("/api/addQuestion?level=2", { method:"POST", headers:{ "Content-Type":"application/json" }, body: JSON.stringify(data), }); 

       let addQuestResult= await addQuestResponse.json(); 

       console.log(addQuestResult); 

       if(addQuestResult.response){ alert("Question added successfully!"); statementValueElement.value="";
           questionTextValueElement.value="";
           option1ValueElement.value="";
           option2ValueElement.value="";
           option3ValueElement.value="";
           correctOptionValueElement.value="";
           window.location.reload(true); closePopup(); } else{ alert("Something went wrong while adding Question"); } 

   } catch(error){ console.error("Error adding new question:", error); alert("Error adding new question"); } 
}

function checkAnswer(optionElement, optionValue, isCorrect) { 
   try { 
      let allOptionsElements= optionElement.parentElement.querySelectorAll(".option"); 

      allOptionsElements.forEach((option)=>{ option.disabled=true; }); 

      if(isCorrect){ optionElement.classList.add("correct"); } else{ optionElement.classList.add("incorrect"); } 

   } catch(error){ console.error("Error checking answer:", error); alert("Error checking answer"); } 
}

function openPopup() { 
   try { 
     let popupContainer=document.getElementById("popup"); 

     popupContainer.classList.add("active");

     document.body.classList.add("modal-open");

   } catch(error){ console.error("Error opening popup:", error); alert("Error opening popup"); } 

}

function closePopup() { 
   try { 
     let closePopupContainer=document.getElementById("popup");

     closePopupContainer.classList.remove("active");

     document.body.classList.remove("modal-open");

   } catch(error){ console.error("Error closing popup:", error); alert("Error closing popup"); }

}

function formatChemicalText(rawText, isEquation=false){ if(isEquation){const parts= rawText.split(/([+→,])/); return parts.map(part=>{if(["+", "→", ","].includes(part))return part;return part.replace(/([A-Z][a-z]*)(\d+)/g,"$1<sub>$2</sub>")}).join("");}else{return rawText.replace(/([A-Z][a-z]*)(\d+)/g,"$1<sub>$2</sub>")}}
