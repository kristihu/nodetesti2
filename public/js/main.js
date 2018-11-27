'use strict';

const lomake = document.querySelector('#lomake');
const lista = document.querySelector('#result');

const lahetaLomake = (evt) => {
  evt.preventDefault();
  const fd = new FormData(lomake);
  const asetukset = {
    method: 'post',
    body: fd,
  };

  fetch('/upload', asetukset).then((response) => {
    return response.json();
  }).then((json) => {
    const polku = 'files/';
    const thumbs = 'thumbs/';
    lista.innerHTML = '';
    json.forEach(item => {
      const li = document.createElement('li');
      const nappi = document.createElement('button');
      if (item.mimetype.includes('image')) {
        const kuva = document.createElement('img');
        kuva.src = polku + item.ufile;
        li.appendChild(kuva);
      } else if (item.mimetype.includes('audio')) {
        const aud = document.createElement('audio');
        aud.setAttribute('controls', 'controls');
        aud.src = polku + item.ufile;
        li.appendChild(aud);
      } else {
        const vid = document.createElement('video');
        vid.src = polku + item.ufile;
        vid.setAttribute('controls', 'controls');
        li.appendChild(vid);
      }
      lista.appendChild(li);
      lista.appendChild(nappi);
    });

  });
};

lomake.addEventListener('submit', lahetaLomake);
