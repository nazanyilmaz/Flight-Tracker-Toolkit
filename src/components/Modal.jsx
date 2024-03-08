import axios from "axios";
import { useEffect, useState } from "react";
import { headerOpt } from "../constants";
import formatDate from "../utils/formatDate";
import { setPath } from "../redux/slices/flightSlice";
import { useDispatch } from "react-redux";

const Modal = ({ detailId, close }) => {
  const [detail, setDetail] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    //onceki ucus verilerini temizle
    setDetail(null);
    //yeni ucus verilerini al
    axios
      .get(
        `https://flight-radar1.p.rapidapi.com/flights/detail?flight=${detailId}`,
        headerOpt
      )
      .then((res) => {
        dispatch(setPath(res.data.trail));
        setDetail(res.data);
      })
      .catch((err) => console.log(err));
  }, [detailId]);

  //console.log(detail);

  return (
    <div className="detail-outer">
      <div className="detail-inner">
        <p className="close-area">
          <span onClick={close}>X</span>
        </p>

        {!detail ? (
          <div className="wrapper">
            <div className="loader">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
          </div>
        ) : !detail.aircraft?.model || !detail.airport.origin ? (
          <div>
            <p>The Data of this Flight is not Available...</p>
          </div>
        ) : (
          <>
            <h2>{detail.aircraft.model.text}</h2>
            <h2>{detail.aircraft.model.code}</h2>

            <p>
              <span>Code:</span>
              <span>{detail.aircraft.registration}</span>
            </p>

            <img src={detail.aircraft.images?.large[0]?.src} />

            <p>
              <span>Company:</span>
              <span>{detail.airline.short}</span>
            </p>

            <p>
              <span>Origin:</span>
              <a
                target="_blank" //
                href={detail.airport.origin?.website}
              >
                {detail.airport.origin?.name} (
                {detail.airport.origin.position.country.name})
              </a>
            </p>

            <p>
              <span>Destination:</span>
              <a
                target="_blank" //
                href={detail.airport.destination?.website}
              >
                {detail.airport.destination?.name} (
                {detail.airport.destination.position.country.name})
              </a>
            </p>

            <p>
              <span>Deperture Time:</span>
              <span>{formatDate(detail.time.scheduled.departure)}</span>
            </p>
            <p>
              <span>Arrival Time:</span>
              <span>{formatDate(detail.time.scheduled.arrival)}</span>
            </p>

            <p className={detail.status.icon}>
              <span>{detail.status.text}</span>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Modal;
