
const productsContainer = document.getElementById('products-container')
const cartContainer = document.getElementById('cart')
const agregar = document.querySelector('.agregar')
const quitar = document.querySelector('.quitar')

let estotal=document.querySelector('.total')
// const itemImage= item.querySelector('.photo').src;
let total=0;

const productos = [
  {
    id: 1,
    name: 'casaca impermeable',
    price: 10,
    stock: 10,
    cantidad: 1
  },
  {
    id:2,
    name: 'lampara',
    price: 12,
    stock: 10,
    cantidad: 1
  },
  {
    id: 3,
    name: 'lentes de sol',
    price: 15,
    stock: 10,
    cantidad: 1
  }
]

const db = {
  items: productos,
  methods: {
    find: function (id) {
      return db.items.find(function (item) {return item.id === id })
    },
    render: function () {
      let html = ''
      html += '<ul>'
      html = db.items.map(function (item) {return `
        
        <p> <img src=../img/${item.id}.png class="imagenProducto"> 
        ${item.name}  
        p.$${item.price} - 
        stock:${item.stock} unidades



        <button class="btn-add" data-id="${item.id}">adquirir</button></p>`}).join('')
      html += '</ul>'
      // console.log(html)
      return html
    }
  }
}

const cart = {
  items: [],
  methods: {
    add: function (id) {

        const item = db.methods.find(id)
        item.stock-=1
        total+=item.price
      if (cart.methods.isAlreadyInCart(id)) {
        // alert('ese producto ya se encuentra en el carrito')
        item.cantidad+=1
        


      } else {
        item.cantidad=1
        cart.items.push(item)
        
      }

    },
    remove: function (id) {
      cart.items = cart.items.filter(function (item) {return item.id !== id})
      const item = db.methods.find(id)
      item.stock+=item.cantidad
      total-=item.price
    },
    isAlreadyInCart: function (id) {
      return cart.items.find(function (item) {return item.id === id})
    },
    count: function () {
      return cart.items.length
    },
    render: function () {
      document.getElementById('count').innerHTML = cart.methods.count()
    

      let html = ''
      html += '<ul class="elemento">'
      html += cart.items.map(function (item) { 
      let subTotal=item.price*item.cantidad

        return `
        <p class="nombre"> <img src=../img/${item.id}.png class="imagenProducto">  ${item.name} -  
        ${item.cantidad}unidades * $${item.price} = $${subTotal}


        <button class="btn-remove" data-id="${item.id}">delete</button> 
        </p> 
`}).join('')
      html += '</ul>'
      return html
    }
  }
}


productsContainer.innerHTML = db.methods.render()
cartContainer.innerHTML = cart.methods.render()






agregar.addEventListener('click', function (e) {


  if (e.target.matches('.btn-add')) {

    const id = e.target.dataset.id
    cart.methods.add(+id)
   

  }

    productsContainer.innerHTML=db.methods.render()
    cartContainer.innerHTML = cart.methods.render()
    estotal.innerHTML=total
})


quitar.addEventListener('click', function (e) {

  if (e.target.matches('.btn-remove')) {
    const id = e.target.dataset.id
    cart.methods.remove(+id)
  }

    productsContainer.innerHTML=db.methods.render()
    cartContainer.innerHTML = cart.methods.render()
    estotal.innerHTML=total
})


