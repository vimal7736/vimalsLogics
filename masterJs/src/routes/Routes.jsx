import {createBrowserRouter} from "react-router";
import LoginForm from "../components/auth/LoginForm";
import RegForm from "../components/auth/RegForm";
import ProtectedRoute from "../components/ProtectedRoute";
import App from "../App";
import ControlledVsUncontrolled from "../pages/Home";
import AdminDash from "../pages/AdminDash";
import MangerDash from "../pages/MangerDash";
import CustomerDash from "../pages/CustomerDash";
import Login from "../components/Login";
import Dashboard from "../pages/Dashboard";
import Table from "../pages/Table";
import DashboardHeader from "../pages/FrameDashboard";
import LoanApplication from "../pages/ThreeStepLoan";
import Formast from "../pages/Formast";
import Memoize from "../pages/Memoize";
import TransactionTable from "../pages/TransactionTable";


let router = createBrowserRouter([
    {
        path: "/",
        element:<App/>
    },
    {
        path: "/ControlledVsUncontrolled",
        element:<ControlledVsUncontrolled/>
    },
    {
        path: "/login",
        Component: Login,
    },
    {
        path: "/register",
        Component: RegForm,
    },
    {
        path: "/admin",
        Component: AdminDash,
    },
    {
        path: "/manager",
        Component: MangerDash,
    },
    {
        path: "/dash",
        Component: Dashboard,
    },
    {
        path: "/customer",
        Component: CustomerDash,
    },
    {
        path: "/table",
        Component: Table,
    },
    {
        path: "/DashboardHeader",
        Component: DashboardHeader,
    },
    {
        path: "/LoanApplication",
        Component: LoanApplication,
    },
    {
        path: "/Formast",
        Component: Formast,
    },
    {
        path: "/Memoize",
        Component: Memoize,
    },
    {
        path: "/TransactionTable",
        Component: TransactionTable,
    },
]);

export default router;
