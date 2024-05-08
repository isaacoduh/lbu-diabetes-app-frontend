import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { MountainIcon } from "lucide-react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const history = useHistory();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post("http://localhost:2000/login", formData)
        .then((response) => {
          localStorage.setItem("token", response.data.token);
          history.push("/dashboard");
        });
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      <div className="mb-1">
        <img src="https://upload.wikimedia.org/wikipedia/en/e/e1/Leeds_Beckett_University_-_New_logo.png" />
      </div>
      <div className="text-center mb-8">
        {/* <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Welcome to Leeds Beckett University.
        </h1> */}
        <p className="text-gray-600 dark:text-gray-400">
          Unlock the power of our innovative platform.
        </p>
      </div>
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-8 w-full max-w-md">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="Enter your email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              placeholder="Enter your password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <Button className="w-full" type="submit">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
