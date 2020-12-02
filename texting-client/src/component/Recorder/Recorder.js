class Recorder {
  audioChunks = [];
  constructor() {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      this.mediaRecorder = new MediaRecorder(stream);
      this.mediaRecorder.start();
      const datas = [];
      this.mediaRecorder.addEventListener('dataavailable', (event) => {
        console.log(this.audioChunks);

        datas.push(event.data);
      });
      this.mediaRecorder.addEventListener('stop', (event) => {
        this.audioChunks.push(...datas);
        console.log(datas, this.audioChunks);
        stream
          .getTracks() // get all tracks from the MediaStream
          .forEach((track) => track.stop());
      });
    });
  }
  stop() {
    console.log(this.audioChunks);
    this.mediaRecorder.stop();
  }
}

export default Recorder;
