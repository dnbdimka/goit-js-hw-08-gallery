import galleryItems from '../app.js';
// const galleryListRef = 
const refs = {
    galleryList: document.querySelector('.js-gallery'),
    lightBox: document.querySelector('.js-lightbox'),
    lightBoxBtnClose: document.querySelector('button[data-action="close-lightbox"]'),
    lightBoxOverlay: document.querySelector('.js-lightbox .lightbox__overlay'),
    lightBoxImg: document.querySelector('.js-lightbox .lightbox__image'),

}

function createGallery(items) {
    const newItems = items.map(({ preview, original, description }) => {
        return `
        <li class="gallery__item">
        <a
            class="gallery__link"
            href=${original}
        >
            <img
            class="gallery__image"
            src=${preview}
            data-source=${original}
            alt="${description}"
            />
        </a>
        </li>
        `
    }).join('');
    refs.galleryList.insertAdjacentHTML('afterbegin', newItems);
}
createGallery(galleryItems);

// 

refs.galleryList.addEventListener('click', onImageClick);
refs.lightBox.addEventListener('click', onLightBoxClick);

function onImageClick(e) {
    e.preventDefault();
    if (e.target === e.currentTarget) {
        return;
    }
    
    refs.lightBox.classList.add('is-open');
    
    refs.lightBoxImg.setAttribute('src', `${e.target.dataset.source}`);
    refs.lightBoxImg.setAttribute('alt', `${e.target.getAttribute('alt')}`);

window.addEventListener('keydown', onLightBoxKeypress);

};

function onLightBoxClick(e) {
    if (e.target === refs.lightBoxBtnClose || e.target === refs.lightBoxOverlay) {
        refs.lightBox.classList.remove('is-open');
        refs.lightBoxImg.setAttribute('src', '');
        refs.lightBoxImg.setAttribute('alt', '');
    }
};

function onLightBoxKeypress(e) {
    if (e.key === 'Escape') {
        refs.lightBox.classList.remove('is-open');
        window.removeEventListener('keydown', onLightBoxKeypress);
    }
};