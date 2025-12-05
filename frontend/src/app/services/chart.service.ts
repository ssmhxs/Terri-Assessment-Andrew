import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Planet {
    sign: string;
    degree: number;
}

export interface Chart {
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

export interface CalculateChartRequest {
    birthDate: string;
    birthTime: string;
    birthLocation: string;
}

export interface ApiResponse<T> {
    success: boolean;
    data: T;
    count?: number;
    total?: number;
    page?: number;
    pages?: number;
    error?: string;
}

@Injectable({
    providedIn: 'root'
})
export class ChartService {
    private apiUrl = '/api';

    constructor(private http: HttpClient) { }

    getAllCharts(): Observable<Chart[]> {
        return this.http.get<ApiResponse<Chart[]>>(`${this.apiUrl}/charts`).pipe(
            map(response => response.success ? response.data : [])
        );
    }

    getChartById(id: number): Observable<Chart> {
        return this.http.get<Chart>(`${this.apiUrl}/charts/${id}`);
    }

    calculateChart(request: CalculateChartRequest): Observable<Chart | null> {
        return this.http.post<ApiResponse<Chart>>(`${this.apiUrl}/charts/calculate`, request).pipe(
            map(response => response.success ? response.data : null)
        );
    }

    initializeProject(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/init`);
    }
}

