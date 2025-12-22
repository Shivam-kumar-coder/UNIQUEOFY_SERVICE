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
        { name: 'Pest Control', desc: 'Cockroach, Termite solutions.', fileUrl: 'pest-control-video.mp4' }
    ],
    'repairing': [
        { name: 'AC Repair & Service', desc: 'All types of AC repair and gas refilling.', fileUrl: 'ac-repair-video.mp4' }
    ],
    'painting': [
        { name: 'Interior Painting', desc: 'Professional wall painting.', fileUrl: 'interior-paint-video.mp4' }
    ]
};

document.addEventListener('DOMContentLoaded', () => {
    const servicesListContainer = document.getElementById('services-list-container');
    const serviceTitle = document.getElementById('service-list-title');
    const modal = document.getElementById("bookingModal");
    const sidebar = document.getElementById('sideMenu');
    const loginStep = document.getElementById('loginStep');
    const detailsStep = document.getElementById('detailsStep');
    const trackingBox = document.getElementById('liveTrackingBox');

    // --- INITIAL CHECK: Is User Logged In? ---
    function checkAuth() {
        const savedName = localStorage.getItem('uName');
        const savedPhone = localStorage.getItem('uPhone');
        if(savedName && savedPhone) {
            document.getElementById('sidebarName').innerText = "Hi, " + savedName;
            document.getElementById('sidebarPhone').innerText = savedPhone;
            document.getElementById('logoutBtn').style.display = "block";
            return true;
        }
        return false;
    }

    // --- SIDEBAR ---
    document.getElementById('sidebarToggle').onclick = () => sidebar.style.width = "250px";
    document.getElementById('logoutBtn').onclick = () => {
        localStorage.clear();
        location.reload();
    };

    // --- RENDERING (Your Original Logic) ---
    function renderCategories() {
        serviceTitle.innerHTML = '<h2>Choose a Category</h2>';
        servicesListContainer.className = 'category-icon-grid';
        servicesListContainer.innerHTML = CATEGORIES.map(cat => `
            <div class="category-icon-card" data-id="${cat.id}">
                <img src="${cat.img}" alt="${cat.name}" class="category-img">
                <p class="category-name">${cat.name}</p>
            </div>
        `).join('');
        
        document.querySelectorAll('.category-icon-card').forEach(card => {
            card.onclick = () => renderServices(card.getAttribute('data-id'));
        });
    }

    function renderServices(catId) {
        const services = SERVICES_BY_CATEGORY[catId] || [];
        serviceTitle.innerHTML = `<h2><button class="back-btn"><i class="fas fa-arrow-left"></i></button> ${catId.toUpperCase()}</h2>`;
        servicesListContainer.className = 'service-card-grid';
        servicesListContainer.innerHTML = services.map(s => `
            <div class="service-card-v2">
                <div class="card-image"><video autoplay loop muted playsinline><source src="${s.fileUrl}"></video></div>
                <div class="card-details" style="padding:15px;">
                    <h4 class="card-title">${s.name}</h4>
                    <p style="font-size:12px; color:#666;">${s.desc}</p>
                    <button class="btn btn-card-book" data-name="${s.name}" style="margin-top:10px; background:var(--primary-color); color:white; width:100%;">Book Now</button>
                </div>
            </div>
        `).join('');

        document.querySelector('.back-btn').onclick = renderCategories;
        document.querySelectorAll('.btn-card-book').forEach(btn => {
            btn.onclick = () => {
                document.getElementById('modalServiceName').innerText = btn.getAttribute('data-name');
                modal.style.display = "block";
                if(checkAuth()) {
                    loginStep.style.display = "none";
                    detailsStep.style.display = "block";
                } else {
                    loginStep.style.display = "block";
                    detailsStep.style.display = "none";
                }
            };
        });
    }

    // --- LOGIN & BOOKING ---
    document.getElementById('proceedToBook').onclick = () => {
        const name = document.getElementById('loginName').value;
        const phone = document.getElementById('loginPhone').value;
        if(name && phone) {
            localStorage.setItem('uName', name);
            localStorage.setItem('uPhone', phone);
            checkAuth();
            loginStep.style.display = "none";
            detailsStep.style.display = "block";
        } else { alert("Please fill all details"); }
    };

    document.getElementById('serviceModalForm').onsubmit = (e) => {
        e.preventDefault();
        const orderID = "UNIQ" + Math.floor(1000 + Math.random() * 9000);
        const orderData = {
            id: orderID,
            service: document.getElementById('modalServiceName').innerText,
            address: document.getElementById('userAddress').value,
            status: 'placed'
        };
        localStorage.setItem('activeOrder', JSON.stringify(orderData));
        modal.style.display = "none";
        showTracking(orderData);
        alert("Booking Confirmed! ID: " + orderID);
    };

    function showTracking(data) {
        if(!data) return;
        trackingBox.style.display = "block";
        document.getElementById('trackOrderID').innerText = "Order ID: " + data.id;
    }

    // Initializations
    document.querySelector('.close-btn').onclick = () => modal.style.display = "none";
    document.getElementById('closeTracking').onclick = () => trackingBox.style.display = "none";
    
    // Check for existing orders on load
    const activeOrder = JSON.parse(localStorage.getItem('activeOrder'));
    if(activeOrder) showTracking(activeOrder);
    
    checkAuth();
    renderCategories();
});
