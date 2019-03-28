const Fetch = (url) => {
  return fetch(url)
    .then(response => response.json())
};

export default Fetch