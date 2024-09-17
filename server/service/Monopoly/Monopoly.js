class Monopoly {
    constructor(boardId) {
        this.boardId = boardId;
        this.players = [];
        this.events = [];
    }

    addPlayer(player) {
        this.players.push(player);
    }
}


module.exports = Monopoly;





// const Fields = [
//   {
//     "pos": 0,
//     "title": "Старт ебать",
//     "action": "start",
//     "price": 0,
//   }, 
//   {
//     "pos": 1,
//     "title": "Поле 1",
//     "action": "property",
//     "price": 300,
//   }, 
//   {
//     "pos": 2,
//     "title": "?",
//     "action": "special",
//     "price": 0,
//   }, 
//   {
//     "pos": 3,
//     "title": "Поле 3",
//     "action": "property",
//     "price": 0,
//   }, 
//   {
//     "pos": 4,
//     "title": "налоги",
//     "action": "bank",
//     "price": 0,
//   }, 
//   {
//     "pos": 5,
//     "title": "Поле 5",
//     "action": "property",
//     "price": 0,
//   }, 
//   {
//     "pos": 6,
//     "title": "Поле 6",
//     "action": "property",
//     "price": 0,
//   }, 
//   {
//     "pos": 7,
//     "title": "?",
//     "action": "special",
//     "price": 0,
//   },
//   {
//     "pos": 8,
//     "title": "Поле 8",
//     "action": "property",
//     "price": 0,
//   },
//   {
//     "pos": 9,
//     "title": "Поле 9",
//     "action": "property",
//     "price": 0,
//   },
//   {
//     "pos": 10,
//     "title": "Тюряга",
//     "action": "jail",
//     "price": 0,
//   },
//   {
//     "pos": 11,
//     "title": "Поле 11",
//     "action": "property",
//     "price": 0,
//   },
//   {
//     "pos": 12,
//     "title": "Поле 12",
//     "action": "property",
//     "price": 0,
//   },
//   {
//     "pos": 13,
//     "title": "Поле 13",
//     "action": "property",
//     "price": 0,
//   },
//   {
//     "pos": 14,
//     "title": "Поле 14",
//     "action": "property",
//     "price": 0,
//   },
//   {
//     "pos": 15,
//     "title": "Поле 15",
//     "action": "property",
//     "price": 0,
//   },
//   {
//     "pos": 16,
//     "title": "Поле 16",
//     "action": "property",
//     "price": 0,
//   },
//   {
//     "pos": 17,
//     "title": "?",
//     "action": "special",
//     "price": 0,
//   },
//   {
//     "pos": 18,
//     "title": "Поле 18",
//     "action": "property",
//     "price": 0,
//   },
//   {
//     "pos": 19,
//     "title": "Поле 19",
//     "action": "property",
//     "price": 0,
//   },
//   {
//     "pos": 20,
//     "title": "Казик",
//     "action": "casiono",
//     "price": 0,
//   },
//   {
//     "pos": 21,
//     "title": "Поле 21",
//     "action": "property",
//     "price": 0,
//   },
//   {
//     "pos": 22,
//     "title": "?",
//     "action": "special",
//     "price": 0,
//   },
//   {
//     "pos": 23,
//     "title": "Поле 23",
//     "action": "property",
//     "price": 0,
//   },
//   {
//     "pos": 24,
//     "title": "Поле 24",
//     "action": "property",
//     "price": 0,
//   },
//   {
//     "pos": 25,
//     "title": "Поле 25",
//     "action": "property",
//     "price": 0,
//   },
//   {
//     "pos": 26,
//     "title": "Поле 26",
//     "action": "property",
//     "price": 0,
//   },
//   {
//     "pos": 27,
//     "title": "Поле 27",
//     "action": "property",
//     "price": 0,
//   },
//   {
//     "pos": 28,
//     "title": "Поле 28",
//     "action": "property",
//     "price": 0,
//   },
//   {
//     "pos": 29,
//     "title": "Поле 29",
//     "action": "property",
//     "price": 0,
//   },
//   {
//     "pos": 30,
//     "title": "отд",
//     "action": "ot",
//     "price": 0,
//   },
//   {
//     "pos": 31,
//     "title": "Поле 31",
//     "action": "property",
//     "price": 0,
//   },
//   {
//     "pos": 32,
//     "title": "Поле 32",
//     "action": "property",
//     "price": 0,
//   },
//   {
//     "pos": 33,
//     "title": "?",
//     "action": "special",
//     "price": 0,
//   },
//   {
//     "pos": 34,
//     "title": "Поле 34",
//     "action": "property",
//     "price": 0,
//   },
//   {
//     "pos": 35,
//     "title": "Поле 35",
//     "action": "property",
//     "price": 0,
//   },
//   {
//     "pos": 36,
//     "title": "????",
//     "action": "super-special",
//     "price": 0,
//   },
//   {
//     "pos": 37,
//     "title": "Поле 37",
//     "action": "property",
//     "price": 0,
//   },
//   {
//     "pos": 38,
//     "title": "?",
//     "action": "special",
//     "price": 0,
//   },
//   {
//     "pos": 39,
//     "title": "Поле 39",
//     "action": "property",
//     "price": 0,
//   }
// ]

// let players = []

// let events = []

// const colors = {
//   0: "red",
//   1: "orange",
//   2: "green",
//   3: "blue"
// }

// function User(socketId, boardId, color, login ) {
//   return {
//     "socketId" : socketId,
//     "balance" : 2000,
//     "position": 0,
//     "login": login ? login : Math.random().toString(),
//     "boardId": boardId,
//     "color": color,
//     "properties": []
//   };
// }