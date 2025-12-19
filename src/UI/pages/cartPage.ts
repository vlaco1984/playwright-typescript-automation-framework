// Page Object Model for Cart UI
import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class CartPage extends BasePage {
  private cartItems: Locator;
  private checkoutButton: Locator;
  constructor(page: Page) {
    super(page);
    this.cartItems = this.page.locator('td.cart_product');
    this.checkoutButton = this.page.locator('button.checkout');
  }
  async goto() {
    await this.page.goto('/view_cart');
    await this.closeConsent();
  }

  async checkout() {
    await this.checkoutButton.click();
  }

  async hasVisibleItem(): Promise<boolean> {
    return this.cartItems.first().isVisible();
  }
}
