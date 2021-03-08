module.exports = class TrackAnalysis {
  constructor(points) {
    this.points = points;
    this.averageSpeed = this.getAverageSpeed();
    this.distance = this.getDistance();
    this.time = this.getTime();
    this.averagePace = this.getAveragePace();
  }

  extractPoints = () => {
    console.log(this.points);
    const processedPoints = this.points.map((locations) => ({
      lat: locations.coords.latitude,
      long: locations.coords.longitude,
    }));
    return processedPoints;
  };

  distanceInKmBetweenEarthCoordinates = (lat1, lon1, lat2, lon2) => {
    const degreesToRadians = (degrees) => {
      return (degrees * Math.PI) / 180;
    };

    const earthRadiusKm = 6371;
    const dLat = degreesToRadians(lat2 - lat1);
    const dLon = degreesToRadians(lon2 - lon1);

    lat1 = degreesToRadians(lat1);
    lat2 = degreesToRadians(lat2);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return earthRadiusKm * c;
  };

  getDistance = () => {
    let distances = [];
    const arrayOfPoints = this.extractPoints();

    for (let i = 0; i < arrayOfPoints.length - 1; i++) {
      let dist = this.distanceInKmBetweenEarthCoordinates(
        arrayOfPoints[i].lat,
        arrayOfPoints[i].long,
        arrayOfPoints[i + 1].lat,
        arrayOfPoints[i + 1].long
      );
      distances.push(dist);
    }
    const sum = distances.reduce((a, b) => a + b, 0);
    // Returns distance in kilometers
    return sum;
  };

  getTime = () => {
    const time =
      this.points[this.points.length - 1].timestamp - this.points[0].timestamp;
    // Returns time in seconds
    return time / 1000;
  };

  getAverageSpeed = () => {
    const distance = this.getDistance();
    const time = this.getTime() / 60;
    // Returns a speed in the form of kilometers / minute
    return distance / time;
  };

  getAveragePace = () => {
    const distance = this.getDistance();
    const time = this.getTime() / 60;
    // Returns a pace in the form of minutes / kilometer
    return time / distance;
  };

  getPacePerKilometer = () => {
    const arrayOfPoints = this.extractPoints();

    let currentKilometer = [];
    let condition = currentKilometer.reduce((a, b) => a + b, 0) < 1;

    while (condition) {
      for (let i = 0; i < arrayOfPoints.length - 1; i++) {
        let dist = this.distanceInKmBetweenEarthCoordinates(
          arrayOfPoints[i].lat,
          arrayOfPoints[i].long,
          arrayOfPoints[i + 1].lat,
          arrayOfPoints[i + 1].long
        );
        currentKilometer.push(dist);
      }
      const sum = distances.reduce((a, b) => a + b, 0);
    }
  };
};
