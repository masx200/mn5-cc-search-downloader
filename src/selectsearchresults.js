export function selectsearchresults(document) {
    return Array.from(document.querySelectorAll(".node  .title1 a")).map(
        (a) => a.href
    );
}
