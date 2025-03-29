const students = [];
const amount = 2;
let page = 1;
let nextStudentId = 1; 

let editMode = false;
let editStudentId = null;

function generateStudentId() {
    return String(nextStudentId++).padStart(8, '0');
}

document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.getElementById('btnAdd');
    const popupWindowContainer = document.querySelector('.popupAddContainer');
    const popupWindow = document.querySelector('.popupAdd');
    const closeButton = document.getElementById('btnClose');
    const okButton = document.getElementById('btnOk');
    const addStudentButton = document.getElementById('btnAddStudent');
    const studentForm = document.querySelector('.student-form');
    const popupTitle = document.querySelector('.addLabel');
    
    const deleteConfirmationPopup = document.getElementById('deleteConfirmation');
    const deleteConfirmationText = document.getElementById('deleteConfirmationText');
    const confirmDeleteBtn = document.getElementById('confirmDelete');
    const cancelDeleteBtn = document.getElementById('cancelDelete');
    
    let studentToDelete = null;
    let multipleDelete = false;
    
    addButton.addEventListener('click', function() {
        editMode = false;
        editStudentId = null;
        openPopup("Add Student");
        if (studentForm) studentForm.reset();
    });

    function openPopup(title = "Add Student"){
        popupTitle.textContent = title;
        popupWindowContainer.style.opacity = '100%';
        popupWindowContainer.style.pointerEvents = 'all';
        popupWindow.style.marginTop = '0';
        popupWindow.style.backgroundColor = 'rgb(255,255,255)';
        
        if (editMode) {
            okButton.style.display = 'block';
            addStudentButton.style.display = 'none';
        } else {
            okButton.style.display = 'none';
            addStudentButton.style.display = 'block';
        }
    }

    function closePopup() {
        popupWindowContainer.style.opacity = '0';
        popupWindowContainer.style.pointerEvents = 'none';
        popupWindow.style.marginTop = '-100%';
        popupWindow.style.backgroundColor = 'rgb(137, 137, 137)';
        if (studentForm) studentForm.reset();
        editMode = false;
        editStudentId = null;
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
        
        if (editMode && editStudentId) {
            const studentIndex = students.findIndex(s => s.id === editStudentId);
            if (studentIndex !== -1) {
                students[studentIndex] = {
                    id: editStudentId,
                    group: group,
                    firstName: firstName,
                    lastName: lastName,
                    date: date,
                    gender: gender
                };
                console.log('Student updated:', students[studentIndex]);
            }
        } else {
            const newStudent = {
                id: generateStudentId(),
                group: group,
                firstName: firstName,
                lastName: lastName,
                date: date,
                gender: gender
            };
            students.push(newStudent);
            console.log('Student added:', newStudent);
        }

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
        
        const newStudent = {
            id: generateStudentId(),
            group: group,
            firstName: firstName,
            lastName: lastName,
            date: date,
            gender: gender
        };
        students.push(newStudent);

        console.log(newStudent);
        renderStudentsTable();
        closePopup();
    });

    function showDeleteConfirmation(message, callback) {
        deleteConfirmationText.textContent = message;
        deleteConfirmationPopup.style.display = 'flex';
        
        confirmDeleteBtn.onclick = function() {
            callback();
            hideDeleteConfirmation();
        };
    }
    
    function hideDeleteConfirmation() {
        deleteConfirmationPopup.style.display = 'none';
    }
    
    cancelDeleteBtn.addEventListener('click', hideDeleteConfirmation);

    function renderStudentsTable() {
        const table = document.querySelector(".table-responsive table");
        
        while (table.rows.length > 1) {
            table.deleteRow(1);
        }

        const headerCheckbox = table.rows[0].cells[0].querySelector("input[type='checkbox']");
        headerCheckbox.addEventListener("change", function() {
            const checkboxes = table.querySelectorAll("tr td:first-child input[type='checkbox']");
            checkboxes.forEach(checkbox => checkbox.checked = headerCheckbox.checked);
        });

        students.forEach((student) => {
            const row = document.createElement("tr");
            row.dataset.studentId = student.id;
            
            const checkCell = document.createElement("td");
            checkCell.ariaLabel = "Select student cell";
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.ariaLabel = "Select student";
            checkbox.dataset.studentId = student.id;
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
            
            editBtn.addEventListener("click", function() {
                editMode = true;
                editStudentId = student.id;
                
                document.getElementById('studentFirstName').value = student.firstName;
                document.getElementById('studentLastName').value = student.lastName;
                document.getElementById('group').value = student.group;
                document.getElementById('gender').value = student.gender;
                document.getElementById('studentBirth').value = student.date;
                
                openPopup("Edit Student");
            });
            
            const deleteBtn = document.createElement("input");
            deleteBtn.type = "button";
            deleteBtn.value = "❌";
            deleteBtn.addEventListener("click", function() {
                const checkboxes = table.querySelectorAll("tr td:first-child input[type='checkbox']");
                const checkedBoxes = Array.from(checkboxes).filter(checkbox => checkbox.checked);
                
                if (checkedBoxes.length === 0) {
                    showDeleteConfirmation(`Delete student ${student.firstName} ${student.lastName}?`, function() {
                        const index = students.findIndex(s => s.id === student.id);
                        if (index !== -1) {
                            students.splice(index, 1);
                            console.log(`Removed student: ${student.firstName} ${student.lastName}`);
                            renderStudentsTable();
                        }
                    });
                }
                else if (checkedBoxes.length === 1) {
                    const checkedId = checkedBoxes[0].dataset.studentId;
                    const checkedStudent = students.find(s => s.id === checkedId);
                    
                    if (checkedStudent) {
                        showDeleteConfirmation(`Delete student ${checkedStudent.firstName} ${checkedStudent.lastName}?`, function() {
                            const index = students.findIndex(s => s.id === checkedId);
                            if (index !== -1) {
                                students.splice(index, 1);
                                console.log(`Removed student: ${checkedStudent.firstName} ${checkedStudent.lastName}`);
                                renderStudentsTable();
                            }
                        });
                    }
                }
                else {
                    showDeleteConfirmation(`Delete ${checkedBoxes.length} students?`, function() {
                        const checkedIds = Array.from(checkedBoxes).map(checkbox => checkbox.dataset.studentId);
                        
                        for (let i = students.length - 1; i >= 0; i--) {
                            if (checkedIds.includes(students[i].id)) {
                                students.splice(i, 1);
                            }
                        }
                        
                        console.log("Removed checked students");
                        renderStudentsTable();
                    });
                }
            });
            optionsCell.appendChild(editBtn);
            optionsCell.appendChild(deleteBtn);
            row.appendChild(optionsCell);
            
            table.appendChild(row);
        });
    }

    renderStudentsTable();
});