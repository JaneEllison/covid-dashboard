import '../styles/scss/main.scss';
import images from '../assets/images/bg.png';
import './components/table';

function add() {
    console.log('hi');
    const container = document.querySelector('.container');
    container.insertAdjacentHTML('beforeend', `<img src=${images}>`);
}
add();
