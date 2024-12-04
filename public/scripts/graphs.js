let studentsData = [];

// Fetch data from the backend
fetch('/api/getStudents')
    .then(response => response.json())
    .then(data => {
        studentsData = data;
        console.log(studentsData);
        const levelPassCounts = calculateLevelPasses(studentsData);
        createPassChart(levelPassCounts);
    })
    .catch(error => console.error('Error fetching student data:', error));

// Function to calculate how many students passed each level
function calculateLevelPasses(students) {
    const levelPassCounts = { level1: 0, level2: 0, level3: 0 };

    students.forEach(student => {
        if (parseInt(student.level1Score) === 6) {
            levelPassCounts.level1 += 1;
        }
        if (parseInt(student.level2Score) === 6) {
            levelPassCounts.level2 += 1;
        }
        if (parseInt(student.level3Score) === 6) {
            levelPassCounts.level3 += 1;
        }
    });

    return levelPassCounts;
}

function createPassChart(levelPassCounts) {
    const ctx = document.getElementById('passChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Level 1', 'Level 2', 'Level 3'],
            datasets: [{
                label: '# of Students Passed',
                data: [levelPassCounts.level1, levelPassCounts.level2, levelPassCounts.level3],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)'
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: { 
                    beginAtZero: true
                }
            }
        }
    });
}

