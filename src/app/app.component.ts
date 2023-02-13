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
  audioChunks: Blob[] = [];
  dataArray: Uint8Array;
  audioContext = new AudioContext();
  audioFrequency: number;
  volume = 0;
  constructor() {}

  handleStartRecordingButton() {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((audioStream) => {
      debugger;
      const mediaStreamSource =
        this.audioContext.createMediaStreamSource(audioStream);
      this.analyser = this.audioContext.createAnalyser();
      mediaStreamSource.connect(this.analyser);
      this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);

      this.recorder = new MediaRecorder(audioStream);
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
  getByteFrequencyData() {
    setInterval(() => {
      this.analyser.getByteFrequencyData(this.dataArray);
      this.volume = this.dataArray.reduce(
        (sum, currentNumber) => sum + currentNumber,
        0
      );
    }, 300);
  }
  /**
   *@param isOn - This indicates whether the microphone is on or off.
   */
  handleMicButton(isOn: boolean) {
    if (isOn) {
      this.handleStartRecordingButton();
      this.getByteFrequencyData();
    } else {
      this.handleStopRecordingButton();
    }
  }
}
