

export default function secondsToTime(seconds:number): string {
    return new Date(seconds * 1000).toISOString().substr(11, 8);
}
