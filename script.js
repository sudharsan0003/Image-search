'use strict';
const accessKey = 'FcZI7RXSAC5dVLsuihxKhthnrDv4WfkusNr_JiZ1j3s';
const searchForm = document.getElementById('form');
const searchInput = document.getElementById('form-input');
const searchResult = document.getElementById('show-result');

const inputBtn = document.getElementById('btn-input');
const showBtn = document.getElementById('btn-show');

let keyWord = '';
let page = 1;

async function searchImages() {
  keyWord = searchInput.value;
  const url = `https://api.unsplash.com/search/photos?pages=${page}&query=${keyWord}&client_id=${accessKey}&per_page=12`;

  const response = await fetch(url);
  const data = await response.json();
  if (page === 1) {
    searchResult.innerHTML = '';
  }
  const results = data.results;
  results.map((result) => {
    const image = document.createElement('img');
    image.src = result.urls.small;
    const imageLink = document.createElement('a');
    imageLink.href = result.links.html;
    imageLink.target = '_blank';
    imageLink.appendChild(image);
    searchResult.appendChild(imageLink);
  });
  showBtn.style.display = 'block';
}

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  page = 1;
  searchImages();
});

showBtn.addEventListener('click', () => {
  page++;
  searchImages();
});
