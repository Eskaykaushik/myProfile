 
/* ==========================================
   Resume Print
========================================== */

async function printResume() {

    // Wait for fonts to finish loading
    if (document.fonts) {
        await document.fonts.ready;
    }

    // Small delay so layout settles
    setTimeout(() => {

        window.focus();

        window.print();

    }, 300);

}

/* ==========================================
   Auto Print
========================================== */

window.addEventListener("load", printResume);


/* ==========================================
   Close Window After Print
========================================== */

window.addEventListener("afterprint", () => {

    // Most browsers only allow this if the page
    // was opened using window.open()

    setTimeout(() => {

        window.close();

    }, 300);

});
