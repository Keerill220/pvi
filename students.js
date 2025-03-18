document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.getElementById('btnAdd');
    const popupWindowContainer = document.querySelector('.popupAddContainer');
    const popupWindow = document.querySelector('.popupAdd');
    const closeButton = document.getElementById('btnClose');
    const okButton = document.getElementById('btnOk');
    const addStudentButton = document.getElementById('btnAddStudent');
    const studentForm = document.querySelector('.student-form');
    
    addButton.addEventListener('click', function() {
        popupWindowContainer.style.opacity = '100%';
        popupWindowContainer.style.pointerEvents = 'all';
        popupWindow.style.marginTop = '0';
        popupWindow.style.backgroundColor = 'rgb(255,255,255)';
    });

    function closePopup() {
        popupWindowContainer.style.opacity = '0';
        popupWindowContainer.style.pointerEvents = 'none';
        popupWindow.style.marginTop = '-100%';
        popupWindow.style.backgroundColor = 'rgb(137, 137, 137)';
        if (studentForm) studentForm.reset();
    }

    closeButton.addEventListener('click', closePopup);

    // Ok button just closes the popup
    okButton.addEventListener('click', closePopup);

    // Add button validates and adds a new student
    addStudentButton.addEventListener('click', function() {
        // Basic form validation
        const firstName = document.getElementById('studentFirstName').value;
        const lastName = document.getElementById('studentLastName').value;
        const group = document.getElementById('group').value;
        
        if (!firstName || !lastName || !group) {
            alert('Please fill in all required fields');
            return;
        }
        
        // TODO: Add student to the table
        
        closePopup();
    });
});