import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'millterial-mic-button',
  templateUrl: './mic-button.component.html',
  styleUrls: ['./mic-button.component.scss'],
})
export class MicButtonComponent implements OnChanges {
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
}
