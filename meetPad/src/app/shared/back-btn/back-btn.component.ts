import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'back-btn',
  templateUrl: './back-btn.component.html',
  styleUrls: ['./back-btn.component.css']
})
export class BackBtnComponent implements OnInit {

  @Input() color: string;
  @Input() text: boolean;

  faArrowLeft = faArrowLeft;

  constructor(private location: Location) { }

  ngOnInit() {
  }

  public goBack = () => {
    this.location.back()
  }

}
