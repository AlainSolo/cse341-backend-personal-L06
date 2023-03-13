module.exports = (mongoose) => {
  const prophetsSchema = mongoose.Schema({
    username: {
      type: String
    },
    password: {
      type: String
    },
    displayName: {
      type: String
    },
    info: {
      type: String
    },
    profile: {
      type: String
    
    }
  });

  return mongoose.model('prophets_l06', prophetsSchema);
};
