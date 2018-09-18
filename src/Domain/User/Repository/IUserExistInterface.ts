export default interface IUserExistInterface {
    userExistByUuiAndUsername(uuid: string, username: string): Promise<boolean>;
}
