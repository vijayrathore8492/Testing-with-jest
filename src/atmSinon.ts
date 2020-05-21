import DB from './db';

export default class ATMSinon {
  private __userId = "";
  private __maxAddAllowedInOnce = 10000;
  private __maxWithdrawAllowedInOnce = 50000;

  constructor(userId: string) {
    this.__userId = userId;
  }

  public async balance(){
    const query = "SELECT amount FROM balance WHERE user_id = :userId";
    const [ result ] = await DB.executeQuery(query, { userId: this.__userId });
    return result["amount"];
  }

  public async add(amount: number) {
    if(amount > this.__maxAddAllowedInOnce) throw new Error("not allowed");

    const query = "INSERT INTO balance (user_id, amount) VALUES (:userId, :amount) ON DUPLICATE KEY UPDATE amount = amount + :amount";
    await DB.executeQuery(query, { userId: this.__userId, amount: amount});
    this.__updateTransaction("add", amount)
    return this;
  }

  public async withdraw(amount: number){
    if(amount > this.__maxWithdrawAllowedInOnce) throw new Error("not allowed");
    if(amount > await this.balance()) throw new Error("not allowed");
    
    const query = "UPDATE balance SET amount = amount - :amount WHERE user_id = :userId";
    await DB.executeQuery(query, { userId: this.__userId, amount: amount });
    this.__updateTransaction("withdraw", amount)
    return this;
  }

  public async showTransactions(){
    const query = "SELECT user_id, type, amount FROM transactions WHERE user_id = :userId";
    return await DB.executeQuery(query, { userId: this.__userId });
  }

  private async __updateTransaction(type: string, amount: number){
    const query = "INSERT INTO transactions(user_id, type, amount) VALUES (?,?,?)";
    
    return await DB.executeQuery(query, { userId: this.__userId, type: type, amount: amount });
  }
}