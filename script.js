// --- Modal (Popup Form) Logic ---

document.addEventListener('DOMContentLoaded', () => {
    
    const modal = document.getElementById("bookingModal");
    const closeBtn = document.querySelector(".close-btn");
    const serviceNameDisplay = document.getElementById("modalServiceName");
    const hiddenServiceName = document.getElementById("hiddenServiceName");
    const form = document.getElementById("serviceModalForm");
    const ctaButton = document.querySelector('.btn-primary-cta');
    
    // Smooth scroll for 'Explore All Services' button (Better UX)
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    }

    // 1. Open Modal when 'Book Now' is clicked (The core functionality)
    document.querySelectorAll('.btn-card-book').forEach(button => {
        button.addEventListener('click', function() {
            const serviceName = this.getAttribute('data-service');
            
            // Set the Service Name in the Modal header
            serviceNameDisplay.textContent = serviceName; 
            
            // Set the hidden field value which goes to Google Sheet
            // NOTE: 'entry.12345678' ko Google Form ki Sahi Entry ID se badalna hai.
            hiddenServiceName.name = 'entry.12345678'; 
            hiddenServiceName.value = serviceName; 
            
            modal.style.display = "block"; // Show the modal
        });
    });

    // 2. Close Modal when 'x' is clicked
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = "none";
        });
    }

    // 3. Close Modal when clicking outside the modal box
    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });
    
    // 4. Form Submission Handling (UX: Success message and close)
    if (form) {
        form.addEventListener('submit', async (e) => {
            // Because we are using target="_blank" in HTML, the form will submit 
            // to Google Forms in a new tab without refreshing the main page. 
            // We just provide a good UX feedback here.
            
            const submitButton = form.querySelector('.btn-submit-modal');
            submitButton.textContent = 'Submitting...';
            submitButton.disabled = true;

            // Simulate small delay for better feel
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Show Success Message
            alert(`Thank you for your request for ${hiddenServiceName.value}! We will call you shortly.`);
            
            // Reset and close the form
            form.reset(); 
            modal.style.display = "none";
            
            submitButton.textContent = 'CONFIRM BOOKING';
            submitButton.disabled = false;
        });
    }

    console.log("UNIQUEOFY Services Modal System Initialized.");
});
