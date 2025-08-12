// Check your types/index.ts or similar file for something like:
export interface PageProps {
  params: {
    courseID: string;
    locale?: string;
    // other possible params
  };
  searchParams?: {
    [key: string]: string | string[] | undefined;
  };
}