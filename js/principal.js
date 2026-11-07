document.addEventListener("DOMContentLoaded", () => {
    
    const isSubfolder = window.location.pathname.includes("/html/");
    const headerPath = isSubfolder ? "header.html" : "html/header.html";
    const footerPath = isSubfolder ? "footer.html" : "html/footer.html";


    const headerContainer = document.getElementById("header-placeholder");
    if (headerContainer) {
        fetch(headerPath)
            .then(response => {
                if (!response.ok) throw new Error("Header no encontrado");
                return response.text();
            })
            .then(data => {
                headerContainer.innerHTML = data;
            })
            .catch(error => console.error("Error al cargar el header:", error));
    }

   
    const footerContainer = document.getElementById("footer-placeholder");
    if (footerContainer) {
        fetch(footerPath)
            .then(response => {
                if (!response.ok) throw new Error("Footer no encontrado");
                return response.text();
            })
            .then(data => {
                footerContainer.innerHTML = data;
            })
            .catch(error => console.error("Error al cargar el footer:", error));
    }
});
