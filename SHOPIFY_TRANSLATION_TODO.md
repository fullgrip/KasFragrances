# Shopify Translation To-Do List

## Current Status
- **Code**: Complete - the website now requests Portuguese content from Shopify when users switch to PT
- **Content**: Partially complete - some Portuguese translations exist but are incomplete

---

## What's Already Done in Shopify

| Field | English | Portuguese | Status |
|-------|---------|------------|--------|
| Product titles | Yes | Yes | Done |
| Short descriptions | Yes | Yes (simplified) | Done |
| `long_descriptions` metafield | Yes | Yes | Done |

---

## To-Do: Missing Content in Shopify

### 1. Populate Scent Note Metafields (All Products)

These metafields are currently **NULL** for all products. They need to be created and translated.

**Location**: Shopify Admin > Products > [Product] > Metafields

| Metafield | Namespace | Key | Example Value (EN) |
|-----------|-----------|-----|-------------------|
| Top Notes | `custom` | `scent_notes_top` | `["Bergamot", "Lemon Zest", "Sea Salt"]` |
| Heart Notes | `custom` | `scent_notes_heart` | `["Marine Accord", "Jasmine", "Vetiver"]` |
| Base Notes | `custom` | `scent_notes_base` | `["Cedarwood", "Amber", "White Musk"]` |

**Format**: JSON array of strings

**Products to update**:
- [ ] Citrus Marine & Wood (amber-wood-unisex-fragrance)
- [ ] Tantalizing Tonka (rose-blossom-body-mist)
- [ ] Paradise (paradise)
- [ ] Secrets (secrets)
- [ ] Fig & Neroli (fig-neroli)
- [ ] Coffee, Vanilla & Tobacco (coffee-vanilla-tobacco)
- [ ] (Add all other perfume products)

### 2. Add Portuguese Translations for Scent Notes

After populating the EN metafields, add PT translations.

**Location**: Shopify Admin > Settings > Languages > Portuguese > Translate

| English | Portuguese |
|---------|------------|
| Bergamot | Bergamota |
| Lemon Zest | Raspa de Limão |
| Sea Salt | Sal Marinho |
| Marine Accord | Acorde Marinho |
| Jasmine | Jasmim |
| Vetiver | Vetiver |
| Cedarwood | Madeira de Cedro |
| Amber | Âmbar |
| White Musk | Almíscar Branco |
| Vanilla | Baunilha |
| Tonka Bean | Fava Tonka |
| Sandalwood | Sândalo |
| Pink Pepper | Pimenta Rosa |
| Oud | Oud |
| Saffron | Açafrão |
| Rose | Rosa |
| Iris | Íris |
| Neroli | Néroli |
| Fig | Figo |
| (Add more as needed) |

### 3. Populate Subtitle Metafield (Optional)

**Location**: Shopify Admin > Products > [Product] > Metafields

| Metafield | Namespace | Key |
|-----------|-----------|-----|
| Subtitle | `custom` | `subtitle` |

**Example**:
- EN: "A bright, coastal opening of sun-drenched citrus"
- PT: "Uma abertura costeira brilhante de citrinos banhados pelo sol"

### 4. Enrich Portuguese Descriptions (Alternative Approach)

If you prefer not to use metafields, add structured data to Portuguese descriptions:

**Current PT Description**:
> "Aromas frescos de citrinos e madeira, com um toque de mar ensolarado."

**Enhanced PT Description**:
> Aromas frescos de citrinos e madeira, com um toque de mar ensolarado.
>
> **Perfil olfativo**
> Família olfativa: Cítrico · Marinho · Amadeirado
> Humor: Fresco · Luminoso · Alegre
> Melhor usado: Dia · Tempo quente · Elegância descontraída
>
> **Notas olfativas**
> Topo: Limão, Bergamota, Néroli
> Coração: Flor de Laranjeira, Alperce, Acorde Marinho
> Base: Ambroxan, Madeiras Suaves, Almíscar Branco

---

## How to Add Translations in Shopify

### Method 1: Via Shopify Admin
1. Go to **Settings** > **Languages**
2. Click **Portuguese (Portugal)** > **Translate**
3. Navigate to **Products**
4. For each product, translate the fields

### Method 2: Via Shopify Translate & Adapt App
1. Install the free **Translate & Adapt** app
2. Select Portuguese
3. Use auto-translate or manual entry
4. Review and publish

### Method 3: Via CSV Export/Import
1. Export products as CSV
2. Add translated content
3. Re-import

---

## Priority Order

1. **High Priority**: Scent note metafields for all perfumes (most visible on product pages)
2. **Medium Priority**: Portuguese translations for scent notes
3. **Low Priority**: Subtitle metafield (nice to have)

---

## Pre-Check: Verify Shopify Markets Setup

Before adding translations, confirm that Shopify Markets is properly configured:

- [ ] Go to **Shopify Admin** > **Settings** > **Markets**
- [ ] Verify that **Portugal/Portuguese** market is enabled
- [ ] Go to **Settings** > **Languages**
- [ ] Confirm **Portuguese (Portugal)** is added as a language
- [ ] Check that translations can be accessed via the Translate feature

**Why this matters**: The website code now uses the `@inContext(language: XX)` directive in GraphQL queries. This only works if Shopify Markets/Languages is properly set up. If translations don't appear, this is the first thing to check.

---

## Verification

After making changes, test by:
1. Opening the website
2. Switching to Portuguese (PT button in header)
3. Navigating to a product page
4. Verifying title, description, and scent notes appear in Portuguese
