// Page Object Model for Products UI
import { Page, Locator } from '@playwright/test';
import { ConsentModal } from '../components/consentModal';

export class ProductsPage {
  private productCard: Locator;
  private addToCartButton: Locator;
  private outOfStockAddToCartButton: Locator;
  public consentModal: ConsentModal;

  constructor(private page: Page) {
    this.productCard = this.page.locator('.features_items .single-products');
    this.addToCartButton = this.page.locator('.features_items .single-products .add-to-cart');
    this.outOfStockAddToCartButton = this.page.locator(
      '.product-card.out-of-stock button.add-to-cart',
    );
    this.consentModal = new ConsentModal(this.page);
  }
  async goto() {
    await this.page.goto('/products');
    await this.consentModal.close();
  }
  async addFirstProductToCart() {
    const firstCard = this.productCard.first();
    await firstCard.scrollIntoViewIfNeeded();
    await firstCard.hover();
    await this.addToCartButton.first().click();
  }
  async addOutOfStockProductToCart() {
    await this.outOfStockAddToCartButton.click();
  }
}
