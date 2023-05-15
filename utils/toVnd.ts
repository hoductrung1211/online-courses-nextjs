export default function toVnd(money: number | string): string {
    return money.toLocaleString() + 'vnđ';
}