export const Track = (track) => {
  const { artwork_url, title, user, id } = track;

  return `
        <div data-stream="${id}" data-title="${title}" class="track">
            <h4>${title}</h4>
            <img class="track-image" src="${artwork_url}" alt="${title}">
            <a href="${user.uri}">${user.username}</a>
        </div>
  `;

  //     access: "playable"
  // artwork_url: "https://i1.sndcdn.com/artworks-000177089935-qxgsuq-large.jpg"
  // available_country_codes: null
  // bpm: null
  // comment_count: 10
  // commentable: true
  // created_at: "2013/11/27 20:43:07 +0000"
  // description: ""
  // download_count: 1
  // download_url: "https://api.soundcloud.com/tracks/122197396/download"
  // downloadable: false
  // duration: 73853
  // embeddable_by: "all"
  // favoritings_count: 30
  // genre: "Singer-Songwriter"
  // id: 122197396
  // isrc: null
  // key_signature: ""
  // kind: "track"
  // label_name: ""
  // license: "cc-by-sa"
  // monetization_model: null
  // permalink_url: "https://soundcloud.com/zhalih/sober"
  // playback_count: 674
  // policy: null
  // purchase_title: null
  // purchase_url: null
  // release: ""
  // release_day: null
  // release_month: null
  // release_year: null
  // reposts_count: 1
  // secret_uri: null
  // sharing: "public"
  // stream_url: "https://api.soundcloud.com/tracks/122197396/stream"
  // streamable: true
  // tag_list: " Improvisation Acapella"
  // title: "Sober"
  // uri: "https://api.soundcloud.com/tracks/122197396"
  // user: {avatar_url: "https://i1.sndcdn.com/avatars-jd0rZyiSuULf4Jg9-Ivqojw-large.jpg", id: 12723383, kind: "user", permalink_url: "https://soundcloud.com/zhalih", uri: "https://api.soundcloud.com/users/12723383", …}
  // user_favorite: null
  // user_playback_count: null
  // waveform_url: "https://wave.sndcdn.com/TRBZ4MQcw2FG_m.png"
};
