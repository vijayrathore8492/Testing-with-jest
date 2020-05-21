import ATM from '../src/atm'

describe("ATM", () => {

  let atmObj: ATM;
  let initialBalance: number;

  describe(".add", () => {
    beforeEach(() => {
      initialBalance = 1000;
      atmObj = new ATM(initialBalance);
    })

    describe("when amount is less than allowed", () => {
      it("adds money to balance", () => {
        expect(atmObj.add(300).balance()).toEqual(initialBalance + 300);
      })
    })

    describe("when amount is more than allowed", () => {
      it("throws not allowed", () => {
        expect(() => atmObj.add(10001)).toThrowError("not allowed");
      })
    })
  })

  describe(".withdraw", () => {

    describe("when withdraw is under max limit", () => {
      beforeEach(() => {
        initialBalance = 10000;
        atmObj = new ATM(initialBalance);
      })

      describe("when withdrawal amount is less than account balance", () => {
        it("deducts money from balance", () =>{
          expect(atmObj.withdraw(9999).balance()).toEqual(initialBalance - 9999);
        })
      })

      describe("when withdrawal amount is more than account balance", () => {
        it("throws not allowed", () =>{
          expect(() => atmObj.withdraw(10001)).toThrowError("not allowed");
        })
      })
    })

    describe("when withdraw is more than max limit", () => {
      beforeEach(() => {
        initialBalance = 60000;
        atmObj = new ATM(initialBalance);
      })

      it("throws: not allowed", () =>{
        expect(() => atmObj.withdraw(50001)).toThrowError("not allowed");
      })
    })
  })

  describe(".balance", () => {
    beforeAll(() => {
      initialBalance = 10000;
      atmObj = new ATM(initialBalance);
    })

    it("gives correct balance after all transactions", () => {
      atmObj.add(1000).withdraw(500).add(200).withdraw(400);
      expect(atmObj.balance()).toEqual(initialBalance + 1000 - 500 + 200 - 400);
    })
  })

  describe(".transactions", () => {
    beforeAll(() => {
      initialBalance = 10000;
      atmObj = new ATM(initialBalance);
    })



    it("gives all transactions", () => {
      atmObj.add(1000).withdraw(500).add(200).withdraw(400);
      expect(atmObj.showTransactions()).toEqual(
        [
          "add: 1000",
          "withdraw: 500",
          "add: 200",
          "withdraw: 400",
        ]
      );
    })
  })
})