// --- Form Submission Handling (UX: No Page Refresh) ---

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('serviceRequestForm');
    
    // Check if the form exists before trying to add event listener
    if (form) {
        form.addEventListener('submit', async (e) => {
            // Agar aap Google Forms ya kisi aur service ka use kar rahe hain
            // jisme page refresh zaroori hai, toh neeche ki lines hata dein.
            
            // Lekin agar aap AJAX (jaise Formspree/Netlify Forms) use kar rahe hain,
            // toh ye code page refresh ko rokega aur smooth experience dega.
            
            e.preventDefault(); 
            
            const submitButton = form.querySelector('.btn-submit');
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;

            // Simple data submission example (Formspree/Fetch ke liye)
            // Aapko apni zaroorat ke hisaab se yahan code adjust karna hoga.
            
            try {
                // Agar aap Google Forms ya Formspree use kar rahe hain toh yahan
                // "fetch" API ka use karke data submit karein. 
                // Abhi ke liye, hum sirf UX message dikha rahe hain:
                
                // Simulate network delay
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // Show Success Message
                alert('Aapka request safaltapoorvak bhej diya gaya hai! Hum jald hi aapse call par sampark karenge.');
                form.reset(); // Form ko clear kar dega
                
            } catch (error) {
                alert('Request bhejte samay koi error aa gayi. Kripya seedhe call karein.');
            }
            
            submitButton.textContent = 'REQUEST A CALLBACK';
            submitButton.disabled = false;
        });
    }
    
    console.log("UNIQUEOFY SERVICES Website Loaded!");
});

