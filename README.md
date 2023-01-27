# skyjo-online-front

Angular PWA front end for skyjo online

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.0.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

# Structure

There are 3 main components :

-   Startpage : which allow to create a game or to join one
-   Game : which contains one component per game phase (preparing, running and ending)
-   rule modal : wich is imported on all pages and allow to display the game rules.

## Startpage component

The startpage component contains front end validation to verify that the input fields are not empty, then it can display errors depending on the back response (game already exists, game is full or running, game does not exist, player name already used)

## Game component

The game component is the parent of preparing, running and ending game component, it is responsible for managing the common data between those components such as the game.

Each player that joins a game is connected to the backend via a websocket which broadcasts the game object to all players each time some change occurs, this way each player can the the same updated version without the front end having to make an api call. When a player lands on the game component its init method gets the game is and playername from url then one connection to the websocket is made using the tuple gameId+playername as Id. The game component then subscribe to the websocket and refresh the game each time it receives a message.

The game component can share common data such as the game object, the player name and some states between its child components thanks to the game-data service. 
The Game component has objects, each of this objects is subscribe to its equivalent in the game data service, on each change the game component calls the game data service to update the data and then its own data gets refreshed thanks to the subscription. 
Each child component of the game component uses the @Input decorator on fileds the needs to be inherited suche as the game object.

Wich child is displayed depends on the game state, all three game component child are in the game.component.html file but only one is displayed at a time.

## Rule modal

This component is at the end of every page and allow to display the rules of skyjo at any time.

## CSS framework

bulma is used as the css framework see : https://bulma.io/documentation/

# Continuous integration

The project has a github action with multiple steps that aims at creating a docker image on linux amd 64 platform.
see the dockerfile and see the github actions steps in ci.yml file.
The image is then pushed to a docker hub repository

# DNS

The domain skyjo-online.com is linked to the server ip thanks to google domains dns server.

# Deployment

A docker-compose.yml file is used to declare the deployment structure.
It allows to deploy the front end along with the backend on the same host and only one command : docker-compose up.
Basically it pulls both front end and backend docker images, runs the containers and creates a network to allow them to communicate.

The host is a 1Gb ram 1CPU linux ubuntu amd 64 instance on oracle cloud, a virtual network is also provided by oracle cloud to connect the instance to the internet, the port 80 (http), 443 (https) and 8080 are open to TCP transport on this virtual network to allow communication to the front end and between back and front.
The host IP adress is 141.145.192.67, the container is exposing the frontend 80 port to the outside, since it is the default port we can access it with the website without specifying any port.


