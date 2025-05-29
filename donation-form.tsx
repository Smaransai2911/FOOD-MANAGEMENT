import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { insertDonationSchema, Donation, FoodItem } from "@shared/schema";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

const donationFormSchema = insertDonationSchema
  .omit({ donorId: true, recipientId: true, status: true })
  .extend({
    pickupDate: z.string().optional(),
    items: z.array(
      z.object({
        foodItemId: z.number(),
        quantity: z.string(),
        name: z.string(),
        selected: z.boolean(),
      })
    ),
  });

type DonationFormValues = z.infer<typeof donationFormSchema>;

interface DonationFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: DonationFormValues) => void;
  availableItems: FoodItem[];
  isLoading?: boolean;
}

export function DonationForm({
  open,
  onOpenChange,
  onSubmit,
  availableItems,
  isLoading = false,
}: DonationFormProps) {
  const { toast } = useToast();
  const { user } = useAuth();

  const items = availableItems.map((item) => ({
    foodItemId: item.id,
    quantity: item.quantity,
    name: item.name,
    selected: false,
  }));

  const form = useForm<DonationFormValues>({
    resolver: zodResolver(donationFormSchema),
    defaultValues: {
      pickupDate: format(
        new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
        "yyyy-MM-dd'T'HH:mm"
      ),
      pickupAddress: user?.address || "",
      notes: "",
      items,
    },
  });

  const handleSubmit = (values: DonationFormValues) => {
    // Filter only selected items
    const filteredValues = {
      ...values,
      items: values.items.filter((item) => item.selected),
    };

    if (filteredValues.items.length === 0) {
      toast({
        title: "No items selected",
        description: "Please select at least one item to donate",
        variant: "destructive",
      });
      return;
    }

    onSubmit(filteredValues);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create Donation</DialogTitle>
          <DialogDescription>
            Donate your surplus food to those in need
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="pickupDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pickup Date & Time</FormLabel>
                  <FormControl>
                    <Input type="datetime-local" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="pickupAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pickup Address</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter the address for pickup"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Notes (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Any special instructions or details about the donation"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <FormLabel>Select Items to Donate</FormLabel>
              {availableItems.length === 0 ? (
                <p className="text-sm text-muted-foreground py-4">
                  You don't have any items available for donation. Add items to your inventory first.
                </p>
              ) : (
                <div className="border rounded-md divide-y">
                  {form.getValues().items.map((item, index) => (
                    <div key={index} className="flex items-center p-3">
                      <input
                        type="checkbox"
                        id={`item-${index}`}
                        checked={item.selected}
                        onChange={(e) => {
                          const items = [...form.getValues().items];
                          items[index].selected = e.target.checked;
                          form.setValue("items", items);
                        }}
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary mr-3"
                      />
                      <label
                        htmlFor={`item-${index}`}
                        className="flex-1 flex justify-between items-center"
                      >
                        <span>{item.name}</span>
                        <span className="text-sm text-muted-foreground">
                          {item.quantity}
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <DialogFooter>
              <Button
                type="submit"
                disabled={isLoading || availableItems.length === 0}
              >
                {isLoading ? "Creating..." : "Create Donation"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
