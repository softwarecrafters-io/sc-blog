export async function delay(timeInMs: number) {
    await new Promise(resolve => setTimeout(resolve, timeInMs));
}
