import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  private isOpen = false;

  openPopup() {
    this.isOpen = true;
  }

  closePopup() {
    this.isOpen = false;
  }

  isOpened() {
    return this.isOpen;
  }
  
}
