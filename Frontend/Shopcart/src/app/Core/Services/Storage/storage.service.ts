import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  setItem(token: string, value: any): void {
    localStorage.setItem(token, JSON.stringify(value));
  }

  getItem(token: string): any {
    const item = localStorage.getItem(token);
    return item ? JSON.parse(item) : null;
  }

  removeItem(token: string): void {
    localStorage.removeItem(token);
  }

  clear(): void {
    localStorage.clear();
  }
}
