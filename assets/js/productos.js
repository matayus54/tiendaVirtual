const openModal = document.querySelector('.iniciarModal');
const modal = document.querySelector('.modal');
const closeModal = document.querySelector('.cerrarModal');

openModal.addEventListener('click', (e)=>{
    e.preventDefault();
    modal.classList.add('iniciarModal');
});

closeModal.addEventListener('click', (e)=>{
    e.preventDefault()
    cerrar()
});

function cerrar(){
    modal.classList.remove('iniciarModal');
}