const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

const count = 30;
const apiKey = 'hWQCgUxJuOOPwB6JKh3xGkG_AkBZkAIwjXl1Wbf5enk';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

function imageLoaded(){
    // console.log('Loaded');
    imagesLoaded++;
    if(imagesLoaded===totalImages){
        ready = true;
        loader.hidden = true;
        // console.log('ready = ',ready);
    }
}

function setAttributes(element, attributes){
    for (const key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}

function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photosArray.length;
    // console.log('total images: ',totalImages);
        photosArray.forEach((photo) => {
            const item = document.createElement('a');
            // item.setAttribute('href',photo.links.html);
            // item.setAttribute('target','_blank');
            setAttributes(item, {
                href: photo.links.html,
                target: '_blank'
            });

            const img = document.createElement('img');
            // img.setAttribute('src',photo.urls.regular);
            // img.setAttribute('alt',photo.alt_description);
            // img.setAttribute('title',photo.alt_description);
            setAttributes(img,{
                src: photo.urls.regular,
                alt: photo.alt_description,
                title: photo.alt_description
            });

            img.addEventListener('load',imageLoaded);

            item.appendChild(img);
            imageContainer.appendChild(item);
        });
}

async function getPhotos(){
    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    }
    catch(error){
        console.log(error);
    }
}

window.addEventListener('scroll', ()=>{
    if(window.innerHeight+window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotos();
    }
});

getPhotos();