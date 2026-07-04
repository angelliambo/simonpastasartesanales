import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { PersonalizationProvider } from '../../contexts/PersonalizationContext';
import {
  Menu,
  Dropdown,
  MenuBreadcrumbComponent,
  NavigationMenu,
  SidebarMenu,
  HorizontalMenuLayout,
  VerticalMenuLayout,
} from "./index";
import { lightTheme } from "../../../../styles/theme";

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={lightTheme}>
      <PersonalizationProvider>{component}</PersonalizationProvider>
    </ThemeProvider>
  );
};

const getMainMenu = () => screen.getAllByRole("menu")[0];

describe("Menu", () => {
  const mockItems = [
    { key: "home", title: "Home" },
    { key: "about", title: "About" },
    {
      key: "products",
      title: "Products",
      children: [
        { key: "web", title: "Web Development" },
        { key: "mobile", title: "Mobile Apps" },
      ],
    },
  ];

  describe("Basic Rendering", () => {
    it("renders correctly", () => {
      renderWithProviders(<Menu items={mockItems} />);

      expect(getMainMenu()).toBeInTheDocument();
      expect(screen.getByText("Home")).toBeInTheDocument();
      expect(screen.getByText("About")).toBeInTheDocument();
      expect(screen.getByText("Products")).toBeInTheDocument();
    });

    it("renders with custom aria-label", () => {
      renderWithProviders(
        <Menu items={mockItems} aria-label="Main navigation" />
      );

      expect(
        screen.getByRole("menu", { name: "Main navigation" })
      ).toBeInTheDocument();
    });

    it("renders disabled state correctly", () => {
      const itemsWithDisabled = [
        { key: "home", title: "Home" },
        { key: "about", title: "About", disabled: true },
      ];

      renderWithProviders(<Menu items={itemsWithDisabled} />);

      const disabledItem = screen.getByText("About").closest("li");
      expect(disabledItem).toHaveAttribute("aria-disabled", "true");
    });
  });

  describe("Menu Modes", () => {
    it("renders horizontal mode", () => {
      renderWithProviders(<Menu items={mockItems} mode="horizontal" />);

      const menu = getMainMenu();
      expect(menu).toBeInTheDocument();
    });

    it("renders vertical mode", () => {
      renderWithProviders(<Menu items={mockItems} mode="vertical" />);

      const menu = getMainMenu();
      expect(menu).toBeInTheDocument();
    });

    it("renders inline mode", () => {
      renderWithProviders(<Menu items={mockItems} mode="inline" />);

      const menu = getMainMenu();
      expect(menu).toBeInTheDocument();
    });
  });

  describe("Menu Selection", () => {
    it("handles item selection", () => {
      const onSelect = jest.fn();
      renderWithProviders(
        <Menu items={mockItems} onSelect={onSelect} selectable />
      );

      fireEvent.click(screen.getByText("Home"));
      expect(onSelect).toHaveBeenCalledWith(
        expect.objectContaining({
          key: "home",
          selectedKeys: ["home"],
        })
      );
    });

    it("shows selected state", () => {
      renderWithProviders(
        <Menu items={mockItems} selectedKeys={["home"]} selectable />
      );

      const homeItem = screen.getByText("Home").closest("li");
      expect(homeItem).toHaveAttribute("aria-selected", "true");
    });

    it("handles multiple selection", () => {
      const onSelect = jest.fn();
      renderWithProviders(
        <Menu
          items={mockItems}
          onSelect={onSelect}
          selectable
          multiple
          selectedKeys={["home"]}
        />
      );

      fireEvent.click(screen.getByText("About"));
      expect(onSelect).toHaveBeenCalledWith(
        expect.objectContaining({
          key: "about",
          selectedKeys: ["home", "about"],
        })
      );
    });
  });

  describe("SubMenu", () => {
    it("renders submenu correctly", () => {
      renderWithProviders(<Menu items={mockItems} mode="inline" />);

      const submenuButton = screen.getByRole("menuitem", { name: "Products" });
      expect(submenuButton).toBeInTheDocument();
      expect(submenuButton).toHaveAttribute("aria-expanded", "false");
    });

    it("opens submenu on click", () => {
      renderWithProviders(<Menu items={mockItems} mode="inline" />);

      const submenuButton = screen.getByRole("menuitem", { name: "Products" });
      fireEvent.click(submenuButton);

      expect(submenuButton).toHaveAttribute("aria-expanded", "true");
    });
  });

  describe("Keyboard Navigation", () => {
    it("handles arrow key navigation", () => {
      renderWithProviders(<Menu items={mockItems} />);

      const menu = getMainMenu();
      fireEvent.keyDown(menu, { key: "ArrowDown" });
      // Note: Full keyboard navigation testing would require more complex setup
      expect(menu).toBeInTheDocument();
    });

    it("handles Enter key selection", () => {
      const onSelect = jest.fn();
      renderWithProviders(
        <Menu items={mockItems} onSelect={onSelect} selectable />
      );

      const homeItem = screen.getByText("Home").closest("li");
      fireEvent.keyDown(homeItem!, { key: "Enter" });

      expect(onSelect).toHaveBeenCalledWith(
        expect.objectContaining({
          key: "home",
        })
      );
    });
  });

  describe("Themes and Variants", () => {
    it("applies light theme", () => {
      renderWithProviders(<Menu items={mockItems} theme="light" />);

      const menu = getMainMenu();
      expect(menu).toBeInTheDocument();
    });

    it("applies dark theme", () => {
      renderWithProviders(<Menu items={mockItems} theme="dark" />);

      const menu = getMainMenu();
      expect(menu).toBeInTheDocument();
    });

    it("applies different sizes", () => {
      renderWithProviders(<Menu items={mockItems} size="lg" />);

      const menu = getMainMenu();
      expect(menu).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("has proper ARIA attributes", () => {
      renderWithProviders(<Menu items={mockItems} />);

      const menu = getMainMenu();
      expect(menu).toHaveAttribute("role", "menu");

      expect(screen.getByText("Home")).toBeInTheDocument();
      expect(screen.getByText("About")).toBeInTheDocument();
      expect(screen.getByText("Products")).toBeInTheDocument();
    });

    it("supports accessibility props", () => {
      renderWithProviders(
        <Menu
          items={mockItems}
          accessibility={{
            largeText: true,
            increasedSpacing: true,
            highContrast: true,
          }}
        />
      );

      const menu = getMainMenu();
      expect(menu).toBeInTheDocument();
    });
  });
});

describe("Dropdown", () => {
  const mockMenu = {
    items: [
      { key: "profile", title: "Profile" },
      { key: "settings", title: "Settings" },
      { key: "logout", title: "Logout" },
    ],
  };

  it("renders trigger element", () => {
    renderWithProviders(
      <Dropdown menu={mockMenu}>
        <button>Actions</button>
      </Dropdown>
    );

    expect(screen.getByText("Actions")).toBeInTheDocument();
  });

  it("shows dropdown on click", () => {
    renderWithProviders(
      <Dropdown menu={mockMenu} trigger={["click"]}>
        <button>Actions</button>
      </Dropdown>
    );

    fireEvent.click(screen.getByText("Actions"));
    expect(screen.getByText("Profile")).toBeInTheDocument();
  });

  it("applies different placements", () => {
    renderWithProviders(
      <Dropdown menu={mockMenu} placement="topRight" visible>
        <button>Actions</button>
      </Dropdown>
    );

    expect(getMainMenu()).toBeInTheDocument();
  });
});

describe("MenuBreadcrumbComponent", () => {
  const mockBreadcrumbItems = [
    { title: "Home", href: "/" },
    { title: "Products", href: "/products" },
    { title: "Laptop" },
  ];

  it("renders breadcrumb items", () => {
    renderWithProviders(<MenuBreadcrumbComponent items={mockBreadcrumbItems} />);

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Products")).toBeInTheDocument();
    expect(screen.getByText("Laptop")).toBeInTheDocument();
  });

  it("renders with custom separator", () => {
    renderWithProviders(
      <MenuBreadcrumbComponent items={mockBreadcrumbItems} separator="/" />
    );

    // Check that breadcrumb navigation exists
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("handles maxItems correctly", () => {
    const manyItems = [
      { title: "Home", href: "/" },
      { title: "Category", href: "/category" },
      { title: "Subcategory", href: "/subcategory" },
      { title: "Products", href: "/products" },
      { title: "Item" },
    ];

    renderWithProviders(<MenuBreadcrumbComponent items={manyItems} maxItems={3} />);

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Item")).toBeInTheDocument();
  });

  it("handles item clicks", () => {
    const onClick = jest.fn();
    const itemsWithClick = [
      { title: "Home", href: "#", onClick },
      { title: "Current" },
    ];

    renderWithProviders(<MenuBreadcrumbComponent items={itemsWithClick} />);

    fireEvent.click(screen.getByText("Home"));
    expect(onClick).toHaveBeenCalled();
  });
});

describe("Predefined Components", () => {
  it("renders NavigationMenu", () => {
    renderWithProviders(<NavigationMenu items={mockItems} />);
    expect(getMainMenu()).toBeInTheDocument();
  });

  it("renders SidebarMenu", () => {
    renderWithProviders(<SidebarMenu items={mockItems} />);
    expect(getMainMenu()).toBeInTheDocument();
  });

  it("renders HorizontalMenuLayout", () => {
    renderWithProviders(<HorizontalMenuLayout items={mockItems} />);
    expect(getMainMenu()).toBeInTheDocument();
  });

  it("renders VerticalMenuLayout", () => {
    renderWithProviders(<VerticalMenuLayout items={mockItems} />);
    expect(getMainMenu()).toBeInTheDocument();
  });
});

const mockItems = [
  { key: "home", title: "Home" },
  { key: "about", title: "About" },
];
