import msToHMS from "../Utils/msToHMS";

export const Track = (track) => {
  const { artwork_url, title, user, id, duration } = track;
  console.log({ artwork_url, title, user, id });

  return `
   

        <div  class="track card text-white bg-primary mb-3">
  <div class="card-header">${msToHMS(duration)}</div>
  <div data-stream="${id}" data-title="${title}" class="card-body d-flex flex-column justify-content-between">
    <img  class="track-image shadow" src="${
      artwork_url
        ? artwork_url
        : "https://via.placeholder.com/300/000000/FFFFFF/?text=Looks%20like%20no%20image"
    }" alt="${title}">
    <h5 class="card-title fw-bold">${title}</h5>
    <p class="card-text">
    <h6>${user.username}</h6>
    </p>
  </div>
</div>
  `;
};
