import 'zone.js/dist/zone';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  bootstrapApplication,
  DomSanitizer,
  SafeHtml,
  SafeStyle,
} from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './main.html',
})
export class App {
  public safeTitle: string | SafeHtml =
    '<strong>Untrusted HTML content</strong>';
  public unsafeTitle = '<strong>Untrusted HTML content</strong>';

  public unsafeUrl = 'javascript: alert(`Hello there!`)';
  public safeUrl: string | SafeHtml = 'javascript: alert(`Hello there!`)';

  public unsafeStyle = 'red';
  public safeStyle: string | SafeStyle = 'red';

  public id = 'ghoshshreya';
  public unsafeResourceUrl = 'https://github.com/';
  public safeResourceUrl: string | SafeHtml = 'https://github.com/';

  constructor(private sanitizer: DomSanitizer) {
    this.safeTitle = this.sanitizer.bypassSecurityTrustHtml(this.unsafeTitle);

    this.safeUrl = this.sanitizer.bypassSecurityTrustUrl(this.unsafeUrl);

    this.safeStyle = this.sanitizer.bypassSecurityTrustStyle(this.unsafeStyle);
  }

  updateVideoUrl() {
    this.safeResourceUrl = this.safeResourceUrl + this.id;
  }
}

bootstrapApplication(App);
