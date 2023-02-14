import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'millterial-mic-button',
  templateUrl: './mic-button-container.component.html',
  styleUrls: ['./mic-button-container.component.scss'],
})
export class MicButtonContainerComponent {
  /**
   * When the recording is done, the audio blob is emitted.
   */
  @Output() audioChunkEmitter = new EventEmitter<Blob>();
  analyser: AnalyserNode;
  recorder: MediaRecorder;
  audioChunks: Blob[] = [];
  dataArray: Uint8Array;
  audioContext = new AudioContext();
  audioFrequency: number;
  volume = 0;
  constructor() {}

  stopMicrophone(stream: MediaStream) {
    stream.getTracks().forEach((track) => {
      track.stop();
    });
  }
  handleStartRecordingButton() {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((audioStream) => {
      const mediaStreamSource =
        this.audioContext.createMediaStreamSource(audioStream);
      this.analyser = this.audioContext.createAnalyser();
      mediaStreamSource.connect(this.analyser);
      this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);

      this.recorder = new MediaRecorder(audioStream);
      this.recorder.start();
      this.recorder.addEventListener('dataavailable', async (event) => {
        this.stopMicrophone(audioStream);
        this.audioChunkEmitter.emit(event.data);
        this.audioChunks.push(event.data);
      });
    });
  }
  handleStopRecordingButton() {
    this.recorder.stop();
  }

  handlePlayRecordingButton() {
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
