import ATMSinon from '../src/atmSinon';
import sinon from 'sinon';
import DB from '../src/db';

describe('ATMSinon', () => {
  let atmSinonObj: ATMSinon;
  let userId: string;
  let stubMysql = {};
  let initialBalance: number;


  beforeEach(() => {
    userId = "abc";
    initialBalance = 1000;
    atmSinonObj = new ATMSinon(userId);
    stubMysql[userId] = { balance: initialBalance, transactions: [] }
  })


  sinon.stub(DB, 'executeQuery').callsFake(async (query: string, variables?: object) => {
    if(query == "INSERT INTO balance (user_id, amount) VALUES (:userId, :amount) ON DUPLICATE KEY UPDATE amount = amount + :amount"){
      stubMysql[variables["userId"]]["balance"] += variables["amount"];
      return true;
    }
    else if(query == "SELECT amount FROM balance WHERE user_id = :userId") {
      return [{ amount: stubMysql[variables["userId"]]["balance"] }]
    }
    else if(query == "UPDATE balance SET amount = amount - :amount WHERE user_id = :userId") {
      stubMysql[variables["userId"]]["balance"] -= variables["amount"];
      return true;
    }
  });
  
  describe('.balance', () => {
    it("gives account balance", async () => {
      expect(await atmSinonObj.balance()).toEqual(initialBalance)
    })
  })


  describe(".add", () => {
    describe("when within limits", () => {
      it("adds to balance", async () => {
        await atmSinonObj.add(500)
        expect(await atmSinonObj.balance()).toEqual(initialBalance + 500)
      })
    })

    describe("when amount is more than allowed", () => {
      it("throws not allowed", () => {
        expect(async () => await atmSinonObj.add(10001)).rejects.toEqual(new Error('not allowed'))
      })
    })
  })

  describe(".withdraw", () => {

    describe("when withdraw is under max limit", () => {
      describe("when withdrawal amount is less than account balance", () => {
        it("deducts money from balance", async () =>{
          await atmSinonObj.withdraw(999)
          expect(await atmSinonObj.balance()).toEqual(initialBalance - 999);
        })
      })

      describe("when withdrawal amount is more than account balance", () => {
        it("throws not allowed", async () =>{
          const balancePlus1 = (await atmSinonObj.balance()) + 1;
          expect(async () => await atmSinonObj.withdraw(balancePlus1))
            .rejects
            .toEqual(new Error('not allowed'))
        })
      })
    })

    describe("when withdraw is more than max limit", () => {
      beforeEach(() => {
        initialBalance = 60000;
        atmSinonObj = new ATMSinon(userId);
        stubMysql[userId] = { balance: initialBalance, transactions: [] }
      })

      it("throws: not allowed", async () =>{
        expect(async () => await atmSinonObj.withdraw(50001))
          .rejects
          .toEqual(new Error('not allowed'))
      })
    })
  })
})

