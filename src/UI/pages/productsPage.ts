// Page Object Model for Products UI
import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class ProductsPage extends BasePage {
  private productCard: Locator;
  private addToCartButton: Locator;
  private outOfStockAddToCartButton: Locator;
  constructor(page: Page) {
    super(page);
    this.productCard = this.page.locator('.features_items .single-products');
    this.addToCartButton = this.page.locator('.features_items .single-products .add-to-cart');
    this.outOfStockAddToCartButton = this.page.locator(
      '.product-card.out-of-stock button.add-to-cart',
    );
  }
  async goto() {
    await this.page.goto('/products');
    await this.closeConsent();
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
