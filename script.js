const product =[
    {
        id:1,
        name: 'Macbook',
        image: 'https://agbd.s3.amazonaws.com/media/images/Macbook-Aidr--M1-d-1.jpg',
        price: 100000,
        tag: 'Laptop',
        inCart: 0
    },
    {
        id:2,
        name: 'Macbook',
        image: 'https://agbd.s3.amazonaws.com/media/images/Macbook-Aidr--M1-d-1.jpg',
        price: 80000,
        tag: 'monitor',
        inCart: 0
    },
    {
        id:3,
        name: 'Macbook',
        image: 'https://agbd.s3.amazonaws.com/media/images/Macbook-Aidr--M1-d-1.jpg',
        price: 889000,
        tag: 'laptop_blue',
        inCart: 0
    },
    {
        id:4,
        name: 'Macbook',
        image: 'https://agbd.s3.amazonaws.com/media/images/Macbook-Aidr--M1-d-1.jpg',
        price: 190994,
        tag: 'cpu',
        inCart: 0
    },
    {
        id:5,
        name: 'Macbook',
        image: 'https://agbd.s3.amazonaws.com/media/images/Macbook-Aidr--M1-d-1.jpg',
        price: 99879,
        tag: 'laptop2.0',
        inCart: 0
    },
    {
        id:6,
        name: 'Macbook',
        image: 'https://agbd.s3.amazonaws.com/media/images/Macbook-Aidr--M1-d-1.jpg',
        price: 98999,
        tag: 'laptop3.0',
        inCart: 0
    },
    {
        id:7,
        name: 'Macbook',
        image: 'https://agbd.s3.amazonaws.com/media/images/Macbook-Aidr--M1-d-1.jpg',
        price: 777890,
        tag: 'laptop39.0',
        inCart: 0
    },
    {
        id:8,
        name: 'Macbook',
        image: 'https://agbd.s3.amazonaws.com/media/images/Macbook-Aidr--M1-d-1.jpg',
        price: 1989798,
        tag: 'laptop78.0',
        inCart: 0
    },
    {
        id:9,
        name: 'Macbook',
        image: 'https://agbd.s3.amazonaws.com/media/images/Macbook-Aidr--M1-d-1.jpg',
        price: 100873,
        tag: 'laptop44.0',
        inCart: 0
    },
    {
        id:10,
        name: 'Macbook',
        image: 'https://agbd.s3.amazonaws.com/media/images/Macbook-Aidr--M1-d-1.jpg',
        price: 5678932,
        tag: 'laptop76.0',
        inCart: 0
    }
];

const productDetails = product.map((product) => {
    // console.log(product);
    return `<div  class="card">
    <figure>
      <img src=${product.image} alt="laptop">
    </figure>
    <section class="details">
      <div class="min-details">
        <h1>${product.name}</h1>
        <h1 class="price">BDT${product.price}</h1>
      </div>
      <Button><a href="#" class="btn">add to cart</a></Button>
  
      
  </div>`
}
).join("");
// productDetails = productDetails.join("");

const result = document.querySelector('#singelCard');
result.innerHTML = productDetails;
const cart = document.querySelectorAll('.btn');

for (let i = 0; i < cart.length; i++){
    cart[i].addEventListener('click', () =>{
        cartNumber(product[i]);
        totalCost(product[i]);
        displayAddedCart();
    })
}
function onLoadCartNumbers(){
    let productNumbers = localStorage.getItem('cartNumber');
    if(productNumbers){
        document.querySelector('#displayCart').textContent = productNumbers;
    }
}
function cartNumber(product){
    let productNumbers = localStorage.getItem('cartNumber');
    productNumbers = parseInt(productNumbers);
    
    if (productNumbers){
        localStorage.setItem('cartNumber', productNumbers + 1);
        document.querySelector('#displayCart').textContent = productNumbers + 1;
    }else{
        localStorage.setItem('cartNumber', 1);
        document.querySelector('#displayCart' ).textContent = 1;
    }
    setItems(product);
}

function setItems (product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if(cartItems != null){

        if(cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product

            }
        }
        cartItems[product.tag].inCart += 1;
    }else{
        product.inCart = 1;
        cartItems = { 
            [product.tag]: product
        }
    }
    
   
    
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}
function totalCost(product) {
    let cartCost = localStorage.getItem('totalCost');
    
    console.log("My cartCost is",cartCost);
    console.log(typeof cartCost);
    if(cartCost != null){
        cartCost = parseInt(cartCost);
        localStorage.setItem('totalCost', cartCost + product.price);

    }else{
        localStorage.setItem("totalCost", product.price);

    }
    

    
}

function displayAddedCart(){
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    console.log(cartItems);
    let productContainer = document.querySelector(".products");
    let cartCost = localStorage.getItem('totalCost');
    console.log(cartItems);

    if(cartItems && productContainer){
        
        productContainer.innerHTML = '' ;
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            
            <table>
  <tr>
    <td data-th="Product">
      
      
        <div><img src=${item.image} />
        <h6>${item.name}</h6></div>
        
          
          
        
    
      
    </td>
    <td data-th="Price">${item.price}</td>
    <td data-th="Quantity">
      <input type="number" class="form-control text-center" value=${item.inCart}>
    </td>
    
    <td data-th="Subtotal" class="text-center">${item.inCart * item.price }1.99</td>

    <td class="actions" data-th="">
      
      <button onclick="removeItems();" id="delete" class="btn btn-danger btn-sm"><i class="fa fa-trash-o"></i></button>								
    </td>
    
  </tr>
  
  
</table>
</div>
             
            `;

        });
        document.getElementById("total").innerText = cartCost;
       
      }

}
function removeItems() {
   const remove = document.getElementById("delete");
   let cartItems = localStorage.getItem('productsInCart');
   remove.addEventListener('click', () => {
    
   document.querySelectorAll("table tbody tr td").forEach(function(e){e.remove()})
   document.getElementById("total").innerText = 0;
   localStorage.removeItem('productsInCart');
   localStorage.removeItem('cartNumber');
   localStorage.removeItem('totalCost');
   
  })
}

onLoadCartNumbers();
displayAddedCart();




