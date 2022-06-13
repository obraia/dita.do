const baseUrl = 'https://us-central1-dita-do.cloudfunctions.net/api';

const checkWord = async (params) => {
  const url = new URL(`${baseUrl}/verify`);
  url.search = new URLSearchParams(params).toString();

  const response = await fetch(url, {
    method: 'GET',
  });

  return response.json();
};

export { checkWord };
