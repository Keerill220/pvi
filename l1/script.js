document.addEventListener('DOMContentLoaded', function() {
    // Get the notification button and indicator
    const notifButton = document.getElementById('notif');
    const notifIndicator = document.querySelector('.notification-indicator');
    
    // Add mouseenter event listener to hide the indicator when hovered
    notifButton.addEventListener('mouseenter', function() {
        notifIndicator.classList.add('hidden');
    });
    
    // Function to show the indicator again (for testing purposes)
    window.showNotificationIndicator = function() {
        notifIndicator.classList.remove('hidden');
    };
});
