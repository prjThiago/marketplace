const mongoose = require('mongoose')
const paginate = require('mongoose-paginate')

const Purchase = new mongoose.Schema({
  content: { type: String, required: true },
  ad: { type: mongoose.Schema.Types.ObjectId, ref: 'Ad', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
})

Purchase.plugin(paginate)

module.exports = mongoose.model('Purchase', Purchase)
