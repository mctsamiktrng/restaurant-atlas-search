import mongoose from 'mongoose'

const AddressSchema = mongoose.Schema({
  building: String,
  coord: [Number],
  street: String,
  zipcode: String
})

const GradesSchema = mongoose.Schema({
  date: Date,
  grade: String,
  score: Number
})

const RestaurantSchema = mongoose.Schema(
  {
    address: AddressSchema,
    borough: String,
    cuisine: String,
    grades: [GradesSchema],
    name: String,
    restaurant_id: String
  },
  { collection: 'restaurants' }
)

export { AddressSchema, GradesSchema, RestaurantSchema }
