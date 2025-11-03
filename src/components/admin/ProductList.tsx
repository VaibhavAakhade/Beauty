import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { Product } from "@/types/product";

// Local UI type extends Product to include discountedPrice
type UIProduct = Product & {
  discountedPrice?: number;
};

interface ProductListProps {
  onEdit: (product: Product) => void;
}

export default function ProductList({ onEdit }: ProductListProps) {
  const [products, setProducts] = useState<UIProduct[]>([]);
  const [filtered, setFiltered] = useState<UIProduct[]>([]);
  const [includeRegular, setIncludeRegular] = useState(true);
  const [includeFestival, setIncludeFestival] = useState(true);

  // Filters
  const [searchName, setSearchName] = useState("");
  const [searchSKU, setSearchSKU] = useState("");
  const [category, setCategory] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [stockCondition, setStockCondition] = useState("");
  const [stockValue, setStockValue] = useState("");
  const [tag, setTag] = useState("");

  // 🧾 Regular Discount States
const [discountMode, setDiscountMode] = useState<"none" | "all" | "custom" | "category" | "tag">("none");
const [discountType, setDiscountType] = useState<"%" | "₹">("%");
const [discountValue, setDiscountValue] = useState("");
const [selectedCategory, setSelectedCategory] = useState("");
const [selectedTag, setSelectedTag] = useState("");
const [customChecked, setCustomChecked] = useState<{ [id: number]: boolean }>({});
const [activeDiscount, setActiveDiscount] = useState(false);
// 🟢 Track applied regular discounts (renamed from appliedDiscounts)
const [regularAppliedDiscounts, setRegularAppliedDiscounts] = useState<{
  all: boolean;
  categories: Record<string, boolean>;
  tags: Record<string, boolean>;
}>({
  all: false,
  categories: {},
  tags: {},
});

// 🟢 Track global active discount details
const [activeRegularDetails, setActiveRegularDetails] = useState<{
  value: string;
  type: string;
  mode: string;
}>({
  value: "",
  type: "%",
  mode: "",
});



// 🟢 Store actual category-wise discount details
const [categoryDiscountDetails, setCategoryDiscountDetails] = useState<
  Record<string, { value: string; type: string }>
>({});

// 🟢 Store actual tag-wise discount details
const [tagDiscountDetails, setTagDiscountDetails] = useState<
  Record<string, { value: string; type: string }>
>({});

  

    // 🎉 Festival Discount States
  const [festivalDiscountMode, setFestivalDiscountMode] = useState("none"); // all | custom | category | tag | none
  const [festivalDiscountValue, setFestivalDiscountValue] = useState<string>("");
  const [festivalDiscountType, setFestivalDiscountType] = useState<string>("%");
  const [festivalSelectedCategory, setFestivalSelectedCategory] = useState("");
  const [festivalSelectedTag, setFestivalSelectedTag] = useState("");
  const [festivalActiveDiscount, setFestivalActiveDiscount] = useState(false);
  const [festivalRowValues, setFestivalRowValues] = useState<{ [key: number]: string }>({});
  const [festivalRowTypes, setFestivalRowTypes] = useState<{ [key: number]: string }>({});
  const [festivalRowActive, setFestivalRowActive] = useState<{ [key: number]: boolean }>({});
  const [festivalFromDate, setFestivalFromDate] = useState("");
  const [festivalToDate, setFestivalToDate] = useState("");
  const [showRegularDiscount, setShowRegularDiscount] = useState(true);
  const [showFestivalDiscount, setShowFestivalDiscount] = useState(true);
  // Track applied discounts by category/tag
  const [appliedDiscounts, setAppliedDiscounts] = useState<{
    categories: Record<string, boolean>;
    tags: Record<string, boolean>;
  }>({ categories: {}, tags: {} });

    // Track applied Festival Discounts by mode
  const [appliedFestivalDiscounts, setAppliedFestivalDiscounts] = useState<{
    all?: { value: number; type: string };
    categories: Record<string, { value: number; type: string }>;
    tags: Record<string, { value: number; type: string }>;
  }>({
    categories: {},
    tags: {},
  });

  // Row-wise custom discount input
  const [rowDiscountValues, setRowDiscountValues] = useState<{ [key: number]: string }>({});
  const [rowDiscountTypes, setRowDiscountTypes] = useState<{ [key: number]: string }>({});
  const [rowActiveDiscounts, setRowActiveDiscounts] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    fetch("http://localhost:8085/api/products")
      .then((res) => res.json())
      .then((data) => {
        const normalized: UIProduct[] = data.map((p: any) => ({
          id: p.id,
          product_name: p.product_name, // keep original fields if Product expects them
          productName: p.product_name || p.name || p.productName,
          name: p.name,
          sku: p.sku,
          category: p.category,
          price: Number(p.price),
          stock: p.total_units || p.totalUnits || p.stock || p.stock_quantity,
          total_units: p.total_units,
          totalUnits: p.totalUnits,
          tag: p.tag || p.product_tag || "",
          // discountedPrice undefined by default
        })) as UIProduct[];
        setProducts(normalized);
        setFiltered(normalized);
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  // Apply filters
  useEffect(() => {
    let result = [...products];
    if (searchName)
      result = result.filter((p) =>
        String(p.productName ||"").toLowerCase().includes(searchName.toLowerCase())
      );
    if (searchSKU)
      result = result.filter((p) =>
        String(p.sku || "").toLowerCase().includes(searchSKU.toLowerCase())
      );
    if (category) result = result.filter((p) => p.category === category);
    if (tag) result = result.filter((p) => p.tag === tag);

    if (priceRange) {
      result = result.filter((p) => {
        const price = Number(p.price || 0);
        switch (priceRange) {
          case "0-499":
            return price <= 499;
          case "500-999":
            return price >= 500 && price <= 999;
          case "1000-1999":
            return price >= 1000 && price <= 1999;
          case "2000-4999":
            return price >= 2000 && price <= 4999;
          case "5000+":
            return price >= 5000;
          default:
            return true;
        }
      });
    }

    if (stockCondition && stockValue) {
      const value = Number(stockValue);
      result = result.filter((p) => {
        const stock = Number(p.totalUnits || 0);
        switch (stockCondition) {
          case "<":
            return stock < value;
          case ">":
            return stock > value;
          case "=":
            return stock === value;
          default:
            return true;
        }
      });
    }

    setFiltered(result);
  }, [searchName, searchSKU, category, tag, priceRange, stockCondition, stockValue, products]);

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this product?")) {
      fetch(`http://localhost:8085/api/products/${id}`, { method: "DELETE" })
        .then(() => setProducts(products.filter((p) => p.id !== id)));
    }
  };

  const categories = [...new Set(products.map((p) => p.category).filter(Boolean))];
  const tags = [...new Set(products.map((p) => p.tag).filter(Boolean))];

  // 🧮 Apply discount (global/category/tag)
const applyDiscount = () => {
  if (!discountValue) return alert("Please enter discount value");
  const val = Number(discountValue);

  const updated = filtered.map((p) => {
    let eligible = false;
    if (discountMode === "all") eligible = true;
    else if (discountMode === "category" && p.category === selectedCategory)
      eligible = true;
    else if (discountMode === "tag" && p.tag === selectedTag)
      eligible = true;

    if (eligible) {
      const discountAmount =
        discountType === "%" ? (Number(p.price || 0) * val) / 100 : val;
      const finalPrice = Math.max(0, Number(p.price || 0) - discountAmount);
      return { ...p, discountedPrice: finalPrice };
    }
    return p;
  });

  setFiltered(updated);
  setActiveDiscount(true);

  // 🧩 Update discount detail storage
  if (discountMode === "category" && selectedCategory) {
    setAppliedDiscounts((prev) => ({
      ...prev,
      categories: { ...prev.categories, [selectedCategory]: true },
    }));
    setCategoryDiscountDetails((prev) => ({
      ...prev,
      [selectedCategory]: { value: discountValue, type: discountType },
    }));
  } else if (discountMode === "tag" && selectedTag) {
    setAppliedDiscounts((prev) => ({
      ...prev,
      tags: { ...prev.tags, [selectedTag]: true },
    }));
    setTagDiscountDetails((prev) => ({
      ...prev,
      [selectedTag]: { value: discountValue, type: discountType },
    }));
  } else if (discountMode === "all") {
    setAppliedDiscounts((prev) => ({ ...prev, all: true }));
    setActiveRegularDetails({
      value: discountValue,
      type: discountType,
      mode: "all",
    });
  }
};

const removeDiscount = () => {
  if (discountMode === "all") {
    // 🟢 Remove discount from all products
    const reset = filtered.map((p) => {
      const { discountedPrice, ...rest } = p;
      return rest as UIProduct;
    });
    setFiltered(reset);

    // 🧩 Update discount state
    setAppliedDiscounts({ categories: {}, tags: {}, all: false });
    setRegularAppliedDiscounts({ all: false, categories: {}, tags: {} });
    setActiveRegularDetails({ value: "", type: "%", mode: "" });

    setActiveDiscount(false);
    setDiscountValue("");
  }

  else if (discountMode === "category" && selectedCategory) {
    // 🟠 Remove only products in this category
    const reset = filtered.map((p) => {
      if (p.category === selectedCategory) {
        const { discountedPrice, ...rest } = p;
        return rest as UIProduct;
      }
      return p;
    });
    setFiltered(reset);

    // 🧩 Update UI button state
    setAppliedDiscounts((prev) => ({
      ...prev,
      categories: { ...prev.categories, [selectedCategory]: false },
    }));
    setRegularAppliedDiscounts((prev) => ({
      ...prev,
      categories: { ...prev.categories, [selectedCategory]: false },
    }));

    setCategoryDiscountDetails((prev) => {
      const clone = { ...prev };
      delete clone[selectedCategory];
      return clone;
    });

    setDiscountValue("");
  }

  else if (discountMode === "tag" && selectedTag) {
    // 🟣 Remove only products with this tag
    const reset = filtered.map((p) => {
      if (p.tag === selectedTag) {
        const { discountedPrice, ...rest } = p;
        return rest as UIProduct;
      }
      return p;
    });
    setFiltered(reset);

    // 🧩 Update UI button state
    setAppliedDiscounts((prev) => ({
      ...prev,
      tags: { ...prev.tags, [selectedTag]: false },
    }));
    setRegularAppliedDiscounts((prev) => ({
      ...prev,
      tags: { ...prev.tags, [selectedTag]: false },
    }));

    setTagDiscountDetails((prev) => {
      const clone = { ...prev };
      delete clone[selectedTag];
      return clone;
    });

    setDiscountValue("");
  }
};


  // 🧩 Row-wise discount apply
  const applyRowDiscount = (p: UIProduct) => {
    const val = Number(rowDiscountValues[p.id] || 0);
    const type = rowDiscountTypes[p.id] || "%";
    if (!val) return alert("Enter discount value first");

    const discountAmount = type === "%" ? (Number(p.price || 0) * val) / 100 : val;
    const finalPrice = Math.max(0, Number(p.price || 0) - discountAmount);

    const updated = filtered.map((item) =>
      item.id === p.id ? { ...item, discountedPrice: finalPrice } : item
    );
    setFiltered(updated);
    setRowActiveDiscounts({ ...rowActiveDiscounts, [p.id]: true });
  };

  const removeRowDiscount = (p: UIProduct) => {
    const updated = filtered.map((item) => {
      if (item.id === p.id) {
        const { discountedPrice, ...rest } = item;
        return rest as UIProduct;
      }
      return item;
    });
    setFiltered(updated);
    setRowActiveDiscounts({ ...rowActiveDiscounts, [p.id]: false });
  };
  // 🎉 Apply Festival Discount
const applyFestivalDiscount = () => {
  if (!showFestivalDiscount) return; // ⛔ don’t apply if checkbox off
  if (!festivalDiscountValue) return alert("Please enter discount value");

  const val = Number(festivalDiscountValue);
  let appliedCategory = "";
  let appliedTag = "";

  const updated = filtered.map((p) => {
    let eligible = false;

    if (festivalDiscountMode === "all") {
      eligible = true;
    } else if (festivalDiscountMode === "category" && p.category === festivalSelectedCategory) {
      eligible = true;
      appliedCategory = festivalSelectedCategory;
    } else if (festivalDiscountMode === "tag" && p.tag === festivalSelectedTag) {
      eligible = true;
      appliedTag = festivalSelectedTag;
    }

    if (eligible) {
      const discounted =
        festivalDiscountType === "%"
          ? p.price - (p.price * val) / 100
          : p.price - val;

      return { ...p, festivaldiscountPrice: Math.max(0, discounted) };
    }

    return p;
  });

  // ✅ Update applied discount state
  setFiltered(updated);
  setFestivalActiveDiscount(true);

  setAppliedFestivalDiscounts((prev) => ({
    ...prev,
    all: festivalDiscountMode === "all" ? { value: val, type: festivalDiscountType } : prev.all,
    categories:
      festivalDiscountMode === "category"
        ? { ...prev.categories, [appliedCategory]: { value: val, type: festivalDiscountType } }
        : prev.categories,
    tags:
      festivalDiscountMode === "tag"
        ? { ...prev.tags, [appliedTag]: { value: val, type: festivalDiscountType } }
        : prev.tags,
  }));
};


// ❌ Remove Festival Discount (category or tag specific)
const removeFestivalDiscount = () => {
  if (!showFestivalDiscount) return; // don’t remove if checkbox off

  const reset = filtered.map((p) => {
    let shouldRemove = false;

    if (festivalDiscountMode === "all") shouldRemove = true;
    else if (festivalDiscountMode === "category" && p.category === festivalSelectedCategory)
      shouldRemove = true;
    else if (festivalDiscountMode === "tag" && p.tag === festivalSelectedTag)
      shouldRemove = true;

    if (shouldRemove) {
      const { festivaldiscountPrice, ...rest } = p;
      return rest as UIProduct;
    }

    return p;
  });

  // ✅ Update UI & state cleanup
  setFiltered(reset);
  setFestivalActiveDiscount(false);

  setAppliedFestivalDiscounts((prev) => {
    const updated = { ...prev };

    if (festivalDiscountMode === "all") updated.all = undefined;
    else if (festivalDiscountMode === "category" && festivalSelectedCategory)
      delete updated.categories[festivalSelectedCategory];
    else if (festivalDiscountMode === "tag" && festivalSelectedTag)
      delete updated.tags[festivalSelectedTag];

    return updated;
  });
};


// 🎯 Row-wise Festival Discount
const applyFestivalRowDiscount = (p: UIProduct) => {
  // ✅ Skip applying if checkbox not ticked
  if (!showFestivalDiscount) return;

  const val = Number(festivalRowValues[p.id] || 0);
  const type = festivalRowTypes[p.id] || "%";

  if (!val) return alert("Enter festival discount value");

  const discounted =
    type === "%" ? p.price - (p.price * val) / 100 : p.price - val;

  const updated = filtered.map((item) =>
    item.id === p.id
      ? { ...item, festivaldiscountPrice: Math.max(0, discounted) }
      : item
  );

  setFiltered(updated);
  setFestivalRowActive({ ...festivalRowActive, [p.id]: true });
};


const removeFestivalRowDiscount = (p: UIProduct) => {
  // ✅ Skip removing if checkbox not ticked
  if (!showFestivalDiscount) return;

  const updated = filtered.map((item) => {
    if (item.id === p.id) {
      const { festivaldiscountPrice, ...rest } = item;
      return rest as UIProduct;
    }
    return item;
  });

  setFiltered(updated);
  setFestivalRowActive({ ...festivalRowActive, [p.id]: false });
};


// 🧩 Toggle checkbox-based Festival Discount (row-wise fallback)
const handleToggleFestivalDiscountRow = (id: number) => {
  if (!showFestivalDiscount) return; // ✅ Ignore if checkbox unchecked

  const isActive = festivalRowActive[id];

  if (isActive) {
    // 🟥 Remove discount
    setFestivalRowActive((prev) => ({ ...prev, [id]: false }));
    setProducts((prev) =>
      prev.map((prod) =>
        prod.id === id
          ? { ...prod, festivaldiscountPrice: undefined }
          : prod
      )
    );
  } else {
    const value = parseFloat(festivalRowValues[id] || "0");
    const type = festivalRowTypes[id] || "%";

    if (!value || value <= 0) {
      alert("⚠️ Please enter a valid discount value before applying.");
      return;
    }

    // 🟢 Apply discount
    setFestivalRowActive((prev) => ({ ...prev, [id]: true }));
    setProducts((prev) =>
      prev.map((prod) => {
        if (prod.id === id) {
          const basePrice = Number(prod.price);
          const newPrice =
            type === "%"
              ? basePrice - (basePrice * value) / 100
              : basePrice - value;

          return {
            ...prod,
            festivaldiscountPrice: newPrice > 0 ? newPrice : 0,
          };
        }
        return prod;
      })
    );
  }
};


  return (
    <div className="mt-4">
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left border">Sr No</th>

              <th className="p-3 text-left border">
                Name
                <input
                  type="text"
                  placeholder="Filter"
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                  className="mt-1 w-full border rounded p-1 text-sm"
                />
              </th>

              <th className="p-3 text-left border">
                SKU
                <input
                  type="text"
                  placeholder="Filter"
                  value={searchSKU}
                  onChange={(e) => setSearchSKU(e.target.value)}
                  className="mt-1 w-full border rounded p-1 text-sm"
                />
              </th>

              <th className="p-3 text-left border">
                Category
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="mt-1 w-full border rounded p-1 text-sm"
                >
                  <option value="">All</option>
                  {categories.map((c, i) => (
                    <option key={i} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </th>

              <th className="p-3 text-left border">
                Tag
                <select
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  className="mt-1 w-full border rounded p-1 text-sm"
                >
                  <option value="">All</option>
                  {tags.map((t, i) => (
                    <option key={i} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </th>

              <th className="p-3 text-left border">
                Stock
                <div className="flex mt-1 gap-1">
                  <select
                    value={stockCondition}
                    onChange={(e) => setStockCondition(e.target.value)}
                    className="border rounded p-1 text-sm w-1/2"
                  >
                    <option value="">All</option>
                    <option value="<">{"<"}</option>
                    <option value=">">{">"}</option>
                    <option value="=">=</option>
                  </select>
                  <input
                    type="number"
                    placeholder="Value"
                    value={stockValue}
                    onChange={(e) => setStockValue(e.target.value)}
                    className="border rounded p-1 text-sm w-1/2"
                  />
                </div>
              </th>

              <th className="p-3 text-left border">
                Price
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="mt-1 w-full border rounded p-1 text-sm"
                >
                  <option value="">All</option>
                  <option value="0-499">₹0 - ₹499</option>
                  <option value="500-999">₹500 - ₹999</option>
                  <option value="1000-1999">₹1000 - ₹1999</option>
                  <option value="2000-4999">₹2000 - ₹4999</option>
                  <option value="5000+">₹5000+</option>
                </select>
              </th>

              {/* Regular Discount Header */}
                <th className="p-3 text-left border align-top">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={showRegularDiscount}
                      onChange={(e) => setShowRegularDiscount(e.target.checked)}
                    />
                    <span>Regular Discount</span>
                  </label>

                  <fieldset
                    disabled={!showRegularDiscount}
                    className={`mt-1 space-y-1 transition-opacity duration-200 ${
                      !showRegularDiscount ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    <select
                      value={discountMode}
                      onChange={(e) => setDiscountMode(e.target.value)}
                      className="border rounded p-1 w-full text-sm"
                    >
                      <option value="none">None</option>
                      <option value="all">All</option>
                      <option value="custom">Custom</option>
                      <option value="category">By Category</option>
                      <option value="tag">By Tag</option>
                    </select>

                    {(discountMode === "category" || discountMode === "tag") && (
                      <select
                        value={discountMode === "category" ? selectedCategory : selectedTag}
                        onChange={(e) =>
                          discountMode === "category"
                            ? setSelectedCategory(e.target.value)
                            : setSelectedTag(e.target.value)
                        }
                        className="border rounded p-1 w-full text-sm"
                      >
                        <option value="">Select</option>
                        {(discountMode === "category" ? categories : tags).map((v, i) => (
                          <option key={i} value={v}>
                            {v}
                          </option>
                        ))}
                      </select>
                    )}

                    {discountMode !== "custom" && (
                      <>
                        <div className="flex gap-1">
                          <input
                            type="number"
                            placeholder="Value"
                            value={discountValue}
                            onChange={(e) => setDiscountValue(e.target.value)}
                            className="border rounded p-1 w-2/3 text-sm"
                          />
                          <select
                            value={discountType}
                            onChange={(e) => setDiscountType(e.target.value)}
                            className="border rounded p-1 w-1/3 text-sm"
                          >
                            <option value="%">%</option>
                            <option value="₹">₹</option>
                          </select>
                        </div>

                        {(() => {
                          let alreadyApplied = false;
                          let appliedInfo: { value: string; type: string } | undefined;

                          if (discountMode === "all" && appliedDiscounts.all) {
                            alreadyApplied = true;
                            appliedInfo = activeRegularDetails;
                          } else if (
                            discountMode === "category" &&
                            selectedCategory &&
                            appliedDiscounts.categories[selectedCategory]
                          ) {
                            alreadyApplied = true;
                            appliedInfo = categoryDiscountDetails[selectedCategory];
                          } else if (
                            discountMode === "tag" &&
                            selectedTag &&
                            appliedDiscounts.tags[selectedTag]
                          ) {
                            alreadyApplied = true;
                            appliedInfo = tagDiscountDetails[selectedTag];
                          }

                          return (
                            <div className="flex flex-col items-center">
                              {alreadyApplied ? (
                                <>
                                  <Button
                                    onClick={removeDiscount}
                                    variant="destructive"
                                    className="w-full bg-red-600 hover:bg-red-700"
                                    size="sm"
                                  >
                                    Remove Discount
                                  </Button>
                                  {appliedInfo && (
                                    <div className="text-xs text-gray-600 mt-1 text-center">
                                      🟢 Discount Applied:&nbsp;
                                      {appliedInfo.value}
                                      {appliedInfo.type}
                                    </div>
                                  )}
                                </>
                              ) : (
                                <Button
                                  onClick={applyDiscount}
                                  className="w-full bg-green-600 hover:bg-green-700"
                                  size="sm"
                                  disabled={
                                    (discountMode === "category" && !selectedCategory) ||
                                    (discountMode === "tag" && !selectedTag)
                                  }
                                >
                                  Apply Discount
                                </Button>
                              )}
                            </div>
                          );
                        })()}
                      </>
                    )}
                  </fieldset>
                </th>
                 {/* Festival Discount Header */}
            <th className="p-3 text-left border bg-orange-50 align-top">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={showFestivalDiscount}
                  onChange={(e) => setShowFestivalDiscount(e.target.checked)}
                />
                <span>Festival Discount</span>
              </label>

              <fieldset
                disabled={!showFestivalDiscount}
                className={`mt-1 space-y-1 transition-opacity duration-200 ${
                  !showFestivalDiscount ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <select
                  value={festivalDiscountMode}
                  onChange={(e) => setFestivalDiscountMode(e.target.value)}
                  className="border rounded p-1 w-full text-sm"
                >
                  <option value="none">None</option>
                  <option value="all">All</option>
                  <option value="custom">Custom</option>
                  <option value="category">By Category</option>
                  <option value="tag">By Tag</option>
                </select>

                {(festivalDiscountMode === "category" || festivalDiscountMode === "tag") && (
                  <select
                    value={
                      festivalDiscountMode === "category"
                        ? festivalSelectedCategory
                        : festivalSelectedTag
                    }
                    onChange={(e) =>
                      festivalDiscountMode === "category"
                        ? setFestivalSelectedCategory(e.target.value)
                        : setFestivalSelectedTag(e.target.value)
                    }
                    className="border rounded p-1 w-full text-sm"
                  >
                    <option value="">Select</option>
                    {(festivalDiscountMode === "category" ? categories : tags).map((v, i) => (
                      <option key={i} value={v}>
                        {v}
                      </option>
                    ))}
                  </select>
                )}

                <div className="flex flex-col gap-1">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">From</label>
                    <input
                      type="date"
                      value={festivalFromDate}
                      onChange={(e) => setFestivalFromDate(e.target.value)}
                      className="border rounded p-1 w-full text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">To</label>
                    <input
                      type="date"
                      value={festivalToDate}
                      onChange={(e) => setFestivalToDate(e.target.value)}
                      className="border rounded p-1 w-full text-sm"
                    />
                  </div>
                </div>

                {festivalDiscountMode !== "custom" && (
                  <>
                    <div className="flex gap-1">
                      <input
                        type="number"
                        placeholder="Value"
                        value={festivalDiscountValue}
                        onChange={(e) => setFestivalDiscountValue(e.target.value)}
                        className="border rounded p-1 w-2/3 text-sm"
                      />
                      <select
                        value={festivalDiscountType}
                        onChange={(e) => setFestivalDiscountType(e.target.value)}
                        className="border rounded p-1 w-1/3 text-sm"
                      >
                        <option value="%">%</option>
                        <option value="₹">₹</option>
                      </select>
                    </div>

                    {(() => {
                      let alreadyApplied = false;
                      let appliedInfo: { value: number; type: string } | undefined;

                      if (festivalDiscountMode === "all" && appliedFestivalDiscounts.all) {
                        alreadyApplied = true;
                        appliedInfo = appliedFestivalDiscounts.all;
                      } else if (
                        festivalDiscountMode === "category" &&
                        festivalSelectedCategory &&
                        appliedFestivalDiscounts.categories[festivalSelectedCategory]
                      ) {
                        alreadyApplied = true;
                        appliedInfo =
                          appliedFestivalDiscounts.categories[festivalSelectedCategory];
                      } else if (
                        festivalDiscountMode === "tag" &&
                        festivalSelectedTag &&
                        appliedFestivalDiscounts.tags[festivalSelectedTag]
                      ) {
                        alreadyApplied = true;
                        appliedInfo = appliedFestivalDiscounts.tags[festivalSelectedTag];
                      }

                      return (
                        <div className="flex flex-col items-center">
                          {alreadyApplied ? (
                            <>
                              <Button
                                onClick={removeFestivalDiscount}
                                variant="destructive"
                                className="w-full bg-red-600 hover:bg-red-700"
                                size="sm"
                              >
                                Remove Discount
                              </Button>
                              {appliedInfo && (
                                <div className="text-xs text-gray-600 mt-1 text-center">
                                  🟢 Discount Applied: {appliedInfo.value}
                                  {appliedInfo.type}
                                </div>
                              )}
                            </>
                          ) : (
                            <Button
                              onClick={applyFestivalDiscount}
                              className="w-full bg-green-600 hover:bg-green-700"
                              size="sm"
                              disabled={
                                (festivalDiscountMode === "category" && !festivalSelectedCategory) ||
                                (festivalDiscountMode === "tag" && !festivalSelectedTag)
                              }
                            >
                              Apply Discount
                            </Button>
                          )}
                        </div>
                      );
                    })()}
                  </>
                )}
              </fieldset>
            </th>

                    {/* 🟢 Modified Price Column */}
            <th className="p-3 text-left border bg-blue-50">Modified Price</th>

            <th className="p-3 text-left border">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.length > 0 ? (
              filtered.map((p, index) => (
                <tr
                  key={p.id}
                  className={`hover:bg-gray-50 ${
                    // highlight if this product has discountedPrice
                    p.discountedPrice ? "bg-emerald-50" : ""
                  }`}
                >
                  <td className="p-3 border">{index + 1}</td>
                  <td className="p-3 border">{p.productName }</td>
                  <td className="p-3 border">{p.sku}</td>
                  <td className="p-3 border">{p.category}</td>
                  <td className="p-3 border">{p.tag}</td>
                  <td className="p-3 border">{p.totalUnits}</td>
                  <td className="p-3 border text-center">
                      {/* ✅ Case 1: Festival + Regular Discount both applied */}
                      {p.discountedPrice && p.festivaldiscountPrice ? (
                        <div className="flex flex-col items-center">
                          <span className="text-gray-500 line-through text-sm">
                            ₹{Number(p.price).toFixed(2)}
                          </span>
                          <span className="text-green-700 font-semibold text-sm">
                            ₹{Number(p.discountedPrice).toFixed(2)} {/* Regular Discount */}
                          </span>
                          <span className="text-orange-700 font-semibold text-base">
                            ₹{Number(p.festivaldiscountPrice).toFixed(2)} {/* Festival Discount */}
                          </span>
                        </div>
                      ) : p.festivaldiscountPrice ? (
                        /* ✅ Case 2: Only Festival Discount */
                        <div className="flex flex-col items-center">
                          <span className="text-gray-500 line-through text-sm">
                            ₹{Number(p.price).toFixed(2)}
                          </span>
                          <span className="text-orange-700 font-semibold text-base">
                            ₹{Number(p.festivaldiscountPrice).toFixed(2)}
                          </span>
                        </div>
                      ) : p.discountedPrice ? (
                        /* ✅ Case 3: Only Regular Discount */
                        <div className="flex flex-col items-center">
                          <span className="text-gray-500 line-through text-sm">
                            ₹{Number(p.price).toFixed(2)}
                          </span>
                          <span className="text-green-700 font-semibold text-base">
                            ₹{Number(p.discountedPrice).toFixed(2)}
                          </span>
                        </div>
                      ) : (
                        /* ✅ Case 4: No Discount */
                        <span>₹{Number(p.price).toFixed(2)}</span>
                      )}
                    </td>


                  {/* Custom discount row */}
                  <td className="p-3 border">
                    {discountMode === "custom" && (
                      <div className="flex flex-col gap-1">
                        <div className="flex gap-1">
                          <input
                            type="number"
                            placeholder="Value"
                            value={rowDiscountValues[p.id] || ""}
                            onChange={(e) =>
                              setRowDiscountValues({
                                ...rowDiscountValues,
                                [p.id]: e.target.value,
                              })
                            }
                            className="border rounded p-1 text-sm w-2/3"
                          />
                          <select
                            value={rowDiscountTypes[p.id] || "%"}
                            onChange={(e) =>
                              setRowDiscountTypes({
                                ...rowDiscountTypes,
                                [p.id]: e.target.value,
                              })
                            }
                            className="border rounded p-1 text-sm w-1/3"
                          >
                            <option value="%">%</option>
                            <option value="₹">₹</option>
                          </select>
                        </div>

                        {!rowActiveDiscounts[p.id] ? (
                          <Button
                            size="sm"
                            className="w-full"
                            onClick={() => applyRowDiscount(p)}
                          >
                            Apply
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            variant="destructive"
                            className="w-full"
                            onClick={() => removeRowDiscount(p)}
                          >
                            Remove
                          </Button>
                        )}
                      </div>
                    )}
                  </td>
                  {/* 🟣 Festival Discount Column (Custom Mode Support) */}
                        <td className="p-3 border text-center bg-orange-50">
                          {festivalDiscountMode === "custom" ? (
                            <div className="flex flex-col items-center gap-1">
                              {/* Input value */}
                              <input
                                type="number"
                                className="w-20 border rounded p-1 text-sm text-center"
                                placeholder="Value"
                                value={festivalRowValues[p.id] || ""}
                                disabled={festivalRowActive[p.id]}
                                onChange={(e) =>
                                  setFestivalRowValues((prev) => ({
                                    ...prev,
                                    [p.id]: e.target.value,
                                  }))
                                }
                              />

                              {/* Type selector */}
                              <select
                                className="border rounded p-1 text-sm"
                                value={festivalRowTypes[p.id] || "%"}
                                disabled={festivalRowActive[p.id]}
                                onChange={(e) =>
                                  setFestivalRowTypes((prev) => ({
                                    ...prev,
                                    [p.id]: e.target.value,
                                  }))
                                }
                              >
                                <option value="%">%</option>
                                <option value="₹">₹</option>
                              </select>

                              {/* Apply / Remove button */}
                              <Button
                                size="sm"
                                variant={festivalRowActive[p.id] ? "destructive" : "default"}
                                className="mt-1 text-xs"
                                onClick={() =>
                                  handleToggleFestivalDiscountRow(p.id)
                                }
                              >
                                {festivalRowActive[p.id] ? "Remove" : "Apply"}
                              </Button>
                            </div>
                          ) : (
                            // Non-custom mode (category/tag/all)
                            <>
                              {p.festivaldiscountPrice
                                ? "Applied"
                                : <span className="text-gray-400 italic">None</span>}
                            </>
                          )}
                       </td>


                {/* 🟢 Modified Price */}
                  <td className="p-3 border text-center bg-blue-50 font-semibold">
                    {p.festivaldiscountPrice
                      ? `₹${p.festivaldiscountPrice.toFixed(2)}`
                      : p.discountedPrice
                      ? `₹${p.discountedPrice.toFixed(2)}`
                      : `₹${p.price.toFixed(2)}`}
                  </td>

                {/* Actions */}
                <td className="p-3 border flex gap-2 justify-center">
                  <Button size="sm" variant="outline" onClick={() => onEdit(p)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(p.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={11} className="text-center p-4 border text-gray-500">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
