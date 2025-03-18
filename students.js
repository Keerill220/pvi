document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.getElementById('btnAdd');
    const popupWindowContainer = document.querySelector('.popupAddContainer');
    const popupWindow = document.querySelector('.popupAdd');
    
    addButton.addEventListener('click', function() {
        popupWindowContainer.style.opacity = '100%';
        popupWindowContainer.style.pointerEvents = 'all';
        popupWindow.style.marginTop = '0';
        popupWindow.style.backgroundColor = 'rgb(255,255,255)';
    });

});