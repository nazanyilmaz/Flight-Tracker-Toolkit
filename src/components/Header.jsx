import React from "react";
import { useSelector } from "react-redux";

const Header = () => {
  const flightState = useSelector((store) => store.flightReducer);
  //console.log(flightState);
  return (
    <header>
      <div>
        <img src="/plane-logo.png" />
        <h3>Flight Tracker</h3>
      </div>
      <p className="right">
        {flightState.isLoading
          ? "Flights are Wanted..."
          : flightState.isError
          ? "Sorry Error.."
          : flightState.flights.length + " Flights Found"}
      </p>
    </header>
  );
};

export default Header;
