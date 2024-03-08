import axios from "axios";
import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";

const ListView = ({ setDetailId }) => {
  const flightState = useSelector((store) => store.flightReducer);
  //console.log(flightState)

  //gosterilecek ilk elemanin stati
  const [itemOffset, setItemOffset] = useState(0);

  //sayfabasina gosterulecek eleman
  const itemsPerPage = 10;

  ///son gosterilecek eleman
  const endOffset = itemOffset + itemsPerPage;
  //belirlenne araliktaki elemanlari slice yardimiyla alir

  const currentItems = flightState.flights.slice(itemOffset, endOffset);
  // max sayfa sayisini bulkuyor
  const pageCount = Math.ceil(flightState.flights.length / itemsPerPage);

  // her yeni sayfa secildiginde calisyiyor
  const handlePageClick = (event) => {
    const newOffset =
      (event.selected * itemsPerPage) % flightState.flights.length;

    setItemOffset(newOffset);
  };

  return (
    <div className="p-4 list">
      <table class="table table-dark table-striped table-hover table-responsive mt-5">
        <thead>
          <tr>
            <th>ID</th>
            <th>Code</th>
            <th>Lat </th>
            <th>Lng</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {currentItems.slice(0, 10).map((i) => (
            <tr>
              <td>{i.id}</td>
              <td>{i.code}</td>
              <td>{i.lat}</td>
              <td>{i.lng}</td>
              <td>
                <button
                  onClick={() => setDetailId(i.id)}
                  className="btn btn-dark text-light"
                >
                  Detail
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ReactPaginate
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        className="pagination"
        previousLabel="< Back"
        nextLabel="Next >"
      />
    </div>
  );
};

export default ListView;
