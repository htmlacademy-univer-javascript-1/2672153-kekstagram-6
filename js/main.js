import { createPosts } from './data.js';
import { renderPictures } from './miniatures.js';

const mockPosts = createPosts(25);

renderPictures(mockPosts);
