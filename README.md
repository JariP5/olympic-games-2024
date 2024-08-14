# Paris 2024 Olympics Data Display

## Purpose

This Svelte project is designed to display comprehensive data for the 2024 Paris Olympics, providing users with the following features:

1. **Medals Table**: View the medals table, sorted by rank or total number of medals.
2. **Event Listings**: Browse all Olympic events with the ability to filter by date, discipline, or venue.
3. **Event Details**: Access detailed information about each event, including participant names and their respective scores.

## API Provider
The data is sourced from the Codante API, specifically the English version. However, the API has an issue where country names are returned in Portuguese rather than English. Apart from that it works well. More details can be found in the documentation: https://docs.apis.codante.io/olympic-games-english.

## Requirements

- **Node.js**: Ensure you have Node.js version 20 or higher installed on your system.

## Installation

To install the necessary dependencies, run:

```bash
npm install
```

## Developing

To start the development server and see the app in your browser, run:

```bash
npm run dev
```

This will open a local server where you can view and develop the project in real-time.

## Testing
Testing is done using Vitest. To run the test suites and ensure your code is functioning correctly, execute:

```bash
npm test
```
This will run all the tests defined for the project, allowing you to verify the application's functionality.

## Building
To create a production-ready version of the application, use the following command:

```bash
npm run build
```
This command will generate a minimized, optimized version of your app in the dist directory.

You can preview the production build locally by running:

```bash
npm run preview
```
This will serve the production build on a local server, allowing you to test the final output.
