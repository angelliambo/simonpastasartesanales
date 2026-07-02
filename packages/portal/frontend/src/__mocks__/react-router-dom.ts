export const useLocation = jest.fn(() => ({
  pathname: "/test",
  search: "",
  hash: "",
  state: null,
  key: "test",
}));

export const useNavigate = jest.fn(() => jest.fn());
export const useParams = jest.fn(() => ({}));

export const BrowserRouter = ({ children }: { children: React.ReactNode }) =>
  children;
export const Routes = ({ children }: { children: React.ReactNode }) => children;
export const Route = ({ children }: { children: React.ReactNode }) => children;

export const Link = ({
  children,
  to,
}: {
  children: React.ReactNode;
  to: string;
}) => {
  const React = require("react");
  return React.createElement("a", { href: to }, children);
};

export const NavLink = ({
  children,
  to,
}: {
  children: React.ReactNode;
  to: string;
}) => {
  const React = require("react");
  return React.createElement("a", { href: to }, children);
};
