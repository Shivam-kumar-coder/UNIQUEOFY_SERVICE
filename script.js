// --- 1. SERVICE DATA (The Zomato/Swiggy Variable System) ---

// ⭐ UPDATE: Image paths ko sahi karein aur services add karein ⭐
const SERVICE_DATA = [
    { 
        id: 'home', 
        name: '🏠 HOME Services', 
        desc: 'Deep Cleaning, Pest Control, Plumbing, Electrician, and complete Home Maintenance Solutions.', 
        imgUrl: 'images/service-home.jpg'
    },
    { 
        id: 'hospital', 
        name: '🏥 HOSPITAL Services', 
        desc: 'Specialized Medical Equipment Maintenance, Facility Upkeep, and High-Grade Sanitization services.', 
        imgUrl: 'images/service-hospital.jpg'
    },
    { 
        id: 'industrial', 
        name: '🏭 INDUSTRIAL Services', 
        desc: 'Machinery Repair, Heavy Equipment Maintenance, and Industrial Facility Management solutions.', 
        imgUrl: 'images/service-industrial.jpg'
    },
    { 
        id: 'repairing', 
        name: '🔧 REPAIRING Services', 
        desc: 'All types of appliance and machinery repair services by certified technicians.', 
        imgUrl: 'images/service-repair.jpg'
    },
    { 
        id: 'painting', 
        name: '🎨 PAINTING Services', 
        desc: 'Professional interior and exterior painting, polishing, and waterproofing solutions.', 
        imgUrl: 'images/service-painting.jpg'
    },
    { 
        id: 'cleaning', 
        name: '🧹 CLEANING Services', 
        desc: 'Commercial and Residential deep cleaning services using eco-friendly products.', 
        imgUrl: 'images/service-cleaning.jpg'
    }
    // Aur services yahan add ki ja sakti hain...
];


// --- 2. CORE JAVASCRIPT LOGIC ---

document.addEventListener('DOMContentLoaded', () => {
    
    // Elements Setup
    const servicesListContainer = document.getElementById('services-list-container');
    const modal = document.getElementById("bookingModal");
    const closeBtn = document.querySelector(".close-btn");
    const serviceNameDisplay = document.getElementById("modalServiceName");
    const form = document.getElementById("serviceModalForm");
    
    // --- FUNCTION 1: Auto-Generate Service Cards ---
    function renderServiceCards() {
        if (!servicesListContainer) return;

        servicesListContainer.innerHTML = SERVICE_DATA.map(service => `
            <div class="service-card-v2" data-service-id="${service.id}">
                <div class="card-image" style="background-image: url('${service.imgUrl}');"></div> 
                <div class="card-details">
                    <h4 class="card-title">${service.name}</h4>
                    <p class="card-description">${service.desc}</p>
                    <div class="card-actions">
                        <a href="tel:7870066085" class="btn btn-card-call"><i class="fas fa-phone-alt"></i> Call Now</a>
                        <button class="btn btn-card-book" data-service-name="${service.name}">Book Now</button> 
                    </div>
                </div>
            </div>
        `).join('');
        
        // Attach event listeners to the new 'Book Now' buttons
        attachBookNowListeners();
    }
    
    // --- FUNCTION 2: Attach Listeners to 'Book Now' Buttons ---
    function attachBookNowListeners() {
        document.querySelectorAll('.btn-card-book').forEach(button => {
            button.addEventListener('click', function() {
                const serviceName = this.getAttribute('data-service-name');
                const hiddenServiceName = form.querySelector('#hiddenServiceName');
                
                serviceNameDisplay.textContent = serviceName; // Display service name in modal header
                
                // ⭐ UPDATE: Set the Google Form Entry ID for the Service Name field ⭐
                // Example IDs used in index.html (Check your form for correct IDs)
                hiddenServiceName.name = 'entry.2005620554'; 
                hiddenServiceName.value = serviceName;
                
                modal.style.display = "block"; // Show the modal
            });
        });
    }

    // --- FUNCTION 3: Modal and UX Logic ---
    
    // Close Modal when 'x' is clicked
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = "none";
        });
    }

    // Close Modal when clicking outside the modal box
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    // Form Submission Handling (UX: Success message and close)
    if (form) {
        form.addEventListener('submit', async (e) => {
            
            const submitButton = form.querySelector('.btn-submit-modal');
            const serviceName = form.querySelector('#hiddenServiceName').value || "your requested service";

            submitButton.textContent = 'Submitting...';
            submitButton.disabled = true;

            await new Promise(resolve => setTimeout(resolve, 1000));
            
            alert(`Thank you for your request for ${serviceName}! We will call you shortly.`);
            
            form.reset(); 
            modal.style.display = "none";
            
            submitButton.textContent = 'CONFIRM BOOKING';
            submitButton.disabled = false;
        });
    }

    // Run the function to build the service list when the page loads
    renderServiceCards();

    // Smooth scroll for 'Explore All Services' button (Better UX)
    const ctaButton = document.querySelector('.btn-primary-cta');
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    }
    
    console.log("UNIQUEOFY Services Service System Initialized.");
});
