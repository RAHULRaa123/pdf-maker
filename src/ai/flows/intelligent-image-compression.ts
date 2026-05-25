'use server';

/**
 * @fileOverview A Genkit flow for intelligent image compression.
 *
 * - intelligentImageCompression - A function that compresses an image using AI to determine optimal settings.
 * - IntelligentImageCompressionInput - The input type for the intelligentImageCompression function.
 * - IntelligentImageCompressionOutput - The return type for the intelligentImageCompression function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// Helper to calculate file size from data URI (approximate)
function calculateFileSizeInKB(dataUri: string): number {
  if (!dataUri) return 0;
  const base64Content = dataUri.split(',')[1];
  if (!base64Content) return 0;
  // For every 4 base64 characters, there are approximately 3 bytes.
  // This is an approximation and might not be perfectly accurate due to padding.
  const bytes = (base64Content.length * 3) / 4;
  return bytes / 1024; // Convert to KB
}

const IntelligentImageCompressionInputSchema = z.object({
  imageDataUri: z
    .string()
    .describe(
      "The image to compress, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type IntelligentImageCompressionInput = z.infer<typeof IntelligentImageCompressionInputSchema>;

const IntelligentImageCompressionOutputSchema = z.object({
  compressedImageDataUri: z
    .string()
    .describe('The compressed image, as a data URI.'),
  originalFileSizeKB: z.number().describe('The original file size of the image in kilobytes.'),
  compressedFileSizeKB: z.number().describe('The compressed file size of the image in kilobytes.'),
  compressionRatio: z
    .number()
    .describe('The ratio of compressed file size to original file size (e.g., 0.5 for 50% reduction).'),
});
export type IntelligentImageCompressionOutput = z.infer<typeof IntelligentImageCompressionOutputSchema>;

export async function intelligentImageCompression(
  input: IntelligentImageCompressionInput
): Promise<IntelligentImageCompressionOutput> {
  return intelligentImageCompressionFlow(input);
}

const intelligentImageCompressionFlow = ai.defineFlow(
  {
    name: 'intelligentImageCompressionFlow',
    inputSchema: IntelligentImageCompressionInputSchema,
    outputSchema: IntelligentImageCompressionOutputSchema,
  },
  async (input) => {
    const originalFileSizeKB = calculateFileSizeInKB(input.imageDataUri);

    // Use a multimodal model (gemini-2.5-flash-image) to perform image compression.
    // The model is instructed to analyze and re-render the image in a compressed format.
    const { media } = await ai.generate({
      model: 'googleai/gemini-2.5-flash-image',
      prompt: [
        { text: 'Analyze this image and compress it significantly to reduce its file size, while ensuring there is no noticeable loss in visual quality. Output the compressed image directly in its original format if possible, or a highly optimized format like WebP or JPEG if it provides better compression. Do not add any text, just output the compressed image.' },
        { media: { url: input.imageDataUri } },
      ],
      config: {
        responseModalities: ['IMAGE'], // Expecting an image output from the model
      },
    });

    if (!media || !media.url) {
      throw new Error('Failed to compress image: No media output received from the AI model.');
    }

    const compressedImageDataUri = media.url;
    const compressedFileSizeKB = calculateFileSizeInKB(compressedImageDataUri);
    const compressionRatio = originalFileSizeKB > 0 ? compressedFileSizeKB / originalFileSizeKB : 0;

    return {
      compressedImageDataUri,
      originalFileSizeKB,
      compressedFileSizeKB,
      compressionRatio,
    };
  }
);
