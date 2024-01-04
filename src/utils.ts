import moment from "moment";

export const fetchOptions = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`
    }
  };

  

export const fetchFromTmdb = async (apiUrl: string) => {    
    const response = await fetch(apiUrl, fetchOptions)
    if(response.status == 200) {
      const data = await response.json()
      return data
    }
    return
}


export const checkKey = (obj: any) => {
  const keys = ["results", "cast", "parts"]
  let fin = keys.map((el) => el in obj)  

  return obj[keys[fin.indexOf(true)]]
  
}

export const displayTime = (time: number) => {
  
  const date = moment.utc().startOf('day').add({minutes: time})
  const  hours = date.hours();
  const  minutes = date.minutes();

  if(hours > 0) {
    return `${hours}h${minutes}m`      
  }  
  return `${minutes}m`  

}


export const tmdbImage = (path: string,  width?: number) => {
  return `http://image.tmdb.org/t/p/${width ? ("w"+width) : "original"}${path}`
}