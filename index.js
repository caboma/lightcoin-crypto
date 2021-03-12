class Account {
  constructor(username) {
    this.username = username;
    this.transactions = [];
  }
  get balance() {
    let balance = 0;
    for (let t of this.transactions) {
    	balance += t.value;
    }
    return balance;
  }
  addTransaction(transaction) {
    this.transactions.push(transaction);
  }

}

class Transaction {
  constructor(amount, account) {
    this.amount  = amount;
    this.account = account;
  }
  commit() {
    if (!this.isAllowed()) return false;
      this.time = new Date();
      this.account.addTransaction(this);
      return true;
  }
}

class Deposit extends Transaction {
  get value() {
    return this.amount;
  }
  isAllowed() {
    return true;
  }
}

class Withdrawal extends Transaction {
  get value() {
    return -this.amount;
  }

  isAllowed() {
    return (this.account.balance - this.amount >= 0);
  }
}

// DRIVER CODE BELOW

const myAccount = new Account('billybob');

console.log('Starting Balance:', myAccount.balance);
console.log('--------');

console.log('Attempting to Withdraw: $1000.00')
const t1 = new Withdrawal(1000.00, myAccount);
console.log('Result: ', t1.commit());
console.log('Ending Balance:', myAccount.balance);
console.log('--------');

console.log('Deposit cash: $120');
const t2 = new Deposit(120.00, myAccount);
console.log('Result:', t2.commit());
console.log('Ending Balance:', myAccount.balance);
console.log('--------');

console.log('Attempting to Withdraw: $100.00')
const t3 = new Withdrawal(100.00, myAccount);
console.log('Result: ', t3.commit());
console.log('Ending Balance:', myAccount.balance);
console.log('--------');

console.log('Attempting to Withdraw: $18.00')
const t4 = new Withdrawal(18.00, myAccount);
console.log('Result: ', t4.commit());
console.log('Ending Balance:', myAccount.balance);
console.log('--------');

console.log('Account Transaction History: ', myAccount.transactions)

