(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()


async function toggleFavorite(element, listingId) {
    try {
        const response = await fetch(`/listings/${listingId}/favorite`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if (response.ok) {
            const data = await response.json();
            const icon = element.querySelector('i');
            
            if (data.favorited) {
                element.classList.add('favorited');
                icon.classList.remove('fa-regular');
                icon.classList.add('fa-solid');
            } else {
                element.classList.remove('favorited');
                icon.classList.remove('fa-solid');
                icon.classList.add('fa-regular');
            }
        } else {
            if (response.status === 401) {
                // Optionally show a toast or redirect
                if (typeof Toastify !== 'undefined') {
                    Toastify({
                        text: "You must be logged in to add favorites",
                        duration: 3000,
                        gravity: "top", position: "center",
                        style: { background: "linear-gradient(to right, #ff5f6d, #ffc371)", borderRadius: "10px" }
                    }).showToast();
                }
            } else {
                console.error("Failed to toggle favorite");
            }
        }
    } catch (err) {
        console.error("Error:", err);
    }
}

// Global Page Transition Logic
document.addEventListener("DOMContentLoaded", () => {
    const loader = document.getElementById("global-loader");
    
    if (loader) {
        // Hide loader when page is fully loaded or restored from bfcache
        window.addEventListener("pageshow", (e) => {
            loader.classList.remove("active");
        });

        // Show loader on link clicks (except for new tabs or in-page anchors)
        document.addEventListener("click", (e) => {
            const link = e.target.closest("a");
            
            if (
                link && 
                link.href && 
                !link.target && 
                !link.hasAttribute("download") &&
                !link.href.startsWith("javascript:") &&
                !link.href.startsWith("mailto:") &&
                !link.href.includes("#") &&
                link.hostname === window.location.hostname
            ) {
                // Ignore favorite button clicks which use AJAX
                if (!link.classList.contains("favorite-btn") && !link.closest(".favorite-btn")) {
                    loader.classList.add("active");
                }
            }
        });

        // Show loader on standard form submissions
        document.addEventListener("submit", (e) => {
            const form = e.target;
            // Only trigger if it's not a background fetch/AJAX form (most forms here are standard)
            if (!form.hasAttribute("data-no-loader")) {
                loader.classList.add("active");
            }
        });
    }
});