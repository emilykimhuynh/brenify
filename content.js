/*
*
* Ripped from here:
* https://9to5google.com/2015/06/14/how-to-make-a-chrome-extensions/
*
*/

//grab all elements on the page
var elements = document.getElementsByTagName('*');

for (var i = 0; i < elements.length; i++) {
    var element = elements[i];

    for (var j = 0; j < element.childNodes.length; j++) {
        var node = element.childNodes[j];

        //if the nodeType is a text node
        if (node.nodeType === 3) {
            brenify(node.nodeValue);
        }
    }
}

function brenify(text) {
    // TODO: Replace standalone 'Ben' and 'ben' with image
    var replacedText = text.replace(/Ben/g, 'Bren');
    if (replacedText !== text) {
        element.replaceChild(document.createTextNode(replacedText), node);
    }

    replacedText = text.replace(/ben/g, 'bren');
    if (replacedText !== text) {
        element.replaceChild(document.createTextNode(replacedText), node);
    }
}
