import { BadRequest, Forbidden } from '@bcwdev/auth0provider/lib/Errors.js';
import { dbContext } from '../db/DbContext.js';

class CarsService {
  async deleteCar(carId, userInfo) {
    const car = await this.getCarById(carId);
    if (!car) {
      throw new BadRequest('Invalid Car Id');
    }
    if (userInfo.id != car.sellerId.toString()) {
    }
    car.delete()

  }

  async getCarById(carId) {
    const car = await dbContext.Cars.findById(carId).populate(
      'seller',
      'name picture'
    );
    if (!car) {
      throw new BadRequest('Invalid Car Id');
    }
    return car;
  }
  async createCar(formData) {
    const car = await dbContext.Cars.create(formData);

    return car;
  }

  async getCars() {
    const cars = await dbContext.Cars.find();
    return cars;
  }

  async editCar(carData, userInfo, carId) {
    const car = await this.getCarById(carData.id || carId);
    //REVIEW car.id is an object id comparison on id, when pulling something from the database
    if (userInfo.id != car.sellerId) {
      throw new Forbidden('Thats Not Your Car... Go away.. please');
    }
    car.make = carData.make || car.make;
    car.model = carData.model || car.model;
    car.price = carData.price || car.price;
    car.description = carData.description || car.description;
    car.year = carData.year || car.year;
    car.imgUrl = carData.imgUrl || car.imgUrl;
    await car.save();
    return car;
  }
}

export const carsService = new CarsService();
