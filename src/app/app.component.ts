import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  analyser: AnalyserNode;
  recorder: MediaRecorder;
  audioChunks: Blob[] = [];

  audioContext = new AudioContext();
  constructor() {}

  handleStartRecordingButton() {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      debugger;
      const mediaStreamSource =
        this.audioContext.createMediaStreamSource(stream);
      this.analyser = this.audioContext.createAnalyser();
      mediaStreamSource.connect(this.analyser);
      const dataArray = new Uint8Array(this.analyser.frequencyBinCount);

      this.recorder = new MediaRecorder(stream);
      this.recorder.start();
      this.recorder.addEventListener('dataavailable', (event) => {
        this.audioChunks.push(event.data);
        debugger;
      });
    });
  }
  handleStopRecordingButton() {
    debugger;
    this.recorder.stop();
  }

  handlePlayRecordingButton() {
    debugger;
    const audioBlob = this.audioChunks[0];
    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);
    audio.play();
  }
}
