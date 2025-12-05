import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { ChartService } from '../services/chart.service';
import { ChartCardComponent } from './chart-card.component';

// ⚠️ CRITICAL WARNING: DO NOT USE AI TOOLS
// This assessment must be completed WITHOUT using AI tools such as Cursor, ChatGPT, 
// GitHub Copilot, or any other AI coding assistants.
// If you use AI tools to complete this assessment, you will FAIL.

// TODO: Task 1 - Implement this component
// Requirements:
// 1. Fetch astrological charts from the API endpoint: GET /api/charts
// 2. Display the charts in a visually appealing card layout
// 3. Each card should show:
//    - Chart name
//    - Birth date, time, and location
//    - Sun sign, Moon sign, and Rising sign
//    - List of planets with their signs and degrees
// 4. Add loading state while fetching data
// 5. Handle error states gracefully
// 6. Make it responsive for mobile devices
// 7. Add some styling to make it look modern and professional
//
// Note: A ChartService is available in services/chart.service.ts if you prefer to use it

interface Planet {
  sign: string;
  degree: number;
}

interface Chart {
  id: number;
  name: string;
  birthDate: string;
  birthTime: string;
  birthLocation: string;
  sunSign: string;
  moonSign: string;
  risingSign: string;
  planets: {
    sun: Planet;
    moon: Planet;
    mercury: Planet;
    venus: Planet;
    mars: Planet;
  };
}

@Component({
  selector: 'app-task1',
  standalone: true,
  imports: [CommonModule, ChartCardComponent],
  template: `
    <div class="task1-container">
      <h2>Task 1: Display Astrological Charts</h2>
      <p class="task-description">
        Fetch and display astrological charts from the API. 
        Implement the component according to the requirements in the code comments.
      </p>
      
      @if (loading) {
        <!-- Loading State -->
        <div class="loading-container">
          <p>Loading charts...</p>
        </div>
      } @else if (error) {
        <!-- Error State -->
        <div class="error-container">
          <div class="error-icon">⚠️</div>
          <h3>Error Loading Charts</h3>
          <p>{{ error }}</p>
          <button (click)="loadCharts()" class="retry-button">Try Again</button>
        </div>
      } @else if (charts.length === 0) {
        <!-- Empty State -->
        <div class="empty-container">
          <p>No charts available at the moment.</p>
        </div>
      } @else {
        <!-- Charts Grid -->
        <div class="charts-grid">
          @for (chart of charts; track chart.id) {
            <app-chart-card [chart]="chart"></app-chart-card>
          }
        </div>
      }
    </div>
  `,
  styles: [`
    .task1-container {
      max-width: 1000px;
      margin: 0 auto;
    }
    .task-description {
      color: #666;
      margin-bottom: 2rem;
    }

    /* Loading State */
    .loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 4rem 2rem;
      text-align: center;
    }

    .loading-container p {
      color: #666;
      font-size: 1rem;
    }

    /* Error State */
    .error-container {
      text-align: center;
      padding: 3rem 2rem;
      background: #fff5f5;
      border: 1px solid #feb2b2;
      border-radius: 8px;
      color: #c53030;
    }

    .error-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    .error-container h3 {
      margin: 0.5rem 0;
      color: #c53030;
    }

    .retry-button {
      margin-top: 1rem;
      padding: 0.75rem 1.5rem;
      background: #667eea;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-size: 1rem;
      transition: background 0.3s;
    }

    .retry-button:hover {
      background: #5568d3;
    }

    /* Empty State */
    .empty-container {
      padding: 3rem;
      text-align: center;
      background: #f5f5f5;
      border-radius: 8px;
      color: #999;
    }

    /* Charts Grid */
    .charts-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 1.5rem;
      margin-top: 1rem;
    }

    .charts-grid app-chart-card {
      flex: 1 1 320px;
      min-width: 0;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .charts-grid {
        gap: 1rem;
      }

      .charts-grid app-chart-card {
        flex: 1 1 100%;
      }

      h2 {
        font-size: 1.5rem;
      }

    }

    @media (max-width: 480px) {
      .task1-container {
        padding: 0 0.5rem;
      }
    }
  `]
})
export class Task1Component implements OnInit {
  charts: Chart[] = [];
  loading = false;
  error: string | null = null;

  constructor(private chartService: ChartService) {}

  ngOnInit() {
    this.loadCharts();
  }

  loadCharts() {
    this.loading = true;
    this.error = null;

    this.chartService.getAllCharts()
      .pipe(
        catchError(err => {
          console.error('Error fetching charts:', err);
          this.error = err.error?.error || err.message || 'Failed to load charts. Please try again later.';
          return of([]);
        })
      )
      .subscribe({
        next: (data) => {
          this.charts = data;
          this.loading = false;
        },
        error: (err) => {
          this.loading = false;
        }
      });
  }

}

