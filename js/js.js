document.addEventListener('DOMContentLoaded', () => {
    const page1Button = document.getElementById('page1-button');
    const page2Button = document.getElementById('page2-button');
    const page3Button = document.getElementById('page3-button');
    const page1 = document.getElementById('page1');
    const page2 = document.getElementById('page2');

page1Button.addEventListener('click', () => {
  page1.classList.add('active');
  page2.classList.remove('active');
});

page2Button.addEventListener('click', () => {
  page2.classList.add('active');
  page1.classList.remove('active');
});

page3Button.addEventListener('click', () => {
    page1.classList.add('active');
  page2.classList.remove('active');
  });

});
