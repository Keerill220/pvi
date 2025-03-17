document.addEventListener('DOMContentLoaded', function() {
    const notifButton = document.getElementById('notif');
    const notifIndicator = document.querySelector('.notification-indicator');
    const notifIcon = notifButton.querySelector('svg');
    
    notifButton.addEventListener('mouseenter', function() {
        notifIndicator.classList.add('hidden');
    });
    
    document.addEventListener('keydown', function(event) {
        if (event.code === 'Space' && !event.repeat) {
            event.preventDefault();
            
            notifIcon.classList.remove('rock');
            
            void notifIcon.offsetWidth;
            
            notifIcon.classList.add('rock');
            
            setTimeout(() => {
                notifIcon.classList.remove('rock');

                notifIndicator.classList.remove('hidden');
            }, 500);
      }
    });
    
    window.showNotificationIndicator = function() {
        notifIndicator.classList.remove('hidden');
    };
});
