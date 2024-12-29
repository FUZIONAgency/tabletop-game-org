import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface SKU {
  id: string;
  sku_code: string;
  price: number;
}

interface SKUSelectorProps {
  skus: SKU[];
  selectedSku: SKU | null;
  onSelect: (sku: SKU) => void;
}

export function SKUSelector({ skus, selectedSku, onSelect }: SKUSelectorProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedSku ? selectedSku.sku_code : "Select SKU..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search SKUs..." />
          <CommandEmpty>No SKUs found.</CommandEmpty>
          <CommandGroup>
            {skus.map((sku) => (
              <CommandItem
                key={sku.id}
                value={sku.sku_code}
                onSelect={() => {
                  onSelect(sku);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selectedSku?.id === sku.id ? "opacity-100" : "opacity-0"
                  )}
                />
                {sku.sku_code}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}