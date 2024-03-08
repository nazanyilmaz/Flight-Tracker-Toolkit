import moment from "moment/moment";

//unix formatindaki tarihi normal tarihe cevirmek icin 1000 carpmak gerekir.
const formatDate = (unix_time) => {
  const date = new Date(unix_time * 1000);
  return moment(date).calendar();
};

export default formatDate;
