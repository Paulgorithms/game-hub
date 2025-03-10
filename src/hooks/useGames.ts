import useData from "./useData";
export interface Platform {
  id: number;
  name: string;
  slug: string;
  metacritic: number;
}
export interface Game {
  id: number;
  name: string;
  background_image: string;
  parent_platform: { platform: Platform }[]
}

const useGames = () => useData<Game>('/games');

export default useGames;