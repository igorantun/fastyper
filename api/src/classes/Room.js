import R from 'ramda'
import quotes from './../lib/quotes.json'

class Room {
  constructor (slug) {
    this.slug = slug
    this.players = []
    this.status = 'stopped'
    this.created = Date.now()
    this.quote = quotes[Math.floor(Math.random() * quotes.length)]
  }

  // Add player to room
  add_player (player) {
    this.players = R.append(player, this.players)
  }

  // Get player by id
  get_player (id) {
    return R.find(R.propEq('id', id))(this.players)
  }

  // Remove player by name
  remove_player (id) {
    this.players = R.reject(player => player.id === id, this.players)

    return this.players
  }

  // Start game
  start_game () {
    this.status = 'running'

    return this.quote
  }

  // Check if all players are ready
  get everyone_ready () {
    return R.all(R.propEq('ready', true))(this.players)
  }

  // Number of active players in the room
  get active_users () {
    return this.players.length
  }

  // Total keystrokes sent in the room
  get keystrokes () {
    const getKeystrokes = item => R.prop('keystrokes', item)
    const sumKeystrokes = (total, item) => R.sum([total, getKeystrokes(item)])

    return R.reduce(sumKeystrokes, 0)(this.players)
  }

  // Seconds since the room was created
  get active_since () {
    return Math.floor((Date.now() - this.created) / 1000)
  }

  // Mean score among players
  get mean () {
    return R.pipe(
        R.map(R.prop('score')),
        R.mean,
      )(this.players)
  }

  // Number of players which scores are below the room's mean score
  get below_mean () {
    return R.length(R.pipe(
      R.map(R.prop('score')),
      R.filter(R.lt(R.__, this.mean)),
    )(this.players))
  }

  // Array of active players sorted by score from higher to lower (format: [username, score])
  get ranking () {
    const players = R.map(R.pipe(
      R.pick(['name', 'score']),
      R.values,
    ))(this.players)

    return R.reverse(R.sortBy(R.last)(players))
  }

  // Array of active players sorted by score from higher to lower (format: [id, score])
  get id_ranking () {
    const players = R.map(R.pipe(
      R.pick(['id', 'score']),
      R.values,
    ))(this.players)

    return R.reverse(R.sortBy(R.last)(players))
  }

  // Name of the player with the best score in the last minute
  get last_minute_lead () {
    return R.head(R.head(this.ranking))
  }
}


export default Room
