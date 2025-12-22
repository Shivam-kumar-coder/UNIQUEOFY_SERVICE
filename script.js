const CAT_DATA = [
    { id: 'home', name: 'Home Control', img: '3d-home-control.png' },
    { id: 'repairing', name: 'Appliance Repair', img: '3d-repair-service.png' }
];

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('services-list-container');
    
    // 1. Render Categories
    container.innerHTML = CAT_DATA.map(c => `
        <div class="category-icon-card" onclick="selectService('${c.name}')">
            <img src="${c.img}" class="category-img" onerror="this.src='https://via.placeholder.com/100'">
            <p style="font-weight:600; font-size:0.9rem; color:#333;">${c.name}</p>
        </div>
    `).join('');

    // 2. Logic to handle Book/Login
    window.selectService = (name) => {
        window.tempService = name;
        if (localStorage.getItem('isLogged') === 'true') {
            showBooking(name);
        } else {
            document.getElementById('loginModal').style.display = 'block';
        }
    };

    window.handleOTP = () => {
        const ph = document.getElementById('userPhone').value;
        if(ph.length === 10) {
            localStorage.setItem('isLogged', 'true');
            localStorage.setItem('phone', ph);
            document.getElementById('loginModal').style.display = 'none';
            showBooking(window.tempService);
        } else {
            alert("Enter valid mobile number");
        }
    };

    function showBooking(name) {
        document.getElementById('modalServiceName').innerText = name;
        document.getElementById('bookingModal').style.display = 'block';
    }

    // 3. Final Form Submission
    document.getElementById('finalBookingForm').onsubmit = (e) => {
        e.preventDefault();
        const orderId = 'UNIQ' + Math.floor(1000 + Math.random() * 9000);
        localStorage.setItem('activeOrder', JSON.stringify({id: orderId, name: window.tempService}));
        alert("Booking Confirmed!");
        location.reload();
    };

    // 4. Status Check
    const active = JSON.parse(localStorage.getItem('activeOrder'));
    if(active) {
        document.getElementById('orderStatusContainer').style.display = 'block';
        document.getElementById('displayOrderID').innerText = active.id;
    }
});

window.closeModal = (id) => document.getElementById(id).style.display = 'none';
