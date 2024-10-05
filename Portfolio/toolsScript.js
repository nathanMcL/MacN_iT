document.addEventListener("DOMContentLoaded", function() {
    const toolsButton = document.getElementById('toolsToggle');
    const toolsCategories = document.getElementById('toolsCategories');
    const toggleText = document.getElementById('toggleText');
    const toggleTriangle = document.getElementById('toggleTriangle');

    toolsButton.addEventListener('click', function() {
        // Toggle the visibility of the tools categories
        toolsCategories.classList.toggle('hidden');

        // Toggle text between 'open' and 'close'
        if (toggleText.textContent === "open") {
            toggleText.textContent = "close";
            toggleText.style.color = 'var(--triangle-button-close)'; // Change the text color text to orange
        } else {
            toggleText.textContent = "open";
            toggleText.style.color = 'var(--triangle-button-open)'; // Change the text color back to green
        }

        // Rotate triangle and change its color
        toggleTriangle.classList.toggle('rotate-triangle');
        toggleTriangle.style.color = toggleText.style.color; // Change the triangle color to match the text color
    });
});