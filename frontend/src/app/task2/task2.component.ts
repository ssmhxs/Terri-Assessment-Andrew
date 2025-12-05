import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ChartService, Chart } from '../services/chart.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { ChartCardComponent } from '../components/chart-card.component';

// ⚠️ CRITICAL WARNING: DO NOT USE AI TOOLS
// This assessment must be completed WITHOUT using AI tools such as Cursor, ChatGPT, 
// GitHub Copilot, or any other AI coding assistants.
// If you use AI tools to complete this assessment, you will FAIL.

// TODO: Task 2 - Implement this component
// Requirements:
// 1. Create a form with the following fields:
//    - Birth Date (date picker)
//    - Birth Time (time input)
//    - Birth Location (text input)
// 2. Validate all fields are required
// 3. On form submission, send POST request to /api/charts/calculate
// 4. Display the calculated chart result in a nice format
// 5. Show loading state during API call
// 6. Handle errors appropriately
// 7. Reset form after successful submission
// 8. Add form validation messages
// 9. Make the form responsive and user-friendly
//
// Note: A ChartService is available in services/chart.service.ts if you prefer to use it


@Component({
  selector: 'app-task2',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ChartCardComponent],
  template: `
    <div class="task2-container">
      <h2>Task 2: Birth Chart Calculator</h2>
      <p class="task-description">
        Create a form to calculate and display birth chart information.
        Implement the component according to the requirements in the code comments.
      </p>
      
      <!-- Form -->
      <form [formGroup]="chartForm" (ngSubmit)="onSubmit()" class="chart-form">
        <div class="form-group">
          <label for="birthDate">Birth Date <span class="required">*</span></label>
          <input
            id="birthDate"
            type="date"
            formControlName="birthDate"
            [class.error]="isFieldInvalid('birthDate')"
            class="form-control"
          />
          @if (isFieldInvalid('birthDate')) {
            <span class="error-message">Birth date is required</span>
          }
        </div>

        <div class="form-group">
          <label for="birthTime">Birth Time <span class="required">*</span></label>
          <input
            id="birthTime"
            type="time"
            formControlName="birthTime"
            [class.error]="isFieldInvalid('birthTime')"
            class="form-control"
          />
          @if (isFieldInvalid('birthTime')) {
            <span class="error-message">Birth time is required</span>
          }
        </div>

        <div class="form-group">
          <label for="birthLocation">Birth Location <span class="required">*</span></label>
          <input
            id="birthLocation"
            type="text"
            formControlName="birthLocation"
            placeholder="e.g., New York, NY, USA"
            [class.error]="isFieldInvalid('birthLocation')"
            class="form-control"
          />
          @if (isFieldInvalid('birthLocation')) {
            <span class="error-message">Birth location is required</span>
          }
        </div>

        <button
          type="submit"
          [disabled]="chartForm.invalid || loading"
          class="submit-button"
        >
          @if (loading) {
            <span>Calculating...</span>
          } @else {
            <span>Calculate Chart</span>
          }
        </button>
      </form>

      <!-- Loading State -->
      @if (loading) {
        <div class="loading-container">
          <p>Calculating your birth chart...</p>
        </div>
      }

      <!-- Error State -->
      @if (error && !loading) {
        <div class="error-container">
          <h3>Error Calculating Chart</h3>
          <p>{{ error }}</p>
        </div>
      }

      <!-- Result Display -->
      @if (chartResult && !loading && !error) {
        <div class="result-container">
          <app-chart-card [chart]="chartResult"></app-chart-card>
        </div>
      }
    </div>
  `,
  styles: [`
    .task2-container {
      max-width: 800px;
      margin: 0 auto;
    }
    .task-description {
      color: #666;
      margin-bottom: 2rem;
    }

    /* Form Styles */
    .chart-form {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      margin-bottom: 2rem;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    .form-group label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
      color: #333;
    }

    .required {
      color: #e53e3e;
    }

    .form-control {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 6px;
      font-size: 1rem;
      transition: border-color 0.3s, box-shadow 0.3s;
      box-sizing: border-box;
    }

    .form-control:focus {
      outline: none;
      border-color: #667eea;
    }

    .form-control.error {
      border-color: #e53e3e;
    }

    .error-message {
      display: block;
      color: #e53e3e;
      font-size: 0.875rem;
      margin-top: 0.25rem;
    }

    .submit-button {
      width: 100%;
      padding: 0.875rem 1.5rem;
      background: #667eea;
      color: white;
      border: none;
      border-radius: 6px;
      font-size: 1rem;
      font-weight: 500;
      cursor: pointer;
      transition: background 0.3s, transform 0.1s;
    }

    .submit-button:hover:not(:disabled) {
      background: #5568d3;
      transform: translateY(-1px);
    }

    .submit-button:disabled {
      background: #a0aec0;
      cursor: not-allowed;
      transform: none;
    }

    /* Loading State */
    .loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 3rem 2rem;
      text-align: center;
      background: #f7fafc;
      border-radius: 8px;
    }

    .loading-container p {
      color: #666;
      font-size: 1rem;
    }

    /* Error State */
    .error-container {
      text-align: center;
      padding: 2rem;
      background: #fff5f5;
      border: 1px solid #feb2b2;
      border-radius: 8px;
      color: #c53030;
      margin-bottom: 2rem;
    }

    .error-icon {
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
    }

    .error-container h3 {
      margin: 0.5rem 0;
      color: #c53030;
    }

    /* Result Display */
    .result-container {
      margin-top: 2rem;
    }
  `]
})
export class Task2Component {
  chartForm: FormGroup;
  chartResult: Chart | null = null;
  loading = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private chartService: ChartService
  ) {
    this.chartForm = this.fb.group({
      birthDate: ['', Validators.required],
      birthTime: ['', Validators.required],
      birthLocation: ['', Validators.required]
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.chartForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  onSubmit() {
    if (this.chartForm.invalid) {
      Object.keys(this.chartForm.controls).forEach(key => {
        this.chartForm.get(key)?.markAsTouched();
      });
      return;
    }

    this.loading = true;
    this.error = null;
    this.chartResult = null;

    const formValue = this.chartForm.value;

    this.chartService.calculateChart({
      birthDate: formValue.birthDate,
      birthTime: formValue.birthTime,
      birthLocation: formValue.birthLocation
    })
      .pipe(
        catchError(err => {
          console.error('Error calculating chart:', err);
          this.error = err.error?.error || err.message || 'Failed to calculate chart. Please try again.';
          return of(null);
        })
      )
      .subscribe({
        next: (result) => {
          if (result) {
            this.chartResult = result;

            this.chartForm.reset();
            // Reset form state
            Object.keys(this.chartForm.controls).forEach(key => {
              this.chartForm.get(key)?.markAsUntouched();
            });
          }
          this.loading = false;
        },
        error: (err) => {
          this.loading = false;
        }
      });
  }
}

