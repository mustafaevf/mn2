const Fields = require('./Field')
const Player = require('./Player')
const messages = require('./messages')

games = []

class Game {
    constructor(id, uuid, max_person, io) {
        this.id = id
        this.uuid = uuid
        this.max_person = max_person
        this.players = []
        this.events = []
        this.round = 0
        this.currentPlayerIndex = -1
        this.currentPlayerId = 0
        this.boardState = []
        this.io = io
        this.colors = ['red', 'green', 'blue', 'yellow']

        // this.customSettings = [
        //   {
        //     '':
        //   }

        // ]
    }

    offerDeal(playerId, data) {
        if (playerId == data.from.user.id) {
            if (playerId != data.to.user.id) {
                this._addEvent('offerDeal', { data }, data.to.user.id)
            }
        }
    }

    addPlayer(userId, socketId, boardId, login) {
        const player = new Player(
            userId,
            socketId,
            boardId,
            login,
            this.colors[this.players.length]
        )
        this.players.push(player)
    }

    pawnProperty(playerId, property) {
        const candidate = this.players.find(
            (candidate) => candidate.id === playerId
        )
        if (this.currentPlayerId == candidate.id) {
            candidate.pawnProp(property)
            this.broadcastMessage(
                candidate.login +
                    ' заложил ' +
                    property.title +
                    ' за ' +
                    property.pawn
            )
        }
    }

    buybackProperty(playerId, property) {
        const candidate = this.players.find(
            (candidate) => candidate.id === playerId
        )
        if (this.currentPlayerId == candidate.id) {
            candidate.buybackProp(property)
            this.broadcastMessage(
                candidate.login +
                    ' выкупил ' +
                    property.title +
                    ' за ' +
                    property.buyback
            )
        }
    }

    upgradeProperty(playerId, property) {
        const candidate = this.players.find(
            (candidate) => candidate.id === playerId
        )
        if (this.currentPlayerId == candidate.id) {
            candidate.upgradeProp(property)
            this.broadcastMessage(
                candidate.login +
                    ' повысил ренту ' +
                    property.title +
                    ' за ' +
                    property.upgrade
            )
        }
    }

    buyProperty() {
        const state = this.boardState[this.boardState.length - 1]
        if (state.event === 'buyProperty') {
            this.boardState.pop()
        }
        const player = this.players[this.currentPlayerIndex]
        let current_field = Fields.find(
            (field) => field.pos === player.position
        )

        player.buyProperty(current_field)
        this._nextPlayer()
        this._addEvent('rollDice')
    }

    _roll() {
        return Math.floor(Math.random() * 6) + 1
    }

    rollDice() {
        const dice1 = Math.floor(Math.random() * 6) + 1
        const dice2 = Math.floor(Math.random() * 6) + 1
        const dice_random = dice1 + dice2
        const player = this.players[this.currentPlayerIndex]
        this.broadcastMessage(
            this.players[this.currentPlayerIndex].login +
                ' выбил ' +
                dice1 +
                ':' +
                dice2
        )
        if (player.position + dice_random > Fields.length) {
            player.position = player.position - Fields.length + dice_random
            player.balance += 2000
            this.broadcastMessage(
                this.players[this.currentPlayerIndex].login +
                    ' прошел круг и получил 2000'
            )
        } else {
            player.position += dice_random
        }
        const state = this.boardState[this.boardState.length - 1]
        if (state.event === 'rollDice') {
            this.boardState.pop()
        }

        let current_field = Fields.find(
            (field) => field.pos === player.position
        )
        let isProp = true
        if (current_field) {
            if (current_field.action == 'property') {
                for (let el of this.players) {
                    for (let pr of el.properties) {
                        if (pr == current_field) {
                            isProp = false

                            if (el.login == player.login) {
                                this.broadcastMessage(
                                    this.players[this.currentPlayerIndex]
                                        .login + ' выпал на свою клетку '
                                )
                            } else {
                                if (pr.status == 0) {
                                    this.broadcastMessage(
                                        this.players[this.currentPlayerIndex]
                                            .login +
                                            ' выпал на чужую клетку, но ничего платить не должен'
                                    )
                                    return
                                }
                                this.broadcastMessage(
                                    this.players[this.currentPlayerIndex]
                                        .login + ' выпал на чужую клетку '
                                )
                                let double = false
                                if (dice1 === dice2) {
                                    double = true
                                }
                                this.boardState.push({
                                    playerId:
                                        this.players[this.currentPlayerIndex]
                                            .id,
                                    event: 'payTax',
                                    round: this.round,
                                    data: {
                                        price: pr.tax,
                                        to: el.id,
                                        double: double,
                                    },
                                })

                                // this.io.of('/api/plays').to(this.players[this.currentPlayerIndex].socketId).emit('event', 'payTax', { price: pr.price });
                                return
                            }
                        }
                    }
                }
                if (isProp) {
                    this.players[this.currentPlayerIndex].checkProp(
                        current_field
                    )
                    this.broadcastMessage(
                        this.players[this.currentPlayerIndex].login +
                            ' выпал на поле'
                    )
                    let message =
                        'Купить ' +
                        current_field.title +
                        ' за ' +
                        current_field.price
                    this._addEvent('buyProperty')
                    return
                }
            } else if (current_field.action === 'special') {
            } else if (current_field.action === 'bank') {
            } else if (current_field.action === 'super-special') {
            } else if (current_field.action === 'jail') {
                this.broadcastMessage(
                    this.players[this.currentPlayerIndex].login + ' кайфует'
                )
            } else if (current_field.action === 'ot') {
                this.players[this.currentPlayerIndex].position = 10
                this.broadcastMessage(
                    this.players[this.currentPlayerIndex].login +
                        ' попал в тюрьму потому что енблан. И пропустит 3 хода'
                )
            }
        }
        if (dice1 != dice2) {
            // this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
            // this.currentPlayerId = this.players[this.currentPlayerIndex].id;
            this._nextPlayer()
        }
        this._addEvent('rollDice')
    }

    _movePlayer(player, diceSum) {
        if (player.position + diceSum > Fields.length) {
            player.position = player.position - Fields.length + diceSum
            player.balance += 2000
            this.broadcastMessage(`${player.login} прошел круг и получил 2000`)
        } else {
            player.position += diceSum
        }
    }

    payTax() {
        const state = this.boardState[this.boardState.length - 1]
        if (state.event === 'payTax') {
            this.boardState.pop()
        }
        const player = this.players[this.currentPlayerIndex]
        player.reduceBalance(state.data.price)
        const to = this.players.find(
            (candidate) => candidate.id === state.data.to
        )
        to.addBalance(state.data.price)
        if (!state.double) {
            this._nextPlayer()
            // this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
            // this.currentPlayerId = this.players[this.currentPlayerIndex].id;
        }
        this._addEvent('rollDice')
        // this.boardState.push({playerId: this.players[this.currentPlayerIndex].id, event: 'rollDice', round: this.round});
        // this.update();
        // this.io.of('/api/plays').to(this.players[this.currentPlayerIndex].socketId).emit('event', 'rollDice');
    }

    startGame() {
        if (this.players.length != this.max_person) {
            return null
        }
        this.round += 1
        let currentPlayerIndex = Math.floor(Math.random() * this.players.length)
        this.currentPlayerIndex = currentPlayerIndex
        this.currentPlayerId = this.players[currentPlayerIndex].id
        this.broadcastMessage(
            this.players[currentPlayerIndex].login + ' бросает куб первым'
        )
        this._addEvent('rollDice')
    }

    _nextPlayer() {
        this.currentPlayerIndex =
            (this.currentPlayerIndex + 1) % this.players.length
        this.currentPlayerId = this.players[this.currentPlayerIndex].id
    }

    _addEvent(event, _params, _playerId) {
        this.boardState.push({
            playerId: _playerId
                ? _playerId
                : this.players[this.currentPlayerIndex].id,
            event: event,
            round: this.round,
            data: _params ? _params : null,
        })
        this._update()
        this.io
            .of('/api/plays')
            .to(this.players[this.currentPlayerIndex].socketId)
            .emit('event', event, _params)
    }

    broadcastMessage(data) {
        this.events.push(data)
        this._update()
    }

    _update() {
        this.io
            .of('/api/plays')
            .to(this.id)
            .emit('update', {
                id: this.id,
                uuid: this.uuid,
                max_person: this.max_person,
                players: this.players,
                events: this.events,
                round: this.round,
                currentPlayerIndex: this.currentPlayerIndex,
                currentPlayerId: this.currentPlayerId,
                boardState: this.boardState,
                boardState: this.boardState,
            })
    }

    findPlayerBySocketId(socketId) {
        const result = this.players.filter(
            (player) => player.socketId == socketId
        )
        return result
    }

    findPlayerById(id) {
        const result = this.players.filter((player) => player.id == id)
        return result
    }
}

module.exports = { Player, Game, Fields, games }
