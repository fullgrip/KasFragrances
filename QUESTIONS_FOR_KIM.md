# Questions for Kim - KAS Fragrances Website

Hi Kim! Please review the following details currently on the website and confirm if they're correct or need changes.

---

## Shipping & Samples

### Free Samples
The website currently says: **"2 free samples with every order"**
- Is this still correct?
- How does the customer choose their samples? (at checkout? contact after order?)

### Free Shipping Threshold
The announcement bar says: **"Complimentary shipping over €150"**
- Is €150 still the correct threshold?
- Does this apply to Portugal only, or all destinations?

---

## Shipping Page Details

Currently displayed at `/shipping`:

### Portugal
- Free shipping on orders over €150
- Flat rate €4.90 for orders under €150
- Delivery in 2-4 business days

**Questions:**
- Are these rates and delivery times correct?

### EU Countries
- Flat rate €9.90
- Delivery in 5-10 business days

**Questions:**
- Is €9.90 flat rate correct for all EU countries?
- Is free shipping over €150 available for EU, or Portugal only?

### Rest of World
- Calculated at checkout
- Delivery in 10-15 business days

**Questions:**
- Do you ship worldwide, or only to specific countries?
- Any countries you don't ship to?

---

## Returns Policy

Currently displayed:
> "You may return **unopened products within 14 days** for a full refund."

**Questions:**
- Is 14 days correct?
- Only unopened products? What about defective/damaged items?
- Who pays return shipping costs?

---

## Contact Information

The website uses: **fragrancesbykas@gmail.com**
- Is this the correct email for customer inquiries?
- Is this the same email for returns?

---

## Other Quick Confirmations

1. **Response time**: Website says "We typically respond within 24-48 hours" - correct?
2. **Business name**: Is it "KAS Fragrances" or "Fragrances by KAS"?
3. **Social media**: Any Instagram/Facebook links to add?

---

Please reply with any corrections or confirmations. Thanks!

---

## Tutorial: Adding Scent Tags to Products in Shopify

We've added a new feature to show **short scent cues** on product cards (e.g., "Fresh · Marine · Woody"). This helps customers quickly understand each fragrance's character.

### What it looks like:
```
Citrus Marine & Wood
Fresh · Marine · Woody    ← These scent tags
€45.00
```

### How to add scent tags for each product:

**Step 1: Go to your product**
1. Log in to Shopify Admin
2. Go to **Products** → Click on **"Citrus Marine & Wood Eau de Parfum"**

**Step 2: Create the metafield (first time only)**
1. Scroll down to **Metafields** section
2. Click **"View all"** or **"Add metafield"**
3. If you don't see `scent_tags`, you need to create it:
   - Go to **Settings** → **Custom data** → **Products**
   - Click **Add definition**
   - Fill in:
     - **Name:** `Scent Tags`
     - **Namespace and key:** `custom.scent_tags`
     - **Type:** Select **"JSON"** → then choose **"List of single-line text"**
   - Click **Save**

**Step 3: Add scent tags to each product**
1. Go back to the product page
2. In the **Metafields** section, find **Scent Tags**
3. Add 3 short words that describe the fragrance character:

| Product | Suggested Scent Tags |
|---------|---------------------|
| Citrus Marine & Wood | Fresh, Marine, Woody |
| Rose & Amber | Floral, Warm, Romantic |
| Oud Velvet | Rich, Smoky, Opulent |

**Tips for choosing scent tags:**
- Use 3 words maximum
- Think: What would help a customer instantly "get" this scent?
- Good examples: Fresh, Warm, Floral, Woody, Spicy, Sweet, Citrus, Oriental, Powdery, Green, Aquatic, Smoky, Sensual, Cozy, Elegant

**Step 4: Save the product**

The website will automatically display the tags on product cards!
