// location hostname will return the host ip adress
export const environment = {
    production: true,
    baseUrl: "https://" + location.hostname + "/api/games/",
    websocketUrl: 'wss://' + location.hostname + '/websocket/games/'
};