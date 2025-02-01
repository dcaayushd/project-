function initMap() {
    const map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 27.7172, lng: 85.3240 }, // Kathmandu coordinates
        zoom: 8
    });

    // Add markers for polling stations
    const pollingStations = [
        { lat: 27.7172, lng: 85.3240, title: 'काठमाडौं' },
        { lat: 27.6788, lng: 85.3168, title: 'ललितपुर' },
        { lat: 27.6728, lng: 85.4298, title: 'भक्तपुर' }
    ];

    pollingStations.forEach(station => {
        new google.maps.Marker({
            position: { lat: station.lat, lng: station.lng },
            map: map,
            title: station.title
        });
    });
}