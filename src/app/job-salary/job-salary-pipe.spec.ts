import { JobSalaryPipe } from '../../pages/home/ui/home-page/jobs-section/job-card/job-salary.pipe';

describe('JobSalaryPipe', () => {
  it('create an instance', () => {
    const pipe = new JobSalaryPipe();
    expect(pipe).toBeTruthy();
  });
});
