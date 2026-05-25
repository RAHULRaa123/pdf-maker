'use server';
/**
 * @fileOverview An AI agent for intelligent PDF compression.
 *
 * - compressPdfIntelligently - A function that analyzes PDF content and recommends optimal compression settings.
 * - IntelligentPdfCompressionInput - The input type for the compressPdfIntelligently function.
 * - IntelligentPdfCompressionOutput - The return type for the compressPdfIntelligently function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// Define the input schema
const IntelligentPdfCompressionInputSchema = z.object({
  pdfDataUri: z
    .string()
    .describe(
      "The PDF document as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:application/pdf;base64,<encoded_data>'."
    ),
  contentDescription: z
    .string()
    .optional()
    .describe(
      'An optional textual description or extracted text from the PDF to help the AI understand its content and characteristics (e.g., "This PDF contains high-resolution architectural drawings with many lines and text, but few photos.", or the OCR text of the first few pages).'
    ),
});
export type IntelligentPdfCompressionInput = z.infer<typeof IntelligentPdfCompressionInputSchema>;

// Define the output schema for recommended compression settings
const IntelligentPdfCompressionSettingsSchema = z.object({
  imageQuality: z
    .number()
    .min(0)
    .max(100)
    .describe(
      'Recommended JPEG compression quality for images within the PDF, from 0 (lowest quality, highest compression) to 100 (highest quality, lowest compression). Set to -1 if no image recompression is recommended.'
    ),
  downsampleImages: z
    .boolean()
    .describe('Whether to recommend downsampling images to a lower resolution.'),
  downsampleResolution: z
    .number()
    .min(72)
    .max(300)
    .optional()
    .describe(
      'If downsampling, the target resolution (DPI) for images. Only applicable if `downsampleImages` is true.'
    ),
  compressText: z
    .boolean()
    .describe('Whether to recommend text compression and font subsetting.'),
  removeMetadata: z
    .boolean()
    .describe('Whether to recommend removing document metadata (e.g., author, creation date) for further size reduction.'),
  optimizeForWeb: z
    .boolean()
    .describe('Whether to optimize the PDF for fast web viewing (linearization).'),
  colorDepthReduction: z
    .boolean()
    .describe('Whether to recommend reducing the color depth of images (e.g., converting 24-bit color to 8-bit paletted).')
});

const IntelligentPdfCompressionOutputSchema = z.object({
  recommendedCompressionSettings: IntelligentPdfCompressionSettingsSchema.describe(
    'Optimal compression settings recommended by the AI based on the PDF content analysis.'
  ),
  rationale: z
    .string()
    .describe('An explanation from the AI about why these specific settings are recommended.'),
});
export type IntelligentPdfCompressionOutput = z.infer<typeof IntelligentPdfCompressionOutputSchema>;

export async function compressPdfIntelligently(
  input: IntelligentPdfCompressionInput
): Promise<IntelligentPdfCompressionOutput> {
  return intelligentPdfCompressionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'intelligentPdfCompressionPrompt',
  input: { schema: IntelligentPdfCompressionInputSchema },
  output: { schema: IntelligentPdfCompressionOutputSchema },
  prompt: `You are an expert AI assistant specialized in PDF document optimization and compression.
Your goal is to analyze the characteristics of a PDF document and recommend optimal compression settings to significantly reduce its file size while preserving readability and document integrity.

Consider the following information about the PDF:

{{#if contentDescription}}
Content Description/Extracted Text: {{{contentDescription}}}
{{else}}
The user has provided a PDF but no specific content description. Assume it's a general document.
{{/if}}

Based on this information, provide a JSON object with your recommended compression settings and a rationale.

Guidelines for recommendations:
- High-resolution images or many images usually benefit from JPEG quality reduction and downsampling.
- Documents with a lot of text and many fonts can benefit from text compression and font subsetting.
- For general purpose documents, removing metadata is often safe.
- If the document is intended for web viewing, recommend optimization for web.
- Consider color depth reduction for images if quality impact is minimal.
- Aim for a good balance between file size reduction and visual quality.

The PDF itself: {{media url=pdfDataUri}}
`,
});

const intelligentPdfCompressionFlow = ai.defineFlow(
  {
    name: 'intelligentPdfCompressionFlow',
    inputSchema: IntelligentPdfCompressionInputSchema,
    outputSchema: IntelligentPdfCompressionOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
