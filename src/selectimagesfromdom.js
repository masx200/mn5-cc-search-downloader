export function selectimagesfromdom(document) {
    var fileurls = Array.from(
        new Set(
            Array.from(document.querySelectorAll("img"))
                .map((e) => e.src)
                .filter((a) => !!a)
                .filter((a) => a.startsWith("http"))
                .filter((a) => a.endsWith(".jpg"))
        )
    );
    return fileurls;
}
