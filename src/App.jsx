import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import MapView from "./pages/MapView";
import ListView from "./pages/ListView";
import { useDispatch } from "react-redux";
import { getFlights } from "./redux/actions/flightActions";
import Modal from "./components/Modal";

const App = () => {
  //harita tipi aktifmi stati
  const [isMApView, setIsMApView] = useState("true");
  //detayi gosterilecek eleman ID'si
  const [detailId, setDetailId] = useState(null);
  //console.log(detailId);
  const dispatch = useDispatch();

  //ucus verilerini alma
  useEffect(() => {
    dispatch(getFlights());
  }, []);
  return (
    <div>
      <Header />
      {isMApView ? "" : ""}
      <div className="view-buttons">
        <button
          onClick={() => setIsMApView(true)}
          className={isMApView ? "active" : ""}
        >
          Map View
        </button>
        <button
          onClick={() => setIsMApView(false)}
          className={isMApView ? "" : "active"}
        >
          List View
        </button>
      </div>
      {isMApView ? (
        <MapView setDetailId={setDetailId} />
      ) : (
        <ListView setDetailId={setDetailId} />
      )}

      {detailId && (
        <Modal detailId={detailId} close={() => setDetailId(null)} />
      )}
    </div>
  );
};

export default App;
