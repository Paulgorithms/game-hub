import useData from "./useData";
import { Genre } from "./useGenres";
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

const useGames = (selectedGenre: Genre | null) => useData<Game>('/games', {params: {genres: selectedGenre?.id}}, [selectedGenre?.id]);

export default useGames;