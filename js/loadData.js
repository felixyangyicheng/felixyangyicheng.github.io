let mapBretagne, dataBretagne, mapRennes, dataBusStar, autoroutes;
jQuery.ajax({
    dataType: "json",
    url: "https://france-geojson.gregoiredavid.fr/repo/regions/bretagne/arrondissements-bretagne.geojson",
    async: false,
    success: function(data) {
        mapBretagne = data;
    }
});
jQuery.ajax({
    dataType: "json",
    url: "https://data.bretagne.bzh/api/records/1.0/search/?dataset=centres-de-formation-sanitaire-et-social-en-bretagne&q=&rows=1000&facet=secteur&facet=formation&facet=etablissement&facet=ville&facet=financement_region",
    async: false,
    success: function(data) {
        dataBretagne = data;
    }
});
jQuery.ajax({
    dataType: "json",
    url: "https://data.opendatasoft.com/api/records/1.0/search/?dataset=perimetres-des-45-sous-quartiers-de-la-ville-de-rennes%40rennes-metropole&q=",
    async: false,
    success: function(data) {
        mapRennes = data;
    }
});

jQuery.ajax({
    dataType: "json",
    url: "https://data.rennesmetropole.fr/api/records/1.0/search/?dataset=etat-du-trafic-en-temps-reel&q=&facet=denomination",
    async: false,
    success: function(data) {
        autoroutes = data;
    }
});


console.log(autoroutes.records);
console.log(mapBretagne.features);