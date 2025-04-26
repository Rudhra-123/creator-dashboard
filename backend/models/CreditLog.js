const creditLogSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    action: String,
    credits: Number,
    createdAt: { type: Date, default: Date.now },
  });
  
  module.exports = mongoose.model('CreditLog', creditLogSchema);