// location hostname will return the host ip adress
export const environment = {
    production: true,
    baseUrl: "http://" + location.hostname + ":8080/games/",
    websocketUrl: 'ws://' + location.hostname + ':8080/websocket/games/'
};