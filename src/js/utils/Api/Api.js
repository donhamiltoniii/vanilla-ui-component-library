export default function () {
  return new Api();
}

class Api {
  getRequest(location, callback) {
    fetch(location)
      .then(response => response.json())
      .then(callback)
      .catch(err => console.log(err));
  }

  postRequest(location, requestBody, callback) {
    fetch(location, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(requestBody)
    })
      .then(response => response.json())
      .then(callback)
      .catch(err => console.log(err));
  }
}
