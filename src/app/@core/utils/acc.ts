export type AccType = 'default' | 'search';
export interface Acc {
  id: string;
  type: AccType;
  label: string;
  time: number;
}

export type PreAcc = Omit<Acc, 'type' | 'id'>;

export interface AccGroup {
  type: AccType;
  label: string;
  accs: Acc[];
}

export function generateAccs(type: AccType, items: PreAcc[]): Acc[] {
  return items.map(x => ({...x, type, id: type + x.label}));
}

export function preAcc(label: string, time: number): PreAcc {
  return { label, time };
}

export const preAccs: PreAcc[] = [
  preAcc('1m', 1),
  preAcc('3m', 3),
  preAcc('5m', 5),
  preAcc('10m', 10),
  preAcc('15m', 15),
  preAcc('30m', 30),
  preAcc('60m', 60),
  preAcc('3h', 60 * 3),
  preAcc('8h', 60 * 8),
  preAcc('15h', 60 * 15),
  preAcc('24h', 60 * 24),
  preAcc('3d', 60 * 24 * 3),
  preAcc('7d', 60 * 24 * 7),
  preAcc('15d', 60 * 24 * 15),
  preAcc('30d', 60 * 24 * 30),
];

export const types: AccType[] = [
  'default',
  'search'
];

export const typeLabels: Record<AccType, string> = {
  default: 'Default',
  search: 'Search'
};

export const accs: Acc[] = types.reduce<Acc[]>(
  (cur, x) => {
    cur.push(...generateAccs(x, preAccs));
    return cur;
  }, []);

export const group: AccGroup[] = types.map(x => (
  {type: x, label: typeLabels[x], accs: generateAccs(x, preAccs)}
));
