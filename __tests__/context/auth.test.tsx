import { act, render } from "@testing-library/react";
import AuthProvider, { useAuth } from "context/auth";
import { config } from "config";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock("utils/lib/revalidation", () => ({
  revalidate: jest.fn(),
}));

describe("AuthProvider", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn() as jest.Mock;
    jest.spyOn(console, "log").mockImplementation(() => {});
  });

  it("Should render", () => {
    const { getByText } = render(
      <AuthProvider>
        <div>Test Child</div>
      </AuthProvider>
    );
    expect(getByText("Test Child")).toBeInTheDocument();
  });

  it("Should provide auth context", () => {
    let contextValue;
    const TestComponent = () => {
      contextValue = useAuth();
      return null;
    };

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(contextValue).toEqual({
      user: null,
      handleLogin: expect.any(Function),
      handleRegister: expect.any(Function),
      handleLogout: expect.any(Function),
    });
  });

  it("Should login successfully", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve({ success: true }),
    });

    let contextValue;
    const TestComponent = () => {
      contextValue = useAuth();
      return null;
    };

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    let result;

    await act(async () => {
      result = await contextValue!.handleLogin({
        username: "testuser",
        password: "password",
        remember: true,
      });
    });

    expect(global.fetch).toHaveBeenCalledWith(`${config.apiUrl}/auth/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: "testuser",
        password: "password",
        remember: true,
      }),
    });

    expect(result).toEqual({ success: true });
    expect(contextValue!.user).toEqual({ username: "testuser" });
  });

  it("Should register successfully", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve({ success: true }),
    });

    let contextValue;
    const TestComponent = () => {
      contextValue = useAuth();
      return null;
    };

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    let result;

    await act(async () => {
      result = await contextValue!.handleRegister({
        username: "testuser",
        password: "password",
        terms: true,
      });
    });

    expect(global.fetch).toHaveBeenCalledWith(
      `${config.apiUrl}/auth/register`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "testuser",
          password: "password",
          terms: true,
        }),
      }
    );

    expect(result).toEqual({ success: true });
    expect(contextValue!.user).toEqual({ username: "testuser" });
  });

  it("Should logout successfully", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve({ success: true }),
    });

    let contextValue;
    const TestComponent = () => {
      contextValue = useAuth();
      return null;
    };

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    let result;

    await act(async () => {
      result = await contextValue!.handleLogout();
    });

    expect(global.fetch).toHaveBeenCalledWith(`${config.apiUrl}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });

    expect(result).toEqual({ success: true });
    expect(contextValue!.user).toEqual(null);
  });

  it("Should throw error on login failure", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve({ error: "Invalid credentials" }),
    });

    let contextValue;
    const TestComponent = () => {
      contextValue = useAuth();
      return null;
    };

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    let result;

    await act(async () => {
      result = await contextValue!.handleLogin({
        username: "testuser",
        password: "password",
        remember: true,
      });
    });

    expect(global.fetch).toHaveBeenCalledWith(`${config.apiUrl}/auth/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: "testuser",
        password: "password",
        remember: true,
      }),
    });

    expect(result).toEqual({ error: "Invalid credentials" });
    expect(contextValue!.user).toEqual(null);
  });

  it("Should throw error on register failure", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve({ error: "Invalid credentials" }),
    });

    let contextValue;
    const TestComponent = () => {
      contextValue = useAuth();
      return null;
    };

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    let result;

    await act(async () => {
      result = await contextValue!.handleRegister({
        username: "testuser",
        password: "password",
        terms: true,
      });
    });

    expect(global.fetch).toHaveBeenCalledWith(
      `${config.apiUrl}/auth/register`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "testuser",
          password: "password",
          terms: true,
        }),
      }
    );

    expect(result).toEqual({ error: "Invalid credentials" });
    expect(contextValue!.user).toEqual(null);
  });

  it("Should throw error on logout failure", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve({ error: "Invalid credentials" }),
    });

    let contextValue;
    const TestComponent = () => {
      contextValue = useAuth();
      return null;
    };

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    let result;

    await act(async () => {
      result = await contextValue!.handleLogout();
    });

    expect(global.fetch).toHaveBeenCalledWith(`${config.apiUrl}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });

    expect(result).toEqual({ error: "Invalid credentials" });
    expect(contextValue!.user).toEqual(null);
  });

  it("Should throw catch error", async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error("Error"));

    let contextValue;
    const TestComponent = () => {
      contextValue = useAuth();
      return null;
    };

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    let result;

    await act(async () => {
      result = await contextValue!.handleLogin({
        username: "testuser",
        password: "password",
        remember: true,
      });
    });

    expect(result).toEqual({ error: "Ha ocurrido un error inesperado." });
    expect(contextValue!.user).toEqual(null);
  });
});
