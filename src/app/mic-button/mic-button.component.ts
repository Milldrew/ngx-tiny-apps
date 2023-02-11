import { Component, Input, OnChanges } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'millterial-mic-button',
  templateUrl: './mic-button.component.html',
  styleUrls: ['./mic-button.component.scss'],
})
export class MicButtonComponent implements OnChanges {
  randomSubject = new Subject<number>();
  constructor() {
    setInterval(() => {
      const randomValue = Math.floor(Math.random() * 11);
      this.randomSubject.next(randomValue);
    }, 300);
    this.randomSubject.subscribe((data) => {
      console.log(data);
      this.inputVolume = data;
      this.setRectangleHeight(data);
    });
  }

  @Input()
  inputVolume: number;
  isOn = true;
  handleClick() {
    this.isOn = !this.isOn;
  }
  ngOnChanges() {}

  handleVolumeChange(volumeData: number) {
    return volumeData;
  }
  setRectangleHeight(height: number) {
    document.body
      .querySelector('rect')
      ?.setAttribute('height', height.toString());
  }
}
