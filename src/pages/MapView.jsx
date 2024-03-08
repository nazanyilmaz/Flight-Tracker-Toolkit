import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import { icon } from "leaflet";
import { clearPath } from "../redux/slices/flightSlice";

const MapView = ({ setDetailId }) => {
  const flightState = useSelector((store) => store.flightReducer);

  const dispatch = useDispatch();
  clearPath;

  //console.log(flightState.path);
  //marker iconu olusturma
  const planeIcon = icon({
    iconUrl: "/plane-icon.png",
    iconSize: [30, 30],
  });
  return (
    <MapContainer center={[41.64, -100.18]} zoom={5} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/*apiden gelen ucus verisi kadar ekrana marker basildi*/}
      {flightState.flights.map((flight) => (
        <Marker
          icon={planeIcon}
          key={flightState.id}
          position={[flight.lat, flight.lng]}
        >
          <Popup>
            <div className="d-flex flex-column gap-2">
              <span>Code: {flight.code}</span>
              <button
                onClick={() => setDetailId(flight.id)}
                className="w-100 bg-black text-light"
              >
                Detail
              </button>
              {flightState.path.length > 0 && (
                <button
                  onClick={() => dispatch(clearPath())}
                  className="btn btn-warning w-100"
                >
                  Clear Path
                </button>
              )}
            </div>
          </Popup>
        </Marker>
      ))}

      {/* ucagin rotasini belirleme ve basma*/}
      <Polyline positions={flightState?.path} />
    </MapContainer>
  );
};

export default MapView;
