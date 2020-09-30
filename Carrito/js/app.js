// variables

const carrito = document.querySelector('#carrito');
const contendorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito')
const listaCursos = document.querySelector('#lista-cursos');
let ArticulosCarrito = [];




// Eventos

cargarEventListener()

function cargarEventListener(){
    //agregar al carrito de compras
    listaCursos.addEventListener('click',agregarCurso)

    carrito.addEventListener('click',eliminarCurso)

    vaciarCarritoBtn.addEventListener('click',()=>{
        ArticulosCarrito= []
        eliminarHTML()
    })
}



// FUNCIONES

function agregarCurso(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito') ){
        const cursoSeleccionado = e.target.parentElement.parentElement
        leerDatosCurso(cursoSeleccionado)
    }

}


function leerDatosCurso(curso){


const infoCurso ={
    imagen: curso.querySelector('img').src,
    titulo: curso.querySelector('h4').textContent,
    precio: curso.querySelector('.precio span').textContent,
    id: curso.querySelector('a').getAttribute('data-id'),
    cantidad: 1
}


//Revisar si un articulo ya existe en el carrito

const existe = ArticulosCarrito.some((curso)=>curso.id === infoCurso.id)
if(existe){
//Actulizamos la cantidad
const cursos = ArticulosCarrito.map((curso)=>{
    if(curso.id === infoCurso.id){
        curso.cantidad ++ ;
        return curso;
    }else{
        return curso;
    }
})

ArticulosCarrito=[...cursos]

console.log(cursos)

}else{
//agregar elementos al al arreglo del carrito
ArticulosCarrito = [...ArticulosCarrito,infoCurso];
}



carritoHTML();

}

function carritoHTML(){
    //limpiar el carrito del html
    eliminarHTML()

    //Recorre el carrito y genera el html
ArticulosCarrito.forEach((curso)=>{
    const {imagen , titulo ,precio, cantidad , id}= curso;
    const row = document.createElement('tr');
    row.innerHTML = `
    <td> <img src="${curso.imagen}" width ="100" ></td>
    <td>${titulo}</td>
    <td>${precio}</td>
    <td>${cantidad}</td>
    <td><a href="#" class="borrar-curso" data-id="${id}"> X </a> </td>
    `
    //agregar html al carrito

    contendorCarrito.appendChild(row)
})

}

//Elimina los cursos del Tbody

function eliminarHTML(){
// contendorCarrito.innerHTML = ""

while(contendorCarrito.firstChild){
contendorCarrito.removeChild(contendorCarrito.firstChild)
}

};

//Eliminar cursos del carrito
function eliminarCurso (e){
    console.log('desde elimar curso')
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id')
        console.log(cursoId)

        // Eliminar de arreglo por el id

        ArticulosCarrito = ArticulosCarrito.filter((curso)=> curso.id !== cursoId)

        carritoHTML()
    }
}