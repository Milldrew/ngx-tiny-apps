import { Component } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
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
  constructor(public domSanitizer: DomSanitizer) {}
  handleNewAudioChunk(audioChunk: Blob) {
    this.recordings.push({
      timeStamp: new Date().toISOString(),
      audioChunk,
      url: this.createSafeUrl(audioChunk),
    });

    this.recordings.forEach(console.log);
    console.log(audioChunk);
    this.audioChunk = audioChunk;
  }
  createSafeUrl(audioChunk: Blob) {
    const url = URL.createObjectURL(audioChunk);
    const safeUrl = this.domSanitizer.bypassSecurityTrustUrl(url);
    return safeUrl;
  }
  playAudio() {
    const audio = new Audio(URL.createObjectURL(this.audioChunk)).play();
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
  url?: SafeUrl;
};
