const fs = require('fs');

let problem_dict = [
    {
        questionText: "What is the net ionic equation for the reaction of AlCl3 (aq) with NaOH (aq)?",
        options: [
            "Al3+ (aq) + 3 OH- (aq) → AlCl3 (s)",
            "Na+ (aq) + Cl- (aq) → NaCl (s)",
            "Al+ (aq) + OH- (aq) → AlOH (s)"
        ]
    },
    {
        questionText: "What is the net ionic equation if you mix NaCl (aq) with AgNO3 (aq)?",
        options: [
            "Ag+ (aq) + Cl- (aq) → AgCl (s)",
            "Na+ (aq) + NO3- (aq) → NaNO3 (s)",
            "Ag+ (aq) + Cl- (aq) + NO3- (aq) → AgClNO3 (s)"
        ]
    },
    {
        questionText: "What is the net ionic equation if you mix Cu(NO3)2 (aq) with (NH4)2S (aq)?",
        options: [
            "Cu2+ (aq) + S2- (aq) → CuS (s)",
            "Cu+ (aq) + S2- (aq) → Cu2S (s)",
            "2 Cu2+ + 2 S2- (aq) → Cu2S2 (s)"
        ]
    },
    {
        questionText: "What is the net ionic equation if you mix Ba(NO3)2 (aq) with K2CO3 (aq)?",
        options: [
            "Ba2+ (aq) + CO32- (aq) → BaCO3 (s)",
            "K+ (aq) + NO3- (aq) → KNO3 (s)",
            "Ba2+ (aq) + 2 K+ (aq) → BaK2 (s)"
        ]
    },
    {
        questionText: "What is the net ionic equation if you mix PbCl2 (aq) with NaS (aq)?",
        options: [
            "Pb2+ (aq) + S2- (aq) → PbS (s)",
            "2 Pb2+ (aq)+ S2-(aq) + 2 Na+(aq) → Pb2Na2S (s)",
            "2 Na+ (aq) + 2 Cl- (aq) → Na2Cl2 (s)"
        ]
    },
    {
        questionText: "What is the net ionic equation if you mix Fe(NO3)2 (aq) and Na2S (aq)?",
        options: [
            "Fe2+ (aq) + S2- (aq) →FeS (s)",
            "2 Fe2+ (aq) + S2- (aq) +2 NO3- (aq) → Fe2S(NO3)2 (s)",
            "Fe2+ (aq) + 2 Na+ (aq) + 2 S2- (aq) → FeNa2S2 (s)"
        ]
    },
    {
        questionText: "What is the net ionic equation for the reaction of Ca(NO3)2 (aq) with Na2SO4 (aq)?",
        options: [
            "Ca2+ (aq) + SO42- (aq) → CaSO4 (s)",
            "Na+ (aq) + NO3- (aq) → NaNO3 (s)",
            "Ca2+ (aq) + 4 SO- (aq)→ CaSO4 (s)"
        ]
    },
    {
        questionText: "What is the net ionic equation if you mix CaSO4 (aq) with Na2CO3 (aq)?",
        options: [
            "Ca2+ (aq) + CO32- (aq) → CaCO3 (s)",
            "2 Na+ (aq) + SO42- (aq) → Na2SO4 (s)",
            "Ca+ (aq) + CO3- (aq) → CaCO3 (s)"
        ]
    },
    {
        questionText: "Which of the following is a precipitation reaction?",
        options: [
            "2 KI (aq) + Pb(NO3)2 (aq) → PbI2 (s) + 2 KNO3 (aq)",
            "3 CuCl2 (aq) + 2 Al (s) → 3 Cu (s) + 2 AlCl3 (aq)",
            "Fe (s) + 2 HCl (aq) → FeCl2(aq) + H2 (g)"
        ]
    },
    {
        questionText: "Which of the following is a precipitation reaction?",
        options: [
            "Pb(NO3)2 (aq) + Na2SO4 (aq) → 2 NaNO3 (aq) + PbSO4 (s)",
            "NaCl (aq) + NH4NO3 (aq) → NaNO3 (aq) + NH4Cl (aq)",
            "Zn (s) + H2SO4 (aq) → ZnSO4 (aq) + H2 (g)"
        ]
    },
    {
        questionText: "Which of the following is a precipitation reaction?",
        options: [
            "2 H3PO4 (aq) + 3 Ca(OH)2 (aq) → Ca3(PO4)2 (s) + 6 H2O (l)",
            "NaNO3 (aq) + Pb (s) → NaNO2 (aq) + PbO (s)",
            "CaCO3 (s) + 2 HCl (aq) → CaCl2 (aq) + H2O (l) + CO2 (g)"
        ]
    },
    {
        questionText: "Which of the following is a precipitation reaction?",
        options: [
            "2 NaBr (aq) + Hg2(NO3)2 → Hg2Br2 (s) + 2 NaNO3 (aq)",
            "2 NH3 (aq) + H2SO4 (aq) → (NH4)2SO4 (aq)",
            "Fe2O3 (s) + FeO (s) → Fe3O4 (s)"
        ]
    },
    {
        questionText: "Which of the following is a precipitation reaction?",
        options: [
            "NaF (aq) + AgNO3 (aq) → AgF (s) + NaNO3 (s)",
            "CH4 (g) + 2 O2 (g) → CO2 (g) + H2O (l)",
            "Zn (s) + S (s) → ZnS (s)"
        ]
    },
    {
        questionText: "Which of the following is a precipitation reaction?",
        options: [
            "PbCl2 (aq) + 2 NaS (aq) → 2 NaCl (aq) + PbS (s)",
            "C2H4 (g) + 6 HCl (g) → 2 CHCl3 (g) + 4 H2 (g)",
            "2 NaOH (aq) + H2SO4 (aq) → Na2SO4 (aq) + 2 H2O (l)"
        ]
    },
    {
        questionText: "Which of the following is a precipitation reaction?",
        options: [
            "Zn(NO3)2 (aq) + 2 NaOH (aq) → 2 NaNO3 (aq) + Zn(OH)2 (s)",
            "2 SO2 (g) + 2 H2O (g) → 2 H2S (g) + 2 O2 (g)",
            "LiCl (aq) + (NH4)2SO4 (aq) → (NH4)2SO4 (aq) + LiCl (aq)"
        ]
    },
    {
        questionText: "Which of the following is a precipitation reaction?",
        options: [
            "CuCl2 (aq) + 2 AgNO3 (aq) → Cu(NO3)2 (aq) + 2 AgCl (s)",
            "CuSO4 (aq) + Ni (s) → Cu (s) + NiSO4 (aq)",
            "MgO (s) + CO2 (g) → MgCO3 (s)"
        ]
    }
];




let mongoQuestions = [];
let questionNumber = 1;

// Loop through the array of questions
for (const questionObj of problem_dict) {
    let questionData = {
        questionText: questionObj.questionText,
        options: questionObj.options,
        correctOption: 0,
        set: questionObj.set,
        questionNumber: questionNumber++,
        createdAt: new Date(),
        updatedAt: new Date()
    };
    mongoQuestions.push(questionData);  
}

const jsonString = JSON.stringify(mongoQuestions, null, 2);

// Write the JSON data to a file
fs.writeFile('questions_mongo_format.json', jsonString, (err) => {
    if (err) {
        console.log('Error writing file', err);
    } else {
        console.log('Successfully wrote file');
    }
});
