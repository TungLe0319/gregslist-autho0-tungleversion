import { BadRequest, Forbidden } from "@bcwdev/auth0provider/lib/Errors.js";
import { dbContext } from "../db/DbContext.js"

class HousesService{

async getHouses(){
const houses = await dbContext.Houses.find();
return houses

}

async getHouseById(houseId){
  const house = await dbContext.Houses.findById(houseId).populate('seller', 'name picture')
  if (!house) {
    throw new BadRequest('Invalid House Id')
  }
  return house
}

async createHouse(formData){
  const house = await dbContext.Houses.create(formData)
  return house
}



async editHouse(houseData, userInfo, houseId){
  const house = await this.getHouseById(houseData.id || houseId)
  if (userInfo.id != house.id.toString()) {
    throw new Forbidden('Thats Not Your House... Go Away')
  }
  if (!houseId) {
    throw new BadRequest('Invalid House Id')
  }

  house.bedrooms = houseData.bedrooms || house.bedrooms
  house.bathrooms = houseData.bathrooms || house.bathrooms
  house.levels = houseData.levels || house.levels
  house.price = houseData.price || house.price
  house.description = houseData.description || house.description
  house.imgUrl = houseData.imgUrl || house.imgUrl
}

async deleteHouse(houseId){
  const house = await this.getHouseById(houseId)
  if (!house) {
    throw new BadRequest('Invalid car Id')
  }
 
  await dbContext.Houses.findByIdAndDelete(houseId)
  return house
}
}

export const housesService = new HousesService()