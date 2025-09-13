type formSelectProps = {
  name: string;
  value?: string;
  lists: string[];
  isLoading?: boolean;
  placeholder: string;
  title?: string;
  handleChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};
const FormSelect = ({
  lists,
  placeholder,
  isLoading,
  title,
  name,
  value,
  handleChange,
}: formSelectProps) => {
  return (
    <div className="grid gap-4">
      <label className="capitalize" htmlFor={name}>
        {title || placeholder}
      </label>
      <select
        value={value}
        disabled={isLoading}
        name={name}
        id={name}
        onChange={handleChange}
        className=" p-2 border rounded-xl"
      >
        <option value="">{placeholder}</option>
        {lists.map((item, index) => {
          return (
            <option key={index} value={item}>
              {item}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FormSelect;

{
  /* <Select name={name} value={value} onValueChange={() => handleChange}>
  <SelectTrigger className="w-full">
    <SelectValue placeholder={placeholder} />
  </SelectTrigger>
  <SelectContent>
    {lists.map((list) => {
      return (
        <SelectItem value={list} key={list}>
          {list}
        </SelectItem>
      );
    })}
  </SelectContent>
</Select>; */
}
