brenify();

//handle async data loading for 10 seconds
/*(function myLoop (i) {          
   setTimeout(function () {
       brenify();             
      if (--i) myLoop(i);      //  decrement i and call myLoop again if i > 0
   }, 1000)
})(10);                        //  pass the number of iterations as an argument*/

function brenify() {
    document.body.innerHTML = document.body.innerHTML.replace(/Ben/g, 'Bren').replace(/ben/g, 'bren');
}
