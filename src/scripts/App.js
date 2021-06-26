import { Player } from "./Components/Player";
import { Track } from "./Components/track";
import { Soundcloud } from "./Provider/Soundcloud";

class App {
  constructor() {
    this.api = new Soundcloud();

    this.$form = document.getElementById("form");
    this.$searchInput = document.getElementById("search");
    this.$gridTracks = document.getElementById("root");
    this.$alertText = document.querySelector(".alert");
    this.$progressBar = document.getElementById("progress-bar");
    this.$player = document.querySelector(".player");

    this.player = new Player();
    this.displayWelcomeTracks();
    this.timerId = null;
    this.events();
  }

  validateInput(str) {
    if (!str) return;
    str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gim, "");
    str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gim, "");
    return str;
  }

  progressBar({ on } = {}) {
    let percent = 0;
    const speed = 50;
    const pbWrapper = this.$progressBar.parentElement;

    if (on) {
      pbWrapper.classList.remove("d-none");
      this.timerId = setInterval(() => {
        percent += 10;
        this.$progressBar.style.width = `${percent}%`;
      }, speed);
      return;
    }

    clearInterval(this.timerId);
    this.$progressBar.style.width = `0`;
    pbWrapper.classList.add("d-none");
  }

  handleSearch(e) {
    e.preventDefault();
    const validate = this.validateInput(this.$searchInput.value);
    this.$form.reset();
    this.progressBar({ on: true });
    this.infoMessage({ show: false });
    this.displayTracks(validate);
  }

  async events() {
    this.$form.addEventListener("submit", (e) => this.handleSearch(e));
    this.$gridTracks.addEventListener("click", (event) =>
      this.gridTracksHandler(event)
    );
  }

  async gridTracksHandler({ target: trackClicked }) {
    if (!trackClicked.classList.contains("hover-div")) return;
    const { stream: id, title } = trackClicked.parentElement.dataset;

    document.title = title;

    const track = {
      trackCover: trackClicked.children[0].src,
      title,
    };

    await this.player.startPlayer(`/tracks/${id}`);
    this.displayPlayingTrack(track);
  }

  infoMessage({ show } = {}) {
    const delay = 3000;
    if (show) {
      this.$alertText.classList.remove("d-none");
      setTimeout(() => this.$alertText.classList.add("d-none"), delay);
      return;
    }
    this.$alertText.classList.add("d-none");
  }

  displayPlayingTrack({ trackCover, title } = {}) {
    this.$timebar = document.querySelector("#player-volume");
    this.$playerTitle = document.querySelector(".player-title");
    this.$playerImg = document.querySelector(".player-img");

    this.$player.setAttribute("aria-label", `Track: ${title}`);
    this.$playerImg.src = trackCover;
    this.$playerTitle.textContent = title;
  }

  populateGrid(tracks) {
    this.$gridTracks.innerHTML = "";

    this.$gridTracks.innerHTML = tracks
      .filter(({ access }) => access === "playable")
      .map(Track)
      .join("");
  }

  async displayTracks(searchInput) {
    const tracks = await this.api.getTracks(searchInput);

    if (!tracks.length) {
      this.infoMessage({ show: true });
      this.progressBar({ on: false });
      return;
    }

    this.populateGrid(tracks);
    this.progressBar({ on: false });
  }

  async displayWelcomeTracks() {
    const recomendationsTracks = [
      210910118, 43585953, 718955440, 440675889, 747708442, 403758840,814203688,39983793,
    ];
    const list = await this.api.getTracksById(recomendationsTracks);
    this.populateGrid(list);
  }
}

export default App;
