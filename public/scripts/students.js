document.addEventListener("DOMContentLoaded", function () {
    const studentTableBody = document.getElementById('studentData');
    let studentsData = [];

    // Fetch data from the backend
    fetch('http://localhost:8080/api/getStudents')
        .then(response => response.json())
        .then(data => {
            studentsData = data;
            populateTable(studentsData);
        })
        .catch(error => console.error('Error fetching student data:', error));

   
    function populateTable(data) {
        studentTableBody.innerHTML = '';

        data.forEach(student => {
            const row = document.createElement('tr');
            
            row.innerHTML = `
                <td>${student.fullName}</td>
                <td>${student.email}</td>
                <td>${student.sectionId}</td>
                <td>${student.level1Score}</td>
                <td>${student.level2Score}</td>
                <td>${student.level3Score}</td>
                <td>
                    <!-- Action Buttons -->
                    <button class="action-btn" onclick="clearScore('${student.studentId}')">Clear</button>
                    <button class="action-btn" onclick="deleteStudent('${student.studentId}')">Delete</button>
                </td>
            `;

            studentTableBody.appendChild(row);
        });
    }

    window.searchTable = function() {
        const searchQuery = document.getElementById('searchInput').value.toLowerCase();
        
        const filteredData = studentsData.filter(student => 
            student.fullName.toLowerCase().includes(searchQuery)
        );

        populateTable(filteredData);
    };
});


function clearScore(studentId) {
    fetch(`http://localhost:8080/api/students/${studentId}/clear-score`, { method: 'PUT' })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                alert(data.message);
                location.reload();
            }
        })
        .catch(error => console.error('Error clearing score:', error));
}

function deleteStudent(studentId) {
    if (confirm("Are you sure you want to delete this student?")) {
        fetch(`http://localhost:8080/api/students/${studentId}`, { method: 'DELETE' })
            .then(response => response.json())
            .then(data => {
                if (data.message) {
                    alert(data.message);
                    location.reload();
                }
            })
            .catch(error => console.error('Error deleting student:', error));
    }
}
