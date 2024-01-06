import Request from "./Artrequest.js";

const app = {
    requests: [],
  
    init: function () {
      this.fetchRequests(this.api);
      // other initialization logic
    },
  
    fetchRequests(api) {
      console.log("fetching characters")
      fetch("https://backend-courseproject-marten.onrender.com/requests", {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
      })
        .then(response => response.json())
        .then(data => {
          console.log("data")
    
          data.forEach(request => {
            this.requests.push(request);
          });
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        })
        .finally(() => {
          this.showData();
        });
    },
  
    showData() {
      console.log('character:', this.requests);
      app.requests.forEach(request => {
  
        const requestBox = new Request(
          request.description,
         request.offer,
          request.mail
        );
  
        document.querySelector(".requests").insertAdjacentHTML('beforeend', requestBox.innerHTML());
      });
    }
  };
  
  app.init();