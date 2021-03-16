export class Region {
    constructor(
        private _nom_region?: String,
        private _latitude?: String,
        private _longitude?: String) { }


    get nom_region() { return this._nom_region }
    set nom_region(nom_region: String) { this._nom_region = nom_region }

    get latitude() { return this._latitude }
    set latitude(latitude: String) { this._latitude = latitude }

    get longitude() { return this._longitude }
    set longitude(longitude: String) { this._longitude = longitude }
}
