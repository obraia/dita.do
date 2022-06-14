const baseUrl = 'http://localhost:5001/dita-do/us-central1/api';

const checkWord = async (params) => {
  const url = new URL(`${baseUrl}/verify`);
  url.search = new URLSearchParams(params).toString();

  const response = await fetch(url, {
    method: 'GET',
  });

  return response.json();
};

export { checkWord };
