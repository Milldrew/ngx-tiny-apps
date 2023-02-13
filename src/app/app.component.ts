import { Component } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  analyser: AnalyserNode;
  recorder: MediaRecorder;
  audioChunk: Blob;
  dataArray: Uint8Array;
  audioContext = new AudioContext();
  audioFrequency: number;
  constructor() {}
  handlePlayRecordingButton() {
    const audioUrl = URL.createObjectURL(this.audioChunk);
    const audio = new Audio(audioUrl);
    audio.play();
  }
}
