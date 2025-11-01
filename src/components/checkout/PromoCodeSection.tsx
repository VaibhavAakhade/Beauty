import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { validatePromoCode } from "@/lib/delivery-utils";
import { AlertCircle, CheckCircle2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface PromoCodeSectionProps {
  subtotal: number;
  onApplyPromo: (discount: number) => void;
}

export default function PromoCodeSection({ subtotal, onApplyPromo }: PromoCodeSectionProps) {
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<{
    code: string;
    discount: number;
    message: string;
  } | null>(null);
  const [error, setError] = useState("");

  const handleApplyPromo = () => {
    if (!promoCode) {
      setError("Please enter a promo code");
      return;
    }

    const result = validatePromoCode(promoCode, subtotal);
    
    if (!result.isValid) {
      setError(result.message);
      setAppliedPromo(null);
      onApplyPromo(0);
    } else {
      setAppliedPromo({
        code: promoCode.toUpperCase(),
        discount: result.discount,
        message: result.message
      });
      setError("");
      onApplyPromo(result.discount);
    }
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setPromoCode("");
    setError("");
    onApplyPromo(0);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium">Have a promo code?</h3>
      
      {!appliedPromo ? (
        <div className="flex gap-2">
          <Input
            placeholder="Enter promo code"
            value={promoCode}
            onChange={(e) => {
              setPromoCode(e.target.value.toUpperCase());
              setError("");
            }}
            className="uppercase"
          />
          <Button onClick={handleApplyPromo} variant="secondary">
            Apply
          </Button>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between p-2 bg-green-50 border border-green-200 rounded-md"
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-600" />
            <div>
              <p className="text-sm font-medium">{appliedPromo.code}</p>
              <p className="text-xs text-green-600">{appliedPromo.message}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRemovePromo}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-4 h-4" />
          </Button>
        </motion.div>
      )}

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-2 text-sm text-red-600"
          >
            <AlertCircle className="w-4 h-4" />
            {error}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}