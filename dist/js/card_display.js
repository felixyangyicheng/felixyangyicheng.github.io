let CSV_read=document.getElementById("CSV-read"),
Courbe_alignements=document.getElementById("Courbe-alignements"),
Histo_status=document.getElementById("Histo-status"),
Alarmes=document.getElementById("Alarmes"),
Production_versions=document.getElementById("Production-versions"),

nav_csv_read=document.getElementById("nav-csv-read"),
nav_courbe_alignements=document.getElementById("nav-courbe-alignements"),
nav_histo_status=document.getElementById("nav-histo-status"),
nav_alarmes=document.getElementById("nav-alarmes"),
nav_production_versions=document.getElementById("nav-production-version"),

csv_read_remove=document.getElementById("csv-read-remove"),
courbe_alignements_remove=document.getElementById("sensor-remove"),
histo_remove=document.getElementById("histo-remove"),
alarme_remove=document.getElementById("alarme-remove"),
production_versions_remove=document.getElementById("version-remove")
;

nav_csv_read.addEventListener("click", (e) => {
    nav_csv_read.style.display="none";
    CSV_read.style.display="flex"
})
csv_read_remove.addEventListener("click", (e) => {
    nav_csv_read.style.display="list-item";
})
nav_courbe_alignements.addEventListener("click", (e) => {
    nav_courbe_alignements.style.display="none";
    Courbe_alignements.style.display="flex"
})
courbe_alignements_remove.addEventListener("click", (e) => {
    nav_courbe_alignements.style.display="list-item";
})
nav_histo_status.addEventListener("click", (e) => {
    nav_histo_status.style.display="none";
    Histo_status.style.display="flex"
})
histo_remove.addEventListener("click", (e) => {
    nav_histo_status.style.display="list-item";
})

nav_alarmes.addEventListener("click", (e) => {
    nav_alarmes.style.display="none";
    Alarmes.style.display="flex"
})
alarme_remove.addEventListener("click", (e) => {
    nav_alarmes.style.display="list-item";
})

nav_production_versions.addEventListener("click", (e) => {
    nav_production_versions.style.display="none";
    Production_versions.style.display="flex"
})
production_versions_remove.addEventListener("click", (e) => {
    nav_production_versions.style.display="list-item";
})







