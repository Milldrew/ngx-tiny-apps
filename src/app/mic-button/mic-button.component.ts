import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'millterial-mic-button',
  templateUrl: './mic-button.component.html',
  styleUrls: ['./mic-button.component.scss'],
})
export class MicButtonComponent implements OnChanges {
  @Output() clickEvent = new EventEmitter<boolean>();
  randomSubject = new Subject<number>();
  constructor() {
    /*
    setInterval(() => {
      const randomValue = Math.floor(Math.random() * 11);
      this.randomSubject.next(randomValue);
    }, 300);
    this.randomSubject.subscribe((data) => {
      console.log(data);
      this.inputVolume = data;
      this.setRectangleHeight(data);
    });
    */
  }

  @Input()
  inputVolume: number;
  /**
   * This indicates whether the microphone is on or off.
   */
  isOn = false;
  handleClick() {
    this.isOn = !this.isOn;
    this.clickEvent.emit(this.isOn);
  }
  ngOnChanges() {
    this.setRectangleHeight(this.inputVolume / 1500);
  }

  handleVolumeChange(volumeData: number) {
    return volumeData;
  }
  setRectangleHeight(height: number) {
    height = 12 - height;
    document.body
      .querySelector('rect')
      ?.setAttribute('height', height.toString());
  }
}
