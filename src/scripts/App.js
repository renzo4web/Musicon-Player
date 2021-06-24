import { Player } from "./Components/Player";
import { Track } from "./Components/track";
import { Soundcloud } from "./Provider/Soundcloud";

class App {
  constructor() {
    this.api = new Soundcloud();

    this.$form = document.getElementById("form");
    this.$searchInput = document.getElementById("search");
    this.$gridResults = document.getElementById("root");
    this.$player = document.querySelector(".player");

    this.player = null;
    this.events();
  }

  validateInput(str) {
    if (!str) return;
    str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gim, "");
    str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gim, "");
    return str;
  }

  async events() {
    this.$form.addEventListener("submit", (e) => {
      e.preventDefault();
      const validate = this.validateInput(this.$searchInput.value);
      this.$form.reset();
      this.displayTracks(validate);
      console.log(validate);
    });

    this.$player.addEventListener("click", (event) => {
      if (event.target.tagName !== "IMG") return;
      console.log(event.target.tagName);
      this.player.togglePlayer();
    });

    this.$gridResults.addEventListener("click", (event) =>
      this.gridHandler(event)
    );
  }

  gridHandler({ target: trackClicked }) {
    if (!trackClicked.classList.contains("track-image")) return;
    const { stream, title } = trackClicked.parentElement.dataset;

    document.title = title;

    this.player = new Player(`/tracks/${stream}`);

    const track = {
      imgUrl: trackClicked.src,
      title,
    };

    this.player.startPlayer();
    this.displayPlayingTrack(track);
  }

  displayPlayingTrack({ imgUrl, title }) {
    this.$player.innerHTML = `
    <img src="${imgUrl}" alt="${title}">
    <h2>${title}</h2>
    `;
  }

  async displayTracks(searchInput) {
    const tracks = await this.api.getTracks(searchInput);

    this.$gridResults.innerHTML = tracks
      .filter(({ access }) => "playable")
      .map(Track)
      .join("");

    console.log(tracks);
  }
}

export default App;
