import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-error-snack-bar',
  templateUrl: './error-snack-bar.component.html',
  styleUrls: ['./error-snack-bar.component.scss'],
})
export class ErrorSnackBarComponent implements OnInit {
  message = '';

  constructor(
    public snackBar: MatSnackBarRef<ErrorSnackBarComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: unknown
  ) {}

  ngOnInit(): void {
    this.message = this.extractMessage(this.data);
  }

  private extractMessage(data: unknown): string {
    if (typeof data === 'string') {
      return data;
    }
    if (data instanceof HttpErrorResponse) {
      const body = data.error;
      if (typeof body === 'string') {
        return body;
      }
      if (body && typeof body === 'object') {
        const message = (body as any).message;
        if (typeof message === 'string') {
          return message;
        }
      }
      return `Request failed with status ${data.status}.`;
    }
    if (data && typeof data === 'object') {
      const message = (data as any).message;
      if (typeof message === 'string') {
        return message;
      }
    }
    return 'An unexpected error occurred.';
  }
}
