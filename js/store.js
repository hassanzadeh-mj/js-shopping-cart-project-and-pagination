let allProducts = [
    { id: 1, title: 'محصول 1', price: 150000, img: 'Images/Album 1.png' ,count: 1},
    { id: 2, title: 'محصول 2', price: 300000, img: 'Images/Album 2.png',count: 1 },
    { id: 3, title: 'محصول 3', price: 40000, img: 'Images/Album 3.png',count: 1 },
    { id: 4, title: 'محصول 4', price:60000, img: 'Images/Album 4.png' ,count: 1},
    { id: 5, title: 'محصول 5', price: 200000, img: 'Images/Cofee.png',count: 1 },
    { id: 6, title: 'محصول 6', price: 300000, img: 'Images/Shirt.png',count: 1 },
    { id: 7, title: 'محصول 7', price: 980000, img: 'Images/Cofee.png' ,count: 1},
    { id: 8, title: 'محصول 8', price:50000, img: 'Images/Shirt.png',count: 1 },
]
let userBasket=[]
let $ = document
let userListContainer = $.querySelector('.shop-items')
let paginationContainer = $.querySelector('#pagination')
const bastekProductsContainer = $.querySelector('.cart-items')
const removeAllProductsBtn = $.querySelector('.remove')
const cartTotalPriceElem = $.querySelector('.cart-total-price')


let currentPage = 1
let rowsCount = 4

function displayUesrsList (allUesrsArray, usersContainer, rowsCount, currentPage) {
    usersContainer.innerHTML = ''

    let endIndex = rowsCount * currentPage
    let startIndex = endIndex - rowsCount

    let paginatedUsers = allUesrsArray.slice(startIndex, endIndex)

    paginatedUsers.forEach(function (product) {
        let productContainer = $.createElement('div')
        productContainer.className='shop-item light'
    
        let productTitleSpan = $.createElement('span')
        productTitleSpan.classList.add('shop-item-title')
        productTitleSpan.innerHTML = product.title
    
        let productImageElem = $.createElement('img')
        productImageElem.classList.add('shop-item-image')
        productImageElem.setAttribute('src', product.img)
    
        let productDetailsContainer = $.createElement('div')
        productDetailsContainer.classList.add('shop-item-details')
    
        let productPriceSpan = $.createElement('span')
        productPriceSpan.innerHTML = product.price +" تومان"
        productPriceSpan.classList.add('shop-item-price')
    
        let prodcutAddButton = $.createElement('button')
        prodcutAddButton.innerHTML = 'ثبت در سبد خرید'
        prodcutAddButton.className = 'btn btn-primary shop-item-button'
        prodcutAddButton.addEventListener("click", ()=>{
            addProductToBasketArray(product.id)
        })
        productDetailsContainer.append(productPriceSpan, prodcutAddButton)
    
        productContainer.append(productTitleSpan, productImageElem, productDetailsContainer)
        
        userListContainer.append(productContainer)
    
    })

}
const addProductToBasketArray =(productId)=>{
    let mainProduct =allProducts.find(p=> p.id===productId)
    let someElem= userBasket.some(product=>product.id===productId)
   if (!someElem) {
    userBasket.push(mainProduct)
}else{
    mainProduct.count=mainProduct.count+1
}
    basketProductsGenerator(userBasket)
    calcTotalPrice(userBasket)
}
const basketProductsGenerator=(userBasketArray)=>{
    
    bastekProductsContainer.innerHTML = ''
    userBasketArray.forEach ( (product)=> {

        let basketProductContainer = $.createElement('div')
        basketProductContainer.classList.add('cart-row')

        let basketProductDetailsContainer = $.createElement('div')
        basketProductDetailsContainer.className = 'cart-item cart-column'

        let basketProductImg = $.createElement('img')
        basketProductImg.setAttribute('src', product.img)
        basketProductImg.setAttribute('width', "100")
        basketProductImg.setAttribute('height', "100")
        basketProductImg.classList.add('cart-item-image')

        let basketProductTitleSpan = $.createElement('span')
        basketProductTitleSpan.classList.add('cart-item-title')
        basketProductTitleSpan.innerHTML = product.title

        basketProductDetailsContainer.append(basketProductImg, basketProductTitleSpan)

        let basketProductPriceSpan = $.createElement('span')
        basketProductPriceSpan.className = 'cart-price cart-column'
        basketProductPriceSpan.innerHTML = product.price
        let basketProductInputsContainer = $.createElement('div')
        basketProductInputsContainer.className = 'cart-quantity cart-column'

        let basketProductInput = $.createElement('input')
        basketProductInput.className = 'cart-quantity-input'
        basketProductInput.value = product.count
        basketProductInput.setAttribute('type', 'number')
        basketProductInput.addEventListener("change",()=>{
            updateProductCount(product.id,basketProductInput.value)
        })
        let basketProductRemoveBtn = $.createElement('button')
        basketProductRemoveBtn.className = 'btn btn-danger'
        basketProductRemoveBtn.innerHTML = 'حذف'
        basketProductRemoveBtn.addEventListener("click",()=>{
            product.count=1
            calcTotalPrice(userBasketArray)
            removeProductFromBasket(product.id)
        })
        basketProductInputsContainer.append(basketProductInput, basketProductRemoveBtn)

        basketProductContainer.append(basketProductDetailsContainer, basketProductPriceSpan, basketProductInputsContainer)

        bastekProductsContainer.append(basketProductContainer)

    })
}
function setupPagination (allUesrsArray, pagesContainer, rowsCount) {  

    pagesContainer.innerHTML = ''

    let pageCount = Math.ceil(allUesrsArray.length / rowsCount)

    for (let i = 1 ; i < pageCount + 1 ; i++) {
        let btn = paginationButtonGenerator(i, allUesrsArray)
        pagesContainer.appendChild(btn)
    }

}

function paginationButtonGenerator (page, allUesrsArray) {
    let button = document.createElement('button')
    button.innerHTML = page

    if (page === currentPage) {
        button.classList.add('active')
    }

    button.addEventListener('click', function () {
        currentPage = page
        displayUesrsList(allUesrsArray, userListContainer, rowsCount, currentPage)
        let prevPage = document.querySelector('button.active')
        prevPage.classList.remove('active')
        button.classList.add('active')
    })

    return button
}
const calcTotalPrice =(userBasketArray)=>{
    let totalPriceValue=0
    cartTotalPriceElem.innerHTML=0
    userBasketArray.forEach((product)=>{
        totalPriceValue+=product.count*product.price
    })
    cartTotalPriceElem.innerHTML=totalPriceValue+" تومان"
}
const removeProductFromBasket=(productId)=>{
    userBasket=userBasket.filter(p=>p.id!==productId)
    basketProductsGenerator(userBasket)

}
removeAllProductsBtn.addEventListener("click",()=>{
    userBasket=[]
    basketProductsGenerator(userBasket)

})
const updateProductCount=(productId,newCount)=>{
    userBasket.forEach(product=>{
        if(product.id===productId){
            product.count=newCount
        }
    })
    calcTotalPrice (userBasket)
}
displayUesrsList(allProducts, userListContainer, rowsCount, currentPage)
setupPagination(allProducts, paginationContainer, rowsCount)

const switchElement = document.querySelector('.switch')
const itemElement = document.querySelector('.shop-item')

switchElement.addEventListener('click', function () {
  // Hint: Add 'dark' class to body :))

  document.body.classList.toggle('dark')
  if (document.body.className.includes('dark')) {
    localStorage.setItem('theme', 'dark')
  } else {
    localStorage.setItem('theme', 'light')
  }

})


window.onload = function () {
  let localStorageTheme = localStorage.getItem('theme')

  if (localStorageTheme === 'dark') {
    document.body.classList.add('dark')
  }

}
