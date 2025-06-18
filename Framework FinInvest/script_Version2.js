// Smooth scroll for navigation links
document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Contact form validation and fake submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const status = document.getElementById('formStatus');
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    status.style.color = "#0ead69";

    if (!name || !email || !message) {
        status.textContent = "Please fill in all fields.";
        status.style.color = "#d11a2a";
        return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
        status.textContent = "Please enter a valid email address.";
        status.style.color = "#d11a2a";
        return;
    }

    // Simulate sending...
    status.textContent = "Sending...";
    setTimeout(() => {
        status.textContent = "Thank you for contacting us, " + name + "! We'll get back to you soon.";
        document.getElementById('contactForm').reset();
    }, 1200);
});

// POPUP logic
function openPopup(popupId) {
    document.getElementById(popupId).classList.add('active');
    document.body.style.overflow = 'hidden';
}
function closePopup(popupElem) {
    popupElem.classList.remove('active');
    document.body.style.overflow = '';
}

// Service Learn More buttons
document.querySelectorAll('.info-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const popupId = btn.getAttribute('data-popup');
        openPopup(popupId);
    });
});

// Close popup buttons
document.querySelectorAll('.popup .close-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const popupElem = btn.closest('.popup');
        closePopup(popupElem);
    });
});

// Click outside popup closes it
document.querySelectorAll('.popup').forEach(popup => {
    popup.addEventListener('mousedown', function(e) {
        if (e.target === popup) {
            closePopup(popup);
        }
    });
});

// Login popup
document.getElementById('loginBtn').addEventListener('click', function(e) {
    e.preventDefault();
    openPopup('loginPopup');
});

// Login form validation (fake login)
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const status = document.getElementById('loginStatus');
    const user = document.getElementById('loginUsername').value.trim();
    const pass = document.getElementById('loginPassword').value;

    status.style.color = "#0ead69";

    if (!user || !pass) {
        status.textContent = "Please enter both username and password.";
        status.style.color = "#d11a2a";
        return;
    }

    status.textContent = "Logging in...";
    setTimeout(() => {
        if (user.toLowerCase() === "client" && pass === "bank123") {
            status.textContent = "Login successful! Welcome, " + user + ".";
            status.style.color = "#0ead69";
            setTimeout(() => {
                closePopup(document.getElementById('loginPopup'));
                status.textContent = "";
                document.getElementById('loginForm').reset();
            }, 1200);
        } else {
            status.textContent = "Invalid credentials. Please try again.";
            status.style.color = "#d11a2a";
        }
    }, 1000);
});

// ESC key closes any open popup
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        document.querySelectorAll('.popup.active').forEach(popup => {
            closePopup(popup);
        });
    }
});