import { describe, expect, it } from "vitest";
import {
  addToBag,
  bagTotal,
  collections,
  filterProducts,
  isValidEmail,
  products,
} from "@/lib/collection";
import { bespokeServices, heroSlides, intelligenceReports, shopCategories } from "@/lib/editorial";

describe("Beliza Signature homepage data", () => {
  it("provides at least 6 hero campaign slides including Adire, Aso-Oke and Ankara", () => {
    expect(heroSlides.length).toBeGreaterThanOrEqual(6);
    const labels = heroSlides.map((slide) => slide.craftLabel.toLowerCase()).join(" ");
    expect(labels).toContain("adire");
    expect(labels).toContain("aso-oke");
    expect(labels).toContain("ankara");
  });

  it("defines all five shop categories with matching products in every category", () => {
    expect(shopCategories.map((c) => c.category)).toEqual([
      "Women",
      "Men",
      "Children",
      "Accessories",
      "African Heritage",
    ]);
    for (const item of shopCategories) {
      expect(filterProducts(products, { category: item.category }).length).toBeGreaterThanOrEqual(
        1,
      );
    }
  });

  it("defines four featured Nigerian collections, bespoke services and intelligence insights", () => {
    expect(collections).toHaveLength(4);
    expect(bespokeServices.length).toBeGreaterThanOrEqual(4);
    expect(intelligenceReports.length).toBeGreaterThanOrEqual(4);
  });

  it("filters products by category, collection and textile query", () => {
    expect(filterProducts(products, { collectionId: "odo-indigo" })).toHaveLength(2);
    expect(filterProducts(products, { category: "African Heritage" })).toHaveLength(3);
    expect(filterProducts(products, { query: "ankara" })).toHaveLength(1);
    expect(filterProducts(products, { query: "aso-oke" }).length).toBeGreaterThanOrEqual(3);
  });

  it("validates newsletter emails", () => {
    expect(isValidEmail("collector@belizasignature.com")).toBe(true);
    expect(isValidEmail("invalid-email")).toBe(false);
  });
});

describe("shopping bag", () => {
  it("combines the same item and size without combining different sizes", () => {
    const first = addToBag([], "imole-sculpted-blouse", "M");
    const second = addToBag(first, "imole-sculpted-blouse", "M");
    expect(second).toEqual([{ productId: "imole-sculpted-blouse", size: "M", quantity: 2 }]);
    expect(addToBag(second, "imole-sculpted-blouse", "L")).toHaveLength(2);
    expect(first[0]?.quantity).toBe(1);
  });

  it("calculates the total for the displayed collection pieces", () => {
    expect(bagTotal([{ productId: "imole-sculpted-blouse", size: "M", quantity: 2 }])).toBe(165000);
    expect(
      bagTotal([
        { productId: "odo-indigo-agbada", size: "L", quantity: 1 },
        { productId: "children-adire-set", size: "6Y", quantity: 1 },
      ]),
    ).toBe(249000);
    expect(bagTotal([])).toBe(0);
  });
});
