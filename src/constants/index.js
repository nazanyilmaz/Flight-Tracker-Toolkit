export const options = {
  method: "GET",
  url: "https://flight-radar1.p.rapidapi.com/flights/list-in-boundary",
  params: {
    bl_lat: "19.682325",
    bl_lng: "-122.997045",
    tr_lat: "48.068873",
    tr_lng: "-68.668873",
    limit: "300",
  },
  headers: {
    "X-RapidAPI-Key": "91faccde08msh272e79c7d8c264dp1ac2e8jsn2568629328fd",
    "X-RapidAPI-Host": "flight-radar1.p.rapidapi.com",
  },
};

export const headerOpt = {
  headers: {
    "X-RapidAPI-Key": "91faccde08msh272e79c7d8c264dp1ac2e8jsn2568629328fd",
    "X-RapidAPI-Host": "flight-radar1.p.rapidapi.com",
  },
};
