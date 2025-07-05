import { headers } from "next/headers";

export async function getPathname() {
  try {
    const headersList = await headers();
    const referer = headersList.get('referer') || '';
    let pathname = '';
    
    if (referer) {
      try {
        const url = new URL(referer);
        pathname = url.pathname;
      } catch (error) {
        console.error('Invalid referer URL', error);
      }
    }
    return pathname;
  } catch (error) {
    console.error('Error getting pathname:', error);
    return '';
  }
}
