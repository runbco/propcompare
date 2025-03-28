import axios from 'axios';
import * as cheerio from 'cheerio';

// Crawl a property listing webpage and extract relevant data
export async function crawlListingData(url: string): Promise<{ [key: string]: { [key: string]: string } }> {
  try {
    // Fetch the webpage content
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    const $ = cheerio.load(response.data);

    // Initialize the object to store crawled data
    const crawledData: { [key: string]: { [key: string]: string } } = {
      "Property General Information": {},
      "Property Financial Information": {},
      "Unit/House Information": {},
    };

    // Extract address
    const address = $('h1.property-info-address').text().trim() || $('h1[data-testid="address"]').text().trim();
    if (address) {
      crawledData["Property General Information"]["Address"] = address;
    }

    // Extract price
    const priceText = $('span[data-testid="price"]').text().trim() || $('.property-price').text().trim();
    if (priceText) {
      const price = priceText.replace(/[^0-9]/g, '');
      crawledData["Property Financial Information"]["Price"] = price;
      crawledData["Property Financial Information"]["Asking Price/Guide"] = price;
    }

    // Extract property details
    $('.property-features__feature, .property-feature').each((_: number, element: any) => {
      const label = $(element).find('.property-features__feature-label, .property-feature-label').text().trim();
      const value = $(element).find('.property-features__feature-value, .property-feature-text').text().trim();

      // Map extracted data to our data structure
      switch (label.toLowerCase()) {
        case 'bedrooms':
        case 'beds':
          crawledData["Unit/House Information"]["No Of Bedrooms"] = value;
          break;
        case 'bathrooms':
        case 'baths':
          crawledData["Unit/House Information"]["No Of Bathrooms"] = value;
          break;
        case 'parking':
        case 'cars':
          crawledData["Unit/House Information"]["Has Garage"] = value !== '0' ? 'Y' : 'N';
          break;
        // Add more cases as needed
      }
    });

    // If no data was extracted, throw an error
    if (Object.keys(crawledData["Property General Information"]).length === 0 &&
        Object.keys(crawledData["Property Financial Information"]).length === 0 &&
        Object.keys(crawledData["Unit/House Information"]).length === 0) {
      throw new Error("No data could be extracted from the provided URL.");
    }

    return crawledData;
  } catch (error) {
    console.error('Error crawling listing data:', error);
    throw error;
  }
}
