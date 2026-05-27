export default function getImageKey(image: string) {
    const imageKey = image.slice(image.lastIndexOf("/") + 1);
    return imageKey;
}