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
        // Basic Latin
        "b","B",
        // Enclosed Alphanumerics
        "Ⓑ","⒝", "ⓑ",
        // Latin Extended-B
        "ƀ","Ɓ","Ƃ","ƃ","Ƅ","ƅ","Ƀ",
        // Latin Extended Additional
        "Ḃ","ḃ"
    ];
    const es = [
        // Basic Latin
        "e","E",
        // Enclosed Alphanumerics
        "Ⓔ","⒠","ⓔ",
        // Latin-1 Supplement
        "È","É","Ê","Ë","è","é","ê","ë",
        // Latin Extended-A
        "Ē","ē","Ĕ","ĕ","Ė","ė","Ę","ę","Ě","ě",
        // Latin Extended-B
        "Ǝ","Ə","Ɛ","ǝ","Ȅ","ȅ","Ȇ","ȇ","Ȩ","ȩ","Ɇ","ɇ"
    ];
    const ns = [
        // Basic Latin
        "n","N",
        // Enclosed Alphanumerics
        "Ⓝ","⒩","ⓝ",
        // Latin-1 Supplement
        "Ñ","ñ",
        // Latin Extended-A
        "Ń","ń","Ņ","ņ","Ň","ň","ŉ","Ŋ","ŋ",
        // Latin Extended-B
        "Ɲ","ƞ","Ǹ","ǹ","Ƞ","ȵ"
  ]; //
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

    /* Main function */

    var brenify = () => {
        let newHTML = document.body.innerHTML; //use temp variable so we can make DOM updates all at once
        let benMap = {};
        for(let b of bs) {
            for(let e of es) {
                for(let n of ns) {
                    benMap[b+e+n] = brenReplacementString(b,e,n);
                }
            }
        }
        newHTML = newHTML.replace(new RegExp(Object.keys(benMap).join("|"),"g"), matched => benMap[matched]);
        document.body.innerHTML = newHTML;
    };

    brenify();
})();
