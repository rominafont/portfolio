// Responsive Menu
const navTopPC = document.getElementById("navTopPC");
const navTopMobile = document.getElementById("NavTopMobile");

// Event when dimensions change
window.addEventListener("resize", () => {
    // <768px, hidden navTopPC and add NavTopMobile
    if (window.innerWidth < 768) {
        navTopPC.classList.add("hidden");
        navTopMobile.classList.remove("hidden");
    } else {
        // >=768px, hidden NavTopMobile and add navTopPC
        navTopPC.classList.remove("hidden");
        navTopMobile.classList.add("hidden");
    }
});
// Call the event when refresh
window.dispatchEvent(new Event("resize"));



// NavTop block disappear when scrolling down and appear when scrolling up
const navTop = document.getElementById('navTopPC');
let prevScrollPos = window.pageYOffset;

    // Verify the dimensions
    if (window.innerWidth > 768) {
        let prevScrollPos = window.pageYOffset;

        // Add and remove the navTopPC depending on the scroll direction
        window.addEventListener('scroll', () => {
            const currentScrollPos = window.pageYOffset;

            if (prevScrollPos > currentScrollPos) {
                navTop.classList.remove('hidden');
            } else {
                navTop.classList.add('hidden');
            }

            prevScrollPos = currentScrollPos;
        });
    }


// Open Modal Menu 
let isNavTopModalOpen = false;

function navTopModal() {
    const modal = document.querySelector('#NavTopModal');
    if (isNavTopModalOpen) {
        modal.style.display = 'none';
        isNavTopModalOpen = false;
    } else {
        modal.style.display = 'block';
        isNavTopModalOpen = true;
    }
}
