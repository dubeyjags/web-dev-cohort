function writeLoveLetter(message,name){
    message.unshift(name)
    return message
}
let m = ["i","love","me"]
let n = "JS"
console.log(writeLoveLetter(m,n));
