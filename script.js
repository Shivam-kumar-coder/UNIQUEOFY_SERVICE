const CATEGORIES = [
    { id: 'home', name: 'Home Control', img: '3d-home-control.png' },
    { id: 'repairing', name: 'Appliance Repair', img: '3d-repair-service.png' }
];

const SERVICES = {
    'repairing': [
        { name: 'AC Repair & Service', desc: 'Gas charging, deep jet cleaning, and wiring fix with 30-day warranty.', img: 'ac-service.jpg', price: '₹499' },
        { name: 'Washing Machine Repair', desc: 'Expert motor and drum repair for all brands.', img: 'wm-repair.jpg', price: '₹299' }
    ]
};

document.addEventListener('DOMContentLoaded', () => {
    const catGrid = document.getElementById('category-grid');
    const serviceSection = document.getElementById('service-list-area');
    const serviceFeed = document.getElementById('services-feed');

    // 1. Render Categories (Grid Style like your image)
    catGrid.innerHTML = CATEGORIES.map(c => `
        <div class="cat-card" onclick="openServices('${c.id}')">
            <img src="${c.img}" onerror="this.src='https://via.placeholder.com/150'">
            <p>${c.name}</p>
        </div>
    `).join('');

    // 2. Show Services List
    window.openServices = (id) => {
        const list = SERVICES[id] || [];
        serviceFeed.innerHTML = list.map(s => `
            <div class="service-list-item" onclick="showDetail('${s.name}', '${s.desc}', '${s.img}')">
                <div class="s-info">
                    <h4>${s.name}</h4>
                    <p>${s.desc.substring(0, 45)}...</p>
                    <b style="color:var(--blue-primary)">${s.price}</b>
                </div>
                <div class="s-img-container">
                    <img src="${s.img}" onerror="this.src='https://via.placeholder.com/90'">
                    <button class="add-btn">ADD</button>
                </div>
            </div>
        `).join('');
        serviceSection.style.display = 'block';
        serviceSection.scrollIntoView({ behavior: 'smooth' });
    };

    // 3. Service Detail
    window.showDetail = (name, desc, img) => {
        document.getElementById('detName').innerText = name;
        document.getElementById('detDesc').innerText = desc;
        document.getElementById('detImg').src = img;
        document.getElementById('detailModal').style.display = 'block';
        window.tempService = name;
    };

    // 4. Booking Flow
    document.getElementById('bookNowBtn').onclick = () => {
        document.getElementById('detailModal').style.display = 'none';
        if(localStorage.getItem('userIn')) {
            document.getElementById('addressModal').style.display = 'block';
        } else {
            document.getElementById('loginModal').style.display = 'block';
        }
    };

    // 5. Final Confirm
    window.placeOrder = () => {
        const addr = document.getElementById('addrInput').value;
        if(addr.length < 10) return alert("Please enter full address");
        
        const order = { id: 'UNIQ' + Math.floor(Math.random()*9000), service: window.tempService };
        localStorage.setItem('activeOrder', JSON.stringify(order));
        alert("Booking Confirmed!");
        location.reload();
    };

    // Initial Order Check
    const active = JSON.parse(localStorage.getItem('activeOrder'));
    if(active) {
        document.getElementById('bookingStatus').style.display = 'block';
        document.getElementById('orderID').innerText = active.id;
    }
});
