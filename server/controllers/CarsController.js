import { Auth0Provider } from '@bcwdev/auth0provider';
import { carsService } from '../services/CarsService.js';
import BaseController from '../utils/BaseController.js';
export class CarsController extends BaseController {
  constructor() {
    super('api/cars');
    this.router
      .get('', this.getCars)
      .get('/:carId', this.getCarById)
      //CHECKPOINT/MIDDLEWARE REVIEW THE KNIGHT
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createCar)
      .put('/:carId', this.editCar)
      .delete('/:carId', this.deleteCar);
  }
  async getCarById(req, res, next) {
    try {
      const car = await carsService.getCarById(req.params.carId);

      res.send(car);
    } catch (error) {
      next(error);
    }
  }

  async createCar(req, res, next) {
    try {
      const formData = req.body;
      formData.sellerId = req.userInfo.id;
      const car = await carsService.createCar(formData);

      //REVIEW IMPORTANT !!!

      res.send(car);
    } catch (error) {
      next(error);
    }
  }

  async getCars(req, res, next) {
    try {
      const cars = await carsService.getCars();
      res.send(cars);
    } catch (error) {
      next(error);
    }
  }

  //req.params.carId carId is the variable we made in  .put('/:carId', this.editCar)
  async editCar(req, res, next) {
    try {
      const car = await carsService.editCar(
        req.body,
        req.userInfo,
        req.params.carId
      );
      res.send(car);
    } catch (error) {
      next(error);
    }
  }

  async deleteCar(req, res, next) {
    try {
      //the CarId in req.params.carId have to match in .delete('/:CarId,this.deleteCar)
      await carsService.deleteCar(req.params.carId, req.userInfo);
      res.send('Car Deleted');
    } catch (error) {
      next(error);
    }
  }

}
