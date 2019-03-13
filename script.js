var productBlock = document.querySelectorAll('.product-box__item'),
    formBlock = document.querySelector('.form__wrapper'),
    cartItems = document.querySelector('.cart-items'),
    cartPrice = document.querySelector('.cart-price'),
    filter = document.querySelectorAll('.select-control'),
    filterItems = document.querySelectorAll('option');

function addEvent(elems, type, handler){
  elems.addEventListener(type, handler);
}

for(var j = 0; j < filter.length; j++){
  addEvent(filter[j], 'change', changeCategory);
}

function changeCategory(elem) {

  for(var x=0; x < productBlock.length; x++) {
    if(elem.srcElement.value === '0') {
      if (productBlock[x].getAttribute('data-attr') != ' ') {
        productBlock[x].style.display = 'block';
      }
    } else if (elem.srcElement.value === '1') {
      if (productBlock[x].getAttribute('data-attr') != 'breakfast') {
        productBlock[x].style.display = 'none';
      } else {
        productBlock[x].style.display = 'block';
      }
    } else if (elem.srcElement.value === '2') {
      if (productBlock[x].getAttribute('data-attr') != 'first') {
        productBlock[x].style.display = 'none';
      } else {
        productBlock[x].style.display = 'block';
      }
    } else if (elem.srcElement.value === '3') {
      if (productBlock[x].getAttribute('data-attr') != 'lunch') {
        productBlock[x].style.display = 'none';
      } else {
        productBlock[x].style.display = 'block';
      }
    } else if (elem.srcElement.value === '30') {
      if (productBlock[x].getAttribute('data-price') > 30) {
        productBlock[x].style.display = 'none';
      } else {
        productBlock[x].style.display = 'block';
      }
    } else if (elem.srcElement.value === '50') {
      if (productBlock[x].getAttribute('data-price') > 50) {
        productBlock[x].style.display = 'none';
      } else {
        productBlock[x].style.display = 'block';
      }
    } else if (elem.srcElement.value === '100') {
      if (productBlock[x].getAttribute('data-price') > 100) {
        productBlock[x].style.display = 'none';
      } else {
        productBlock[x].style.display = 'block';
      }
    } else if (elem.srcElement.value === '150') {
      if (productBlock[x].getAttribute('data-price') > 150) {
        productBlock[x].style.display = 'none';
      } else {
        productBlock[x].style.display = 'block';
      }
    }
  }
}

function getCartData(){
  return JSON.parse(localStorage.getItem('cart'));
}

function setCartData(o){
  localStorage.setItem('cart', JSON.stringify(o));
  return false;
}

function addToCart(e) {
  var productBox = this.parentNode,
      productItem = productBox.parentNode.getAttribute('data-id'),
      productPrice = parseInt(productBox.querySelector('.product-box__price').innerHTML);
  cartPrice.innerHTML = 0,
  totalItems = 0;
  
  cartData = getCartData() || {};

  if(cartData.hasOwnProperty(productItem)){ 
    cartData[productItem][1] += 1;
  } else { 
    cartData[productItem] = [productPrice, 1];
  }

  if(!setCartData(cartData)){ 
    var arr = [];
    for (var key in cartData) {
      arr.push(cartData[key]);
      var sum=0;
      var items=0;
      for(let i=0; i < arr.length; i++) {
        sum += (arr[i][0] * arr[i][1]);
        items += arr[i][1];
      }
    }
    cartPrice.innerHTML = sum;
    cartItems.innerHTML = items;
  }
  return false;
}

for(var i = 0; i < productBlock.length; i++){
  addEvent(productBlock[i].querySelector('.product-box__btn'), 'click', addToCart);
}

addEvent(document.querySelector('.btn-check'), 'click', checkoutCart);
addEvent(document.querySelector('.form__submit-btn'), 'click', validateForm);

function checkoutCart() {
  formBlock.style.display = 'flex';
}

function errorField(element, errorMessage) {
  var msgElem = document.createElement('span');
  msgElem.className = "error-message";
  msgElem.innerHTML = errorMessage;
  element.appendChild(msgElem);
}

function resetError(element) {
  if (element.lastChild.className == "error-message") {
    element.removeChild(element.lastChild);
  }
}

function validateForm() {
  var form = document.querySelector('.form');
  var elem = form.elements;
  var pattern = /\s/

  resetError(elem.name.parentNode);
  if(!elem.name.value || pattern.test(elem.name.value)) {
    errorField(elem.name.parentNode, "Укажите имя")
  }
  resetError(elem.email.parentNode);
  if(!elem.email.value || pattern.test(elem.email.value)) {
    errorField(elem.email.parentNode, "Укажите email")
  }

  if(!elem.name.nextElementSibling && !elem.email.nextElementSibling) {
    alert('Спасибо за заявку!');
    formBlock.style.display = 'none';
    localStorage.removeItem('cart');
    cartPrice.innerHTML = "XXX";
    cartItems.innerHTML = "XXX";
    elem.name.value = '';
    elem.email.value ='';
  }
}
