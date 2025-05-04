import React, { useState, useEffect } from "react";
import axios from "axios";

function EmployeePage() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ emp_name: "", department: "" });
  const [isAdding, setIsAdding] = useState(false); // To toggle Add/Edit Form

  useEffect(() => {
    fetchEmployees();
  }, []);

  const getAuthToken = () => {
    // Retrieve token from localStorage (or sessionStorage)
    return localStorage.getItem("access_token");  // Replace with sessionStorage if you prefer
  };

  const fetchEmployees = async () => {
    const token = getAuthToken(); // Assuming you're handling the token correctly
    try {
      const response = await axios.get("http://localhost:8000/api/employees/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      // Access the 'data' field in the response
      if (Array.isArray(response.data.data)) {
        setEmployees(response.data.data);  // Update state with the 'data' field
      } else {
        setError("Data is not in the expected format.");
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to fetch employees.");
    }
    setLoading(false);
  };
  
  const handleAddEmployee = async () => {
    const token = getAuthToken();
    try {
      if (form.id) {
        await handleUpdateEmployee(form); // Call PUT for updating
      } else {
        const response = await axios.post(
          "http://localhost:8000/api/employees/",
          form,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setEmployees([...employees, response.data]);
      }

      setForm({ emp_name: "", department: "" });
      setIsAdding(false);
    } catch (err) {
      console.error(err);
      setError("Failed to add/update employee.");
    }
  };

  const handleUpdateEmployee = async (updatedEmployee) => {
    const token = getAuthToken();
    try {
      const response = await axios.put(
        `http://localhost:8000/api/employees/`,
        updatedEmployee,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedList = employees.map((emp) =>
        emp.id === updatedEmployee.id ? updatedEmployee : emp
      );
      setEmployees(updatedList);
    } catch (err) {
      setError("Failed to update employee.");
    }
  };

  const handleDeleteEmployee = async (id) => {
    const token = getAuthToken();
    try {
      await axios.delete("http://localhost:8000/api/employees/", {
        params: { id },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setEmployees(employees.filter((emp) => emp.id !== id));
    } catch (err) {
      setError("Failed to delete employee.");
    }
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={spinnerStyle}></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div style={styles.pageContainer}>
      <h2 style={styles.pageTitle}>Employee List</h2>
      {error && <div style={styles.error}>{error}</div>}
      
      {/* Add/Edit Employee Button */}
      <div style={styles.buttonContainer}>
        <button
          style={styles.addButton}
          onClick={() => setIsAdding(!isAdding)}
        >
          {isAdding ? "Cancel" : "Add Employee"}
        </button>
      </div>

      {/* Add/Edit Employee Form */}
      {isAdding && (
        <div style={styles.formContainer}>
          <input
            type="text"
            value={form.emp_name}
            onChange={(e) => setForm({ ...form, emp_name: e.target.value })}
            placeholder="Employee Name"
            style={styles.input}
          />
          <input
            type="text"
            value={form.department}
            onChange={(e) => setForm({ ...form, department: e.target.value })}
            placeholder="Department"
            style={styles.input}
          />
          <button
            style={styles.saveButton}
            onClick={handleAddEmployee}
          >
            {form.id ? "Update Employee" : "Save Employee"}
          </button>
        </div>
      )}

      {/* Employee Table */}
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHeader}>
              <th style={styles.tableCell}>ID</th>
              <th style={styles.tableCell}>Name</th>
              <th style={styles.tableCell}>Department</th>
              <th style={styles.tableCell}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.length > 0 ? (
              employees.map((employee) => (
                <tr key={employee.id} style={styles.tableRow}>
                  <td style={styles.tableCell}>{employee.id}</td>
                  <td style={styles.tableCell}>{employee.emp_name}</td>
                  <td style={styles.tableCell}>{employee.department}</td>
                  <td style={styles.tableCell}>
                    <button
                      style={styles.editButton}
                      onClick={() => {
                        setForm({
                          emp_name: employee.emp_name,
                          department: employee.department,
                          id: employee.id,
                        });
                        setIsAdding(true); // Set form to "edit" mode
                      }}
                    >
                      Edit
                    </button>
                    <button
                      style={{ ...styles.deleteButton, marginLeft: "10px" }}
                      onClick={() => handleDeleteEmployee(employee.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={styles.noDataCell}>
                  No employees available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Styling
const styles = {
  pageContainer: {
    fontFamily: "'Roboto', sans-serif",
    backgroundColor: "#f8f9fa",
    padding: "40px",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    maxWidth: "1200px",
    margin: "50px auto",
    overflow: "hidden",
  },
  pageTitle: {
    fontSize: "36px",
    fontWeight: "600",
    marginBottom: "20px",
    color: "#333",
    textAlign: "center",
  },
  buttonContainer: {
    textAlign: "center",
    marginBottom: "20px",
  },
  addButton: {
    backgroundColor: "#007BFF",
    color: "#fff",
    padding: "12px 24px",
    fontSize: "18px",
    borderRadius: "5px",
    cursor: "pointer",
    border: "none",
  },
  formContainer: {
    marginBottom: "30px",
    textAlign: "center",
    padding: "20px",
    borderRadius: "8px",
    backgroundColor: "#f1f1f1",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    maxWidth: "600px",
    margin: "0 auto",
  },
  input: {
    padding: "15px",
    fontSize: "18px",
    width: "100%",
    margin: "10px 0",
    borderRadius: "8px",
    border: "1px solid #ddd",
    boxSizing: "border-box",
  },
  saveButton: {
    backgroundColor: "#28a745",
    color: "#fff",
    padding: "15px 30px",
    fontSize: "18px",
    borderRadius: "8px",
    cursor: "pointer",
    border: "none",
    width: "100%",
    marginTop: "15px",
  },
  tableContainer: {
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    marginTop: "20px",
  },
  tableHeader: {
    backgroundColor: "#007BFF",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "600",
    textAlign: "center",
  },
  tableRow: {
    borderBottom: "1px solid #ddd",
    textAlign: "center",
  },
  tableCell: {
    padding: "15px 20px",  // Increased padding for a wider look
    fontSize: "16px",      // Increased font size for better readability
    color: "#555",
    textAlign: "center",
  },
  noDataCell: {
    textAlign: "center",
    padding: "16px",
    fontSize: "14px",
    color: "#777",
    backgroundColor: "#f4f4f4",
  },
  editButton: {
    backgroundColor: "#ffc107",
    color: "#fff",
    padding: "6px 12px",
    fontSize: "14px",
    borderRadius: "5px",
    cursor: "pointer",
    border: "none",
  },
  deleteButton: {
    backgroundColor: "#dc3545",
    color: "#fff",
    padding: "6px 12px",
    fontSize: "14px",
    borderRadius: "5px",
    cursor: "pointer",
    border: "none",
  },
  error: {
    color: "red",
    fontSize: "16px",
    marginBottom: "20px",
    textAlign: "center",
  },
  loadingContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
};

const spinnerStyle = {
  width: "40px",
  height: "40px",
  border: "6px solid #f3f3f3", 
  borderTop: "6px solid #007BFF", 
  borderRadius: "50%",
  animation: "spin 1s linear infinite",
};


export default EmployeePage;
