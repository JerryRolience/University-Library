import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { StatusDropdownProps } from "@/types";
import { Check } from "lucide-react";

export function StatusDropdown<T extends string>({
  currentValue,
  options,
  onSelect,
}: StatusDropdownProps<T>) {
  // Find the current option to apply its color
  const currentOption =
    options.find((opt) => opt.value === currentValue) || options[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={`px-3 py-1 rounded-full text-xs font-semibold transition hover:opacity-80 ${currentOption.colorClass} ${currentOption.backgroundColor} focus:outline-none`}
        >
          {currentOption.label}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="space-y-1">
        {options.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => onSelect(option.value as T)}
            className="flex items-center justify-between gap-2"
          >
            <span className={option.colorClass}>{option.label}</span>
            {currentValue === option.value && (
              <Check size={14} className={option.colorClass} />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
