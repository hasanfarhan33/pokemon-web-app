import { render, screen } from "@testing-library/react";
import LoginPage from "../pages/LoginPage.js";
import { useLogin } from "../hooks/useLogin";
import { useAuthContext } from "../hooks/useAuthContext";
import { BrowserRouter as Router } from "react-router-dom";

// Mock hooks
jest.mock("../hooks/useLogin");
jest.mock("../hooks/useAuthContext", () => ({
    useAuthContext: jest.fn(),
}));

describe("LoginPage", () => {
    beforeEach(() => {
        useLogin.mockReturnValue({
            login: jest.fn(),
            isLoading: false,
            error: null,
        });

        useAuthContext.mockReturnValue({ user: null });
    });

    const setup = () => {
        return render(
            <Router>
                <LoginPage />
            </Router>
        );
    };

    test("renders heading and description", () => {
        setup();
        expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("PokéVault");
        expect(screen.getByText("Search and store your favorite Pokémon")).toBeInTheDocument();
    });

    test("renders email and password fields", () => {
        setup();
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    });

    test("renders login button", () => {
        setup();
        expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
    });

    test("renders register link", () => {
        setup();
        const registerLink = screen.getByRole("link", { name: /register/i });
        expect(registerLink).toBeInTheDocument();
        expect(registerLink.getAttribute("href")).toBe("/register");
    });
});
