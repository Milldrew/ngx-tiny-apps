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
  handleNewAudioChunk(audioChunk: Blob) {
    console.log(audioChunk);
    this.audioChunk = audioChunk;
  }
  playAudio() {
    const audioUrl = URL.createObjectURL(this.audioChunk);
    const audio = new Audio(audioUrl);
    audio.play();
  }
}
