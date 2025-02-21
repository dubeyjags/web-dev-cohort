# Learned Array with Bus and Passengers..
Array is the simple group or list of basis data types
(String, Number, boolean, array and object or null and undefined ).
Arary items could be single datatype of all of them ex: ["String", 4, true, ["another","list","of","data"], {name:"Jagdamba"}]
Here we learn javascript arrays with simple example of bus and passengers with #chaicode

## Array Basic property and methods

1) [length](#length)
2) [at() and indexOf()](#at-and-indexof)
3) [fill() and concat()](#fill-and-concat)
4) [push() and pop()](#push-and-pop)
5) [unshift() and shift()](#unshift-and-shift)
6) [find(), some(), include(), every(), and filter()](#find-some-every-include-and-filter)
7) [flat(), map(), and flatMap()](#map-flat-and-flatmap)
8) [split() and join()](#split-and-join)
9) [slice() and splice()](#slice-and-splice)
10) [reduce()](#reduce)
11) [surprised me...](#surprise-me)

# .length <a id="length"></a>
length property just return the count/ length of the items in the array

>let bus = ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"]

>let totalSeat = bus.length 


# .at and .indexOf <a id="at-and-indexof"></a>
.at() and .indexOf is used to the passenger

>let bus2 = ["driver","hitesh","piyush","anirudh","main bhi hu"]

>let onThirdSeat = bus2.at(3)    ```// it start from the 0 (doesn't include drive seat only passengers)```

>let meriSeat = bus.indexOf("main bhi hu")


# .fill and .concat <a id="fill-and-concat"></a>
.fill(1) fill all the seats with 1 passenger
.concat add another bus pessender into your bus

>bus3 = bus.fill(1)

>bus3 = bus2.concat(bus)

# push and pop <a id="push-and-pop"></a>
add and remove items at ends of the array(list)

>.push() `// board new passender from the back gate`

>.pop() `// deboard passenger from back gate`

>bus4 = bus.push('gents'); `// gents boarded bus from back gate`

>bus4 = bus.pop('gents'); `// after destination gents deboarded bus from back gate`


# unshift and shift <a id="unshift-and-shift"></a>
add and remove items at start of the array(list)
>.unshift() `// boarded ladies passengers from front gate`

>.shift() `// deboarded ladies passengers from front gate`

# find, some, every, include and filter <a id="length"></a>
some other important methods of arrays
>.find() `// check for any lady passenger by name`

>.some() `// check for any lady passenger by boolean`

>.every() `// check for all passenger is women`

>.include() `// any lady passenger by name`

>.filter() `// give me the ladies passenger list`
```
ticketPrize = [5,7,10,15,20,30,40,60,80]
```
>ticketPrize.find(item => item === 10) `// return 10 the value if true`

>ticketPrize.some(item => item < 10) `// return true beacuse of value 5 is lesser`

>ticketPrize.every(item => item < 10) `// return false beacause of other value is higher`

>ticketPrize.includes(5) `// return true because 5 is in the list`

>ticketPrize.filter(item => item <= 9) `// [5, 7] retrun the value`


```
const passengers = [
    { name: 'Driver', gender: "M", ticket: false },
    { name: 'Conductor', gender: "M", ticket: false },
    { name: 'Divya', gender: "F", ticket: true },
    { name: 'Kavya', gender: "F", ticket: true },
    { name: 'Sandya', gender: "F", ticket: true },
    { name: 'Vandya', gender: "F", ticket: true },
    { name: 'Hitesh', gender: "M", ticket: true },
    { name: 'Piyush', gender: "M", ticket: true },
    { name: 'Anirudh', gender: "M", ticket: false },
    { name: 'Jagdamba', gender: "M", ticket: true },
    { name: 'Dubey', gender: "M", ticket: true },
];
```

>passengers.find(item => item.gender==="F"); `// return the Divya details first F gender passenger`

>passengers.some(item => item.gender==="F"); `// return TRUE bacause of some passengers gender are F`

>passengers.every(item => item.gender==="F"); `// return FALSE because not every passengers gender is F`

>passengers.filter(item => item.ticket === false); `return list of ticket false list`

# map, flat and flatMap <a id="map-flat-and-flatmap"></a>
.map() : used for any performance with each element
```
ticketPrize = [5,7,10,15,20,30,40,60,80]
```
>dobledPrize =  ticketPrize.map(prize => prize * 2) `// new array with dobled prize`

.flat() : used for combined multiple array into single array
staff = ["dirver", "conductor"]

>ladies = ["Divya","Kavya","Sita","Geeta"]

>gents = ["Hitesh","Piyush","Jagdamba","Dubey"]

>bus = [staff, ladies, gents].flat(); `// get all value in one
`
.flatMap() : used for combined multiple array into single array
>staff = ["dirver", "conductor"]

>ladies = ["Divya","Kavya","Sita","Geeta"]

>gents = ["Hitesh","Piyush","Jagdamba","Dubey"]

>bus = [staff, ladies, gents].flatMap(p => p + ' in the bus'); `// get all value in one`

# split and join <a id="split-and-join"></a>
.split() used for creating arrey
```
let myFriends = "Hitesh,Piyush,Jagdamba,Dubey"
```
>frinedArr = myFriends.split(','); `// create element on the based of ,`

.join() is used for array to string

>names = frinedArr.join(',') `// array convert back to string`



# slice and splice <a id="slice-and-splice"></a>
.slice() this is used for slice the list bus Doesn't modify the original array and retrun new array with selected elements
like : ticket done for some passenger some are pendings but all are in the bus
```
let bus7 = ["driver","conductor","Hitesh","Piyush","Jags","Students"]
```
>bus7.slice(2) `// first 2 dirver and conductor does not require tickets`

>bus7.slice(2,5) `// first 2 and after and after 5 (dirver and conductor and stundents and so not required)`

.splice() Modifies the original array and return removed elements
like: some of passengers deboarded the bus but some still in the bus
```
let bus8 = ["driver","conductor","Hitesh","Piyush","Jags","Students"]
```
>busSplice = bus8.splice(2) `// store only passengers and bus8 has only dirver and conductor`

>busSplice = bus8.splice(2,3) `// first value start from and second value count of delete/splice`




# reduce <a id="reduce"></a>
reduce is used for some king of calculation with all element. like total collection of the bus ticket.
```
let ticketSold = [10,15,20,30,40,50,5]
```
>let totalSold = ticketSold.reduce((total,perticket) => total + perticket,0)

# Surprise Me <a id="surprise-me"></a>

### Surprise is that you can create your own methods and surprise anyone which called polyfill
lets create

I need to add text "ticket kat gaya" for all bus passenger for tickets
```
Array.prototype.ticketDone = function(mes){
let pList = [];
for(let i = 0; i < this.length; i++){
pList.push(mes(this[i]));
}
return pList;
}

let bus = ["p1","p2","p3","p4","p5","p6","p7","p8"]
```
>bus.ticketDone(pas => pas + " ticket kat gaya");

# Conclusion
```
const myArr = [1,2,3,4,5.5]
myArr.length() // returns the array length ( count of items the array is 5)
myArr.at(n) // get the value of nth position ( 4th position value is 5.5)
myArr.indexOf(4) // get the position of value (5 is at 4th position)
myArr.concat(4,[45,56,76,86]) // add more value into the array (also can be single value or can be another array itself)
myArr.fill(0); // fill all the position with passed value
myArr.find((item) => item < 7) // check for the first item to match the condition
myArr.some((item) => item < 7) // check for the some item to match the condition
myArr.every((item) => item < 7) // check for all items to match the contions with iterations with true and false
myArr.includes(item); // return booleans if item avilable or not in the array
myArr.filter((item) => item >4) // return the list of the array with matched the conditions
myArr.map(item => item * 2) // return the new array with any actions performed with each elements
myArr.flat(); // convert in the single array from multilevel array
myArr.flatMap(item => item + "a") // maping and also flat the array if there is multilevel array
myArr.join('-') // return string with all value differnciate with mentioned value
myArr.split('-') // return array with split value
myArr.push(7) // add new item in the last of the array
myArr.pop // removed and returns the last item of the array
myArr.unshift(0) // add new item or items in the start of array
myArr.shift() // removed first item from array
myArr.splice(start, count) // returns removed form old array and return the new array from start to number of counts
myArr.slice(count) // just slice removed or sliced from start to count
arr.reduce((total,item) => total+item,intial)  // return the sum of the array with intial if added
```