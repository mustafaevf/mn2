
class Player {
    constructor (id, socketId, boardId, login, color) {
        this.id = id;
        this.socketId = socketId;
        this.boardId = boardId;
        this.login = login;
        this.balance = 2000;
        this.position = 0;
        this.color = color;
        this.status = 0;
        this.properties = [];
    }

    buyProperty(property) {
      if(this.balance - property.price < 0) {
        return;
      }
      this.balance -= property.price;
      property.status = 1;
      property.currentLevel = 0;
      this.properties.push(property);
    }

    checkProp(property) {
      const result = this.properties.filter((prop) => prop.group === property.group);
      return result.length;
    }

    pawnProp(property) {
      const result = this.properties.find((prop) => prop.pos === property.pos);
      if(result.status === 1) {
        this.addBalance(result.pawn);
        result.status = 0;
      }
    }

    buybackProp(property) {
      const result = this.properties.find((prop) => prop.pos === property.pos);
      if(result.status === 0) {
        if(this.reduceBalance(result.buyback) == -1) {
          return 0;
        }
        result.status = 1;
        return 1;
      }
    }

    upgradeProp(property) {
      const count = this.checkProp(property);
      const result = this.properties.find((prop) => prop.pos === property.pos);
      if(result.currentLevel !== 5) {
        result.currentLevel += 1;
        result.tax = result.level[result.currentLevel];
        const price = result.upgrade;
        if(this.reduceBalance(price) == -1) {
          return 0;
        }
        return 1;
      }
      return 0;
    }

    reduceBalance(balance) {
      if(this.balance - balance < 0) {
        return -1;
      }
      this.balance -= balance;
      return this.balance;
    }

    addBalance(balance) {
      this.balance += balance;
    }
}

module.exports = Player;