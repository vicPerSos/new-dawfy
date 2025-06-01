export class RegisterCliDto {
    private Nombre: string;
    private Correo: string;
    private FechaNacimiento: Date;
    private Pais: string;
    private Foto: string;
    private Username: string;
    private Password: string;
    private ConfirmPassword: string;

    constructor(
        nombre: string,
        correo: string,
        fechaNacimiento: Date,
        pais: string,
        foto: string,
        username: string,
        password: string,
        confirmPassword: string,

    ) {
        this.Nombre = nombre;
        this.Correo = correo;
        this.FechaNacimiento = fechaNacimiento;
        this.Pais = pais;
        this.Foto = foto;
        this.Username = username;
        this.Password = password;
        this.ConfirmPassword = confirmPassword;
    }

    get nombre(): string {
        return this.Nombre;
    }
    set nombre(value: string) {
        this.Nombre = value;
    }

    get correo(): string {
        return this.Correo;
    }
    set correo(value: string) {
        this.Correo = value;
    }

    get fechaNacimiento(): Date {
        return this.FechaNacimiento;
    }
    set fechaNacimiento(value: Date) {
        this.FechaNacimiento = value;
    }

    get pais(): string {
        return this.Pais;
    }
    set pais(value: string) {
        this.Pais = value;
    }

    get foto(): string {
        return this.Foto;
    }
    set foto(value: string) {
        this.Foto = value;
    }

    get username(): string {
        return this.Username;
    }
    set username(value: string) {
        this.Username = value;
    }

    get password(): string {
        return this.Password;
    }
    set password(value: string) {
        this.Password = value;
    }

    get confirmPassword(): string {
        return this.ConfirmPassword;
    }
    set confirmPassword(value: string) {
        this.ConfirmPassword = value;
    }
}
