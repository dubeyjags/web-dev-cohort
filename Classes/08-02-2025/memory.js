/*stack: memory for primative data (string,number bolean) passed by value
heap : memory for non primative data (array and object) passed by refrence in the stack to the heap memory data
garbage collector: to remove the data from heap memory which refrence has be removed (not used data)
memory leak: when garbage collector does not work then random data linked to the heap memory
createing copy : 
	1) create blank and then fill all key and value 
	2) with spread opreator ...object (doesn't work on the inner operators, only for first level) called shallow copy
	3) Deep copy: copy to the deep level (till nested level) 
		For the deep level copy make object to string (JSON.stringify) then string to object (JSON.parse) 
*/