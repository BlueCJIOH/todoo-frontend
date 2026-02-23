// src/pages/home/ui/home-page/jobs-section/job-card/job-salary.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'jobSalary',
  standalone: true,
})
export class JobSalaryPipe implements PipeTransform {
  transform(
    amount: number | null | undefined,
    currency: string | null | undefined,
    type: string | null | undefined
  ): string {
    if (!amount) return 'Договорная';

    const currencySymbol = currency || '';
    let typeLabel = '';

    if (type === 'fix') {
      typeLabel = 'фикс';
    } else if (type === 'hour') {
      typeLabel = '/час';
    }

    return `${amount}${currencySymbol} ${typeLabel}`.trim();
  }
}
