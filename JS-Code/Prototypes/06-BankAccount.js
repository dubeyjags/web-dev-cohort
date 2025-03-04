function BankAccount(balance) {
    // Initialize balance and transactions properties
    this.balance = balance
    this.transactions = []
}

// Define deposit method on BankAccount's prototype
BankAccount.prototype.deposit = function(amount){
    this.balance += amount;
    return this.transactions.push('Deposited '+ amount)
}

// Define withdraw method on BankAccount's prototype
BankAccount.prototype.withdraw = function(amount){
    if(this.balance >= amount){
        this.balance -= amount;
        return this.transactions.push('Withdrew '+ amount)
    } else {
        return this.transactions.push('Insufficient balance')
    }
}

// Define getTransactionHistory method on BankAccount's prototype
BankAccount.prototype.getTransactionHistory = function(){
    return this.transactions;
}
