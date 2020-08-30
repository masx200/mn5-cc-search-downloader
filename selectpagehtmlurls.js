export function selectpagehtmlurls(document) {
    // console.log(document)
    return Array.from(
        new Set(
            Array.from(document.querySelectorAll(".page a")).map((a) => a.href)
        )
    );
}
