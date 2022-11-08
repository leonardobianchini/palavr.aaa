export class Word {
  id: number;
  value: string;
  classification: string;

  constructor(value: string, classification:string) {
    this.value = value;
    this.classification = classification;
  }
}