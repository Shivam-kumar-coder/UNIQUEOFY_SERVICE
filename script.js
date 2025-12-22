const CATEGORIES = [
    { id: 'repairing', name: 'Appliance Repair', img: 'https://cdn-icons-png.flaticon.com/512/900/900667.png' },
    { id: 'home', name: 'Home Control', img: 'https://cdn-icons-png.flaticon.com/512/619/619153.png' },
    { id: 'cleaning', name: 'Deep Cleaning', img: 'https://cdn-icons-png.flaticon.com/512/2954/2954893.png' }
];

const SERVICES = {
    'repairing': [
        { id: 101, name: 'AC Service & Repair', desc: 'Expert gas refilling, jet cleaning and component repair with 30 days warranty.', img: 'https://media.istockphoto.com/id/1152083162/photo/repairman-repairing-air-conditioning-business.jpg?s=612x612&w=0&k=20&c=qP9k8N9pG9I6Y_M_O_k0k8zI4k7p_Y_zX-o9_h1g1eE=' },
        { id: 102, name: 'Washing Machine Repair', desc: 'Solution for all drum, motor and water leakage issues for all brands.', img: 'https://plus.unsplash.com/premium_photo-1664372599757-5e608226079c?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d2FzaGluZyUyMG1hY2hpbmUlMjByZXBhaXJ8ZW58MHx8MHx8fDA%3D' }
    ],
    'cleaning': [
        { id: 201, name: 'Full Home Cleaning', desc: 'Deep cleaning of bathrooms, kitchen and rooms using professional tools.', img: 'https://media.istockphoto.com/id/1144212973/photo/cleaning-service-concept.jpg?s=612x612&w=0&k=20&c=pP8X_7Kz9Z1-uY9p-G-U2D-qY-9zL8xI1O_X_eY_y0o=' }
    ]
};

document.addEventListener('DOMContentLoaded', () => {
    let isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    let selectedService = null;

    // 1. Render Categories
    const catContainer = document.getElementById('category-container');
    catContainer.innerHTML = CATEGORIES.map(c => `
        <div class="cat-card" onclick="showServices('${c.id}')">
            <img src="${c.img}">
            <p>${c.name}</p>
        </div>
    `).join('');

    // 2. Show Services (Zomato Style)
    window.showServices = (catId) => {
        const section = document.getElementById('services-section');
        const feed = document.getElementById('services-feed');
        const title = document.getElementById('selected-cat-title');
        
        const list = SERVICES[catId] || [];
        if(list.length === 0) return;

        title.innerText = catId.toUpperCase() + " SERVICES";
        feed.innerHTML = list.map(s => `
            <div class="service-card" onclick="viewServiceDetail(${JSON.stringify(s).replace(/"/g, '&quot;')})">
                <div class="s-info">
                    <h4>${s.name}</h4>
                    <p>${s.desc.substring(0, 50)}...</p>
                    <span style="color:var(--primary); font-weight:700;">View Details</span>
                </div>
                <div class="s-img-box">
                    <img src="${s.img}">
                    <button class="book-btn-sm">VIEW</button>
                </div>
            </div>
        `).join('');

        section.style.display = 'block';
        section.scrollIntoView({ behavior: 'smooth' });
    };

    // 3. Service Details
    window.viewServiceDetail = (service) => {
        selectedService = service;
        document.getElementById('detailName').innerText = service.name;
        document.getElementById('detailDesc').innerText = service.desc;
        document.getElementById('detailImg').src = service.img;
        document.getElementById('detailModal').style.display = 'block';
    };

    // 4. Proceed to Book (Check Login)
    document.getElementById('proceedToBook').onclick = () => {
        if(!isLoggedIn) {
            document.getElementById('authModal').style.display = 'block';
        } else {
            openBookingForm();
        }
    };

    function openBookingForm() {
        document.getElementById('detailModal').style.display = 'none';
        document.getElementById('bookingModal').style.display = 'block';
    }

    // 5. Auth Logic
    document.getElementById('sendOTP').onclick = () => {
        const ph = document.getElementById('userMobile').value;
        if(ph.length === 10) {
            document.getElementById('loginSection').style.display = 'none';
            document.getElementById('otpSection').style.display = 'block';
        } else { alert("Enter valid number"); }
    };

    document.getElementById('verifyOTP').onclick = () => {
        const otp = document.getElementById('otpValue').value;
        if(otp === '1234') {
            localStorage.setItem('isLoggedIn', 'true');
            isLoggedIn = true;
            document.getElementById('authModal').style.display = 'none';
            openBookingForm();
        } else { alert("Wrong OTP (Try 1234)"); }
    };

    // 6. Confirm Order
    document.getElementById('finalConfirmBtn').onclick = () => {
        const address = document.getElementById('fullAddress').value;
        if(address.length < 10) { alert("Enter full address with Landmark"); return; }
        
        const orderID = "UNIQ-" + Math.floor(1000 + Math.random() * 9000);
        const orderData = { id: orderID, name: selectedService.name, status: 'Placed' };
        
        localStorage.setItem('activeOrder', JSON.stringify(orderData));
        alert("Success! Your booking ID: " + orderID);
        location.reload();
    };

    // 7. Check Order on Load
    const order = JSON.parse(localStorage.getItem('activeOrder'));
    if(order) {
        document.getElementById('orderStatusCard').style.display = 'block';
        document.getElementById('displayOrderID').innerText = order.id;
    }

    // Common UI Close
    document.querySelectorAll('.close-modal').forEach(b => b.onclick = () => {
        document.querySelectorAll('.modal').forEach(m => m.style.display = 'none');
    });

    document.getElementById('sidebarToggle').onclick = () => document.getElementById('sideMenu').style.width = "260px";
});
