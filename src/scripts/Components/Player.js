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
    this.$coverSpinImg = document.querySelector(".player-img");

    this.player = null;
    this.timerId = null;
    this.isSongEnded = false;
  }

  initEvents() {
    if (this.timerId) return;

    this.$controlVolume = document.querySelector("#player-volume");

    /* VOLUME EVENT */
    this.$controlVolume.addEventListener("mouseup", (e) => {
      const inputVolume = this.$controlVolume.value;
      this.changeVolume(inputVolume);
    });

    /* PLAY/ PAUSE EVENT */
    this.$coverSpinImg.addEventListener("click", this.togglePlayer.bind(this));

    /* Release range input timebar */
    this.$timebar.addEventListener("mouseup", () => {
      this.player.play();
      this.intervalPlayer();
      if (this.isSongEnded) {
        this.toggleSpinAnimation();
      }
    });

    /* Hold range input timebar */
    this.$timebar.addEventListener("input", (e) => {
      this.player.pause();
      this.player.seek(this.$timebar.value);
      this.$currentTime.textContent = msToHMS(this.player.currentTime());
      console.log(this.$timebar.value);
      clearInterval(this.timerId);
    });
  }

  async intervalPlayer() {
    clearInterval(this.timerId);
    let totalTimeValue = this.player.getDuration();
    let totalTimeText = msToHMS(totalTimeValue);

    this.timerId = setInterval(() => {
      this.isSongEnded = false;

      let currentTimeText = msToHMS(this.player.currentTime());
      let currentTimeValue = this.player.currentTime();

      /* Update Player values */
      this.$timebar.value = currentTimeValue;
      this.$currentTime.textContent = currentTimeText;

      this.$duration.textContent = totalTimeText;
      this.$timebar.max = totalTimeValue;

      /* IF SONG END */
      if (currentTimeValue === totalTimeValue) {
        console.log(this.player.isEnded());
        this.$coverSpinImg.style.animationPlayState = "paused";
        this.isSongEnded = true;
        this.$timebar.max = this.$timebar.value = totalTimeValue;
        clearInterval(this.timerId);
      }
    }, 100);
  }

  displayCurrentTime() {
    if (!this.player) {
      return;
    }
    this.intervalPlayer();
  }

  changeVolume(volume) {
    this.player.setVolume(volume);
  }

  toggleSpinAnimation() {
    const running = this.$coverSpinImg.style.animationPlayState === "running";
    console.log(running);
    this.$coverSpinImg.style.animationPlayState = running
      ? "paused"
      : "running";
  }

  togglePlayer() {
    clearInterval(this.timerId);

    if (this.player.getState() === "playing") {
      this.player.pause();
      this.toggleSpinAnimation();
      return;
    }

    this.player.play();
    this.toggleSpinAnimation();
    this.displayCurrentTime();
  }

  async startPlayer(track) {
    clearInterval(this.timerId);
    this.isSongEnded = false;

    if (this.player) {
      this.player.kill();
    }

    this.player = await asyncWrapper(SC.stream(`${track}`));
    console.log(this.player);

    if (this.player.getState() === "playing") {
      this.player.pause();
      clearInterval(this.timerId);
      return;
    }

    
    this.initEvents();
    await this.player.play();
    this.displayCurrentTime();
    this.$playerContainer.classList.remove("playing");
    this.$playerContainer.classList.add("playing");
    this.$coverSpinImg.style.animationPlayState = "paused";
    this.toggleSpinAnimation();
  }
}
