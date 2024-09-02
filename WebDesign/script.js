// Hamburger Menu Toggle
document.addEventListener("DOMContentLoaded", function() {
    const menuIcon = document.getElementById("menu-icon");
    const menuItems = document.getElementById("menu-items");

    menuIcon.addEventListener("click", function() {
        console.log("Menu icon clicked");
        menuItems.classList.toggle("menu-visible");
    });
});
// End Hamburger of Menu Toggle

// Floating text Header `MacN` text
document.addEventListener('DOMContentLoaded', function () {
    const header = document.querySelector('.header-index');
    const floatingText = document.querySelectorAll('.floating');
    const headerBounds = header.getBoundingClientRect();

    // Define initial speed and direction for each letter
    floatingText.forEach(span => {
        span.dataset.dx = 1 + Math.random() * 0.25;  // Speed in x-direction
        span.dataset.dy = 1 + Math.random() * 0.25;  // Speed in y-direction
    });

    function moveText() {
        floatingText.forEach(span => {
            let x = parseFloat(span.style.left || 0);
            let y = parseFloat(span.style.top || 0);
            let dx = parseFloat(span.dataset.dx);
            let dy = parseFloat(span.dataset.dy);

            // Move text
            x += dx;
            y += dy;

            // Check for collision with boundaries and reverse direction
            if (x <= 0 || x + span.offsetWidth >= headerBounds.width) {
                dx *= -1;
            }
            if (y <= 0 || y + span.offsetHeight >= headerBounds.height) {
                dy *= -1;
            }

            // Apply new position and speed
            span.style.left = `${x}px`;
            span.style.top = `${y}px`;
            span.dataset.dx = dx;
            span.dataset.dy = dy;
        });

        requestAnimationFrame(moveText);
    }

    // Start the animation
    moveText();
});
// End of Floating text Header `MacN` text

// Carousel JScript
document.addEventListener('DOMContentLoaded', function() {
    // Array of image paths
    const images = [
        // Image 1
        '/WebDesignSummer24/WebDesign/images/IMG_9936.JPG',
        // Image 2
        '/WebDesignSummer24/WebDesign/images/IMG_9937.JPG',
        // Image 3
        '/WebDesignSummer24/WebDesign/images/IMG_9938.JPG',
        // Image 4
        '/WebDesignSummer24/WebDesign/images/IMG_9939.JPG',
        // Image 5
        '/WebDesignSummer24/WebDesign/images/IMG_9940.JPG',
        // Image 6
        '/WebDesignSummer24/WebDesign/images/IMG_9841.JPG',
        // Image 7
        '/WebDesignSummer24/WebDesign/images/IMG_9942.JPG',
        // Image 8
        '/WebDesignSummer24/WebDesign/images/IMG_9943.JPG',
        // Image 9
        '/WebDesignSummer24/WebDesign/images/IMG_9944.JPG',
        // Image 10
        '/WebDesignSummer24/WebDesign/images/IMG_9950.JPG',
    ];

    // Array of text corresponding to each image
    const texts = [
        // Image 1
        '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.</p><p>Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.</p>',
        // Image 2
        '<p>Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa.</p>',
        // Image 3
        '<p>Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor.</p>',
        // Image 4
        '<p>Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis.</p>',
        // Image 5
        '<p>Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus.</p>',
        // Image 6
        '<p>Iaculis vel, suscipit quis, luctus non, massa. Fusce ac turpis quis ligula lacinia aliquet.</p>',
        // Image 7
        '<p>Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh.</p>',
        // Image 8
        '<p>Quisque volutpat condimentum velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra.</p>',
        // Image 9
        '<p>Inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc.</p>',
        // Image 10
        '<p>Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor.</p>',
    ];

    const carouselInner = document.querySelector('.carousel-inner');
    const indicators = document.querySelector('.carousel-indicators');
    const enlargedContainer = document.createElement('div');
    enlargedContainer.classList.add('enlarged-container');
    document.body.appendChild(enlargedContainer);  // Append the enlarged container to the body

    // 'Close' (x) button for the enlarged container
    const closeButton = document.createElement('span');
    closeButton.classList.add('enlarged-close');
    closeButton.innerHTML = '&times;';
    enlargedContainer.appendChild(closeButton);

    // Close the enlarged container when the close button is clicked
    closeButton.addEventListener('click', () => {
        enlargedContainer.style.display = 'none';
    });

    // Dynamically create carousel items and indicators
    images.forEach((image, index) => {
        // Create carousel item
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('carousel-item');
        if (index === 0) itemDiv.classList.add('active'); // Set the first image as active
        const img = document.createElement('img');
        img.src = image;
        img.classList.add('d-block', 'w-100');
        itemDiv.appendChild(img);
        carouselInner.appendChild(itemDiv);

        // Create indicator
        const indicator = document.createElement('li');
        indicator.dataset.target = "#carouselIndicators";
        indicator.dataset.slideTo = index;
        if (index === 0) indicator.classList.add('active'); // Set the first indicator as active
        indicators.appendChild(indicator);
    
        // Add click event to enlarge the image and display the corresponding text
        indicator.addEventListener('click', () => {
            enlargedContainer.style.display = 'flex'; // Show the enlarged container

            // Remove any existing content in the enlarged container
            enlargedContainer.innerHTML = '';
            enlargedContainer.appendChild(closeButton); // Add the close button again

            // Create enlarged image
            const enlargedImage = document.createElement('img');
            enlargedImage.src = image;
            enlargedImage.classList.add('enlarged-image');
            enlargedContainer.appendChild(enlargedImage);

            // Create text corresponding to the image
            const loremText = document.createElement('div');
            loremText.classList.add('enlarged-text');
            loremText.innerHTML = texts[index]; // Use the corresponding text
            enlargedContainer.appendChild(loremText);
        });
    });

    const items = carouselInner.querySelectorAll('.carousel-item');
    const autoplayButton = document.getElementById('autoPlayToggle');
    let currentIndex = 0;
    let autoPlay = true;
    let autoPlayInterval = setInterval(showNextSlide, 5000);

    function showNextSlide() {
        items[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % items.length;
        items[currentIndex].classList.add('active');
    }

    function showPrevSlide() {
        items[currentIndex].classList.remove('active');
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        items[currentIndex].classList.add('active');
    }

    document.querySelector('.carousel-control-next').addEventListener('click', showNextSlide);
    document.querySelector('.carousel-control-prev').addEventListener('click', showPrevSlide);

    const allIndicators = document.querySelectorAll('.carousel-indicators li');
    allIndicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            items[currentIndex].classList.remove('active');
            currentIndex = index;
            items[currentIndex].classList.add('active');
        });
    });

    autoplayButton.addEventListener('click', function() {
        if (autoPlay) {
            clearInterval(autoPlayInterval);
            autoplayButton.textContent = "Auto Play Off";
            autoplayButton.classList.remove('autoplay-on');
            autoplayButton.classList.add('autoplay-off');
        } else {
            autoPlayInterval = setInterval(showNextSlide, 5000);
            autoplayButton.textContent = "Auto Play On";
            autoplayButton.classList.remove('autoplay-off');
            autoplayButton.classList.add('autoplay-on');
        }
        autoPlay = !autoPlay;
    });
});
// End of the Carousel JScript



// Get the Modal JScript
var modal = document.getElementById("imageModal");

// Get the image and insert it inside the modal - use its "alt" text as a caption
var images = document.querySelectorAll('.clickable-img');
var modalImg = document.getElementById("modalImage");
var captionText = document.getElementById("caption");

images.forEach(img => {
    img.onclick = function(){
        modal.style.display = "block";
        modalImg.src = this.src;
        captionText.innerHTML = this.alt;
    }
});

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// Close the modal if the user clicks outside of the image
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
// End of the Get the Modal JScript


// Planet selection and input JScript
document.getElementById('choice').addEventListener('change', function() {
    const selectedOptions = Array.from(this.selectedOptions).map(option => option.text);
    const inputField = document.getElementById('suggested');
    inputField.value = selectedOptions.join(', '); 
});

// Chosen planet "Select" button JScript
document.querySelector('.selectPlanet').addEventListener('click', function() {
    const chosenPlanet = document.getElementById('suggested').value.trim();
    if (chosenPlanet) {
        // Map the planets to their wikipedia URLs
        const planetURLs = {
            'Saturn': 'https://en.wikipedia.org/wiki/Saturn',
            'Jupiter': 'https://en.wikipedia.org/wiki/Jupiter',
            'Mars': 'https://en.wikipedia.org/wiki/Mars',
            'Venus': 'https://en.wikipedia.org/wiki/Venus',
            'Mercury': 'https://en.wikipedia.org/wiki/Mercury',
            'Earth': 'https://en.wikipedia.org/wiki/Earth',
            'Neptune': 'https://en.wikipedia.org/wiki/Neptune',
            'Uranus': 'https://en.wikipedia.org/wiki/Uranus',
        };

        // Redirect to the corresponding Wikipedia page
        const url = planetURLs[chosenPlanet];
        if(url) {
            window.open(url, '_blank'); // Open in a new tab
        } else {
            alert('No Wikipedia page found for ' + chosenPlanet);
        }
    } else {
        alert('Please select a planet. ')
    }
});

// End of Planet selection and input JScript


// Handle food selection
document.querySelectorAll('input[name="foodChoice"]').forEach((input) => {
    input.addEventListener('change', function() {
        const selectedFood = this.value;
        const hiddenMessage = document.getElementById('hiddenMessage');
        const selectedFoodSpan = document.getElementById('selectedFood');
        const foodAnswer = document.getElementById('foodAnswer');
        const countdown = document.getElementById('countdown');
        const confirmSelection = document.getElementById('confirmSelection');
        const correctMessage = document.getElementById('correctMessage');
        const incorrectMessage = document.getElementById('incorrectMessage');
        let timeLeft = 10;
        let timer;
        
        // Show hidden message and update the food name
        selectedFoodSpan.textContent = selectedFood;
        hiddenMessage.style.display = 'block';

        // Reset messages and countdown timer
        correctMessage.style.display = 'none';
        incorrectMessage.style.display = 'none';
        foodAnswer.style.display = 'block';
        confirmSelection.style.display = 'block';
        countdown.style.display = 'block';
        countdown.textContent = timeLeft;

        // Populate the dropdown based on the selected food
        foodAnswer.innerHTML = ''; // Clear existing options
        if (selectedFood === 'Hotdog') {
            foodAnswer.innerHTML = '<option value="3">3</option><option value="15">15</option><option value="7">7</option>';
        } else if (selectedFood === 'Cheeseburger') {
            foodAnswer.innerHTML = '<option value="6">6</option><option value="11">11</option><option value="8">8</option>';
        } else if (selectedFood === 'Baked Beans') {
            foodAnswer.innerHTML = '<option value="9">9</option><option value="2">2</option><option value="17">17</option>';
        }

        // Show countdown timer and start the countdown
        timer = setInterval(() => {
            timeLeft--;
            countdown.textContent = timeLeft; // Corrected this line
            if (timeLeft <= 0) {
                clearInterval(timer);
                incorrectMessage.style.display = 'block';  // Display the incorrect message
                confirmSelection.style.display = 'none'; // Hide the select button after time runs out
            }
        }, 1000);

        // Handles the user confirming the selection
        confirmSelection.onclick = function() {
            const selectedValue = foodAnswer.value;

            // Determine the correct answer based on the selected food
            let correctValue;
            if (selectedFood === 'Hotdog') {
                correctValue = '3';
            } else if (selectedFood === 'Cheeseburger') {
                correctValue = '6';
            } else if (selectedFood === 'Baked Beans') {
                correctValue = '9';
            }

            // Check if the user selected the correct value
            if (selectedValue === correctValue) {
                clearInterval(timer); // Stop the countdown timer
                correctMessage.style.display = 'block'; // Display the correct message
                document.getElementById('correctCount').textContent = correctValue;
                document.getElementById('selectedFoodCorrect').textContent = selectedFood;
            } else {
                clearInterval(timer); // Stop the current timer
                timeLeft = 3; // Speed up the timer to 3 seconds
                countdown.textContent = timeLeft;

                timer = setInterval(() => {
                    timeLeft--;
                    countdown.textContent = timeLeft; // Corrected this line
                    if (timeLeft <= 0) {
                        clearInterval(timer);
                        incorrectMessage.style.display = 'block'; // Display the incorrect message
                        confirmSelection.style.display = 'none'; // Hide the select button after time runs out
                    }
                }, 500); // Speed up the countdown timer
            }      
        };
    });
});


// End of food selection JScript