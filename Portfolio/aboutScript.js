// Flexbox-design for the about page,
// Clickable images, pop-up blog...
document.querySelectorAll('.clickable-img').forEach((img, index) => {
    img.addEventListener('click', () => {
        // Set the content of the pop-out based on the image clicked
        const popoutTitle = document.getElementById('popout-title');
        const popoutText = document.getElementById('popout-text');
        const popoutImage = document.getElementById('popout-image');

        switch (index) {
            case 0:
                popoutTitle.textContent = 'Blog Post Title 1';
                popoutText.textContent = 'This is the first blog post. It is very interesting and informative...';
                popoutImage.src = '/WebDesignSummer24/Portfolio/images/SoftwareEngineer_AFAM_Female.png';
                break;
            case 1:
                popoutTitle.textContent = 'Blog Post Title 2';
                popoutText.textContent = 'This is the second blog post. It is also very interesting and informative...';
                popoutImage.src = '/WebDesignSummer24/Portfolio/images/SoftwareEngineer_AFAM_Male.png';
                break;
            case 2:
                popoutTitle.textContent = 'Blog Post Title 3';
                popoutText.textContent = 'This is the third blog post. It is the third most interesting and informative post...';
                popoutImage.src = '/WebDesignSummer24/Portfolio/images/SoftwareEngineer_MeXAM_Female.png';
                break;
        }
        // Show the pop-out
        document.getElementById('popout-container').classList.remove('hidden');
    });
});

// Close the pop-out when the close button is clicked
document.getElementById('close-popout').addEventListener('click', () => {
    document.getElementById('popout-container').classList.add('hidden');
});
/* End of Clickable images, pop-up blog */

// Marquee JScript
const root = document.documentElement;
const marqueeElementsDisplayed = getComputedStyle(root).getPropertyValue("--marquee-elements-displayed");
const marqueeContent = document.querySelector("ul.marquee-content");

root.style.setProperty("--marquee-elements", marqueeContent.children.length);

for (let i = 0; i < marqueeElementsDisplayed; i++) {
    marqueeContent.appendChild(marqueeContent.children[i].cloneNode(true));
}
// End of Marquee JScript


