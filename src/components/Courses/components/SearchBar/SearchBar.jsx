import { Button, Input } from "../../../../common";

export const SearchBar = () => {
  function handeChange(event) {}

  return (
    <div>
      <Input
        labelText={"Search"}
        placeholderText={"Input Text"}
        onChange={handeChange}
      />
      <Button buttonText={"SEARCH"} />
    </div>
  );
};
