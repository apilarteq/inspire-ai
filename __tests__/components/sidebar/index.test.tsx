import { render } from "@testing-library/react";
import SidebarServer from "components/sidebar";

describe("Sidebar Server", () => {
  it("Should render", async () => {
    render(SidebarServer({ chats: [] }));
  });
});
