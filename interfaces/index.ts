export interface CardProps {
    name: string,
    price: number,
    location: string
}

export interface ButtonProps {
    text: string,
}

interface Address {
    state: string,
    city: string,
    country: string,
}

interface Offer {
    bed: string,
    shower: string,
    occupants: string
}

export interface PropertyProps {
    name: string,
    address: Address,
    rating: number,
    category: string[],
    price: number,
    offers: Offer,
    image: string,
    discount: string,
    description:string
}

export interface Review {
    avatar: string;
    name: string;
    rating: string;
    comment: string;
}
