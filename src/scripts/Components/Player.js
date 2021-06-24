import { Soundcloud } from "../Provider/Soundcloud";
import asyncWrapper from "./asyncWrapper";

export class Player {
  constructor(track) {
    this.track = track;

    this.api = new Soundcloud();

    this.$playerContainer = document.querySelector(".player");
    this.$btnPlay = document.querySelector("#play-icon");
    this.player = null;
    this.timerId = null;
    this.timerbar = null;

    this.eventsPlayer();
  }

  eventsPlayer() {}

  initInterval() {


    clearInterval(this.timerId);

    this.timerId = setInterval(() => {
      this.timerbar.value = this.player.currentTime();
      this.timerbar.max = this.player.getDuration();

      if (this.player.currentTime() === this.player.getDuration()) {
        clearInterval(this.timerId);
        console.log("Cancion terminada");
      }
      console.log(this.player.currentTime());
      console.log(this.player.getDuration());
    }, 100);
  }

  displayCurrentTime() {
    if (!this.player) {
      return;
    }

    if (!this.timerbar) {
      this.timerbar = document.createElement("input");
      this.timerbar.className = "timerbar";
      this.timerbar.type = "range";
      this.timerbar.value = 0;

      this.$playerContainer.insertAdjacentElement("beforeend", this.timerbar);
    }

    this.initInterval();

    this.timerbar.addEventListener("mouseup", () => {
      console.log("Arriba");
      this.player.play();
      this.initInterval();
    });

    this.timerbar.addEventListener("input", (e) => {
      this.player.pause();
      this.player.seek(this.timerbar.value);
      console.log(this.timerbar.value);
      clearInterval(this.timerId);
    });
  }

  togglePlayer() {
    clearInterval(this.timerId);

    if (this.player.getState() === "playing") {
      this.player.pause();
      return;
    }

    this.player.play();
    this.displayCurrentTime();
  }

  async startPlayer() {
    clearInterval(this.timerId);

    if (!this.player) {
      this.player = await asyncWrapper(SC.stream(`${this.track}`));
      console.log(this.player);
    }

    if (this.player.getState() === "playing") {
      this.player.pause();
      clearInterval(this.timerId);
      return;
    }

    this.player.play();
    this.displayCurrentTime();
  }

  async displayTrack() {
    document.console.log();
  }
}
