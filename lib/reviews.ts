"use server";

import { promises as fs } from 'fs';
import type { Review } from '@/lib/types';

export const getReviews = async () => {
    const file = await fs.readFile(process.cwd() + '/lib/reviews.json', 'utf8');
    const reviews: Review[] = JSON.parse(file);
    return reviews;
};
