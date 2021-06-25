import { Player } from './Components/Player';
import { Track } from './Components/track';
import { Soundcloud } from './Provider/Soundcloud';

class App {
  constructor() {
    this.api = new Soundcloud();

    this.$form = document.getElementById('form');
    this.$searchInput = document.getElementById('search');
    this.$gridResults = document.getElementById('root');
    this.$alertText = document.querySelector('.alert');
    this.$progressBar = document.getElementById('progress-bar');
    this.$player = document.querySelector('.player');

    this.player = new Player();
    this.timerId = null;
    this.events();
  }

  validateInput(str) {
    if (!str) return;
    str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gim, '');
    str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gim, '');
    return str;
  }

  progressBar({ on }) {
    let percent = 0;
    const pbWrapper = this.$progressBar.parentElement;

    if (on) {
      pbWrapper.classList.remove('d-none');
      this.timerId = setInterval(() => {
        console.log('progressBAR');
        percent += 10;
        this.$progressBar.style.width = `${percent}%`;
      }, 50);
      return;
    }

    clearInterval(this.timerId);
    this.$progressBar.style.width = `0`;
    pbWrapper.classList.add('d-none');
  }

  async events() {
    this.$form.addEventListener('submit', (e) => {
      e.preventDefault();
      const validate = this.validateInput(this.$searchInput.value);
      this.$form.reset();
      this.progressBar({ on: true });
      this.infoMessage({ show: false });
      this.displayTracks(validate);
      console.log(validate);
    });

    this.$gridResults.addEventListener('click', (event) => this.gridHandler(event));
  }

  gridHandler({ target: trackClicked }) {
    if (!trackClicked.classList.contains('track-image')) return;
    const { stream, title } = trackClicked.parentElement.dataset;

    document.title = title;

    const track = {
      imgUrl: trackClicked.src,
      title,
    };

    this.player.startPlayer(`/tracks/${stream}`);
    this.displayPlayingTrack(track);
  }

  infoMessage({ show }) {
    const noFound = 'Sorry robot no fund musicones';

    if (show) {
      this.$alertText.classList.remove('d-none');
      setTimeout(() => this.$alertText.classList.add('d-none'), 2000);
      return;
    }

    this.$alertText.classList.add('d-none');
  }

  displayPlayingTrack({ imgUrl, title }) {
    this.$timebar = document.querySelector('#player-volume');
    this.$playerTitle = document.querySelector('.player-title');
    this.$playerImg = document.querySelector('.player-img');

    this.$playerImg.src = imgUrl;
    this.$playerTitle.textContent = title;

    /* INIT PLAYER EVENTS */
    this.$controlVolume = document.querySelector('#player-volume');

    /* VOLUME EVENT */
    this.$controlVolume.addEventListener('mouseup', (e) => {
      const inputVolume = this.$controlVolume.value;
      this.player.changeVolume(inputVolume);
    });

    /* PLAY/ PAUSE EVENT */
    this.$player.addEventListener('click', (event) => {
      if (event.target.tagName !== 'IMG') return;
      console.log(event.target.tagName);
      this.player.togglePlayer();
    });
  }

  async displayTracks(searchInput) {
    const tracks = await this.api.getTracks(searchInput);

    if (!tracks.length) {
      this.infoMessage({ show: true });
      this.progressBar({ on: false });
      return;
    }

    this.$gridResults.innerHTML = '';

    this.$gridResults.innerHTML = tracks
      .filter(({ access }) => 'playable')
      .map(Track)
      .join('');

    this.progressBar({ on: false });
    console.log(tracks);
  }
}

export default App;
