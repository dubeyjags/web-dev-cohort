function Product(name, price, stock) {
    // Initialize name, price, and stock properties
    this.name = name
    this.price = price
    this.stock = stock
}

// Define applyDiscount method on Product's prototype

Product.prototype.applyDiscount= function(percent){
    this.price = Math.round(this.price - (this.price * percent/100))
    return this.price; 
}


// Define purchase method on Product's prototype
Product.prototype.purchase = function(quantity){
    if(this.stock >= quantity){
       return this.stock -= quantity
    }
    return "Not enough stock"
}