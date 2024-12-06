import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function DailyIssueUser() {
  const [dailyIssues, setDailyIssues] = useState([]);
  const [totals, setTotals] = useState({});
  const navigate = useNavigate();
  const [idFiOptions, setIdFiOptions] = useState([]);
  const [lineOptions, setLineOptions] = useState([]);

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [filters, setFilters] = useState({
    ID_FI: "",
    ID_FF: "",
    LINE: "",
    MODEL: "",
    PART: "",
    COMPONENT: "",
    DATE: getCurrentDate(),
    TIME: "",
  });

  useEffect(() => {
    axios
      .post("http://172.16.206.4:2001/fidailyissue", filters)
      .then((response) => {
        const { data, totals } = response.data;
        setDailyIssues(data);
        setTotals(totals);

        // Extract unique LINE options from the fetched data
        const uniqueLines = [...new Set(data.map((issue) => issue.LINE))];
        setLineOptions(uniqueLines);

        // Extract unique ID_FI options from the fetched data
        const uniqueIdFis = [...new Set(data.map((issue) => issue.ID_FI))];
        setIdFiOptions(uniqueIdFis);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [filters]);


  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  console.log("Data :", totals);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 text-gray-800">
      <div className="max-w-full mx-auto py-3 px-4 sm:px-6 lg:px-8 w-full overflow-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-3xl font-semibold text-gray-800">Daily Issues</h2>
          <button
            type="button"
            className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-medium rounded-md shadow hover:from-indigo-600 hover:to-indigo-700 transition duration-200 ease-in-out focus:outline-none focus:ring focus:ring-indigo-200"
            onClick={() => {
              const token = localStorage.getItem("token");
              if (token) {
                window.history.back();
              } else {
                console.log("No token found");
              }
            }}
          >
            Back
          </button>
        </div>

        <p className="text-gray-500 mb-6">
          Overview of daily issues data for FI items.
        </p>

        <div className="flex items-center justify-end gap-4 mb-6">
          <div>
            <label
              htmlFor="date"
              className="block text-gray-700 font-medium mb-1"
            >
              Date
            </label>
            <input
              type="date"
              id="date"
              value={filters.DATE}
              onChange={(e) => setFilters({ ...filters, DATE: e.target.value })}
              className="w-32 border border-gray-300 rounded-md px-3 py-2 text-gray-700 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="id_fi" className="block text-gray-700 font-medium mb-1">
              ID FI
            </label>
            <select
              id="id_fi"
              value={filters.ID_FI}
              onChange={(e) => setFilters({ ...filters, ID_FI: e.target.value })}
              className="w-32 border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:outline-none"
            >
              <option value="">All</option>
              {idFiOptions.map((idFi) => (
                <option key={idFi} value={idFi}>
                  {idFi}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="line"
              className="block text-gray-700 font-medium mb-1"
            >
              Line
            </label>
            <select
              id="line"
              value={filters.LINE}
              onChange={(e) => setFilters({ ...filters, LINE: e.target.value })}
              className="w-32 border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:outline-none"
            >
              <option value="">All</option>
              {lineOptions.map((line) => (
                <option key={line} value={line}>
                  {line}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mb-6 text-gray-700">
          <div className="p-4 rounded-lg shadow-md bg-white">
            <p className="text-sm font-medium">PASS</p>
            <p className="text-lg font-semibold">
              {totals?.PASS_TOTAL?.toLocaleString()}
            </p>
          </div>
          <div className="p-4 rounded-lg shadow-md bg-white">
            <p className="text-sm font-medium">ALIGNMENT</p>
            <p className="text-lg font-semibold">
              {totals?.ALIGNMENT_TOTAL?.toLocaleString()}
            </p>
          </div>
          <div className="p-4 rounded-lg shadow-md bg-white">
            <p className="text-sm font-medium">DAMAGE</p>
            <p className="text-lg font-semibold">
              {totals?.DAMAGE_TOTAL?.toLocaleString()}
            </p>
          </div>
          <div className="p-4 rounded-lg shadow-md bg-white">
            <p className="text-sm font-medium">DIRTY</p>
            <p className="text-lg font-semibold">
              {totals?.DIRTY_TOTAL?.toLocaleString()}
            </p>
          </div>
          <div className="p-4 rounded-lg shadow-md bg-white">
            <p className="text-sm font-medium">INCONSISTENT</p>
            <p className="text-lg font-semibold">
              {totals?.INCONSISTENT_STITCHING_TOTAL?.toLocaleString()}
            </p>
          </div>
          <div className="p-4 rounded-lg shadow-md bg-white">
            <p className="text-sm font-medium">OTHERS</p>
            <p className="text-lg font-semibold">
              {totals?.OTHERS_TOTAL?.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="mt-6 shadow overflow-hidden border border-gray-200 rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  DATE - TIME
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID FI
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID FF
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  NAMA FF
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  LINE
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  MODEL
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  COMPONENT
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  PART
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  MAIN ISSUE
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ISSUE
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {dailyIssues.map((issue, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatDate(issue.DATE)} - {issue.TIME.split(".")[0]}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {issue.ID_FI}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {issue.ID_FF}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {issue.NAMA_FF}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {issue.LINE}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {issue.MODEL}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {issue.COMPONENT}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {issue.PART}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {issue.MAIN_ISSUE}
                  </td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 ${issue.SUB_STATUS === "PASS"
                        ? "bg-green-600 text-white"
                        : "bg-red-600 text-white"
                      } rounded-md`}
                  >
                    {issue.SUB_STATUS}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
