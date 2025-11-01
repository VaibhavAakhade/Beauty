import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { checkDeliveryAvailability, getStates, getCitiesForState } from "@/lib/delivery-utils";
import { CheckCircle2, Loader2, MapPin, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type CheckoutFormProps = {
  onSubmit: (formData: CheckoutFormData) => void;
  isLoading: boolean;
};

export type CheckoutFormData = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
};

export default function CheckoutForm({ onSubmit, isLoading }: CheckoutFormProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState<CheckoutFormData>({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [states] = useState(getStates());
  const [cities, setCities] = useState<string[]>([]);
  const [checkingPincode, setCheckingPincode] = useState(false);
  const [pincodeStatus, setPincodeStatus] = useState<{
    isValid: boolean;
    message: string;
  } | null>(null);

  useEffect(() => {
    if (formData.state) {
      setCities(getCitiesForState(formData.state));
      setFormData(prev => ({ ...prev, city: "" }));
    }
  }, [formData.state]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "pincode" && value.length === 6) {
      validatePincode(value);
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validatePincode = async (pincode: string) => {
    setCheckingPincode(true);
    setPincodeStatus(null);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const deliveryZone = checkDeliveryAvailability(pincode);
    if (deliveryZone) {
      setPincodeStatus({
        isValid: true,
        message: `Delivery available in ${deliveryZone.deliveryDays} days`
      });
      setFormData(prev => ({
        ...prev,
        state: deliveryZone.state,
        city: deliveryZone.city
      }));
    } else {
      setPincodeStatus({
        isValid: false,
        message: "Delivery not available in this area"
      });
    }
    setCheckingPincode(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (Object.values(formData).some(value => !value)) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    if (!pincodeStatus?.isValid) {
      toast({
        title: "Error",
        description: "Please enter a valid delivery PIN code",
        variant: "destructive",
      });
      return;
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <Input
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
        <Input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <Input
          name="phone"
          type="tel"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
          maxLength={10}
        />

        {/* PIN Code with validation */}
        <div className="space-y-2">
          <div className="relative">
            <Input
              name="pincode"
              placeholder="PIN Code"
              value={formData.pincode}
              onChange={handleChange}
              required
              maxLength={6}
              className="pr-10"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              {checkingPincode ? (
                <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
              ) : pincodeStatus ? (
                pincodeStatus.isValid ? (
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-red-500" />
                )
              ) : (
                <MapPin className="w-4 h-4 text-gray-400" />
              )}
            </div>
          </div>
          <AnimatePresence>
            {pincodeStatus && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className={`text-sm ${
                  pincodeStatus.isValid ? "text-green-600" : "text-red-600"
                }`}
              >
                {pincodeStatus.message}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <Input
          name="address"
          placeholder="Delivery Address"
          value={formData.address}
          onChange={handleChange}
          required
        />

        <div className="grid grid-cols-2 gap-4">
          <Select
            value={formData.state}
            onValueChange={(value) => handleSelectChange("state", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select State" />
            </SelectTrigger>
            <SelectContent>
              {states.map((state) => (
                <SelectItem key={state} value={state}>
                  {state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={formData.city}
            onValueChange={(value) => handleSelectChange("city", value)}
            disabled={!formData.state}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select City" />
            </SelectTrigger>
            <SelectContent>
              {cities.map((city) => (
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button 
        type="submit" 
        className="w-full" 
        disabled={isLoading || !pincodeStatus?.isValid}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Processing...
          </>
        ) : (
          "Place Order"
        )}
      </Button>
    </form>
  );
}