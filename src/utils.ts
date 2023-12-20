export const fetchOptions = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`
    }
  };

  

  export const fetchFromTmdb = async (apiUrl: string) => {
    const response = await fetch(apiUrl, fetchOptions)
    const data = await response.json()
    return data
  }