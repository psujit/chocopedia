export type Chocolate = {
  brand: string
  currency: string
  id: string
  name: string
  nutrition: Nutrition
  prices: PriceDetails[]
};

export type PriceDetails = {
  amount: number
  link: string
  price: number
  shop: string
  unit: string
}

export type Nutrition = {
  carbohydrates: {
    total: number;
    sugar: number;
  }
  fat: {
    total: number;
    saturated: number;
  }
  protein: number
  salt: number
}

type ChocolateResponse = {
  data: Chocolate[];
};

export const fetchChocolateData = (url: string) =>
  fetch(url).then<ChocolateResponse>((r) => r.json());

export const editChocolate = (url: string, data: Chocolate) =>
  fetch(url, {method: 'POST', body: JSON.stringify(data)}).then<ChocolateResponse>((r) => r.json());
