// Script desarrollado por: Romina Font


// Responsive Menu
const navTopPC = document.getElementById("navTopPC");
const navTopMobile = document.getElementById("NavTopMobile");

// vento para cuando cambian las dimensiones de la pantalla
window.addEventListener("resize", () => {
    // <768px, elimina navTopPC y añade  NavTopMobile
    if (window.innerWidth < 768) {
        navTopPC.classList.add("hidden");
        navTopMobile.classList.remove("hidden");
    } else {
        // >=768px, elimina NavTopMobile y añade navTopPC
        navTopPC.classList.remove("hidden");
        navTopMobile.classList.add("hidden");
    }
});
// llama al evento cuando se refresca la pantalla
window.dispatchEvent(new Event("resize"));



// NavTop block desaparece al hacer scroll hacia abajo y aparece de nuevo al scroll hacia arriba
const navTop = document.getElementById('navTopPC');
let prevScrollPos = window.pageYOffset;

// verifica las dimensiones
if (window.innerWidth > 768) {
    let prevScrollPos = window.pageYOffset;

    // añade y quita el bloque segun el tipo de scroll arriba o abajo
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


// Se abre el menu mobil modal 
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




//SCRIPT INDEX
// Carrousel Animado: la imagen cambia cada 5s
let currentSlide = 1;

function goToSlide(slideNumber) {
    const slider = document.getElementById('slider');
    const slideWidth = slider.clientWidth;
    slider.scrollLeft = (slideNumber - 1) * slideWidth;
    currentSlide = slideNumber;
}

function autoSlide() {
    currentSlide = (currentSlide % 3) + 1;
    goToSlide(currentSlide);
}

// Cambiar de slide automáticamente cada 5 segundos
setInterval(autoSlide, 5000);




//SCRIPT PROJECTS: pagina donde se muestran tarjetas a modo de "preview" de los proyectos
// fetch para traer el json con los proyectos
document.addEventListener("DOMContentLoaded", function () {
    const projectsContainer = document.getElementById("projectsContainer");


    const jsonUrl = "./database/projects.json"; //ruta hacia el json

    fetch(jsonUrl)
        .then((response) => response.json())
        .then((projects) => {
            projects.forEach((project) => {
                const projectCard = document.createElement("article");
                projectCard.classList.add("ProjectsBox-card");
                //bloque html se ejecuta junto con los datos que extraemos del fetch
                projectCard.innerHTML = `
          <a href="./view.html?id=${project.id}">
            <img alt="${project.name}" class="ProjectsBox-img" src="${project.img}">
            <div class="ProjectsBox-info">
                <h2 class="ProjectsBox-title Title">${project.name}</h2>
                <div class="ProjectsBox-tags Text">
                    <p class="ProjectsBox-role">${project.role}</p>
                    <p class="ProjectsBox-type">${project.type}</p>
                    <p class="ProjectsBox-date">${project.date}</p>
                </div>
            </div>
            <h3 class="MobileDetails Title">${project.name}</h3>
        </a>
          `;

                projectsContainer.appendChild(projectCard);
            });
        })
        .catch((error) => console.error("Error fetching project information:", error));
});


//SCRIPT VIEW (pagina vacia donde se carga os datos segun el click en la pestaña anterior PROJECTS)

document.addEventListener("DOMContentLoaded", function () {
    const projectDetailsContainer = document.getElementById("projectDetails");

    // se obtiene la ID del proyecto de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const miId = urlParams.get("id");

    console.log("parametros:", urlParams);

    // fetch para obtener los detalles del proyecto según el ID
    fetch("./database/projects.json")
        .then((response) => response.json())
        .then((projects) => {
            // busca el proyecto con la ID seleccionada
            const projectChoose = projects.find((project) => project.id == Number(miId));

            if (projectChoose) {
                // estructura html de la pagina para mostrar los datos del fetch
                projectDetailsContainer.innerHTML = `
            <img class="ViewContainer-header" src="${projectChoose.img}" alt="Photo">
            <h1 class="ViewContainer-title Title">${projectChoose.name}</h1>
            <div class="ViewContainer-data">
                <div class="ViewContainer-tags">
                    <p class="ViewContainer-date Subtitle">${projectChoose.date}</p>
                    <p class="ViewContainer-role Subtitle">${projectChoose.role}</p>
                    <p class="ViewContainer-type Subtitle">${projectChoose.type}</p>
                </div>
                <p class="ViewContainer-text Text">${projectChoose.descp}</p>
            </div>
            <img src="${projectChoose.img}" alt="Photo" class="ViewContainer-img">
            <div class="ViewContainer-url"><a class="Btn" href="${projectChoose.url}" target="_blank" rel="noopener noreferrer">View Site</a></div>
          `;
            } else {
                projectDetailsContainer.innerHTML = `<p class="Title">Proyecto no encontrado</p>`;
            }
        })
        .catch((error) => console.error("Error fetching project information:", error));
});


//SCRIPT GALLERY: pagina galeria donde al hacer click se abre la imagen en fullscreen y las imagenes vienen desde un json


/* Al click de ancla del banner 1 el scroll es smooth*/
// Se seleccionan todos los enlaces que comienzan con "#"
document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener('click', function (e) {
        // previene que que pegue el "salto" al hacer scroll
        e.preventDefault();

        // se obtiene el valor del id gracias al href
        const targetId = this.getAttribute('href');

        // se obtiene la posición del id, el destino
        const targetElement = document.querySelector(targetId);

        // verifica si el destino existe
        if (targetElement) {
            // se realiza el scroll de manera suave (smooth)
            targetElement.scrollIntoView({
                behavior: 'smooth' // el desplazamiento es suave
            });
        }
    });
});



// Traemos las fotografias desde el JSON
document.addEventListener("DOMContentLoaded", function () {
    // selecciona el contenedor de galeria al que me dirijo
    const galleryBox = document.getElementById("galleryPhotographs");

    // URL del archivo JSON con las URLs de las imágenes
    const jsonUrl = "./database/photographs.json";

    // Realiza la solicitud Fetch para obtener el JSON
    fetch(jsonUrl)
        .then((response) => response.json())
        .then((data) => {
            data.forEach((imageData) => {
                // Crea un elemento de imagen
                const img = document.createElement("img");
                img.classList.add("Gallery-img");
                img.loading = "lazy"; // carga lento para mayor rendimiento
                img.src = imageData.url; // el url a la carpeta donde esta la imagen
                img.title = imageData.title; // el titulo de la foto

                // Agrega las imagenes al contenedor de la galería
                galleryBox.appendChild(img);
            });

            // Código para abrir la imagen en full screen
            galleryBox.addEventListener("click", function (event) {
                // Verifica si el elemento clicado es una imagen con la clase 'Gallery-img'
                if (event.target.classList.contains("Gallery-img")) {
                    // Alterna la clase 'openPhoto' en la imagen clicada
                    event.target.classList.toggle("openPhoto");
                }
            });
        })
        .catch((error) => console.error("Error fetching images:", error));
});


// Traemos las ilustraciones desde el JSON
document.addEventListener("DOMContentLoaded", function () {
    // selecciona el contenedor de galeria al que me dirijo
    const galleryBox = document.getElementById("galleryIllustrations");

    // URL del archivo JSON con las URLs de las imágenes
    const jsonUrl = "./database/illustrations.json";

    // Realiza la solicitud Fetch para obtener el JSON
    fetch(jsonUrl)
        .then((response) => response.json())
        .then((data) => {
            data.forEach((imageData) => {
                // Crea un elemento de imagen
                const img = document.createElement("img");
                img.classList.add("Gallery-img");
                img.loading = "lazy"; // carga lento para mayor rendimiento
                img.src = imageData.url; // el url a la carpeta donde esta la imagen
                img.title = imageData.title; // el titulo de la foto

                // Agrega las imagenes al contenedor de la galería
                galleryBox.appendChild(img);
            });

            // Código para abrir la imagen en full screen
            galleryBox.addEventListener("click", function (event) {
                // Verifica si el elemento clicado es una imagen con la clase 'Gallery-img'
                if (event.target.classList.contains("Gallery-img")) {
                    // Alterna la clase 'openPhoto' en la imagen clicada
                    event.target.classList.toggle("openPhoto");
                }
            });
        })
        .catch((error) => console.error("Error fetching images:", error));
});


// /* La imagen al click se abre en fullscreen (funciona con imagenes cargadas en el HTML no con fetch)*/
// window.onload = () => {
//   for (let i of document.querySelectorAll(".Gallery-img")) {
//     i.onclick = () => i.classList.toggle("openPhoto");
//   }
// };




//SCRIPT ABOUT
// Funcion que saluda al usuario con su nombre obtenido desde un input
function sayHi() {
    //obtenemos el valor del input
    const name = document.getElementById('name').value;

    // construimos el mensaje que se va a mostrar
    const sayHi = `Hi! ${name} nice to meet you! 🌸🫰🏼`;

    // se muestra el resultado en su bloque salute con una animacion
    const saluteDiv = document.getElementById('salute');
    saluteDiv.innerHTML = sayHi;
    saluteDiv.classList.add('fadeIn');
    saluteDiv.style.display = 'block';
}