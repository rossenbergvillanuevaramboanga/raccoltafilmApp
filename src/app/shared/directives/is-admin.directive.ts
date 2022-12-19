import { Directive, ElementRef, Input } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';

@Directive({
  selector: '[isAdmin]'
})
export class IsAdminDirective {

  @Input() set isAdmin(isAdminUser: boolean) {
    if (!isAdminUser) {
      this.elementRef.nativeElement.style.display = 'none';
    } else {
      this.elementRef.nativeElement.style.display = 'block';
    }
  }
  constructor(private elementRef: ElementRef) { }

}
