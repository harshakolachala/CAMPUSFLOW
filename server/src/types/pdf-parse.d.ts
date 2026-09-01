declare module 'pdf-parse' {
  interface PDFData { text: string; numpages: number; info: unknown }
  export default function pdfParse(buffer: Buffer): Promise<PDFData>;
}
