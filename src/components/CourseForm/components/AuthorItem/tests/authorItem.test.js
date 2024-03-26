import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { AuthorItem } from "../AuthorItem";

describe("AuthorItem", () => {
  const author = {
    name: "Test Author",
  };

  it("renders author's name", () => {
    render(<AuthorItem author={author} />);
    const authorName = screen.getByText(author.name);
    expect(authorName).toBeInTheDocument();
  });

  it("calls handleAddClick when Add Author button is clicked", () => {
    const handleAddClick = jest.fn();
    render(<AuthorItem author={author} handleAddClick={handleAddClick} />);
    const addButton = screen.getByText("Add Author");
    fireEvent.click(addButton);
    expect(handleAddClick).toHaveBeenCalledTimes(1);
    expect(handleAddClick).toHaveBeenCalledWith(expect.anything(), author.name);
  });

  it("calls handleDeleteClick when Delete Author button is clicked", () => {
    const handleDeleteClick = jest.fn();
    render(
      <AuthorItem author={author} handleDeleteClick={handleDeleteClick} />
    );
    const deleteButton = screen.getByText("Delete Author");
    fireEvent.click(deleteButton);
    expect(handleDeleteClick).toHaveBeenCalledTimes(1);
    expect(handleDeleteClick).toHaveBeenCalledWith(
      expect.anything(),
      author.name
    );
  });

  it("does not render Add Author button if handleAddClick is not provided", () => {
    render(<AuthorItem author={author} />);
    const addButton = screen.queryByText("Add Author");
    expect(addButton).toBeNull();
  });

  it("does not render Delete Author button if handleDeleteClick is not provided", () => {
    render(<AuthorItem author={author} />);
    const deleteButton = screen.queryByText("Delete Author");
    expect(deleteButton).toBeNull();
  });
});
