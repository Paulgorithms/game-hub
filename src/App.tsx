import { useState } from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import GameGrid from "./components/GameGrid";
import GenreList from "./components/GenreList";
import { Genre } from "./hooks/useGenres";
import PlatformSelector from "./components/PlatformSelector";

function App() {
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);

  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`, // Mobile: nav on top, main below
        lg: `"nav nav" "aside main"`, // Large: nav full width, aside + main below
      }}
      gridTemplateColumns={{ base: "1fr", lg: "200px 1fr" }} // "aside" is 200px, "main" fills remaining space
      gridTemplateRows="60px 60px" // Both nav and content rows are fixed at 50px height
      h="100vh" // Full viewport height
    >
      {/* Navbar */}
      <GridItem area="nav" height="60px">
        <NavBar />
      </GridItem>

      {/* Sidebar (gold) - Only visible on lg screens */}
      <GridItem
        area="aside"
        display={{ base: "none", lg: "block" }}
        paddingX={5}
      >
        <GenreList
          selectedGenre={selectedGenre}
          onSelectGenre={(genre) => setSelectedGenre(genre)}
        />
      </GridItem>

      {/* Main content (dodgerblue) */}
      <GridItem area="main">
        <PlatformSelector />
        <GameGrid selectedGenre={selectedGenre} />
      </GridItem>
    </Grid>
  );
}

export default App;
