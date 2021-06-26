import msToHMS from "../Utils/msToHMS";

export const Track = (track) => {
  console.log(track);
  const { artwork_url, title, user, id, duration,favoritings_count,playback_count } = track;

  const getFullArtwork = (url) => url.replace("large", "t500x500");
  const placeHolderImg =
    "https://via.placeholder.com/300/000000/FFFFFF/?text=Looks%20like%20no%20image";
  return `
  <div  class="track border border-dark text-dark bg-primary mb-3">
            <div class="card-header">${msToHMS(duration)}</div>
            <div data-stream="${id}" data-title="${title}" class="card-body d-flex flex-column justify-content-between">
                <div class="hover-div">
                  <img  class="track-image shadow rounded" src="${
                  artwork_url ? getFullArtwork(artwork_url) : placeHolderImg
                  }" alt="${title}">
                </div>
                <h5 class="card-title mt-2 fw-bold">${title}</h5>
                <div class="card-text mt-auto d-flex flex-column justify-content-end">

                <div class="card-stats fw-lighter mt-2">
                <i aria-label="Playback Count" title="Playbacks ${playback_count}" class="fas fa-play"></i> ${playback_count}
                <i aria-label="Favorites Count" title="Likes ${favoritings_count}" class="fas fa-heart"></i> ${favoritings_count}
            </div> 
            <h5 class="mt-2">${user.username}</h5>

                </div>  

            </div>
</div>
  `;
};
