import React, { useState } from "react";
import axios from "axios";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

const ConfidenceLevel = ({ score }) => {
  const confidenceLevel = score >= 0.5 ? "High" : "Low";

  return (
    <div className="flex items-center justify-between">
      <span>Confidence Level:</span>
      <span className="font-semibold">{confidenceLevel}</span>
      <span className="ml-2">Score: {score.toFixed(2)}</span>
    </div>
  );
};

const PredictionForm = () => {
  //   const initialFormData = {
  //     Pregnancies: 0,
  //     Glucose: 0,
  //     BloodPressure: 0,
  //     SkinThickness: 0,
  //     Insulin: 0,
  //     BMI: 0,
  //     DiabetesPedigreeFunction: 0,
  //     Age: 0,
  //   };
  const initialFormData = {
    Pregnancies: 8,
    Glucose: 132,
    BloodPressure: 66,
    SkinThickness: 4,
    Insulin: 205,
    BMI: 45.7,
    DiabetesPedigreeFunction: 1.607,
    Age: 46,
  };
  const [formData, setFormData] = useState(initialFormData);

  const [predictionResult, setPredictionResult] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setPredictionResult(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:2000/predict",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPredictionResult(response.data);
    } catch (error) {
      console.error("Prediction error:", error);
    }
  };

  return (
    <div className="container">
      <div className="grid w-full max-w-6xl grid-cols-1 gap-8 px-4 py-12 md:grid-cols-2 md:gap-12 md:px-6 lg:py-16 xl:py-20">
        <div className="space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Diabetes Prediction
            </h1>
            <p className="text-gray-500 dark:text-gray-400 md:text-xl">
              Input Health Metrics and a get prediction on the likelihood of
              having diabetes
            </p>
          </div>
          <form className="grid gap-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="pregnancies">Pregnancies</Label>
                <Input
                  id="pregnancies"
                  placeholder="Number of pregnancies"
                  type="number"
                  value={formData.Pregnancies}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="glucose">Glucose</Label>
                <Input
                  id="glucose"
                  placeholder="Glucose level"
                  type="number"
                  value={formData.Glucose}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="blood-pressure">Blood Pressure</Label>
                <Input
                  id="blood-pressure"
                  placeholder="Blood pressure"
                  type="number"
                  value={formData.BloodPressure}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="skin-thickness">Skin Thickness</Label>
                <Input
                  id="skin-thickness"
                  placeholder="Skin thickness"
                  type="number"
                  value={formData.SkinThickness}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="insulin">Insulin</Label>
                <Input
                  id="insulin"
                  placeholder="Insulin level"
                  type="number"
                  value={formData.Insulin}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bmi">BMI</Label>
                <Input
                  id="bmi"
                  placeholder="Body Mass Index"
                  type="number"
                  value={formData.BMI}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="diabetes-pedigree">
                  Diabetes Pedigree Function
                </Label>
                <Input
                  id="diabetes-pedigree"
                  placeholder="Diabetes pedigree function"
                  type="number"
                  value={formData.DiabetesPedigreeFunction}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  placeholder="Age"
                  type="number"
                  value={formData.Age}
                  onChange={handleChange}
                />
              </div>
            </div>
            <Button className="w-full" type="submit" onClick={handleSubmit}>
              Predict Diabetes
            </Button>
            <Button className="w-full" type="submit" variant="secondary">
              Reset Form
            </Button>
          </form>
        </div>
        <div className="space-y-6 rounded-lg bg-gray-100 p-6 dark:bg-gray-800 md:p-8">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight">
              Prediction Result
            </h2>
            <p className="tex-gray-500 dark:text-gray-400">
              Based on the information you provided, here is the predicted
              likelihood of diabetes.
            </p>
          </div>
          {predictionResult !== null && (
            <div className="space-y-4">
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <span>Likelihood of Diabetes:</span>
                  <span
                    className={`font-semibold ${
                      predictionResult.prediction
                        ? "text-red-500"
                        : "text-green-500"
                    }`}
                  >
                    Class{" "}
                    {predictionResult.prediction ? "1 (High Risk)" : "Low Risk"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Prediction Probability:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">
                      Class 0:{" "}
                      {predictionResult.meta.probability_estimates[0].toFixed(
                        2
                      )}
                    </span>
                    <span className="font-semibold">
                      Class 1:{" "}
                      {predictionResult.meta.probability_estimates[1].toFixed(
                        2
                      )}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold">Confidence Levels</span>
                  <div>
                    <p>
                      Class 0:{" "}
                      <ConfidenceLevel
                        score={predictionResult.meta.confidence_scores[0]}
                      />
                    </p>
                    <p>
                      Class 1:{" "}
                      <ConfidenceLevel
                        score={predictionResult.meta.confidence_scores[1]}
                      />
                    </p>
                  </div>
                </div>
                <div>
                  <h4>Recommendations:</h4>
                  <ul>
                    {Object.values(predictionResult.meta?.recommendations).map(
                      (recommendation, index) => (
                        <li key={index}>{recommendation}</li>
                      )
                    )}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PredictionForm;
