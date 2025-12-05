import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { formatDate, capitalizeFirst } from '../utils/utils';
import { Chart, Planet } from '../services/chart.service';

@Component({
  selector: 'app-chart-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="chart-card">
      <div class="chart-header">
        <h3 class="chart-name">{{ chart.name || 'Unnamed Chart' }}</h3>
      </div>
      
      <div class="chart-body">
        <!-- Birth Information -->
        <div class="info-section">
          <h4 class="section-title">Birth Information</h4>
          <div class="info-content">
            <div class="info-item">
              <span class="info-label">Date:</span>
              <span class="info-value">{{ formatDate(chart.birthDate) }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Time:</span>
              <span class="info-value">{{ chart.birthTime }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Location:</span>
              <span class="info-value">{{ chart.birthLocation }}</span>
            </div>
          </div>
        </div>

        <!-- Zodiac Signs -->
        <div class="info-section">
          <h4 class="section-title">Zodiac Signs</h4>
          <div class="info-content">
            <div class="info-item">
              <span class="info-label">Sun:</span>
              <span class="info-value">{{ chart.sunSign }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Moon:</span>
              <span class="info-value">{{ chart.moonSign }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Rising:</span>
              <span class="info-value">{{ chart.risingSign }}</span>
            </div>
          </div>
        </div>

        <!-- Planets -->
        <div class="info-section">
          <h4 class="section-title">Planetary Positions</h4>
          <div class="info-content">
            <div *ngFor="let planetEntry of getPlanetEntries(chart.planets)" class="info-item">
              <span class="info-label">{{ capitalizeFirst(planetEntry.key) }}:</span>
              <span class="info-value">
                {{ planetEntry.value.sign }} {{ planetEntry.value.degree }}°
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .chart-card {
      background: white;
      border-radius: 12px;
      border: 1px solid #e0e0e0;
      overflow: hidden;
      transition: transform 0.3s, box-shadow 0.3s;
    }

    .chart-header {
      background: #667eea;
      color: white;
      padding: 1.25rem;
    }

    .chart-name {
      margin: 0;
      font-size: 1.25rem;
      font-weight: 600;
    }

    .chart-body {
      padding: 1.5rem;
    }

    .info-section {
      margin-bottom: 1.5rem;
    }

    .info-section:last-child {
      margin-bottom: 0;
    }

    .section-title {
      font-size: 0.9rem;
      font-weight: 600;
      color: #667eea;
      margin: 0 0 0.75rem 0;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .info-content {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .info-item {
      display: flex;
      justify-content: space-between;
      padding: 0.5rem;
      background: #f8f9fa;
      border-radius: 4px;
      font-size: 0.9rem;
    }

    .info-label {
      font-weight: 500;
      color: #666;
      font-size: 0.9rem;
    }

    .info-value {
      color: #333;
      font-weight: 500;
      font-size: 0.9rem;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .chart-body {
        padding: 1rem;
      }
    }

    @media (max-width: 480px) {
      .chart-header {
        padding: 1rem;
      }

      .chart-name {
        font-size: 1.1rem;
      }
    }
  `]
})
export class ChartCardComponent {
  @Input() chart!: Chart;

  formatDate = formatDate;
  capitalizeFirst = capitalizeFirst;

  getPlanetEntries(planets: Chart['planets'] & { [key: string]: Planet }): Array<{ key: string; value: Planet }> {
    return Object.entries(planets)
      .filter(([key]) => key !== '__v')
      .map(([key, value]) => ({ key, value }));
  }
}

