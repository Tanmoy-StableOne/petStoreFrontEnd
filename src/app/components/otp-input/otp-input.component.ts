import { Component, OnInit, ElementRef, ViewChildren, QueryList, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-otp-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './otp-input.component.html',
  styleUrls: ['./otp-input.component.css']
})
export class OtpInputComponent implements OnInit {
  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef>;
  @Output() otpChange = new EventEmitter<string>();

  otp: string[] = new Array(6).fill('');
  currentPosition: number = 0;

  constructor() { }

  ngOnInit(): void { }

  private focusInput(index: number): void {
    if (index >= 0 && index < 6) {
      setTimeout(() => {
        const input = this.otpInputs.toArray()[index].nativeElement;
        input.focus();
      });
    }
  }

  private updateOtpValue(): void {
    const completeOtp = this.otp.join('');
    console.log('Current OTP:', completeOtp);
    this.otpChange.emit(completeOtp);
  }

  private clearInput(index: number): void {
    if (index >= 0 && index < 6) {
      this.otp[index] = '';
      const input = this.otpInputs.toArray()[index].nativeElement;
      input.value = '';
    }
  }

  onInputChange(index: number, event: any): void {
    const input = event.target as HTMLInputElement;
    const value = input.value.replace(/[^0-9]/g, '');

    if (!value) {
      this.otp[index] = '';
      return;
    }

    // Save the latest digit only
    const lastDigit = value.slice(-1);
    this.otp[index] = lastDigit;
    input.value = lastDigit;

    this.updateOtpValue();

    // Move to next input
    if (index < this.otp.length - 1) {
      this.currentPosition = index + 1;

      // Wait for view update before focusing
      setTimeout(() => {
        const inputs = this.otpInputs.toArray();
        if (inputs[this.currentPosition]) {
          inputs[this.currentPosition].nativeElement.focus();
        }
      });
    }
  }

  trackByIndex(index: number): number {
    return index;
  }


  onKeyDown(index: number, event: KeyboardEvent): void {
    const input = event.target as HTMLInputElement;

    switch (event.key) {
      case 'Backspace':
        event.preventDefault();
        if (this.otp[index]) {
          // If current input has value, clear it
          this.clearInput(index);
          this.updateOtpValue();
        } else if (index > 0) {
          // If current input is empty, move to previous input
          this.currentPosition = index - 1;
          this.focusInput(this.currentPosition);
        }
        break;

      case 'ArrowLeft':
        event.preventDefault();
        if (index > 0) {
          this.currentPosition = index - 1;
          this.focusInput(this.currentPosition);
        }
        break;

      case 'ArrowRight':
        event.preventDefault();
        if (index < 5) {
          this.currentPosition = index + 1;
          this.focusInput(this.currentPosition);
        }
        break;

      case 'Delete':
        event.preventDefault();
        this.clearInput(index);
        this.updateOtpValue();
        break;
    }
  }

  onPaste(event: ClipboardEvent): void {
    event.preventDefault();
    const clipboardData = event.clipboardData;
    if (clipboardData) {
      const pastedData = clipboardData.getData('text');
      const digits = pastedData.replace(/[^0-9]/g, '').split('').slice(0, 6);

      // Clear all inputs first
      this.otp = new Array(6).fill('');
      this.otpInputs.forEach(input => {
        input.nativeElement.value = '';
      });

      // Fill in the pasted digits
      digits.forEach((digit, index) => {
        if (index < 6) {
          this.otp[index] = digit;
          const input = this.otpInputs.toArray()[index].nativeElement;
          input.value = digit;
        }
      });

      // Update position and focus
      this.currentPosition = Math.min(digits.length, 5);
      this.focusInput(this.currentPosition);
      this.updateOtpValue();
    }
  }
}
