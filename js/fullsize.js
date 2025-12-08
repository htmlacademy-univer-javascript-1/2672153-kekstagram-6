const bigPicture = document.querySelector('.big-picture');
const bigImage = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const commentsList = bigPicture.querySelector('.social__comments');
const commentTemplate = commentsList.querySelector('.social__comment');
const caption = bigPicture.querySelector('.social__caption');

function openFullSize(imageData) {
    bigPicture.classList.remove('hidden');
    bigImage.src = imageData.url;
    likesCount.textContent = imageData.likes;
    commentsCount.textContent = imageData.comments.length;
    commentsList.innerHTML = '';

    imageData.comments.forEach(comment => {
        const li = document.createElement('li');
        li.classList.add('social__comment');

        li.innerHTML = `
            <img 
            class="social__picture" 
            src="${comment.avatar}" 
            alt="${comment.name}" 
            width="35" 
            height="35">
            <p class="social__text">${comment.message}</p>
        `;

        commentsList.appendChild(li);
    });

    caption.textContent = imageData.description;
    document.body.classList.add('modal-open');
}


function closeFullSize() {
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
}

const closeButton = bigPicture.querySelector('.big-picture__cancel');

closeButton.addEventListener('click', () => {
    closeFullSize();
});


document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !bigPicture.classList.contains('hidden')) {
        closeFullSize();
    }
});

export { openFullSize, closeFullSize };