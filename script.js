// --- 1. SERVICE DATA (Tiered System: Categories -> Services) ---

// Tier 1: Categories (Icons)
const CATEGORIES = [
    { id: 'home', name: 'Home Services', icon: 'fas fa-home', img: 'cat-home.png' },
    { id: 'hospital', name: 'Hospital Maint.', icon: 'fas fa-hospital', img: 'cat-hospital.png' },
    { id: 'industrial', name: 'Industrial Maint.', icon: 'fas fa-industry', img: 'cat-industry.png' },
    { id: 'repairing', name: 'Appliance Repair', icon: 'fas fa-wrench', img: 'cat-repair.png' },
    { id: 'painting', name: 'Painting & Civil', icon: 'fas fa-paint-roller', img: 'cat-painting.png' },
    { id: 'cleaning', name: 'Deep Cleaning', icon: 'fas fa-broom', img: 'cat-cleaning.png' }
];

// Tier 2: Services (Cards - Jo Category click karne par dikhenge)
const SERVICES_BY_CATEGORY = {
    'home': [
        { name: 'Deep Home Cleaning', desc: 'Full house deep cleaning.', imgUrl: 'service-home-clean.jpg' },
        { name: 'Pest Control', desc: 'Cockroach, Termite, and Mosquito.', imgUrl: 'service-pest.jpg' },
        { name: 'Plumbing & Electric', desc: 'Urgent repairs and installation.', imgUrl: 'service-plumb.jpg' }
    ],
    'hospital': [
        { name: 'Equipment AMC', desc: 'Annual Maintenance Contracts for Medical Equipment.', imgUrl: 'service-hosp-amc.jpg' },
        { name: 'Sanitization', desc: 'High-grade hospital sanitization.', imgUrl: 'service-hosp-sanit.jpg' }
    ],
    'industrial': [
        { name: 'Heavy Machinery Repair', desc: 'Specialized industrial machine maintenance.', imgUrl: 'service-ind-mach.jpg' },
        { name: 'Facility Management', desc: 'Complete facility upkeep.', imgUrl: 'service-ind-mgmt.jpg' }
    ],
    'repairing': [
        { name: 'AC Repair & Service', desc: 'All types of AC repair.', imgUrl: 'service-ac.jpg' }
    ],
    'painting': [
        { name: 'Interior Painting', desc: 'Professional wall painting.', imgUrl: 'service-paint.jpg' }
    ],
    'cleaning': [
        { name: 'Commercial Cleaning', desc: 'Office and store deep cleaning.', imgUrl: 'service-comm-clean.jpg' }
    ]
};

// --- 2. CORE JAVASCRIPT LOGIC ---
document.addEventListener('DOMContentLoaded', () => {
    const mainContent = document.getElementById('main-content');
    const servicesListContainer = document.getElementById('services-list-container');
    const serviceTitle = document.getElementById('service-list-title');
    const modal = document.getElementById("bookingModal");
    const closeBtn = document.querySelector(".close-btn");
    const serviceNameDisplay = document.getElementById("modalServiceName");
    const form = document.getElementById("serviceModalForm");
    
    let currentCategory = null;

    // --- FUNCTION 1: Render Tier 1 (Category Icons) ---
    function renderCategories() {
        serviceTitle.innerHTML = '<h2>Top Service Categories</h2>';
        servicesListContainer.className = 'category-icon-grid'; // Use icon grid CSS
        
        servicesListContainer.innerHTML = CATEGORIES.map(cat => `
            <div class="category-icon-card" data-category-id="${cat.id}">
                <img src="${cat.img}" alt="${cat.name}" class="category-img">
                <p class="category-name">${cat.name}</p>
            </div>
        `).join('');
        
        attachCategoryListeners();
    }

    // --- FUNCTION 2: Render Tier 2 (Service Cards) ---
    function renderServiceCards(categoryId) {
        currentCategory = categoryId;
        const categoryName = CATEGORIES.find(c => c.id === categoryId).name;
        const services = SERVICES_BY_CATEGORY[categoryId] || [];
        
        serviceTitle.innerHTML = `<h2><button class="back-btn"><i class="fas fa-arrow-left"></i></button> ${categoryName} Services</h2>`;
        servicesListContainer.className = 'service-card-grid'; // Use card grid CSS

        if (services.length === 0) {
            servicesListContainer.innerHTML = `<p class="no-service-msg">Sorry, no services found in ${categoryName}.</p>`;
            return;
        }

        servicesListContainer.innerHTML = services.map(service => `
            <div class="service-card-v2">
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
        
        attachServiceButtonListeners();
        
        // Scroll to the list after rendering
        document.getElementById('services-list').scrollIntoView({ behavior: 'smooth' });
    }

    // --- FUNCTION 3: Attach Category Click Listeners ---
    function attachCategoryListeners() {
        document.querySelectorAll('.category-icon-card').forEach(card => {
            card.addEventListener('click', function() {
                const categoryId = this.getAttribute('data-category-id');
                renderServiceCards(categoryId);
            });
        });
    }
    
    // --- FUNCTION 4: Attach Service Button Listeners (Book Now & Back Button) ---
    function attachServiceButtonListeners() {
        // Book Now Button Logic (Opens Modal)
        document.querySelectorAll('.btn-card-book').forEach(button => {
            button.addEventListener('click', function() {
                const serviceName = this.getAttribute('data-service-name');
                const hiddenServiceName = form.querySelector('#hiddenServiceName');
                
                serviceNameDisplay.textContent = serviceName;
                hiddenServiceName.name = 'entry.2005620554'; // ⭐ Google Form Entry ID
                hiddenServiceName.value = serviceName;
                
                modal.style.display = "block";
            });
        });

        // Back Button Logic (Goes back to Tier 1)
        document.querySelector('.back-btn')?.addEventListener('click', renderCategories);
    }
    
    // --- FUNCTION 5: Modal and Form Logic ---
    if (closeBtn) closeBtn.addEventListener('click', () => modal.style.display = "none");
    window.addEventListener('click', (event) => {
        if (event.target === modal) modal.style.display = "none";
    });

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
    
    // --- INITIAL RENDER ---
    renderCategories();

    // Smooth scroll for Search/Explore CTA
    document.querySelector('.hero-search-container a')?.addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('services-list').scrollIntoView({ behavior: 'smooth' });
    });
});
