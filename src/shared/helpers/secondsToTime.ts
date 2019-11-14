

export default function secondsToTime(seconds:number): string {
    console.log("AAA");
    console.log(seconds);
    return new Date(seconds * 1000).toISOString().substr(11, 8);
}
