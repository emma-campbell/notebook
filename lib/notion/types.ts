export type Category = 'macro' | 'micro' | 'rewind' | 'experiment';
export type Status = 'draft' | 'published';

export type Tag = {
    name: string;
    id: string;
}

export type Post = {
    id: string;
    title: string;
    slug: string;
    description: string;
    published?: Date | Date[];
    revised?: Date | Date[];
    category: Category;
    status: Status;
    tags?: Tag[];
    ogImage?: string
}