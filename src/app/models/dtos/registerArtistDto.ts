export class RegisterArtistDto {
    public nombre: string;
    public correo: string;
    public fechaNacimiento: Date;
    public pais: string;
    public foto: string;
    public username: string;
    public password: string;
    public roll: string = "ARTISTA";
    public spotifyId: string;

    constructor(
        nombre: string,
        correo: string,
        fechaNacimiento: Date,
        pais: string,
        foto: string,
        username: string,
        password: string,
        id_artista_spotify: string

    ) {
        this.nombre = nombre;
        this.correo = correo;
        this.fechaNacimiento = fechaNacimiento;
        this.pais = pais;
        this.foto = foto;
        this.username = username;
        this.password = password;
        this.spotifyId = id_artista_spotify;

    }

    get _nombre(): string {
        return this.nombre;
    }
    set _nombre(value: string) {
        this.nombre = value;
    }

    get _correo(): string {
        return this.correo;
    }
    set _correo(value: string) {
        this.correo = value;
    }

    get _fechaNacimiento(): Date {
        return this.fechaNacimiento;
    }
    set _fechaNacimiento(value: Date) {
        this.fechaNacimiento = value;
    }

    get _pais(): string {
        return this.pais;
    }
    set _pais(value: string) {
        this.pais = value;
    }

    get _foto(): string {
        return this.foto;
    }
    set _foto(value: string) {
        this.foto = value;
    }

    get _username(): string {
        return this.username;
    }
    set _username(value: string) {
        this.username = value;
    }

    get _password(): string {
        return this.password;
    }
    set _password(value: string) {
        this.password = value;
    }
    get _roll(): string {
        return this.roll;
    }
    set _roll(value: string) {
        this.roll = value;
    }

    get _id_artista_spotify(): string {
        return this.spotifyId;
    }

    set _id_artista_spotify(value: string) {
        this.spotifyId = value;
    }


}