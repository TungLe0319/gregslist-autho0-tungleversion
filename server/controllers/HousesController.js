import { Auth0Provider } from '@bcwdev/auth0provider';
import { dbContext } from '../db/DbContext.js';
import { HouseSchema } from '../models/House.js';
import { housesService } from '../services/HousesService.js';
import BaseController from '../utils/BaseController.js';

export class HousesController extends BaseController {
  constructor() {
    super('/api/houses');
    this.router
      .get('', this.getHouses)
//hi
      .get('/:houseId', this.getHouseById)
      //CHECKPOINT/MIDDLEWARE REVIEW THE KNIGHT
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createHouse)
      .put('/:houseId', this.editHouse)
      .delete('/:houseId', this.deleteHouse);
  }

  async getHouses(req, res, next) {
    try {
      const house = await housesService.getHouses();

      res.send(house);
    } catch (error) {
      next(error);
    }
  }

  async getHouseById(req, res, next) {
    try {
      const house = await housesService.getHouseById(req.params.houseId);
      res.send(house);
    } catch (error) {
      next(error);
    }
  }

  async createHouse(req, res, next) {
    try {
      const formData = req.body;
      formData.sellerId = req.userInfo.id;
      const car = await housesService.createHouse(formData);

      res.send(car);
    } catch (error) {
      next(error);
    }
  }

  async editHouse(req, res, next) {
    try {
      const house = await housesService.editHouse(req.body, req.userInfo, req.params.houseId);
      res.send(house);
    } catch (error) {
      next(error);
    }
  }

  async deleteHouse(req, res, next) {
    try {
      await housesService.deleteHouse(req.params.houseId);
      res.send('House Deleted...Sad Day but good job you did it');
    } catch (error) {
      next(error);
    }
  }
}
