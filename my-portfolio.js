// Dark/Light Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.setAttribute('data-theme', 
        body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'
    );
    themeToggle.innerHTML = body.getAttribute('data-theme') === 'dark' 
        ? '<i class="fas fa-sun"></i>' 
        : '<i class="fas fa-moon"></i>';
});

// Smooth Scrolling for Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form Submission (Optional: Connect to backend)
document.getElementById("contact-form").addEventListener("submit", async function (e) {
    e.preventDefault();
    
    const form = e.target;
    const submitButton = form.querySelector('button[type="submit"]');
    const formStatus = document.getElementById("form-status");
    
    // Show loading state
    submitButton.disabled = true;
    submitButton.textContent = "Sending...";
    formStatus.textContent = "";
    formStatus.style.color = "";

    try {
        const response = await fetch(form.action, {
            method: "POST",
            body: new FormData(form),
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            formStatus.textContent = "Message sent successfully! I'll get back to you soon.";
            formStatus.style.color = "var(--primary)"; // Use your primary color
            form.reset();
        } else {
            const errorData = await response.json();
            if (errorData.errors) {
                formStatus.textContent = errorData.errors.map(error => error.message).join(", ");
            } else {
                formStatus.textContent = "Oops! Something went wrong. Please try again.";
            }
            formStatus.style.color = "#ff4444"; // Error color
        }
    } catch (error) {
        formStatus.textContent = "Network error. Please check your internet connection.";
        formStatus.style.color = "#ff4444";
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = "Send Message";
    }
});

// Typing animation script
document.addEventListener('DOMContentLoaded', function() {
    const typedTextSpan = document.querySelector('.typed-text');
    const cursorSpan = document.querySelector('.cursor');
    
    const textArray = ["I am a Full Stack Developer.","I am a Software Engineer.","Always Building.","Always Learning."];
    const typingDelay = 50;
    const erasingDelay = 50;
    const newTextDelay = 100; // Delay between current and next text
    let textArrayIndex = 0;
    let charIndex = 0;
    
    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } 
        else {
            cursorSpan.classList.remove("typing");
            setTimeout(erase, newTextDelay);
        }
    }
    
    function erase() {
        if (charIndex > 0) {
            if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } 
        else {
            cursorSpan.classList.remove("typing");
            textArrayIndex++;
            if(textArrayIndex>=textArray.length) textArrayIndex=0;
            setTimeout(type, typingDelay + 1100);
        }
    }
    
    // Start animation on load
    if(textArray.length) setTimeout(type, newTextDelay + 250);
});
document.getElementById("contact-form").addEventListener("submit", async function (e) {
    e.preventDefault();
    
    let form = e.target;
    let formStatus = document.getElementById("form-status");
    
    let formData = new FormData(form);

    try {
        let response = await fetch(form.action, {
            method: "POST",
            body: formData,
            headers: { "Accept": "application/json" }
        });

        if (response.ok) {
            formStatus.innerText = "Message sent successfully! I'll get back to you soon.";
            formStatus.style.color = "green";
            form.reset();
        } else {
            formStatus.innerText = "Oops! Something went wrong. Please try again.";
            formStatus.style.color = "red";
        }
    } catch (error) {
        formStatus.innerText = "Network error. Please check your internet connection.";
        formStatus.style.color = "red";
    }
});
