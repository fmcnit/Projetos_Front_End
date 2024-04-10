const menu = document.getElementById("menu");

const cartBtn = document.getElementById("cart-btn");

const cartModal = document.getElementById("cart-modal");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const checkOutBtn = document.getElementById("checkout-btn");
const closeModalBtn = document.getElementById("close-modal-btn");
const cartCount = document.getElementById("cart-count");
const addressInput = document.getElementById("address");
const addressWarn = document.getElementById("address-warn");

let cart = [];

cartBtn.addEventListener("click", function () {
  updateCartModal();
  cartModal.style.display = "flex";
});

cartModal.addEventListener("click", function (event) {
  if (event.target === cartModal) {
    cartModal.style.display = "none";
  }
});

closeModalBtn.addEventListener("click", function () {
  cartModal.style.display = "none";
});

menu.addEventListener("click", function (event) {
  
  let parentButton = event.target.closest(".add-to-cart-btn")

  if(parentButton){
    const name = parentButton.getAttribute("data-name")
    const price = parseFloat(parentButton.getAttribute("data-price"));

    addToCart(name, price)
  }
});

// função Add no carrinho

function addToCart(name, price){
  const existingItem = cart.find(item => item.name === name)

  if(existingItem){
    existingItem.quantity += 1
    Toastify({
      text: `Adicionamos mais uma und do produto ${name} ao carrinho`,
      duration: 3000,
      destination: "https://github.com/apvarun/toastify-js",
      newWindow: true,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "center", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      },
      onClick: function () {}, // Callback after click
    }).showToast();

  } else {
      cart.push({
      name,
      price,
      quantity: 1
    })
    Toastify({
      text: `Adicionamos ${name} ao seu carrinho`,
      duration: 3000,
      destination: "https://github.com/apvarun/toastify-js",
      newWindow: true,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "center", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      },
      onClick: function () {}, // Callback after click
    }).showToast();
  }

  updateCartModal();

}

function updateCartModal(){
  cartItemsContainer.innerHTML = ""

  let total = 0

  cart.forEach(item => {
    const cartItemElement = document.createElement("div");
    cartItemElement.classList.add("flex","justify-between","m-4","flex-col")

    cartItemElement.innerHTML = `
    <div class='flex items-center justify-between'>
      <div>
        <p class='font-medium'>${item.name}</p>
        <p>Qtd: ${item.quantity}</p>
        <p class='font-medium mt-2'> R$ ${item.price.toFixed(2)}</p> 
              
      
      </div>
      <button class='remove-from-cart-btn text-red-500 text-xs' data-name='${
        item.name
      }'>
          Remover
      </button>

    </div>
    `;

    total += item.price * item.quantity

    cartItemsContainer.appendChild(cartItemElement);
  })

  cartTotal.textContent = total.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  })

  cartCount.innerText = cart.length
}


cartItemsContainer.addEventListener("click", function(event){
  if(event.target.classList.contains("remove-from-cart-btn")){
    const name = event.target.getAttribute("data-name")

    removeItemCart(name)
  }
})

function removeItemCart(name) {
  const index = cart.findIndex(item => item.name === name)

  if (index !== -1){
    const item = cart[index]
    if(item.quantity > 1){
      item.quantity -= 1
      updateCartModal();
      return
    }

    cart.splice(index, 1)
    updateCartModal();
  }
}

addressInput.addEventListener("input", function(event){
  let inputValue = event.target.value

  if(inputValue !== ""){
    addressInput.classList.remove("border-red-500")
    addressWarn.classList.add("hidden")
  }

})


// Finalizar Pedido

checkOutBtn.addEventListener("click", function(){
  
  
  // if(!isOpen){
  //   Toastify({
  //     text: "Restaurante Fechado",
  //     duration: 3000,
  //     destination: "https://github.com/apvarun/toastify-js",
  //     newWindow: true,
  //     close: true,
  //     gravity: "top", // `top` or `bottom`
  //     position: "center", // `left`, `center` or `right`
  //     stopOnFocus: true, // Prevents dismissing of toast on hover
  //     style: {
  //       background: "red",
  //     },
  //     onClick: function () {}, // Callback after click
  //   }).showToast();
  //   return
  // }
  
  if(cart.lenght === 0) {
    return;
  }
  
  if(addressInput.value === ""){
    addressWarn.classList.remove("hidden")
    addressInput.classList.add("border-red-500")
    return;
  }

  // Enviar para o Whatsapp

  const cartItems = cart.map((item)=>{
    return(
      `{${item.name} Quantidade: (${item.quantity}) Preço: R$${(item.price* item.quantity).toFixed(2)}} ---` 
    )
  })


  const message = encodeURIComponent(cartItems)
  const phone = "21987149205"

  window.open(`https://wa.me/${phone}?text=${message} Endereço: ${addressInput.value}`, "_blank")

  cart = []
  updateCartModal()

})

function checkRestaurantOpen(){
  const data = new Date()
  const hora = data.getHours()

  return hora >= 18 && hora < 22;
}

const spanItem = document.getElementById("date-span")
const isOpen = checkRestaurantOpen()

if(isOpen){
  spanItem.classList.remove("bg-red-500")
  spanItem.classList.add("bg-green-600")

}else{
  spanItem.classList.remove("bg-green-600");
  spanItem.classList.add("bg-red-500");
}