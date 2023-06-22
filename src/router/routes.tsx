import { Suspense, lazy } from "react";
import type { RouteObject } from "react-router-dom";
import AuthLayout from "../components/Layout/AuthLayout";
import FullScreenLoader from "../components/Loader/FullScreenLoader";
import Layout from "../components/Layout/Layout";
import RequireUser from "../middleware/RequireUser";
// import UnauthorizePage from "../middleware/UnauthorizedPage";
import Blog from "../pages/Blog/Blog";
import Accounts from "../pages/Accounts/Accounts";
import AccountPage from "../pages/Accounts/components/AccountPage";
import SignIn from "../pages/Auth/SignIn";
import SignUp from "../pages/Auth/SignUp";
import Categories from "../pages/Categories/Categories";
import Home from "../pages/Home/Home";
import Profile from "../pages/Profile/Profile";
import Transactions from "../pages/Transactions/Transactions";
import Landing from "../pages/Landing/Landing";
import LandingLayout from "../components/Layout/LandingLayout";
import RecurringTransactions from "../pages/RecurringTransactions/RecurringTransactions";
import BillReminders from "../pages/BillReminders/BillReminders";
import Pricing from "../pages/Landing/components/Pricing";
import NotFound from "../components/ErrorPages/NotFound";
import Reports from "../pages/Reports/Reports";
import Budget from "../pages/Budget/Budget";
import Users from "../admin_pages/Users/Users";
import BlogAdministration from "../pages/BlogAdministration/BlogAdministration";
// import RequireUser from '../components/requireUser';
// import HomePage from '../pages/home.page';
// import LoginPage from '../pages/login.page';
// import ProfilePage from '../pages/profile.page';

const Loadable =
  (Component: React.ComponentType<any>) => (props: JSX.IntrinsicAttributes) =>
  (
    <Suspense fallback={<FullScreenLoader />}>
      <Component {...props} />
    </Suspense>
  );

// const RegisterPage = Loadable(lazy(() => import('../pages/register.page')));
const UnauthorizePage = Loadable(
  lazy(() => import("../middleware/UnauthorizedPage"))
);
// const EmailVerificationPage = Loadable(
//   lazy(() => import('../pages/verifyemail.page'))
// );

const landingRoutes: RouteObject = {
  path: "*",
  element: <LandingLayout />,
  children: [
    {
      path: "",
      index: true,
      element: <Landing />,
    },
    {
      path: "pricing",
      index: true,
      element: <Pricing />,
    },
    {
      path: "blog",
      index: true,
      element: <Blog />,
    },
  ],
};

const authRoutes: RouteObject = {
  path: "*",
  element: <LandingLayout />,
  children: [
    {
      path: "login",
      element: <SignIn />,
    },
    {
      path: "register/:number?",
      element: <SignUp />,
    },
    // {
    //   path: 'verifyemail',
    //   element: <EmailVerificationPage />,
    //   children: [
    //     {
    //       path: ':verificationCode',
    //       element: <EmailVerificationPage />,
    //     },
    //   ],
    // },
  ],
};

const userRoutes: RouteObject = {
  path: "*",
  element: <Layout />,
  children: [
    {
      // index: true,
      path: "dashboard",
      element: <RequireUser allowedRoles={["user"]} />,
      children: [
        {
          path: "",
          element: <Home />,
        },
      ],
    },
    {
      // index: true,
      path: "profile-settings",
      element: <RequireUser allowedRoles={["user"]} />,
      children: [
        {
          path: "",
          element: <Profile />,
        },
      ],
    },
    {
      path: "accounts",
      element: <RequireUser allowedRoles={["user"]} />,
      children: [
        {
          path: "",
          element: <Accounts />,
        },
        {
          path: ":id",
          element: <AccountPage />,
        },
      ],
    },
    {
      path: "transactions",
      element: <RequireUser allowedRoles={["user"]} />,
      children: [
        {
          path: "",
          element: <Transactions />,
        },
      ],
    },
    {
      path: "scheduled-transactions",
      element: <RequireUser allowedRoles={["user"]} />,
      children: [
        {
          path: "",
          element: <RecurringTransactions />,
        },
      ],
    },
    {
      path: "bill-reminders",
      element: <RequireUser allowedRoles={["user"]} />,
      children: [
        {
          path: "",
          element: <BillReminders />,
        },
      ],
    },
    {
      path: "categories",
      element: <RequireUser allowedRoles={["user"]} />,
      children: [
        {
          path: "",
          element: <Categories />,
        },
      ],
    },
    {
      path: "reports",
      element: <RequireUser allowedRoles={["user"]} />,
      children: [
        {
          path: "",
          element: <Reports />,
        },
      ],
    },
    {
      path: "budget",
      element: <RequireUser allowedRoles={["user"]} />,
      children: [
        {
          path: "",
          element: <Budget />,
        },
      ],
    },
    {
      path: "unauthorized",
      element: <UnauthorizePage />,
    },
  ],
};

const adminRoutes: RouteObject = {
  path: "admin",
  element: <Layout />,
  children: [
    {
      // index: true,
      path: "users",
      element: <RequireUser allowedRoles={["admin"]} />,
      children: [
        {
          path: "",
          element: <Users />,
        },
      ],
    },
    {
      // index: true,
      path: "blog",
      element: <RequireUser allowedRoles={["admin"]} />,
      children: [
        {
          path: "",
          element: <BlogAdministration />,
        },
      ],
    },
  ],
};

const notFoundRoute: RouteObject = {
  path: "*",
  element: <LandingLayout />,
  children: [
    {
      path: "*",
      index: true,
      element: <NotFound />,
    },
  ],
};

const routes: RouteObject[] = [
  landingRoutes,
  authRoutes,
  userRoutes,
  adminRoutes,
  notFoundRoute,
];

export default routes;

// Old routes variant
// <BrowserRouter>
//   <Routes>
//     <Route element={<Layout />}>
//       <Route index path="/" element={<Home />} />
//       <Route path="/Blog">
//         <Route index element={<Blog />} />
//         <Route path=":number" element={<Blog />} />
//       </Route>
//       <Route path="*" element={<NotFound />} />
//     </Route>
//     <Route element={<AuthLayout />}>
//       <Route path="/auth">
//         <Route index element={<SignIn />} />
//         <Route path="*" element={<SignIn />} />
//       </Route>
//     </Route>
//     <Route path="*" element={<NotFound />} />
//   </Routes>
// </BrowserRouter>
