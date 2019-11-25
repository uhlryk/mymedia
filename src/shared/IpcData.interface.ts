export default interface IpcDataInterface {
    responseChannel: string;
    payload: {
        [key: string]: any;
    };
}
