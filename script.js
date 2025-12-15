// --- 1. SERVICE DATA (Tiered System: Categories -> Services) ---
// Note: Category 'img' names and Service 'imgUrl' names ko aapke AI generated image names se replace karna hoga.

const CATEGORIES = [
    { id: 'home', name: 'Home Control', img: 'cat-home.png' }, // Example Image Name
    { id: 'hospital', name: 'Hospital Maint.', img: 'cat-hospital.png' },
    { id: 'industrial', name: 'Industrial Maint.', img: 'cat-industry.png' },
    { id: 'repairing', name: 'Appliance Repair', img: 'cat-repair.png' },
    { id: 'painting', name: 'Painting & Civil', img: 'cat-painting.png' },
    { id: 'cleaning', name: 'Deep Cleaning', img: 'cat-cleaning.png' }
];

const SERVICES_BY_CATEGORY = {
    'home': [
        { name: 'Deep Home Cleaning', desc: 'Full house deep cleaning.', imgUrl: 'service-home-clean.jpg' },
        { name: 'Pest Control', desc: 'Cockroach, Termite, and Mosquito.', imgUrl: 'service-pest.jpg' },
        { name: 'Plumbing & Electric', desc: 'Urgent repairs and installation.', imgUrl: 'service-plumb.jpg' }
    ],
    'hospital': [
        { name: 'Equipment AMC', desc: 'Annual Maintenance Contracts.', imgUrl: 'service-hosp-amc.jpg' },
    ],
    // ... Add all other category services here
};

// --- 2. CORE JAVASCRIPT LOGIC ---
document.addEventListener('DOMContentLoaded', () => {
    const servicesListContainer = document.getElementById('services-list-container');
    const serviceTitle = document.getElementById('service-list-title');
    const modal = document.getElementById("bookingModal");
    const closeBtn = document.querySelector(".close-btn");
    const serviceNameDisplay = document.getElementById("modalServiceName");
    const form = document.getElementById("serviceModalForm");
    
    // Location Elements
    const locationBtn = document.getElementById('getLocationBtn');
    const addressTextarea = document.getElementById('userAddress');
    const locationStatus = document.getElementById('locationStatus');
    
    // --- Render Tier 1 (Category Icons) ---
    function renderCategories() {
        serviceTitle.innerHTML = '<h2>Choose a Category</h2>';
        servicesListContainer.className = 'category-icon-grid';
        
        // Rendering the cute category cards
        servicesListContainer.innerHTML = CATEGORIES.map(cat => `
            <div class="category-icon-card" data-category-id="${cat.id}">
                <div class="category-img" style="background-image: url('${cat.img}'); background-size: cover; background-position: center;"></div> 
                <p class="category-name">${cat.name}</p>
            </div>
        `).join('');
        
        attachCategoryListeners();
    }

    // --- Render Tier 2 (Service Cards) ---
    function renderServiceCards(categoryId) {
        const categoryName = CATEGORIES.find(c => c.id === categoryId).name;
        const services = SERVICES_BY_CATEGORY[categoryId] || [];
        
        serviceTitle.innerHTML = `<h2><button class="back-btn"><i class="fas fa-arrow-left"></i></button> ${categoryName} Services</h2>`;
        servicesListContainer.className = 'service-card-grid';

        if (services.length === 0) {
            servicesListContainer.innerHTML = `<p class="no-service-msg">Sorry, no services found in ${categoryName}.</p>`;
            return;
        }

        // Rendering the finished service cards
        servicesListContainer.innerHTML = services.map(service => `
            <div class="service-card-v2">
                <div class="card-image" style="background-image: url('${service.imgUrl}');"></div> 
                <div class="card-details">
                    <h4 class="card-title">${service.name}</h4>
                    <p class="card-description">${service.desc}</p>
                    <div class="card-actions">
                        <a href="tel:7870066085" class="btn btn-card-call"><i class="fas fa-phone-alt"></i> Call</a>
                        <button class="btn btn-card-book" data-service-name="${service.name}">Book</button> 
                    </div>
                </div>
            </div>
        `).join('');
        
        attachServiceButtonListeners();
        document.getElementById('services-list').scrollIntoView({ behavior: 'smooth' });
    }

    // --- Attach Listeners (Same Logic) ---
    function attachCategoryListeners() {
        document.querySelectorAll('.category-icon-card').forEach(card => {
            card.addEventListener('click', function() {
                renderServiceCards(this.getAttribute('data-category-id'));
            });
        });
    }
    
    function attachServiceButtonListeners() {
        document.querySelectorAll('.btn-card-book').forEach(button => {
            button.addEventListener('click', function() {
                const serviceName = this.getAttribute('data-service-name');
                const hiddenServiceName = form.querySelector('#hiddenServiceName');
                
                serviceNameDisplay.textContent = serviceName;
                hiddenServiceName.name = 'entry.2005620554'; 
                hiddenServiceName.value = serviceName;
                
                // Reset location on modal open
                locationStatus.textContent = '';
                addressTextarea.value = '';

                modal.style.display = "block";
            });
        });

        document.querySelector('.back-btn')?.addEventListener('click', renderCategories);
    }
    
    // --- Geolocation Logic (The Location Fix) ---
    if (locationBtn) {
        locationBtn.addEventListener('click', () => {
            locationStatus.textContent = 'Fetching location...';
            
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const lat = position.coords.latitude;
                        const lon = position.coords.longitude;
                        addressTextarea.value = `Live Location: Latitude ${lat}, Longitude ${lon}. (Please specify full address if needed)`;
                        locationStatus.textContent = '✅ Location Fetched Successfully!';
                        
                        locationBtn.disabled = true;
                        locationBtn.textContent = 'Location Added';
                        setTimeout(() => {
                             locationBtn.disabled = false;
                             locationBtn.innerHTML = '<i class="fas fa-location-arrow"></i> Use My Current Location';
                        }, 5000);
                    },
                    (error) => {
                        console.error("Geolocation Error: ", error);
                        if (error.code === error.PERMISSION_DENIED) {
                            locationStatus.textContent = '❌ Location access denied. Please enter address manually.';
                        } else {
                            locationStatus.textContent = '❌ Could not get location. Please enter address.';
                        }
                    },
                    { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
                );
            } else {
                locationStatus.textContent = '❌ Geolocation is not supported by this browser.';
            }
        });
    }

    // --- Modal and Form Logic ---
    if (closeBtn) closeBtn.addEventListener('click', () => modal.style.display = "none");
    window.addEventListener('click', (event) => {
        if (event.target === modal) modal.style.display = "none";
    });

    if (form) {
        form.addEventListener('submit', async (e) => {
            const submitButton = form.querySelector('.btn-submit-modal');
            submitButton.textContent = 'Submitting...';
            submitButton.disabled = true;

            await new Promise(resolve => setTimeout(resolve, 1000));
            
            alert(`Thank you for your request! We will call you shortly.`);
            
            form.reset(); 
            modal.style.display = "none";
            
            submitButton.textContent = 'CONFIRM BOOKING';
            submitButton.disabled = false;
        });
    }
    
    // INITIAL RENDER and Smooth scroll
    renderCategories();
    document.querySelector('.hero-explore-link')?.addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('services-list').scrollIntoView({ behavior: 'smooth' });
    });
});
