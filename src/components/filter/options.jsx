import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export default function FilterDropdowns({
  name,
  optionValue,
  value,
  onChange,
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={`Select a ${name}`} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {name && <SelectLabel>{name}</SelectLabel>}

          {optionValue.map((opt) => (
            <SelectItem key={opt} value={opt}>
              {opt}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
