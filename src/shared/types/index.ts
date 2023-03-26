export interface OptionType<T = string> {
  value?: T;
  label: string;
}

export type AnyEvent = MouseEvent | TouchEvent;
export type Maybe<T> = T | null;
export type ImagesMime = 'image/jpeg' | 'image/png';
export type DocumentsMime = 'application/pdf';
export type FilesMime = ImagesMime | DocumentsMime;

export type CustomProviderProps = {
  children: React.ReactNode;
};
