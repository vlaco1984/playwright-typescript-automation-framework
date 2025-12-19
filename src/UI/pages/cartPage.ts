// Page Object Model for Cart UI
import { Page, Locator } from '@playwright/test';
import { ConsentModal } from '../components/consentModal';

export class CartPage {
  private cartItems: Locator;
  private checkoutButton: Locator;
  public consentModal: ConsentModal;
  constructor(private page: Page) {
    this.cartItems = this.page.locator('td.cart_product');
    this.checkoutButton = this.page.locator('button.checkout');
    this.consentModal = new ConsentModal(this.page);
  }
  async goto() {
    await this.page.goto('/view_cart');
    await this.consentModal.close();
  }

  async checkout() {
    await this.checkoutButton.click();
  }

  async hasVisibleItem(): Promise<boolean> {
    return this.cartItems.first().isVisible();
  }
}
