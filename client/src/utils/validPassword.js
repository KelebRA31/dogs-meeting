export default function validPassword(password) {
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const special = '!@#$%^&*()-_+=<>,./;:[]{}?|';
  const digits = '0123456789';
  return password
    && password.length >= 6;
}
