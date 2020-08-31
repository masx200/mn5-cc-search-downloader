export function selectsearchresults(document) {
    return Array.from(
        new Set(
            Array.from(
                new Set([
                    ...document.querySelectorAll(".node  .title1 a"),
                    ...document.querySelectorAll(".node  .title a"),
                ])
            ).map((a) => a.href)
        )
    );
}
