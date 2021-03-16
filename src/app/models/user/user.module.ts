export class UserModule {

  static motDePass: String;
  static img: String;

  constructor(
    private _nom?: string,
    private _prenom?: string,
    private _dateNaiss?: string,
    private _adresse?: string,
    private _email?: string,
    private _motDePass?: string,
    private _cin?: string,
    private _tel?: string,
    private _img?: string
  ) {}

  get nom() {
    return this._nom;
  }
  set nom(nom: string) {
    this._nom = nom;
  }

  get prenom() {
    return this._prenom;
  }
  set prenom(prenom: string) {
    this._prenom = prenom;
  }

  get tel() {
    return this._tel;
  }
  set tel(tel: string) {
    this._tel = tel;
  }

  get email() {
    return this._email;
  }
  set email(email: string) {
    this._email = email;
  }

  get motDePass() {
    return this._motDePass;
  }
  set motDePass(motDePass: string) {
    this._motDePass = motDePass;
  }

  

  get adresse() {
    return this._adresse;
  }
  set adresse(adresse: string) {
    this._adresse = adresse;
  }

  get dateNaiss() {
    return this._dateNaiss;
  }
  set dateNaiss(dateNaiss: string) {
    this._dateNaiss = dateNaiss;
  }
  get cin() {
    return this._cin;
  }
  set cin(cin: string) {
    this._cin = cin;
  }
  get img() {
    return this._img;
  }
  set img(img: string) {
    this._img = img;
  }
}
