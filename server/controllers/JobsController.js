import { Auth0Provider } from '@bcwdev/auth0provider';
import { jobsService } from '../services/JobsService.js';
import BaseController from '../utils/BaseController.js';

export class JobsController extends BaseController {
  constructor() {
    super('/api/jobs');
    this.router
      .get('', this.getJobs)

      .get('/:magicVarId', this.getById)
      //CHECKPOINT/MIDDLEWARE REVIEW THE KNIGHT
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .put('/:magicVarId', this.editJob)
      .delete('/:magicVarId', this.delete);
  }
  async getJobs(req, res, next) {
    try {
      const jobs = await jobsService.getJobs();
      res.send(jobs);
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const job = await jobsService.getById(req.params.magicVarId);
      res.send(job);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const formData = req.body;
      formData.sellerId = req.userInfo.id;
      const job = await jobsService.createJob(formData);
      res.send(job);
    } catch (error) {
      next(error);
    }
  }

  async editJob(req, res, next) {
    try {
      const job = await jobsService.editJob(
        req.body,
        req.userInfo,
        req.params.magicVarId
      );
      res.send(job);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      //  const example = await example;
      //res.send()
    } catch (error) {
      next(error);
    }
  }
}
