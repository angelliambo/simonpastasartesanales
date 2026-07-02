import React from "react";
import { render, screen } from "@testing-library/react";
import ListComponent, { ListItem, ListItemMeta } from "./index";

describe("List Component", () => {
  it("renders list with items", () => {
    const data = [
      { id: 1, name: "Item 1" },
      { id: 2, name: "Item 2" },
    ];
    render(
      <ListComponent
        dataSource={data}
        renderItem={(item) => <ListItem key={item.id}>{item.name}</ListItem>}
      />
    );
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
  });

  it("renders loading state", () => {
    render(<ListComponent loading dataSource={[]} />);
    // Debe mostrar loading
  });

  it("renders ListItem with Meta", () => {
    render(
      <ListComponent.Item>
        <ListComponent.Item.Meta title="Title" description="Description" />
      </ListComponent.Item>
    );
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
  });
});
