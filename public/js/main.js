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
    lista.innerHTML = '';
    console.log(json.length);
    json.forEach(item => {

      const li = document.createElement('li');
      const kuva = document.createElement('img');
      kuva.src = polku + item.ufile;
      li.appendChild(kuva);
      lista.appendChild(li);

   });

  });
};



lomake.addEventListener('submit', lahetaLomake);
