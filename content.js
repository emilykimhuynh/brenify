"use strict";
(()=>{
    /*
        TODO: handle more obscure Unicode.
        Currently handled Unicode blocks:
        - Basic Latin
        - Latin-1 Supplement
        - Latin Extended-A
        - Latin Extended-B
        - Latin Extended Additional
        - Enclosed Alphanumerics

        see: https://en.wikipedia.org/wiki/List_of_Unicode_characters
    */
    const bs = [
      "b","B","Ⓑ","⒝",
      "ⓑ","ƀ","Ɓ","Ƃ",
      "ƃ","Ƅ","ƅ","Ƀ",
      "Ḃ","ḃ"
    ];
    const es = [
      "e","E","Ⓔ","⒠",
      "ⓔ","È","É","Ê",
      "Ë","è","é","ê",
      "ë","Ē","ē","Ĕ",
      "ĕ","Ė","ė","Ę",
      "ę","Ě","ě","Ǝ",
      "Ə","Ɛ","Ȅ","ȅ",
      "Ȇ","ȇ","Ȩ","ȩ",
      "Ɇ","ɇ"
    ];
    const ns = [
      "n","N","Ⓝ","⒩",
      "ⓝ","Ñ","ñ","Ń",
      "ń","Ņ","ņ","Ň",
      "ň","ŉ","Ŋ","ŋ",
      "Ɲ","ƞ","Ǹ","ǹ",
      "ȵ"
    ];

    //idea: put each letter in a capturing group and insert an r between them
    var benExpression = (b,e,n) => new RegExp(`(${b})(${e})(${n})`,"g");

    var brenReplacementString = (b,e,n) => {
        //until a better heuristic is decided, capitalize the r if B, E, and N are all capitalized.
        //also, match up to other special cases e.g. enclosed alphanumerics
        let ben = b+e+n,
            expressionStr = "bren"; //safe enough default
        const capitalbs = [
          "B","Ⓑ","Ɓ","Ƀ",
          "Ḃ"
        ];
        const capitales = [
          "E","Ⓔ","È","É",
          "Ê","Ë","Ē","Ĕ",
          "Ė","Ę","Ě","Ǝ",
          "Ɛ","Ȅ","Ȇ","Ȩ",
          "Ɇ"
        ];
        const capitalns = [
          "N","Ⓝ","Ñ","Ń",
          "Ņ","Ň","Ɲ","Ǹ"
        ];
        if(ben==="ⒷⒺⓃ") {
            expressionStr = "ⒷⓇⒺⓃ";
        }
        else if(ben==="⒝⒠⒩") {
            expressionStr = "⒝⒭⒠⒩";
        }
        else if(ben==="ⓑⓔⓝ") {
            expressionStr = "ⓑⓡⓔⓝ";
        }
        else if(capitalbs.indexOf(b) > -1 && capitales.indexOf(e) > -1 && capitalns.indexOf(n) > -1) {
            //capitalize the R
            expressionStr = b+"R"+e+n;
        }
        else {
            expressionStr = b+"r"+e+n;
        }
        return expressionStr;
    };


    var brenify = () => {
        let newHTML = document.body.innerHTML; //use temp variable so we can make DOM updates all at once
        /* TODO: build a single complex regexp and only search through HTML once for effeciency */
        for(let b of bs) {
            for(let e of es) {
                for(let n of ns) {
                    newHTML = newHTML.replace(benExpression(b,e,n),brenReplacementString(b,e,n));
                }
            }
        }
        document.body.innerHTML = newHTML;
    }

    brenify();
})();
