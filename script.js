// Data remain the same as your code
const CATEGORIES = [
    { id: 'home', name: 'Home Control', img: '3d-home-control.png' },
    { id: 'repairing', name: 'Appliance Repair', img: '3d-repair-service.png' }
];

const SERVICES = {
    'repairing': [{ name: 'AC Repair', desc: 'Gas refilling & Service', fileUrl: 'ac.mp4' }]
};

document.addEventListener('DOMContentLoaded', () => {
    // 1. Check Login Status
    let isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    updateProfileUI();

    // 2. Auth Logic (OTP Mockup)
    const authModal = document.getElementById('authModal');
    const sendOTPBtn = document.getElementById('sendOTP');
    const verifyOTPBtn = document.getElementById('verifyOTP');

    sendOTPBtn.onclick = () => {
        const phone = document.getElementById('userMobile').value;
        if(phone.length === 10) {
            document.getElementById('loginSection').style.display = 'none';
            document.getElementById('otpSection').style.display = 'block';
            document.getElementById('sentNumber').innerText = "+91 " + phone;
            console.log("OTP Sent: 1234"); // For testing
        } else { alert("Enter valid 10-digit number"); }
    };

    verifyOTPBtn.onclick = () => {
        const otp = document.getElementById('otpValue').value;
        if(otp === '1234') { // Mock OTP
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('uPhone', document.getElementById('userMobile').value);
            location.reload();
        } else { alert("Invalid OTP! Try 1234"); }
    };

    // 3. Booking & Address Logic
    const finalConfirmBtn = document.getElementById('finalConfirmBtn');
    finalConfirmBtn.onclick = () => {
        const address = document.getElementById('fullAddress').value;
        if(address.length < 10) {
            alert("Please enter a complete address for service.");
            return;
        }

        const payMode = document.querySelector('input[name="pay"]:checked').value;
        const orderID = "UNIQ-" + Date.now().toString().slice(-6);

        if(payMode === 'ONLINE') {
            alert("Redirecting to Secure Payment Gateway...");
            // Integrate Razorpay here
        }
        
        // Save Order & Show Tracking
        const order = { id: orderID, service: document.getElementById('modalServiceName').innerText, status: 'Placed' };
        localStorage.setItem('activeOrder', JSON.stringify(order));
        alert("Success! Your booking ID is " + orderID);
        location.reload();
    };

    // UI Helpers
    function updateProfileUI() {
        if(isLoggedIn) {
            document.getElementById('sidebarName').innerText = "Verified User";
            document.getElementById('sidebarPhone').innerText = localStorage.getItem('uPhone');
            document.getElementById('authBtnSidebar').innerText = "Logout";
            document.getElementById('authBtnSidebar').onclick = () => { localStorage.clear(); location.reload(); };
        } else {
            document.getElementById('authBtnSidebar').onclick = () => authModal.style.display = 'block';
        }
    }

    // --- RENDER CATEGORIES ---
    const container = document.getElementById('services-list-container');
    container.innerHTML = CATEGORIES.map(c => `
        <div class="category-icon-card" onclick="openCat('${c.id}')">
            <img src="${c.img}" class="category-img">
            <p>${c.name}</p>
        </div>
    `).join('');

    window.openCat = (id) => {
        if(!isLoggedIn) { authModal.style.display = 'block'; return; }
        // Service render logic...
        const modal = document.getElementById('bookingModal');
        document.getElementById('modalServiceName').innerText = "General Service";
        modal.style.display = 'block';
    };

    // Sidebar
    document.getElementById('sidebarToggle').onclick = () => document.getElementById('sideMenu').style.width = '250px';
    document.querySelectorAll('.close-modal').forEach(b => b.onclick = () => {
        authModal.style.display = 'none';
        document.getElementById('bookingModal').style.display = 'none';
    });
    
    // Check Active Order
    const order = JSON.parse(localStorage.getItem('activeOrder'));
    if(order) {
        document.getElementById('orderStatusCard').style.display = 'block';
        document.getElementById('displayOrderID').innerText = order.id;
    }
});
