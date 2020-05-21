export default class ATM {
  private __balance = 0;
  private __transactions: string[];
  private __maxAddAllowedInOnce = 10000;
  private __maxWithdrawAllowedInOnce = 50000;

  constructor(initialBalance: number) {
    this.__balance = initialBalance;
    this.__transactions = [];
  }

  public balance(){
    return this.__balance;
  }

  public add(amount: number) {
    if(amount > this.__maxAddAllowedInOnce) throw new Error("not allowed");

    this.__balance += amount;
    this.__updateTransaction("add", amount)
    return this;
  }

  public withdraw(amount: number){
    if(amount > this.__maxWithdrawAllowedInOnce) throw new Error("not allowed");
    if(amount > this.__balance) throw new Error("not allowed");
    
    this.__balance -= amount;
    this.__updateTransaction("withdraw", amount)
    return this;
  }

  public showTransactions(){
    return this.__transactions;
  }

  private __updateTransaction(type: string, amount: number){
    this.__transactions.push(`${type}: ${amount}`);
  }
}