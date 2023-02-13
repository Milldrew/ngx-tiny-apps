import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { Observable, Subject } from 'rxjs';

/**
 * This component is a button that can be used to turn on and off the microphone.
 * It also displays the volume of the microphone.
 * It also handle the
 */
@Component({
  selector: 'millterial-mic-button-base',
  templateUrl: './mic-button.component.html',
  styleUrls: ['./mic-button.component.scss'],
})
export class MicButtonComponent implements OnChanges {
  @Output() clickEvent = new EventEmitter<boolean>();
  constructor() {}

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
