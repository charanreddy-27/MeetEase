import OpengraphImage, { alt, size, contentType } from './opengraph-image';

// `runtime` must be a string literal in *this* file for Next to detect edge.
export const runtime = 'edge';
export { alt, size, contentType };

export default OpengraphImage;
