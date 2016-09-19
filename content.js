/*
*
* Ripped from here:
* https://9to5google.com/2015/06/14/how-to-make-a-chrome-extensions/
*
*/

//grab all elements on the page
let elements = document.getElementsByTagName('*');

for (let element of elements) {
    for (let node of element.childNodes) {
        // Ignore if nodeType is not text
        if (node.nodeType !== 3) {
            continue;
        }

        let text = node.nodeValue;

        // TODO: Replace Ben with image
        let updatedText = text.replace(/Ben/g, 'Bren');
        updatedText = updatedText.replace(/ben/g, 'bren');

        node.nodeValue = updatedText;
    }
}