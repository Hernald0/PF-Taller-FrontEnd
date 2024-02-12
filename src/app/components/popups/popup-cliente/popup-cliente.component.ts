import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-popup-cliente',
  templateUrl: './popup-cliente.component.html',
  styleUrls: ['./popup-cliente.component.css']
})
export class PopupClienteComponent implements OnInit {
  @Input()  visiblePopup: boolean;
   
  constructor() { }

  ngOnInit(): void {
    
  }

}
