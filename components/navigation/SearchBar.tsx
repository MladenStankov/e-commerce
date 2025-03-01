import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useId } from "react";

export default function SearchBar() {
  const id = useId();

  return (
    <div className="space-y-2 max-w-6xl w-full text-lg">
      <div className="relative">
        <Input
          id={id}
          className="peer ps-10 bg-muted "
          placeholder="Search for a sneaker..."
          type="search"
        />
        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
          <Search size={16} strokeWidth={2} />
        </div>
      </div>
    </div>
  );
}
