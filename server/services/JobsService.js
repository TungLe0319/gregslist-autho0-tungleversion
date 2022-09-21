import { BadRequest, Forbidden } from '@bcwdev/auth0provider/lib/Errors.js';
import { dbContext } from '../db/DbContext.js';

class JobsService{
async editJob(jobData, userInfo, magicVarId) {
  const job = await this.getById(jobData.id || magicVarId)
  if (userInfo.id != job.sellerId.toString()) {
    throw new Forbidden('Thats not your Job Stop!')
  }
job.company = jobData.company || job.company
job.jobTitle = jobData.jobTitle || job.jobTitle
job.hours = jobData.hours || job.hours
job.rate = jobData.rate || job.rate
job.description = jobData.description || job.description

await job.save()
return job
}


async getJobs(){
const jobs = await dbContext.Jobs.find()
return jobs
}

async getById(jobId){
const job = await dbContext.Jobs.findById(jobId)
 if (!job) {
  throw new BadRequest('Invalid Id');
 }
 return job
}

async createJob(formData){
const job = await dbContext.Jobs.create(formData)
return job}

async delete(jobId, userInfo){
const job = await this.getById(jobId)
if (!job) {
  throw new BadRequest(' Invalid House Id')
}
if (userInfo.id != job.sellerId.toString()) {
  throw new Forbidden("NOT YOURS TO DELETE")
}
job.delete()
}

}

export const jobsService = new JobsService()

//TODO DbContext Connections