export type BlindTest = {
  image: string;
  options: {
    label: string | number;
    value: string;
  }[];
};

export type SightTest = {
  letters: string;
  size: number; // in mm
  options: {
    label: string;
    value: string;
  }[];
};
