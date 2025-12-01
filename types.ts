export enum Gender {
  Male = 'Homme',
  Female = 'Femme',
}

export enum Relation {
  Mahram = 'Mahram (Famille proche)',
  Ajnabi = 'Ajnabi (Étranger)',
  Spouse = 'Époux/Épouse',
  SameGender = 'Même genre (Musulman)',
  NonMuslim = 'Même genre (Non-musulman)',
}

export interface AwrahRule {
  target: string;
  description: string;
  allowed: string[];
  forbidden: string[];
  quote?: string;
}

export interface EyeType {
  title: string;
  arabic: string;
  definition: string;
  icon: 'eye' | 'shield' | 'flame';
  color: string;
}
