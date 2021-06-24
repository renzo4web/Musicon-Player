const SC = require("soundcloud");
import asyncWrapper from "../Components/asyncWrapper";

export class Soundcloud {
  constructor() {
    this.tokken_id = "cd9be64eeb32d1741c17cb39e41d254d";
    SC.initialize({
      client_id: this.tokken_id,
    });

    console.log("WORKs");
  }

  async getTracks(query) {
    const tracks = await asyncWrapper(
      SC.get("/tracks", {
        q: query,
      })
    );
    return tracks;
  }
}
