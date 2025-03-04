function hasDiscount(product) {
    // Check if product has discount property
    // if(product["discount"]){
    //     return true
    // } else {
    //     return false
    // }

    return product.hasOwnProperty('discount')
  }
  let product = {"name":"aaa","discount":10}
  console.log(hasDiscount(product));
  