// --- 1. SERVICE DATA (Tiered System: Categories -> Services) ---

const CATEGORIES = [
    // ⭐ IMPORTANT: Use these file names (3D Images) ⭐
    { id: 'home', name: 'Home Control', img: '3d-home-control.png' }, 
    { id: 'hospital', name: 'Hospital Maint.', img: '3d-hospital-maint.png' },
    { id: 'industrial', name: 'Industrial Maint.', img: '3d-industrial-maint.png' },
    { id: 'repairing', name: 'Appliance Repair', img: '3d-repair-service.png' },
    { id: 'painting', name: 'Painting & Civil', img: '3d-painting.png' },
    { id: 'cleaning', name: 'Deep Cleaning', img: '3d-deep-cleaning.png' }
];

const SERVICES_BY_CATEGORY = {
    'home': [
        // ⭐ IMPORTANT: Use these file names (AI Videos .mp4) ⭐
        { name: 'Deep Home Cleaning', desc: 'Full house deep cleaning service.', fileUrl: 'deep-cleaning-video.mp4' }, 
        { name: 'Pest Control', desc: 'Cockroach, Termite, and Mosquito solutions.', fileUrl: 'pest-control-video.mp4' },
        { name: 'Plumbing & Electric', desc: 'Urgent repairs and new installation.', fileUrl: 'plumbing-electric-video.mp4' }
    ],
    'hospital': [
        { name: 'Equipment AMC', desc: 'Annual Maintenance Contracts for devices.', fileUrl: 'hosp-amc-video.mp4' },
        { name: 'Sanitization Service', desc: 'High-grade hospital sanitization.', fileUrl: 'hosp-sanit-video.mp4' }
    ],
    'industrial': [
        { name: 'Heavy Machinery Repair', desc: 'Specialized machine maintenance.', fileUrl: 'ind-mach-repair.mp4' },
        { name: 'Facility Management', desc: 'Complete industrial facility upkeep.', fileUrl: 'ind-mgmt-video.mp4' }
    ],
    'repairing': [
        { name: 'AC Repair & Service', desc: 'All types of AC repair and gas refilling.', fileUrl: 'ac-repair-video.mp4' }
    ],
    'painting': [
        { name: 'Interior Painting', desc: 'Professional wall painting and texture work.', fileUrl: 'interior-paint-video.mp4' }
    ],
    'cleaning': [
        { name: 'Commercial Cleaning', desc: 'Office and store deep cleaning.', fileUrl: 'commercial-clean-video.mp4' }
    ]
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
    
    // --- Render Tier 1 (Category Icons - 3D Image Load) ---
    function renderCategories() {
        serviceTitle.innerHTML = '<h2>Choose a Category</h2>';
        servicesListContainer.className = 'category-icon-grid';
        
        servicesListContainer.innerHTML = CATEGORIES.map(cat => `
            <div class="category-icon-card" data-category-id="${cat.id}">
                <img src="${cat.img}" alt="${cat.name}" class="category-img">
                <p class="category-name">${cat.name}</p>
            </div>
        `).join('');
        
        attachCategoryListeners();
    }

    // --- Render Tier 2 (Service Cards - Video Load) ---
    function renderServiceCards(categoryId) {
        const categoryName = CATEGORIES.find(c => c.id === categoryId)?.name || 'Services';
        const services = SERVICES_BY_CATEGORY[categoryId] || [];
        
        serviceTitle.innerHTML = `<h2><button class="back-btn"><i class="fas fa-arrow-left"></i></button> ${categoryName} Services</h2>`;
        servicesListContainer.className = 'service-card-grid';

        if (services.length === 0) {
            servicesListContainer.innerHTML = `<p class="no-service-msg">Sorry, no services found in ${categoryName}.</p>`;
            return;
        }

        servicesListContainer.innerHTML = services.map(service => {
            
            const fileExtension = service.fileUrl.split('.').pop().toLowerCase();
            let mediaHTML;

            if (fileExtension === 'mp4' || fileExtension === 'webm') {
                // Video Logic: Autoplay, Loop, Muted
                mediaHTML = `
                    <div class="card-image">
                        <video class="service-video" autoplay loop muted playsinline>
                            <source src="${service.fileUrl}" type="video/${fileExtension}">
                            Your browser does not support the video tag.
                        </video>
                    </div>
                `;
            } else {
                // Image Fallback (If fileUrl is not video)
                mediaHTML = `<div class="card-image" style="background-image: url('${service.fileUrl}');"></div>`;
            }

            return `
                <div class="service-card-v2">
                    ${mediaHTML}
                    <div class="card-details">
                        <h4 class="card-title">${service.name}</h4>
                        <p class="card-description">${service.desc}</p>
                        <div class="card-actions">
                            <a href="tel:7870066085" class="btn btn-card-call"><i class="fas fa-phone-alt"></i> Call</a>
                            <button class="btn btn-card-book" data-service-name="${service.name}">Book</button> 
                        </div>
                    </div>
                </div>
            `;
        }).join('');
        
        attachServiceButtonListeners();
        document.getElementById('services-list').scrollIntoView({ behavior: 'smooth' });
    }

    // --- Attach Listeners & Modal Logic (Same as before) ---
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
                hiddenServiceName.name = 'entry.2005620554'; // Google Form Entry ID
                hiddenServiceName.value = serviceName;
                
                locationStatus.textContent = '';
                addressTextarea.value = '';

                modal.style.display = "block";
            });
        });

        document.querySelector('.back-btn')?.addEventListener('click', renderCategories);
    }
    
    // --- Geolocation Logic ---
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

    // --- Final Initialisation ---
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
    
    renderCategories();
    document.querySelector('.hero-explore-link')?.addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('services-list').scrollIntoView({ behavior: 'smooth' });
    });
});
