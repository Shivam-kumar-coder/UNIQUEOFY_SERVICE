const DATA = {
    categories: [
        { id: 'ac', name: 'AC Repair', img: '3d-repair-service.png' },
        { id: 'clean', name: 'Cleaning', img: '3d-deep-cleaning.png' }
    ],
    services: {
        'ac': [
            { name: 'AC Jet Service', price: '₹499', img: '3d-repair-service.png', desc: 'Deep high-pressure cleaning for indoor and outdoor units.' },
            { name: 'AC Gas Refill', price: '₹2500', img: '3d-repair-service.png', desc: 'Full gas charging with leakage check.' }
        ]
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const catGrid = document.getElementById('category-grid');
    const serviceCont = document.getElementById('services-container');

    // Load Categories
    catGrid.innerHTML = DATA.categories.map(c => `
        <div class="cat-card" onclick="loadServices('${c.id}')">
            <img src="${c.img}" onerror="this.src='https://via.placeholder.com/60'">
            <p>${c.name}</p>
        </div>
    `).join('');

    window.loadServices = (id) => {
        const list = DATA.services[id] || [];
        document.getElementById('section-title').innerText = id.toUpperCase() + " SERVICES";
        serviceCont.innerHTML = list.map(s => `
            <div class="service-list-item" onclick="openDetails('${s.name}', '${s.desc}', '${s.img}', '${s.price}')">
                <div class="s-info">
                    <h4>${s.name}</h4>
                    <span class="price">${s.price}</span>
                    <p class="limit-text">${s.desc}</p>
                </div>
                <div class="s-img">
                    <img src="${s.img}" onerror="this.src='https://via.placeholder.com/100'">
                    <button class="add-btn">ADD</button>
                </div>
            </div>
        `).join('');
    };

    window.openDetails = (name, desc, img, price) => {
        document.getElementById('detailTitle').innerText = name;
        document.getElementById('detailDesc').innerText = desc;
        document.getElementById('detailImg').src = img;
        document.getElementById('detailModal').style.display = 'block';
        window.currentOrder = { name, price };
    };

    document.getElementById('startBookingBtn').onclick = () => {
        document.getElementById('detailModal').style.display = 'none';
        document.getElementById('checkoutModal').style.display = 'block';
        if(localStorage.getItem('userIn')) showStep('stepBooking');
        else showStep('stepLogin');
    };

    window.sendOTP = () => {
        const ph = document.getElementById('userPhone').value;
        if(ph.length === 10) {
            document.getElementById('displayNum').innerText = ph;
            showStep('stepOTP');
        } else alert("Invalid Number");
    };

    window.confirmOrder = () => {
        const addr = document.getElementById('userAddress').value;
        if(addr.length > 10) showStep('stepOTP');
        else alert("Enter full address");
    };

    document.getElementById('finalVerifyBtn').onclick = () => {
        const otp = document.getElementById('otpInp').value;
        if(otp === '1234') {
            localStorage.setItem('userIn', 'true');
            localStorage.setItem('activeOrder', 'placed');
            alert("Order Placed!");
            location.reload();
        } else alert("Wrong OTP (Try 1234)");
    };

    function showStep(s) {
        ['stepLogin', 'stepBooking', 'stepOTP'].forEach(id => document.getElementById(id).style.display = (id==s?'block':'none'));
    }

    // Sidebar & Order check
    document.getElementById('menuToggle').onclick = () => document.getElementById('sideMenu').style.width = '250px';
    document.querySelectorAll('.close-btn').forEach(b => b.onclick = () => b.closest('.modal').style.display='none');
    
    if(localStorage.getItem('activeOrder')) document.getElementById('activeOrderSection').style.display = 'flex';
});



