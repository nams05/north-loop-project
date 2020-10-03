  <h3 align="center">North Loop Demo</h3>

<p align="center">
This is an integration with Yahoo’s finance API(s) via RapidAPI
<br />
<a href="https://nams.terminalbytes.com">View Demo</a>
</p>



<!-- TABLE OF CONTENTS -->
## Table of Contents

* [About the Project](#about-the-project)
  * [Built With](#built-with)
  * [API(s)](#apis)
  * [Features](#features)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Usage](#usage)
* [License](#license)

<!-- ABOUT THE PROJECT -->
## About The Project

[North Loop Demo](https://nams.terminalbytes.com)

This project integrates with Yahoo's finance API(s) via RapidApi.

### Built With
* [Bootstrap](https://getbootstrap.com)
* [JQuery](https://jquery.com)
* [Typescript](https://www.typescriptlang.org/)

### API(s)
1. `Get Analysis`: Gets analysis of an underlying stock by symbol.
   
2. `Get News`: Gets the latest news of a stock by symbol. Please Note: This API is deprecated by RapidAPI but I have implemented as per the requirement.
   
### Features
- `Caching`: RapidAPI has a latency of around 4-5s, to circumvent that the API responses from RapidAPI are cached for 5 minutes (unless explicitly bypassed).

- `WebSocket`: Backend logs are displayed on the right text box in real time via a websocket transport for the underlying logger.


<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

* [npm](https://www.npmjs.com/get-npm)
* [node](https://nodejs.org/en/)
### Installation

1. Clone the repo
    ```sh
    git clone https://github.com/nams05/north-loop-project.git
    ```
2. Install NPM packages
    ```sh
    npm install
    ```
3. Run the app
    - Development mode
       ```sh
       npm run start:dev
        ```
   - Production mode
      ```sh
      npm run start
       ```

## Usage

The app is running on your [localhost](http://localhost:3099)

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.
