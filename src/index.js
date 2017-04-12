import $ from 'jquery';
import './style.scss';

let num = 0;
setInterval(() => {
  $('#main').html(`You've been on ths page for ${num} seconds`);
  num += 1;
}, 1000);
