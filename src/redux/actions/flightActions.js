import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { options } from "../../constants";

export const getFlights = createAsyncThunk("flights/getFlights", async () => {
  //axios ile apiye istek atalim
  const res = await axios.request(options);

  //console.log(res.data.aircraft)dan gelen veriyi formatlayalim
  //dizi icindeki dizi geliyor bunu nesnelere cevirecegiz
  const formatted = res.data.aircraft.map((item) => ({
    id: item[0],
    code: item[1],
    lat: item[2],
    lng: item[3],
  }));

  //console.log(formatted);
  //aksiyonun payload'i olarak farmatted'i yollayalım
  return formatted;
});
