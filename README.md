# AquaWallet - Web Application for Fish Farm Investors

## Project Overview

AquaWallet is a web application designed to streamline investment management and financial transactions for fish farm investors. It provides a user-friendly, secure platform for investors to track their investments, manage their virtual wallet, view transaction history, and receive real-time updates. This application aims to improve investor engagement and operational efficiency for the fish farming company by automating key financial processes.

### Key Features

- **Investment Dashboard:**
    - View investment details, ROI tracking, and performance history.
    - Reinvest profits or withdraw funds
    - Set up recurring investments

- **Virtual Wallet:**
    - Secure balance management, bank transfers to Nigerian banks, and bill payments.

- **Transaction History:**
    - Detailed transaction records and downloadable statements.

- **Notifications:**
    - Real-time updates on investment activity and transactions.

- **Security:**
    - Two-factor authentication and biometric login (fingerprint/face ID).

## Technology Stack

This project is built using the following technologies:

-   **Framework:** [Next.js](https://nextjs.org/) (App Router)
-   **Component Library:** [shadcn/ui](https://ui.shadcn.com/)
-   **UI Library:** [Radix UI](https://www.radix-ui.com/)
-   **Chart Library:** [Recharts](https://recharts.org/)
-   **Animation Library:** [Framer Motion](https://www.framer.com/motion/)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
-   **State Management:** [Zustand](https://github.com/pmndrs/zustand)
-   **API Client:** [Axios](https://axios-http.com/)
-   **Data Fetching:** [SWR](https://swr.vercel.app/)
-   **Testing:**
    - Unit Tests: Jest and React Testing Library
    - Integration Tests: Using mocked data
    - End-to-End Tests: Cypress

## Getting Started

Follow these steps to set up the project locally:

### Prerequisites

-   [Node.js](https://nodejs.org/) (v18 or higher)
-   [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
-   [Git](https://git-scm.com/)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
    cd aqua-wallet
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Run the development server:**

    ```bash
    npm run dev
    # or
    yarn dev
    ```
4.   Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
aqua-wallet/
├── app/
│ ├── (auth)/
│ │ ├── login/
│ │ │ └── page.tsx
│ │ ├── register/
│ │ │ └── page.tsx
│ │ └── layout.tsx
│ ├── _components/
│ │ ├── ui/
│ │ │ ├── button.tsx
│ │ │ ├── input.tsx
│ │ │ ├── card.tsx
│ │ │ ├── chart.tsx
│ │ │ └── ... (other reusable ui elements)
│ │ ├── layouts/
│ │ │ ├── bottom-nav.tsx
│ │ │ ├── sidebar.tsx
│ │ │ └── main-layout.tsx
│ │ ├── dashboard/
│ │ │ ├── investment-summary.tsx
│ │ │ ├── roi-tracking.tsx
│ │ │ └── performance-history.tsx
│ │ ├── wallet/
│ │ │ ├── balance-display.tsx
│ │ │ ├── transfer-form.tsx
│ │ │ └── bill-payment-form.tsx
│ │ ├── transactions/
│ │ │ ├── transaction-list.tsx
│ │ │ └── transaction-details.tsx
│ │ ├── profile/
│ │ │ ├── user-details.tsx
│ │ │ └── settings-form.tsx
│ │ ├── notifications/
│ │ │ └── notification-list.tsx
│ │ ├── forms/
│ │ │ ├── investment-form.tsx
│ │ │ └── withdrawal-form.tsx
│ │ ├── animations/
│ │ │ └── fadeIn.tsx
│ │ └── utils/
│ │ └── helpers.ts
│ ├── api/
│ │ ├── investments/
│ │ │ └── route.ts
│ │ ├── wallet/
│ │ │ └── route.ts
│ │ └── transactions/
│ │ └── route.ts
│ ├── dashboard/
│ │ └── page.tsx
│ ├── wallet/
│ │ └── page.tsx
│ ├── transactions/
│ │ └── page.tsx
│ ├── profile/
│ │ └── page.tsx
│ ├── layout.tsx
│ └── globals.css
├── public/
│ └── logo.svg (Your logo file)
├── styles/
│ └── globals.css
├── tailwind.config.js
├── tsconfig.json
└── package.json
```


-   **`app`**: Contains the source code for the Next.js application.
    -   **`api`**:  Houses the API routes that act as backend endpoints.
    -   **`_components`**: Contains reusable components
    -   **`dashboard`, `wallet`, `transactions`, `profile`:** These route segments represent the main pages of the application.
-   **`public`**:  Stores static assets.
-   **`styles`**:  CSS and tailwind config files.
-   **`tailwind.config.js`**:  Configuration file for tailwind css
-   **`package.json`**:  Manages dependencies and project scripts.

## Contributing

We welcome contributions from the community! Please follow these guidelines:

1.  **Fork the repository.**
2.  **Create a new branch for your feature or fix (`git checkout -b feature/my-new-feature`).**
3.  **Make your changes and test them thoroughly.**
4.  **Commit your changes (`git commit -am 'Add some feature'`).**
5.  **Push to the branch (`git push origin feature/my-new-feature`).**
6.  **Create a pull request.**

## Testing

- **Unit Tests:** Run `npm run test` to execute unit tests using Jest and React Testing Library.
- **Integration Tests:** Ensure API integrations and component interactions are functioning correctly with mock data.
- **End-to-End Tests:** Use Cypress to run E2E tests that will run automatically before deployment using `npm run test-e2e`.
- **Accessibility Testing:** We perform automated checks for WCAG 2.1 AA compliance and manual audits.

## Deployment

This application is deployed on AWS leveraging S3 for static assets and Lambda for serverless functions. CI/CD is set up with GitHub Actions for automated builds, testing, and deployments.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

If you have any questions, please feel free to reach out:
- [Your email address]
- [Link to your portfolio]

---