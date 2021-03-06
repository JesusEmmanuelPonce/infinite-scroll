const imgContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

const count = 10;
const api_key = "itCUW4aCxTB6vxOgDiDYP4G-CKYi25lQCzgb2-8NoDs";
const api_url = `https://api.unsplash.com/photos/random/?client_id=${api_key}&count=${count}`;

let photos = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

function imgLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
    }
}

function setAttributes(element, attributes) {
    for(const key in attributes ) {
        element.setAttribute(key, attributes[key]);
    }
}

function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photos.length;

    photos.forEach(photo => {
        const item = document.createElement("a");

        setAttributes(item, {
            href: photo.links.html,
            target: "_blank",
        });

        const img = document.createElement("img");

        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });

        img.addEventListener("load", imgLoaded);

        item.appendChild(img);
        imgContainer.appendChild(item);
    }); 
}

async function getPhotos() {
    try {
        const response = await fetch(api_url);
        photos = await response.json();
        displayPhotos();
    } catch (err) {
        console.log("photos", err);
    }
}

window.addEventListener("scroll", () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotos();
    }
});

getPhotos();