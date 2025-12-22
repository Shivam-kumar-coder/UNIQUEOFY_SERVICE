// --- 1. YOUR SERVICE DATA ---
const CATEGORIES = [
    { id: 'home', name: 'Home Control', img: '3d-home-control.png' }, 
    { id: 'hospital', name: 'Hospital Maint.', img: '3d-hospital-maint.png' },
    { id: 'industrial', name: 'Industrial Maint.', img: '3d-industrial-maint.png' },
    { id: 'repairing', name: 'Appliance Repair', img: '3d-repair-service.png' },
    { id: 'painting', name: 'Painting & Civil', img: '3d-painting.png' },
    { id: 'cleaning', name: 'Deep Cleaning', img: '3d-deep-cleaning.png' }
];

const SERVICES_BY_CATEGORY = {
    'home': [
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

// --- 2. CORE LOGIC ---
document.addEventListener('DOMContentLoaded', () => {
    const servicesListContainer = document.getElementById('services-list-container');
    const serviceTitle = document.getElementById('service-list-title');
    const modal = document.getElementById("bookingModal");
    const closeBtn = document.querySelector(".close-btn");
    const serviceNameDisplay = document.getElementById("modalServiceName");
    const form = document.getElementById("serviceModalForm");
    
    // Elements for New Features
    const sidebar = document.getElementById('sideMenu');
    const sidebarBtn = document.getElementById('sidebarToggle');
    const trackingBox = document.getElementById('liveTrackingBox');

    // Sidebar Toggle
    sidebarBtn.onclick = () => sidebar.style.width = "250px";
    window.addEventListener('click', (e) => {
        if (!sidebar.contains(e.target) && e.target !== sidebarBtn) sidebar.style.width = "0";
    });

    // --- YOUR RENDERING FUNCTIONS (UNCHANGED) ---
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

    function renderServiceCards(categoryId) {
        const categoryName = CATEGORIES.find(c => c.id === categoryId)?.name || 'Services';
        const services = SERVICES_BY_CATEGORY[categoryId] || [];
        serviceTitle.innerHTML = `<h2><button class="back-btn"><i class="fas fa-arrow-left"></i></button> ${categoryName} Services</h2>`;
        servicesListContainer.className = 'service-card-grid';

        servicesListContainer.innerHTML = services.map(service => {
            const fileExtension = service.fileUrl.split('.').pop().toLowerCase();
            let mediaHTML = (fileExtension === 'mp4' || fileExtension === 'webm') 
                ? `<div class="card-image"><video class="service-video" autoplay loop muted playsinline><source src="${service.fileUrl}" type="video/${fileExtension}"></video></div>`
                : `<div class="card-image" style="background-image: url('${service.fileUrl}'); background-size:cover;"></div>`;

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

    function attachCategoryListeners() {
        document.querySelectorAll('.category-icon-card').forEach(card => {
            card.onclick = () => renderServiceCards(card.getAttribute('data-category-id'));
        });
    }

    function attachServiceButtonListeners() {
        document.querySelectorAll('.btn-card-book').forEach(button => {
            button.onclick = () => {
                const serviceName = button.getAttribute('data-service-name');
                serviceNameDisplay.textContent = serviceName;
                document.getElementById('hiddenServiceName').value = serviceName;
                modal.style.display = "block";
            };
        });
        document.querySelector('.back-btn')?.addEventListener('click', renderCategories);
    }

    // --- FORM & TRACKING LOGIC ---
    form.addEventListener('submit', (e) => {
        // User details capture
        const name = document.getElementById('formUserName').value;
        const phone = document.getElementById('formUserPhone').value;

        // Update UI
        document.getElementById('userNameSidebar').innerText = "Hi, " + name;
        document.getElementById('userPhoneSidebar').innerText = phone;
        trackingBox.style.display = "block";

        alert(`Thank you ${name}! Booking for ${serviceNameDisplay.textContent} is placed.`);
        modal.style.display = "none";
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // --- YOUR LOCATION LOGIC (UNCHANGED) ---
    const locationBtn = document.getElementById('getLocationBtn');
    const addressTextarea = document.getElementById('userAddress');
    const locationStatus = document.getElementById('locationStatus');

    if (locationBtn) {
        locationBtn.addEventListener('click', () => {
            locationStatus.textContent = 'Fetching location...';
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((p) => {
                    addressTextarea.value = `Live: Lat ${p.coords.latitude}, Lon ${p.coords.longitude}`;
                    locationStatus.textContent = '✅ Location Added!';
                }, () => { locationStatus.textContent = '❌ Error fetching location.'; });
            }
        });
    }

    closeBtn.onclick = () => modal.style.display = "none";
    renderCategories();
});
