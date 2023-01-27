// use the name of backend container istead of localhost
export const environment = {
    production: true,
    baseUrl: "http://skyjo-online-back:8080/games/",
    websocketUrl: 'ws://skyjo-online-back:8080/websocket/games/'
};