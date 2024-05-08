import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { LogOutIcon } from "lucide-react";
const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const history = useHistory();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:2000/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        history.push("/login");
      }
    };
    fetchData();
  }, []);

  const handleLogout = () => {
    try {
      localStorage.clear();
      history.push("/login");
    } catch (error) {}
  };

  const handleTopUpCredits = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:2000/create-checkout-session",
        {
          amount: 10,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const paymentUrl = response?.data?.paymentUrl;
      // redirect to stripe checkout page
      window.location.href = paymentUrl;
    } catch (error) {
      console.error("error creating checkout session:", error);
    }
  };

  return (
    <div>
      {userData && (
        <div className="flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-br from-[#6B46C1] to-[#4A5568] p-4 sm:p-6 md:p-8">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-slate-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage alt="User avatar" src="/placeholder-user.jpg" />
                  <AvatarFallback>
                    {userData.name
                      .split(" ")
                      .map((name) => name[0].toUpperCase())
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50">
                    {userData.name}
                  </h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {userData.email}
                  </p>
                </div>
              </div>
              <Badge
                className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                variant="secondary"
              >
                Pro
              </Badge>
            </div>
            <Separator className="my-6" />
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="text-4xl font-bold text-purple-600 dark:text-purple-400">
                {userData.credits}
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Credits Remaining
              </p>
            </div>
            <Separator className="my-6" />
            <div className="grid grid-cols-3 gap-4">
              <a
                href="/predict"
                className="inline-flex w-full items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-xs font-small text-white shadow transition-colors hover:bg-gray-900/90 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus:ring-gray-300 dark:focus:ring-offset-gray-950"
              >
                Start a Session
              </a>
              <Button
                className="bg-white text-slate-900 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-700"
                variant="outline"
                onClick={handleTopUpCredits}
              >
                Top Up Credits
              </Button>
              <Button
                className="bg-white text-slate-900 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-700"
                variant="outline"
                onClick={handleLogout}
              >
                <LogOutIcon />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
