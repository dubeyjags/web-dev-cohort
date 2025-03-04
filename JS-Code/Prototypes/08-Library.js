function Library() {
    // Initialize books property
    this.books = []
}

// Define addBook method on Library's prototype
Library.prototype.addBook = function(book){
    this.books.push(book)
}

// Define findBook method on Library's prototype
Library.prototype.findBook = function(title){
    //  let availabe= this.books.find(item => item == title)
    //  if(availabe){
    //     return "Book found"
    //  } else {
    //     return "Book not found"
    //  }
    return this.books.includes(title) ? "Book found" : "Book not found"
}



let books = ["Harry Potter", "The Hobbit"]
let searchTitle= "Harry Potter"
