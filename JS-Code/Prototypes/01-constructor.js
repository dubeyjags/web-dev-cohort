function Animal(name){
    this.name = name,
    this.makeSound= function(){
        return "Some generic sound"
    }
}
console.log(Animal('ddd'));
