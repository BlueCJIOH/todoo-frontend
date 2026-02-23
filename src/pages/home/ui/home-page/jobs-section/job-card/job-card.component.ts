import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { ButtonComponent } from '../../../../../../shared/ui/blocks/button';
import { JobCard } from './job-card.types';
import { JobSalaryPipe } from './job-salary.pipe';

@Component({
  selector: 'app-job-card',
  standalone: true,
  imports: [ButtonComponent, JobSalaryPipe],
  templateUrl: './job-card.component.html',
  styleUrl: './job-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobCardComponent {
  @Input({ required: true }) public job: JobCard | null = null;
}
