const { CronJob } = require('cron');
const personDao = require('../database/dao/personDao');
const { Person } = require('../models');
const userMiddleware = require('../api/middlewares/userMiddleware');
const jobMiddleware = require('../api/middlewares/jobMiddleware');
const { sendNewestJobs } = require('../../../helpers/email/sendEmail');

async function sendMostRecentJobsEmail() {
  const userIds = await userMiddleware.findAllEligibleEmail();
  if (userIds) {
    const students = await personDao.findAllToJobEmail(Person, userIds);
    if (students && Array.isArray(students) && students.length) {
      const courseJobs = new Map();
      const sendEmailPromises = students.map(async (student) => {
        let jobs = courseJobs.get(student.course);
        if (jobs === undefined) {
          jobs = await jobMiddleware.findFiveNewestJobsByCourse(student.course);
          courseJobs.set(student.course, jobs);
        }
        if (jobs && Array.isArray(jobs) && jobs.length) {
          return sendNewestJobs(student.email, jobs, student.name);
        }
      });

      await Promise.all(sendEmailPromises);
    }
  }
}

console.log('init send most recent jobs email job!');
const sendMostRecentJobsEmailJob = new CronJob('0 47 10 * * *', sendMostRecentJobsEmail);
sendMostRecentJobsEmailJob.start();
