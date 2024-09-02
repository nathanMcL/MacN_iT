// Wait until the DOM(Document Object Model) content has loaded.
document.addEventListener('DOMContentLoaded', function() {
    const profiles = [
        { profileId: 'profile-card-1', businessCardId: 'business-card-section-1', closeButtonId: 'close-button-1' },
        { profileId: 'profile-card-2', businessCardId: 'business-card-section-2', closeButtonId: 'close-button-2' },
        { profileId: 'profile-card-3', businessCardId: 'business-card-section-3', closeButtonId: 'close-button-3' },
        { profileId: 'profile-card-4', businessCardId: 'business-card-section-4', closeButtonId: 'close-button-4' }
    ];

    profiles.forEach(profile => {
        const profileCard = document.getElementById(profile.profileId);
        const businessCardSection = document.getElementById(profile.businessCardId);
        const closeButton = document.getElementById(profile.closeButtonId);

        // Hide the business card by default
        businessCardSection.style.display = 'none';

        // Show the business card
        const showBusinessCard = () => {
            // Get the position of the profile card
            const rect = profileCard.getBoundingClientRect();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            // Position the business card section near the profile card
            businessCardSection.style.top = `${rect.top + scrollTop}px`; // Align with the top of the profile card
            businessCardSection.style.left = `${rect.left}px`; // Align to the left of the profile card

            // Display the business card
            businessCardSection.style.display = 'flex';
            setTimeout(() => {
                businessCardSection.classList.add('show'); // Trigger the pop-out effect
            }, 10); // Small delay to ensure the display change is registered
        };

        // Hide the business card
        const hideBusinessCard = () => {
            businessCardSection.classList.remove('show');
            setTimeout(() => {
                businessCardSection.style.display = 'none';
            }, 300); // Wait for the transition to finish before hiding the element
        };

        // Show the business card when the profile card is clicked
        profileCard.addEventListener('click', showBusinessCard);

        // Hide the business card when the `close` button is clicked
        closeButton.addEventListener('click', hideBusinessCard);

        // Hide the business card when the user clicks outside the card
        businessCardSection.addEventListener('click', (event) => {
            if (event.target === businessCardSection) {
                hideBusinessCard();
            }
        });

        // Close the business card with ESC key
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && businessCardSection.style.display === 'flex') {
                hideBusinessCard();
            }
        });
    });
});
