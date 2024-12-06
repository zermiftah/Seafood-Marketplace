import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function DailyIssueUser() {
  useEffect(() => {
    // Adjust the zoom level of the browser window to 80%
    document.body.style.zoom = "100%";
  }, []);
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
  });

  useEffect(() => {
    axios
      .post("http://172.16.206.4:2001/dailyIssue", filters)
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
    <div className="flex flex-col py-3 items-center justify-center h-screen bg-gray-100 text-gray-900">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 w-full overflow-auto">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-2xl font-semibold text-gray-900">Daily Issues</h2>
          <button
            type="button"
            className="px-3 py-1.5 bg-gradient-to-r from-indigo-600 to-blue-500 text-white font-medium rounded-md shadow-md hover:from-blue-500 hover:to-indigo-700 transition ease-in-out duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-200"
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

        <p className="text-gray-600 mb-4 text-sm">
          Overview of daily issues data for FI items.
        </p>

        <div className="flex items-center justify-end gap-4 mb-5">
          <div>
            <label htmlFor="date" className="block text-gray-700 font-medium mb-0.5">
              Date
            </label>
            <input
              type="date"
              id="date"
              value={filters.DATE}
              onChange={(e) => setFilters({ ...filters, DATE: e.target.value })}
              className="w-28 border border-gray-300 rounded-md px-2 py-1.5 text-gray-800 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="id_fi" className="block text-gray-700 font-medium mb-0.5">
              ID FI
            </label>
            <select
              id="id_fi"
              value={filters.ID_FI}
              onChange={(e) => setFilters({ ...filters, ID_FI: e.target.value })}
              className="w-28 border border-gray-300 rounded-md px-2 py-1.5 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none"
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
            <label htmlFor="line" className="block text-gray-700 font-medium mb-0.5">
              Line
            </label>
            <select
              id="line"
              value={filters.LINE}
              onChange={(e) => setFilters({ ...filters, LINE: e.target.value })}
              className="w-28 border border-gray-300 rounded-md px-2 py-1.5 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none"
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

        <div className="grid grid-cols-3 md:grid-cols-10 gap-4 mb-5 text-gray-800">
          {totals && Object.entries(totals).map(([key, value]) => {
            let backgroundColor;

            if (["KOTOR_TOTAL", "BENANG_PANJANG_TOTAL", "HAIRY_TOTAL"].includes(key)) {
              backgroundColor = "bg-gradient-to-r from-yellow-800 via-yellow-600 to-yellow-800 text-white";
            } else if (["OFF_CENTER_TOTAL", "LINE_UP_TOTAL", "WRINKLE_TOTAL", "X_RAY_TOTAL"].includes(key)) {
              backgroundColor = "bg-gradient-to-r from-purple-800 via-purple-600 to-purple-800 text-white";
            } else if (["NEEDLE_HOLE_TOTAL", "BROKEN_STITCH_TOTAL", "DAMAGE_UPPER_TOTAL", "BROKEN_LACE_TOTAL"].includes(key)) {
              backgroundColor = "bg-gradient-to-r from-red-800 via-red-700 to-red-800 text-white";
            } else if (["SHAPE_TOTAL", "STITCH_MARGIN_TOTAL", "DIFFERENT_COLOR_TOTAL", "OVERLAP_COMPONENT_TOTAL"].includes(key)) {
              backgroundColor = "bg-gradient-to-r from-blue-800 via-blue-700 to-blue-800 text-white";
            } else if (["PASSED_TOTAL"].includes(key)) {
              backgroundColor = "bg-gradient-to-r from-green-900 via-green-700 to-green-500 text-white";
            } else {
              backgroundColor = "bg-gray-200 text-gray-800";  // Default color if not in any category
            }

            return (
              <div key={key} className={`p-3 rounded-lg shadow ${backgroundColor} border border-gray-200`}>
                <p className="text-sm font-semibold">{key.replace(/_/g, ' ')}</p>
                <p className="text-md font-bold">
                  {value?.toLocaleString()}
                </p>
              </div>
            );
          })}

        </div>

        <div className="mt-5 shadow overflow-hidden border border-gray-300 rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr className="sticky top-0 ">
                <th className="sticky top-0 px-4 py-2 text-center text-sm font-semibold text-gray-800 uppercase tracking-wider">
                  DATE - TIME
                </th>
                <th className="px-4 py-2 text-center text-sm font-semibold text-gray-800 uppercase tracking-wider">
                  ID FI
                </th>
                <th className="px-4 py-2 text-center text-sm font-semibold text-gray-800 uppercase tracking-wider">
                  NAMA FI
                </th>
                <th className="px-4 py-2 text-center text-sm font-semibold text-gray-800 uppercase tracking-wider">
                  ID FF
                </th>
                <th className="px-4 py-2 text-center text-sm font-semibold text-gray-800 uppercase tracking-wider">
                  NAMA FF
                </th>
                <th className="px-4 py-2 text-center text-sm font-semibold text-gray-800 uppercase tracking-wider">
                  LINE
                </th>
                <th className="px-4 py-2 text-center text-sm font-semibold text-gray-800 uppercase tracking-wider">
                  MODEL
                </th>
                <th className="px-4 py-2 text-center text-sm font-semibold text-gray-800 uppercase tracking-wider">
                  COMPONENT
                </th>
                <th className="px-4 py-2 text-center text-sm font-semibold text-gray-800 uppercase tracking-wider">
                  PART
                </th>
                <th className="px-4 py-2 text-center text-sm font-semibold text-gray-800 uppercase tracking-wider">
                  ISSUE
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {dailyIssues.map((issue, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="py-4 px-6 text-center border-b text-gray-800">
                    {(() => {
                      const dateStr = issue.DATE;
                      const months = [
                        'January', 'February', 'March', 'April', 'May', 'June',
                        'July', 'August', 'September', 'October', 'November', 'December'
                      ];
                      const year = dateStr.slice(0, 4);
                      const month = months[parseInt(dateStr.slice(5, 7), 10) - 1];
                      const day = parseInt(dateStr.slice(8, 10), 10);
                      const time = dateStr.slice(11, 19);
                      return `${month} ${day}, ${year} - ${time}`;
                    })()}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-center text-gray-800">
                    {issue.ID_FI}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-center text-gray-800">
                    {issue.NAMA_FI}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-center text-gray-800">
                    {issue.ID_FF}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-center text-gray-800">
                    {issue.NAMA_FF}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-center text-gray-800">
                    {issue.LINE}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-center text-gray-800">
                    {issue.MODEL}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-center text-gray-800">
                    {issue.COMPONENT}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-center text-gray-800">
                    {issue.PART}
                  </td>
                  <td className={`px-4 py-2 whitespace-nowrap text-sm ${["KOTOR", "BENANG PANJANG", "HAIRY"].includes(issue.ISSUE)
                    ? "bg-gradient-to-r from-yellow-800 via-yellow-600 to-yellow-800 text-white"
                    : ["OFF CENTER", "LINE UP", "WRINKLE", "X-RAY"].includes(issue.ISSUE)
                      ? "bg-gradient-to-r from-purple-800 via-purple-700 to-purple-800 text-white"
                      : ["NEEDLE HOLE", "BROKEN STITCH", "DAMAGE UPPER", "BROKEN LACE"].includes(issue.ISSUE)
                        ? "bg-gradient-to-r from-red-800 via-red-700 to-red-800 text-white"
                        : ["SHAPE", "STITCH MARGIN", "DIFFERENT COLOR", "OVERLAP COMPONENT"].includes(issue.ISSUE)
                          ? "bg-gradient-to-r from-blue-800 via-blue-700 to-blue-800 text-white"
                          : "bg-green-800 text-white"  // Default color if not in any category
                    } rounded-md text-center`}>
                    {issue.ISSUE}
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
