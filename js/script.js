
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-XXXXXXXXXX');

        const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxYCj-9YM7dzWKykv5nobyc1dStA2IK-nOUOFDNSQOmWVHfuleQjYY9C1oy5jBOxlosGg/exec";
        
        const modal = document.getElementById('contactModal');
        const form = document.getElementById('leadForm');
        const successMessage = document.getElementById('successMessage');
        const formError = document.getElementById('formError');
        const submitBtn = document.getElementById('submitBtn');

        function openModal(intent = 'beta') {
            document.getElementById('intent').value = intent;
            modal.style.display = 'flex';
            
            form.style.display = 'block';
            successMessage.style.display = 'none';
            form.reset();
            formError.style.display = 'none';
        }

        function closeModal() {
            modal.style.display = 'none';
        }

        form.onsubmit = async function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const agency = document.getElementById('agency').value.trim();
            const intent = document.getElementById('intent').value;
            
            if (!name || !email) {
                showError('Name and email are required');
                return;
            }
            
            if (!email.includes('@') || !email.includes('.')) {
                showError('Please enter a valid email address');
                return;
            }
            
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Applying...';
            submitBtn.disabled = true;
            formError.style.display = 'none';
            
            const formData = {
                name: name,
                email: email,
                phone: phone || 'Not provided',
                agency: agency || 'Not provided',
                intent: intent,
                source: 'leadbot_website',
                timestamp: new Date().toISOString(),
                page: window.location.href
            };
            
            try {
                await fetch(GOOGLE_SCRIPT_URL, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });
                
                console.log('Form sent to Google Sheets');
                
                form.style.display = 'none';
                successMessage.style.display = 'block';
                
                try {
                    const submissions = JSON.parse(localStorage.getItem('leadbot_submissions') || '[]');
                    submissions.push({...formData, backed_up: true});
                    localStorage.setItem('leadbot_submissions', JSON.stringify(submissions));
                } catch (e) {}
                
            } catch (error) {
                console.warn('Submission error:', error);
                
                const mailtoLink = `mailto:bojana@leadbot.it.com?subject=Beta Application: ${name}&body=Name: ${name}%0AEmail: ${email}%0APhone: ${phone}%0AAgency: ${agency}`;
                window.open(mailtoLink, '_blank');
                
                form.style.display = 'none';
                successMessage.style.display = 'block';
            }
            
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        };

        function showError(message) {
            formError.textContent = message;
            formError.style.display = 'block';
        }

        window.onclick = function(event) {
            if (event.target === modal) {
                closeModal();
            }
        }

        window.addEventListener('scroll', () => {
            const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            if (scrollPercent > 50 && !window.hasTrackedScroll) {
                window.hasTrackedScroll = true;
                gtag('event', 'scroll_depth', { 'value': '50%' });
            }
        });

        console.log('Page loaded. LeadBot ready.');

// // ##########################################
//         // Google Analytics setup
//         window.dataLayer = window.dataLayer || [];
//         function gtag(){dataLayer.push(arguments);}
//         gtag('js', new Date());
//         gtag('config', 'G-XXXXXXXXXX'); // REPLACE WITH YOUR GA ID

//         // IMPORTANT: Replace with your Google Apps Script URL
//         // Create this first: Tools → Script Editor → Deploy as Web App
//         const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxYCj-9YM7dzWKykv5nobyc1dStA2IK-nOUOFDNSQOmWVHfuleQjYY9C1oy5jBOxlosGg/exec";
        
//         // Modal elements
//         const modal = document.getElementById('contactModal');
//         const form = document.getElementById('leadForm');
//         const successMessage = document.getElementById('successMessage');
//         const formError = document.getElementById('formError');
//         const submitBtn = document.getElementById('submitBtn');
        
//         // Track if using fallback
//         let useFallback = false;

//         // Open modal with intent
//         function openModal(intent = 'general') {
//             document.getElementById('intent').value = intent;
//             modal.style.display = 'flex';
            
//             // Reset form
//             form.style.display = 'block';
//             successMessage.style.display = 'none';
//             form.reset();
//             formError.style.display = 'none';
            
//             // Track modal open
//             gtag('event', 'modal_open', {
//                 'event_category': 'engagement',
//                 'event_label': intent
//             });
//         }

//         // Close modal
//         function closeModal() {
//             modal.style.display = 'none';
//         }

// // Handle form submission - REPLACE YOUR EXISTING onsubmit function with this
// form.onsubmit = async function(e) {
//     e.preventDefault();
    
//     // Get form data
//     const name = document.getElementById('name').value.trim();
//     const email = document.getElementById('email').value.trim();
//     const phone = document.getElementById('phone').value.trim();
//     const intent = document.getElementById('intent').value;
    
//     // Validate
//     if (!name || !email) {
//         showError('Name and email are required');
//         return;
//     }
    
//     if (!email.includes('@') || !email.includes('.')) {
//         showError('Please enter a valid email address');
//         return;
//     }
    
//     // Show loading
//     const originalText = submitBtn.innerHTML;
//     submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
//     submitBtn.disabled = true;
//     formError.style.display = 'none';
    
//     // Prepare data
//     const formData = {
//         name: name,
//         email: email,
//         phone: phone || 'Not provided',
//         intent: intent,
//         source: 'real_estate_landing_page',
//         timestamp: new Date().toISOString(),
//         page: window.location.href,
//         userAgent: navigator.userAgent
//     };
    
//     // Track submission attempt
//     gtag('event', 'form_submission_attempt', {
//         'event_category': 'lead',
//         'event_label': intent
//     });
    
//     try {
//         // Send to Google Apps Script
//         await fetch(GOOGLE_SCRIPT_URL, {
//             method: 'POST',
//             mode: 'no-cors',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(formData)
//         });
        
//         // Since we can't read response with no-cors, we assume success
//         // and check Google Sheet manually for verification
//         console.log('Form sent to Google Sheets');
        
//         // Track successful submission
//         gtag('event', 'form_submission_success', {
//             'event_category': 'lead',
//             'event_label': intent
//         });
        
//         // Show success message
//         form.style.display = 'none';
//         successMessage.style.display = 'block';
        
//         // Store in localStorage as backup (silently, no message)
//         try {
//             const submissions = JSON.parse(localStorage.getItem('leadflow_submissions') || '[]');
//             submissions.push({...formData, backed_up: true});
//             localStorage.setItem('leadflow_submissions', JSON.stringify(submissions));
//         } catch (e) {
//             // Ignore localStorage errors
//         }
        
//     } catch (error) {
//         console.warn('Primary submission failed, using email fallback:', error);
        
//         // Show user-friendly message
//         formError.textContent = 'Connection issue. Opening email app as backup...';
//         formError.style.display = 'block';
        
//         // Open email client as last resort
//         const mailtoLink = `mailto:your@email.com?subject=New Lead: ${name}&body=Name: ${name}%0AEmail: ${email}%0APhone: ${phone}%0AIntent: ${intent}`;
//         window.open(mailtoLink, '_blank');
        
//         // Still show success (they can email you)
//         setTimeout(() => {
//             form.style.display = 'none';
//             successMessage.style.display = 'block';
//         }, 1000);
//     }
    
//     // Reset button
//     submitBtn.innerHTML = originalText;
//     submitBtn.disabled = false;
// };

//         // Helper to show error
//         function showError(message) {
//             formError.textContent = message;
//             formError.style.display = 'block';
//         }

//         // Close modal when clicking outside
//         window.onclick = function(event) {
//             if (event.target === modal) {
//                 closeModal();
//             }
//         }

//         // Track scroll depth
//         window.addEventListener('scroll', () => {
//             const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
//             if (scrollPercent > 50 && !window.hasTrackedScroll) {
//                 window.hasTrackedScroll = true;
//                 gtag('event', 'scroll_depth', { 'value': '50%' });
//             }
//         });

//         console.log('Page loaded. Form ready.');
