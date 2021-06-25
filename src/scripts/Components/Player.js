import { Soundcloud } from "../Provider/Soundcloud";
import asyncWrapper from "./asyncWrapper";
import msToHMS from "../Utils/msToHMS";

export class Player {
  constructor() {
    this.api = new Soundcloud();

    /* PLAYER DOM ELEMENTS */
    this.$playerContainer = document.querySelector(".player");
    this.$btnPlay = document.querySelector("#play-icon");
    this.$timebar = document.querySelector("#timebar");
    this.$currentTime = document.querySelector(".currentTime");
    this.$duration = document.querySelector(".duration");

    console.log(this.$timebar);
    this.player = null;
    this.timerId = null;
  }

  eventsPlayer() {}

  intervalPlayer() {
    clearInterval(this.timerId);

    this.timerId = setInterval(() => {
      this.$timebar.value = this.player.currentTime();
      this.$currentTime.textContent = msToHMS(this.player.currentTime());
      this.$duration.textContent = msToHMS(this.player.getDuration());
      this.$timebar.max = this.player.getDuration();

      console.log(msToHMS(this.player.getDuration()));

      if (this.player.currentTime() === this.player.getDuration()) {
        clearInterval(this.timerId);
        this.$timebar.max = 0;
        this.$timebar.setAttribute("value", `${0}`);
        console.log("Cancion terminada");
      }
    }, 100);
  }

  displayCurrentTime() {
    if (!this.player) {
      return;
    }

    this.intervalPlayer();

    this.$timebar.addEventListener("mouseup", () => {
      console.log("Arriba");
      this.player.play();
      this.intervalPlayer();
    });

    this.$timebar.addEventListener("input", (e) => {
      this.player.pause();
      this.player.seek(this.$timebar.value);
      this.$currentTime.textContent = msToHMS(this.player.currentTime());
      console.log(this.$timebar.value);
      clearInterval(this.timerId);
    });
  }

  changeVolume(volume) {
    this.player.setVolume(volume);
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

  async startPlayer(track) {
    clearInterval(this.timerId);
    this.player = await asyncWrapper(SC.stream(`${track}`));

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
