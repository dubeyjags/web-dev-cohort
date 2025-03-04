// function ShoppingCart() {
//     // Initialize items property
//     this.items=[]
// }

// // Define addItem method on ShoppingCart's prototype
// ShoppingCart.prototype.addItem = function(price){
//     this.items.push(price)
// }

// // Define getTotalPrice method on ShoppingCart's prototype
// ShoppingCart.prototype.getTotalPrice = function(prices){
//     return prices.reduce((t,item) => t+item,0)
// }


// You need to implement the ShoppingCart constructor function and its prototype methods
function ShoppingCart() {
    // Initialize items property
    this.prices=[]
}

// Define addItem method on ShoppingCart's prototype
ShoppingCart.prototype.addItem = function(price){
    this.prices.push(price)
}

// Define getTotalPrice method on ShoppingCart's prototype
ShoppingCart.prototype.getTotalPrice = function(){
  return this.prices.reduce((acc,item) => acc+item,0)
}