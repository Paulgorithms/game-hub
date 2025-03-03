import { Grid, GridItem } from "@chakra-ui/react";

function App() {
  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`, // Mobile: nav on top, main below
        lg: `"nav nav" "aside main"`, // Large: nav full width, aside + main below
      }}
      gridTemplateColumns={{ base: "1fr", lg: "200px 1fr" }} // "aside" is 200px, "main" fills remaining space
      gridTemplateRows="50px 50px" // Both nav and content rows are fixed at 50px height
      h="100vh" // Full viewport height
    >
      {/* Navbar */}
      <GridItem area="nav" bg="coral" height="50px">
        Nav
      </GridItem>

      {/* Sidebar (gold) - Only visible on lg screens */}
      <GridItem area="aside" bg="gold" display={{ base: "none", lg: "block" }}>
        Aside
      </GridItem>

      {/* Main content (dodgerblue) */}
      <GridItem area="main" bg="dodgerblue">
        Main
      </GridItem>
    </Grid>
  );
}

export default App;
