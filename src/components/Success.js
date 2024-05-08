import React from "react";
import { CheckIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useHistory, Redirect } from "react-router-dom";
const SuccessPage = () => {
  const history = useHistory();
  const generateOrderNumber = () => {
    return Math.floor(100000 + Math.random() * 900000); // Generates a random 6-digit number
  };
  const formatDate = () => {
    const date = new Date();
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };
  const redirectToDashboard = () => {
    history.push("/dashboard");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 px-4 py-8 dark:bg-gray-950">
      <div className="mx-auto w-full max-w-md rounded-lg bg-white p-8 shadow-lg dark:bg-gray-900">
        <div className="flex flex-col items-center space-y-6">
          <div className="rounded-full bg-green-500 p-4 text-white">
            <CheckIcon className="h-8 w-8" />
          </div>
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-bold">Payment Successful</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Your payment has been processed successfully.
            </p>
          </div>
          <div className="w-full space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-950">
            <div className="flex items-center justify-between">
              <span className="text-gray-500 dark:text-gray-400">Order #</span>
              <span className="font-medium">{generateOrderNumber()}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500 dark:text-gray-400">Amount</span>
              <span className="font-medium">£10.00</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500 dark:text-gray-400">
                Payment Method
              </span>
              <span className="font-medium">Visa ending in 4242</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500 dark:text-gray-400">
                Transaction Date
              </span>
              <span className="font-medium">{formatDate()}</span>
            </div>
          </div>
          <a
            href="/dashboard"
            className="inline-flex w-full items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-gray-900/90 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus:ring-gray-300 dark:focus:ring-offset-gray-950"
          >
            Return to Dashboard
          </a>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
