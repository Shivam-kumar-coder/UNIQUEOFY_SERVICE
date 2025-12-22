const CATEGORIES = [
    { id: 'home', name: 'Home Control', img: '3d-home-control.png' },
    { id: 'repairing', name: 'Appliance Repair', img: '3d-repair-service.png' },
    { id: 'painting', name: 'Painting & Civil', img: '3d-painting.png' }
];

const SERVICES_BY_CATEGORY = {
    'repairing': [
        { name: 'AC Repair & Service', desc: 'Expert gas charging and cleaning.', fileUrl: 'ac-repair-video.mp4' },
        { name: 'Washing Machine Repair', desc: 'Repair for all top brands.', fileUrl: 'wm-repair-video.mp4' }
    ]
};

document.addEventListener('DOMContentLoaded', () => {
    const listContainer = document.getElementById('services-list-container');
    const titleArea = document.getElementById('service-list-title');

    // 1. Initial Render
    function renderCats() {
        titleArea.innerHTML = '<h2>Choose a Category</h2>';
        listContainer.className = 'category-icon-grid';
        listContainer.innerHTML = CATEGORIES.map(c => `
            <div class="category-icon-card" onclick="openCat('${c.id}')">
                <img src="${c.img}" class="category-img" onerror="this.src='https://via.placeholder.com/100'">
                <p style="color:var(--primary-color); font-weight:bold;">${c.name}</p>
            </div>
        `).join('');
    }

    // 2. Open Category
    window.openCat = (id) => {
        const services = SERVICES_BY_CATEGORY[id] || [];
        titleArea.innerHTML = `<h2><i class="fas fa-arrow-left" onclick="location.reload()"></i> Services</h2>`;
        listContainer.className = 'service-card-grid';
        listContainer.innerHTML = services.map(s => `
            <div class="service-card-v2">
                <div class="card-image">
                    <video class="service-video" autoplay loop muted playsinline>
                        <source src="${s.fileUrl}" type="video/mp4">
                    </video>
                </div>
                <div class="card-details">
                    <h4>${s.name}</h4>
                    <p style="font-size:0.8rem; color:#666;">${s.desc}</p>
                    <button class="btn-card-book" onclick="attemptBook('${s.name}')">Book Now</button>
                </div>
            </div>
        `).join('');
    };

    // 3. Login & Booking Flow
    window.attemptBook = (name) => {
        window.selectedService = name;
        if (localStorage.getItem('isLogged') === 'true') {
            openBookingModal(name);
        } else {
            document.getElementById('loginModal').style.display = 'block';
        }
    };

    window.processLogin = () => {
        const ph = document.getElementById('loginPhone').value;
        if (ph.length === 10) {
            localStorage.setItem('isLogged', 'true');
            document.getElementById('loginModal').style.display = 'none';
            openBookingModal(window.selectedService);
        } else {
            alert("Enter 10 digit number");
        }
    };

    function openBookingModal(name) {
        document.getElementById('modalServiceName').innerText = name;
        document.getElementById('hiddenServiceName').value = name;
        document.getElementById('bookingModal').style.display = 'block';
    }

    // 4. Form Submit & Status
    document.getElementById('serviceModalForm').onsubmit = (e) => {
        e.preventDefault();
        const oid = 'UNIQ' + Math.floor(1000 + Math.random() * 9000);
        localStorage.setItem('activeOrder', oid);
        alert("Booking Done! ID: " + oid);
        location.reload();
    };

    // Check Active Order
    const active = localStorage.getItem('activeOrder');
    if (active) {
        document.getElementById('orderStatusContainer').style.display = 'block';
        document.getElementById('displayOrderID').innerText = active;
    }

    renderCats();
});

function closeLogin() { document.getElementById('loginModal').style.display = 'none'; }
