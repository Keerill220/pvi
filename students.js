const students = [];
const amount = 2;
let page = 1;

document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.getElementById('btnAdd');
    const popupWindowContainer = document.querySelector('.popupAddContainer');
    const popupWindow = document.querySelector('.popupAdd');
    const closeButton = document.getElementById('btnClose');
    const okButton = document.getElementById('btnOk');
    const addStudentButton = document.getElementById('btnAddStudent');
    const studentForm = document.querySelector('.student-form');
    
    addButton.addEventListener('click', openPopup);

    function openPopup(){
        popupWindowContainer.style.opacity = '100%';
        popupWindowContainer.style.pointerEvents = 'all';
        popupWindow.style.marginTop = '0';
        popupWindow.style.backgroundColor = 'rgb(255,255,255)';
    }

    function closePopup() {
        popupWindowContainer.style.opacity = '0';
        popupWindowContainer.style.pointerEvents = 'none';
        popupWindow.style.marginTop = '-100%';
        popupWindow.style.backgroundColor = 'rgb(137, 137, 137)';
        if (studentForm) studentForm.reset();
    }

    closeButton.addEventListener('click', closePopup);

    okButton.addEventListener('click', function() {

        let firstName = document.getElementById('studentFirstName').value;
        let lastName = document.getElementById('studentLastName').value;
        let group = document.getElementById('group').value;
        let gender = document.getElementById('gender').value;
        let date = document.getElementById('studentBirth').value;


        if (!firstName || !lastName || !group || !date || !gender) {
            closePopup();
            return;
        }
        
        students.push({
            group: group,
            firstName: firstName,
            lastName: lastName,
            date: date,
            gender: gender
        });

        console.log(students);
        renderStudentsTable();
        closePopup();
    });

    addStudentButton.addEventListener('click', function() {

        let firstName = document.getElementById('studentFirstName').value;
        let lastName = document.getElementById('studentLastName').value;
        let group = document.getElementById('group').value;
        let gender = document.getElementById('gender').value;
        let date = document.getElementById('studentBirth').value;


        if (!firstName || !lastName || !group || !date || !gender) {
            alert('Please fill in all required fields');
            return;
        }
        
        students.push({
            group: group,
            firstName: firstName,
            lastName: lastName,
            date: date,
            gender: gender
        });

        console.log(students);
        renderStudentsTable();
        closePopup();
    });



    renderStudentsTable();
});

function renderStudentsTable() {
    const table = document.querySelector(".table-responsive table");
    
    // Keep the header row and remove all other rows
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }
    
    // Add student rows
    students.forEach(student => {
        const row = document.createElement("tr");
        
        const checkCell = document.createElement("td");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkCell.appendChild(checkbox);
        row.appendChild(checkCell);
        
        const groupCell = document.createElement("td");
        groupCell.textContent = student.group;
        row.appendChild(groupCell);
        
        const nameCell = document.createElement("td");
        nameCell.textContent = `${student.firstName} ${student.lastName}`;
        row.appendChild(nameCell);
        
        const genderCell = document.createElement("td");
        genderCell.textContent = student.gender;
        row.appendChild(genderCell);
        
        const birthdayCell = document.createElement("td");
        birthdayCell.textContent = student.date;
        row.appendChild(birthdayCell);
        
        const statusCell = document.createElement("td");
        const statusSpan = document.createElement("span");
        statusSpan.className = "status";
        const indicator = document.createElement("span");
        indicator.className = "indicator";
        statusSpan.appendChild(indicator);
        statusSpan.appendChild(document.createTextNode("Online"));
        statusCell.appendChild(statusSpan);
        row.appendChild(statusCell);
        
        const optionsCell = document.createElement("td");
        const editBtn = document.createElement("input");
        editBtn.type = "button";
        editBtn.value = "✏️";
        const deleteBtn = document.createElement("input");
        deleteBtn.type = "button";
        deleteBtn.value = "❌";
        optionsCell.appendChild(editBtn);
        optionsCell.appendChild(deleteBtn);
        row.appendChild(optionsCell);
        
        table.appendChild(row);
    });
}