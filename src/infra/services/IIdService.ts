export default interface IIdService {
  make: () => string;
  isValid: (id: string) => boolean;
}
