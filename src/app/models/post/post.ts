export class Post {
    constructor(
        private _imageP?:String,
        private _titre?:String,
        private _description?:String,
        private _signe?:String,
        private _id_region?:String){}


    get imageP(){return this._imageP}
    set imageP(imageP:String){this._imageP=imageP}

    get titre(){return this._titre}
    set titre(titre:String){this._titre=titre}

    get description(){return this._description}
    set description(description:String){this._description=description}

    get signe(){return this._signe}
    set signe(signe:String){this._signe=signe}

    get id_region(){return this._id_region}
    set id_region(id_region:String){this._id_region=id_region}
}
