// location hostname will return the host ip adress
export const environment = {
    production: true,
    baseUrl: "http://" + location.hostname + "/api/games/",
    websocketUrl: 'ws://' + location.hostname + '/websocket/games/'
};