# Chapter 2: Data Types (TypeScript Interfaces)

Welcome back! In [Chapter 1: App Component & GameQuery State](01_app_component___gamequery_state_.md), we saw how the `App` component acts as the brain, keeping track of user selections like genre or platform in a special `gameQuery` state object. We even saw a sneak peek of its structure:

```typescript
// src/App.tsx (From Chapter 1)
export interface GameQuery {
  genre: Genre | null;
  platform: Platform | null;
  sortOrder: string;
  searchText: string;
}
```

But what exactly *are* `Genre` and `Platform`? And why do we need this `interface GameQuery { ... }` thing? That's what this chapter is all about: defining the exact "shape" of our data using TypeScript Interfaces.

## Why Define Data Shapes? The Blueprint Analogy

Imagine you order a "build-it-yourself" toy car kit online. When it arrives, how do you know what parts *should* be inside? You look at the instruction manual or the picture on the box! It acts as a blueprint, telling you to expect: 4 wheels, 1 car body, 2 axles, etc.

If the box arrived with only 3 wheels, you'd immediately know something was wrong *before* you even started building.

TypeScript Interfaces work just like that blueprint, but for our data objects in code. They tell us exactly what properties an object should have and what type each property should be (e.g., a number, some text, another object).

Without these blueprints (interfaces), we might get data (like a game object from a server) and guess its structure. Maybe we try `game.title` when the actual property is `game.name`. This would cause confusing errors later when our application runs. Interfaces help us catch these mistakes early, right when we're writing the code!

## What is a TypeScript Interface?

An interface is a way in TypeScript to define a **contract** or a **shape** for objects. It lists the names of the properties the object must have and the data type for each property.

Let's look at a very simple example, unrelated to games for a moment:

```typescript
// This defines the blueprint for a Person object
interface Person {
  name: string; // Must have a 'name' property, and its value must be text (a string)
  age: number;  // Must have an 'age' property, and its value must be a number
  isStudent: boolean; // Must have 'isStudent', value must be true or false (a boolean)
}
```

This interface says: "Any object that claims to be a `Person` *must* have exactly these three properties: `name` (which must be a `string`), `age` (which must be a `number`), and `isStudent` (which must be a `boolean`)."

If we try to create an object that doesn't follow this blueprint, TypeScript will warn us:

```typescript
// Let's try to create some Person objects

const person1: Person = { // We declare person1 follows the 'Person' interface
  name: "Alice",
  age: 30,
  isStudent: false
}; // OK! This matches the blueprint exactly.

const person2: Person = { // Declare person2 as a Person
  name: "Bob",
  yearsOld: 25, // Error! Property 'yearsOld' does not exist in type 'Person'.
  isStudent: true
};

const person3: Person = { // Declare person3 as a Person
  name: "Charlie",
  age: "Twenty" // Error! Type 'string' is not assignable to type 'number'.
  // isStudent property is also missing! Error!
};
```

Interfaces enforce the structure, helping us avoid typos and incorrect data types.

## Our Game Hub Blueprints

Now let's look at the specific interfaces we use in the Game Hub project. These define the shapes for genres, platforms, games, and the query object itself.

### `Genre` Interface

This defines the shape for a game genre object (like "Action", "RPG").

```typescript
// Found in: src/hooks/useGenres.ts
export interface Genre {
  id: number;           // A unique number identifying the genre
  name: string;         // The text name (e.g., "Action")
  image_background: string; // A web link (URL) to a background image for the genre
}
```

Any time our code expects a `Genre` object, it knows it will have these three properties with these specific types.

### `Platform` Interface

This defines the shape for a gaming platform object (like "PC", "PlayStation 5").

```typescript
// Found in: src/hooks/usePlatforms.ts
export interface Platform {
  id: number;   // A unique number identifying the platform
  name: string; // The text name (e.g., "PlayStation 5")
  slug: string; // A short text identifier (e.g., "playstation5", "pc")
}
```

Similarly, any `Platform` object must have an `id`, a `name`, and a `slug`.

### `Game` Interface

This blueprint is a bit more complex, as games have more details. Here's a slightly simplified version:

```typescript
// Found in: src/hooks/useGames.ts (Simplified for clarity)
export interface Game {
  id: number;
  name: string;
  background_image: string; // URL for the game's main image
  // An array [] of objects, where each object has a 'platform' property
  // which MUST match the 'Platform' interface we defined above!
  parent_platforms: { platform: Platform }[];
  metacritic: number; // The review score (e.g., 95)
  rating_top: number; // The maximum possible rating (e.g., 5 stars)
}
```

This tells us a `Game` object has an `id`, `name`, image URL, review score (`metacritic`), and max rating (`rating_top`). It *also* has a `parent_platforms` property. This property holds a list (an array `[]`) of items. Each item in that list is an object `{}` which itself has one property called `platform`, and the value of *that* `platform` property must be an object matching our `Platform` interface! Phew! Interfaces can refer to other interfaces, creating structured data.

### `GameQuery` Interface (Revisited)

Now we can fully understand the `GameQuery` interface from Chapter 1:

```typescript
// Found in: src/App.tsx
export interface GameQuery {
  // Can hold a full Genre object OR be 'null' (meaning nothing selected)
  genre: Genre | null;
  // Can hold a full Platform object OR be 'null'
  platform: Platform | null;
  // How to sort games (e.g., "name", "-released")
  sortOrder: string;
  // Text typed into the search bar
  searchText: string;
}
```

This interface uses the `Genre` and `Platform` interfaces we just defined. The `| null` part means that the `genre` property is allowed to be either a complete `Genre` object (matching the `Genre` blueprint) *or* the special value `null`, which we use to represent "no genre selected". The same applies to the `platform` property.

## How Do Interfaces Help Us?

Defining these blueprints gives us several superpowers:

1.  **Error Prevention:** If you're working with a `Game` object and accidentally type `myGame.title` instead of `myGame.name`, TypeScript will immediately underline `title` in red and tell you, "Property 'title' does not exist on type 'Game'." This prevents runtime errors.

2.  **Autocompletion & IntelliSense:** When you have a variable typed as `Game` (like `myGame`) and you type `myGame.` in your code editor (like VS Code), the editor will pop up a list of valid properties: `id`, `name`, `background_image`, `parent_platforms`, etc. This makes coding much faster and less prone to typos.

    ![Autocompletion Example](https://code.visualstudio.com/assets/docs/languages/typescript/intellisense.png)
    *(Image showing code editor suggesting properties)*

3.  **Clear Code & Documentation:** Interfaces make the code easier to understand. When you see a function expecting a `GameQuery` object, you immediately know what kind of data it needs without digging through the code. It acts like self-documentation.

## Interfaces in Action: The `GameCard` Component

Let's see how a component uses these interfaces. Our `GameCard` component is responsible for displaying a single game card in the grid. It needs information *about* a game to display it.

```typescript
// src/components/GameCard.tsx (Simplified)
import { Game } from '../hooks/useGames'; // 1. Import the Game interface!

// 2. Define the props this component expects
interface Props {
  game: Game; // It expects ONE prop named 'game', matching the 'Game' blueprint
}

// 3. Use the 'game' prop, TypeScript knows its shape!
const GameCard = ({ game }: Props) => {
  return (
    <div>
      {/* We can safely access properties defined in the Game interface */}
      <img src={game.background_image} />
      <h2>{game.name}</h2>
      <p>Score: {game.metacritic}</p>

      {/* Trying to access a non-existent property would cause a TS error here! */}
      {/* <p>{game.developer}</p> // TypeScript Error! */}
    </div>
  );
}

export default GameCard;
```

1.  We **import** the `Game` interface.
2.  We define an interface `Props` for the component's properties, stating it must receive a `game` prop that adheres to the `Game` interface.
3.  Inside the component, when we receive the `game` prop, TypeScript *knows* it will have `name`, `background_image`, `metacritic`, etc., because we used the `Game` interface. We get autocompletion and error checking automatically!

## What Happens "Under the Hood"?

This is important: **TypeScript interfaces are a development-time tool only.** They help us write correct code and catch errors *before* we run the application.

When TypeScript code is compiled into the plain JavaScript that actually runs in the web browser, the interfaces are completely erased!

Think of the blueprint analogy again: the blueprint helps the factory build the toy car correctly. But when you buy the toy car, the blueprint isn't included in the box – you just get the car.

```typescript
// --- TypeScript Code ---
interface Point {
  x: number;
  y: number;
}

function logPoint(p: Point) {
  console.log(`Coordinates: ${p.x}, ${p.y}`);
}

const myPoint: Point = { x: 10, y: 20 };
logPoint(myPoint);
```

```javascript
// --- Compiled JavaScript Code (Interfaces are gone!) ---

function logPoint(p) { // No type 'Point' here!
  console.log(`Coordinates: ${p.x}, ${p.y}`);
}

const myPoint = { x: 10, y: 20 }; // Just a plain object
logPoint(myPoint);
```

The interfaces did their job during development by ensuring `logPoint` was called with an object that had `x` and `y` properties of type `number`. Once that check passed, they weren't needed in the final JavaScript.

## Summary

*   TypeScript **interfaces** act like **blueprints** or **contracts** for our data objects.
*   They define the required **property names** and their **data types** (e.g., `name: string`, `id: number`).
*   We defined interfaces for `Genre`, `Platform`, `Game`, and `GameQuery` to describe the structure of our data in Game Hub.
*   Interfaces provide **error checking** during development, **autocompletion** in code editors, and make the code **clearer** and easier to understand.
*   Interfaces are a **TypeScript-only feature** and are erased during compilation to JavaScript. Their benefit comes during the development process.

## Next Steps

Now that we understand the blueprints (`interfaces`) for our data (`Genre`, `Platform`, `Game`, `GameQuery`), we can look more closely at the components that actually *use* this data to let the user interact with the application.

In the next chapter, we'll explore the components that allow users to select genres and platforms, and choose how to sort the games. Let's dive into [Chapter 3: Filtering & Sorting Components](03_filtering___sorting_components_.md)!

---

Generated by [AI Codebase Knowledge Builder](https://github.com/The-Pocket/Tutorial-Codebase-Knowledge)