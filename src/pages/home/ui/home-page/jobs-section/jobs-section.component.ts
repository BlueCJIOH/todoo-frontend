// src/pages/home/ui/home-page/jobs-section/jobs-section.component.ts
import { Component, signal, computed } from '@angular/core';
import { ButtonComponent } from '../../../../../shared/ui/blocks/button';
import { JobCardComponent } from './job-card/job-card.component';
import { JobCard, JobCategory } from './job-card/job-card.types';
import { JOBS_DATA, FILTER_OPTIONS } from './jobs.data';

@Component({
  selector: 'app-jobs-section',
  standalone: true,
  imports: [ButtonComponent, JobCardComponent],
  templateUrl: './jobs-section.component.html',
  styleUrl: './jobs-section.component.scss',
})
export class JobsSectionComponent {
  // Данные вакансий
  public readonly jobs = signal<JobCard[]>(JOBS_DATA);

  // Опции фильтров
  public readonly filterOptions = FILTER_OPTIONS;

  // Текущий выбранный фильтр (signal для реактивности)
  public readonly activeFilter = signal<JobCategory>('all');

  // Вычисляемое свойство: отфильтрованный список вакансий
  public readonly filteredJobs = computed<JobCard[]>(() => {
    const filter = this.activeFilter();
    if (filter === 'all') {
      return this.jobs();
    }
    return this.jobs().filter((job) => job.category === filter);
  });

  // Метод для смены фильтра
  public onFilterChange(category: JobCategory): void {
    this.activeFilter.set(category);
  }

  // Проверка активности кнопки
  public isFilterActive(category: JobCategory): boolean {
    return this.activeFilter() === category;
  }
}
