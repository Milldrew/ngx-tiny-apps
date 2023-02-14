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
  /**
   * Ths is used to create the list of recordings.
   */
  recordings: Recording[] = [];
  dataArray: Uint8Array;
  audioContext = new AudioContext();
  audioFrequency: number;
  constructor() {}
  handleNewAudioChunk(audioChunk: Blob) {
    this.recordings.push({
      timeStamp: new Date().toISOString(),
      audioChunk,
      url: this.createUrlForAudio(audioChunk),
    });
    console.log(audioChunk);
    this.audioChunk = audioChunk;
  }
  createUrlForAudio(audioChunk: Blob) {
    return URL.createObjectURL(audioChunk);
  }
  playAudio() {
    const audio = new Audio(this.createUrlForAudio(this.audioChunk)).play();
  }
}
type Recording = {
  /**
   * The time stamp is used to create the list of recordings. and idenitfy the time the recording was created.
   */
  timeStamp: string;
  /**
   * The audio chunk is the actual audio recording.
   */
  audioChunk: Blob;
  url?: string;
};
