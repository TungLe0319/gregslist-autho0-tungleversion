import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";

export class JobsController extends BaseController{
constructor() {
  super('/api/jobs')
  this.router
    .get('', this.getJobs)
   

    .get('/:Id', this.getById)
    //CHECKPOINT/MIDDLEWARE REVIEW THE KNIGHT
    .use(Auth0Provider.getAuthorizedUserInfo)
    .post('', this.create)
    .put('/:Id', this.edit)
    .delete('/:Id', this.delete);
}
    async getJobs(req, res, next) {
       try {
        //  const PH = await example;
         //res.send(PH)
       } catch (error) {
         next(error);
       }
     }
   
     async getById(req, res, next) {
       try {
        //  const PH = await Service.getById(req.params.Id)
         //res.send(PH)
       } catch (error) {
         next(error);
       }
     }
   
     async create(req, res, next) {
       try {
        //  const example = await example;
         //res.send()
       } catch (error) {
         next(error);
       }
     }
   
     async edit(req, res, next) {
       try {
        //  const example = await example;
         //res.send()
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