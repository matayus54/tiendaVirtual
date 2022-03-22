const productos = [
  {
    id: 1,
    name: 'Fresa',
    price: 10
  },
  {
    id:2,
    name: 'Mango',
    price: 12
  },
  {
    id: 3,
    name: 'Platano',
    price: 15
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
      html += db.items.map(function (item) {return `<li>${item.name} - $${item.price} <button class="btn-add" data-id="${item.id}">add to cart</button></li>`}).join('')
      html += '</ul>'
      console.log(html)
      return html
    }
  }
}

const cart = {
  items: [],
  methods: {
    add: function (id) {
      if (cart.methods.isAlreadyInCart(id)) {
        alert('ese producto ya se encuentra en el carrito')
      } else {
        const item = db.methods.find(id)
        cart.items.push(item)
      }
    },
    remove: function (id) {
      cart.items = cart.items.filter(function (item) {return item.id !== id})
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
      html += '<ul>'
      html += cart.items.map(function (item) { return `<li>${item.name} - ${item.price}</li> <button class="btn-remove" data-id="${item.id}">delete</button>`}).join('')
      html += '</ul>'
      return html
    }
  }
}

const productsContainer = document.getElementById('products-container')
const cartContainer = document.getElementById('cart')
const wrapper = document.getElementById('wrapper')

productsContainer.innerHTML = db.methods.render()
cartContainer.innerHTML = cart.methods.render()

wrapper.addEventListener('click', function (e) {

  if (e.target.matches('.btn-add')) {
    const id = e.target.dataset.id
    cart.methods.add(+id)
    cartContainer.innerHTML = cart.methods.render()
  }

  if (e.target.matches('.btn-remove')) {
    const id = e.target.dataset.id
    cart.methods.remove(+id)
    cartContainer.innerHTML = cart.methods.render()
  }

})


