// --- 1. SERVICE DATA (The Zomato/Swiggy Variable System) ---

// ⭐ FIXED: Image paths se 'images/' hata diya gaya hai ⭐
const SERVICE_DATA = [
    { 
        id: 'home', 
        name: '🏠 HOME Services', 
        desc: 'Deep Cleaning, Pest Control, Plumbing, Electrician, and complete Home Maintenance Solutions.', 
        imgUrl: 'service-home.jpg' // Ab root se load hoga
    },
    { 
        id: 'hospital', 
        name: '🏥 HOSPITAL Services', 
        desc: 'Specialized Medical Equipment Maintenance, Facility Upkeep, and High-Grade Sanitization services.', 
        imgUrl: 'service-hospital.jpg'
    },
    { 
        id: 'industrial', 
        name: '🏭 INDUSTRIAL Services', 
        desc: 'Machinery Repair, Heavy Equipment Maintenance, and Industrial Facility Management solutions.', 
        imgUrl: 'service-industrial.jpg'
    },
    // ... baki services bhi isi tarah 'images/' prefix ke bina honge
];


// --- 2. CORE JAVASCRIPT LOGIC ---
// ... (Rest of the code is the same) ...
