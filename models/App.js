import mongoose, {Schema} from 'mongoose';


const appSchema = new Schema({
  app: {
    type: String,
    required: true,
    unique: true, 
  },
  category: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: null,
  },
  reviews: {
    type: Number,
    default: 0,
  },
  size: {
    type: String,
    default: 'Varies with device',
  },
  installs: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['Free', 'Paid'],
    required: true,
  },
  price: {
    type: String,
    default: '0',
  },
  contentRating: {
    type: String,
    required: true,
  },
  genres: {
    type: String,
    required: true,
  },
  lastUpdated: {
    type: Date,
    required: true,
  },
  currentVer: {
    type: String,
    required: true,
  },
  androidVer: {
    type: String,
    required: true,
  },
});


const App = mongoose.model('App', appSchema);

export default App;
