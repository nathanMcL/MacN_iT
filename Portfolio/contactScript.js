// Wait until the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    const profileCard = document.getElementById('profile-card');
    const popoutContainer = document.getElementById('popout-container');
    const closePopout = document.getElementById('close-popout');

    // Function to show the popout
    const showPopout = () => {
        popoutContainer.classList.remove('hidden');
    };

    // Function to hide the popout
    const hidePopout = () => {
        popoutContainer.classList.add('hidden');
    };

    // Event listener to show popout when profile card is clicked
    profileCard.addEventListener('click', showPopout);

    // Event listener to hide popout when close button is clicked
    closePopout.addEventListener('click', hidePopout);

    // Event listener to hide popout when clicking outside the popout content
    popoutContainer.addEventListener('click', (event) => {
        if (event.target === popoutContainer) {
            hidePopout();
        }
    });

    // Close popout with ESC key
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && !popoutContainer.classList.contains('hidden')) {
            hidePopout();
        }
    });
});