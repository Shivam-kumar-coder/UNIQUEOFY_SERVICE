const DATA = {
    categories: [
        { id: 'ac', name: 'AC Repair', img: 'ac-3d.png' },
        { id: 'clean', name: 'Cleaning', img: 'clean-3d.png' }
    ],
    services: {
        'ac': [
            { name: 'AC Jet Service', price: '₹499', img: 'ac-jet.jpg', desc: 'Deep cleaning of indoor and outdoor units with high-pressure jet pump.' },
            { name: 'AC Gas Refill', price: '₹2500', img: 'ac-gas.jpg', desc: 'Full gas charging with leakage check.' }
        ]
    }
};

document.addEventListener('DOMContentLoaded', () => {
    renderCats();
    checkActiveOrder();

    // 1. Show Categories
    function renderCats() {
        const grid = document.getElementById('category-grid');
        grid.innerHTML = DATA.categories.map(c => `
            <div class="cat-card" onclick="renderServices('${c.id}')">
                <img src="${c.img}">
                <p>${c.name}</p>
            </div>
        `).join('');
    }

    // 2. Show Services (Zomato List)
    window.renderServices = (id) => {
        const container = document.getElementById('services-container');
        const services = DATA.services[id] || [];
        container.innerHTML = services.map(s => `
            <div class="service-list-item" onclick="openDetails('${s.name}', '${s.desc}', '${s.img}')">
                <div class="s-info">
                    <h4>${s.name}</h4>
                    <span class="price">${s.price}</span>
                    <p class="limit-text">${s.desc}</p>
                </div>
                <div class="s-img">
                    <img src="${s.img}">
                    <button class="add-btn">ADD</button>
                </div>
            </div>
        `).join('');
    };

    // 3. Open Detail Modal
    window.openDetails = (name, desc, img) => {
        document.getElementById('detailTitle').innerText = name;
        document.getElementById('detailDesc').innerText = desc;
        document.getElementById('detailImg').src = img;
        document.getElementById('detailModal').style.display = 'block';
    };

    // 4. Booking Logic
    document.getElementById('startBookingBtn').onclick = () => {
        document.getElementById('detailModal').style.display = 'none';
        document.getElementById('checkoutModal').style.display = 'block';
        
        // Agar pehle se login hai toh seedha address par bhejo
        if(localStorage.getItem('userLoggedIn')) {
            showStep('stepBooking');
        } else {
            showStep('stepLogin');
        }
    };

    // --- STEPS MANAGEMENT ---
    window.sendOTP = () => {
        const ph = document.getElementById('userPhone').value;
        if(ph.length === 10) {
            alert("OTP Sent: 1234");
            localStorage.setItem('tempPhone', ph);
            showStep('stepOTP');
        }
    };

    // FINAL ORDER
    window.confirmFinalOrder = () => {
        const addr = document.getElementById('userAddress').value;
        if(addr.length < 10) { alert("Please enter full address"); return; }
        
        // Yahan OTP mangenge confirm karne ke liye
        showStep('stepOTP');
    };

    document.getElementById('finalVerifyBtn').onclick = () => {
        const otp = document.getElementById('otpInp').value;
        if(otp === '1234') {
            const orderID = "UNIQ-" + Math.floor(1000 + Math.random() * 9000);
            localStorage.setItem('userLoggedIn', 'true');
            localStorage.setItem('activeOrder', JSON.stringify({id: orderID, status: 'Placed'}));
            alert("Booking Successful! Order ID: " + orderID);
            location.reload();
        } else {
            alert("Invalid OTP");
        }
    };

    function showStep(stepId) {
        ['stepLogin', 'stepBooking', 'stepOTP'].forEach(s => document.getElementById(s).style.display = 'none');
        document.getElementById(stepId).style.display = 'block';
    }

    function checkActiveOrder() {
        const order = JSON.parse(localStorage.getItem('activeOrder'));
        if(order) {
            document.getElementById('activeOrderSection').style.display = 'block';
            document.getElementById('miniStatus').innerText = order.status;
        }
    }

    // Modal close logic
    document.querySelectorAll('.close-btn').forEach(btn => {
        btn.onclick = () => btn.closest('.modal').style.display = 'none';
    });
});
