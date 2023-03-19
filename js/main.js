$(function(){
  $('.header__menu-btn').on('click', function () {
    $('.header__menu-list').toggleClass('header__menu-list--active');
    $('.header__menu-btn').toggleClass('header__menu-btn--active');
    $('.wrapper').toggleClass('wrapper--active');
    $('.logo__images').toggleClass('logo__images--active');
    $('.logo__images2').toggleClass('logo__images2--active');
  });
});

const btnOpen = document.getElementById('btn-open');
const modal = document.getElementById('wrapper-modal');

const overlay = document.getElementById('overlay');
const close = document.getElementById('close');
const btnClose = document.getElementById('btn-close');

btnOpen.addEventListener('click', () => {
  modal.classList.add('active');
})

const closeModal = () => {
  modal.classList.remove('active');
}

overlay.addEventListener('click', closeModal);
close.addEventListener('click', closeModal);
btnClose.addEventListener('click', closeModal);