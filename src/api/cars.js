import axios from "axios";

export const getCarsTable = async () => {
  const response = await axios.get("https://city-mobil.ru/api/cars")

  return response.data
}