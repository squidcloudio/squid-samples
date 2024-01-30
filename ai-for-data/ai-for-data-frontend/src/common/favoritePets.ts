export interface FavoritePets {
  favorite_pet: string;
  current_pet: string;
}

export interface AiResponse {
  author: string;
  answer: string;
  executedQuery?: string | '';
  explanation?: string | '';
}
