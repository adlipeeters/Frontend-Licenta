import axios from "axios";

var options = {
  method: "GET",
  url: "https://api.newscatcherapi.com/v2/search",
  params: { q: "Bitcoin", lang: "en", sort_by: "relevancy", page: "1" },
  headers: {
    "x-api-key": "T4ioPCa_Sx4oM47Hew5vczwEOjcG1D5B7nH7J7qtzhg",
  },
};

export const getNews = () => {
  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
};
