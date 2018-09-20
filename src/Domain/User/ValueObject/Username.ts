const MIN_LENGTH = 3;

export default class Username {

    private readonly username: string;

    constructor(username: string) {
        this.validate(username);

        this.username = username;
    }

    public toString(): string {
        return this.username;
    }

    private validate(username: string): void{
        if (username.length < MIN_LENGTH) {
            throw new Error(`Username should contain at least ${MIN_LENGTH + 1} chars`);
        }
    }
}