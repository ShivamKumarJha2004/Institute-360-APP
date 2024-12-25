import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const PaymentHistory = () => {
  const navigate = useNavigate();
  const [payment, setPayment] = useState([]);
  
  useEffect(() => {
    getPaymentDetails();
  }, []);

  // const handleEditStudent = () => {
  //   navigate(`/dashboard/update-student/${studentDetails._id}`, { state: { studentDetails } });
  // };

  const getPaymentDetails = async () => {
    try {
      const response = await axios.get(
        `https://institute-mangement-system-backedd.onrender.com/payment//get-payment/`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    
      
      if (response.data.success) {
        setPayment(response.data.allpayment.reverse()); 
        
      } else {
        toast.error(response.data.message || "Failed to fetch details");
      }
    } catch (error) {
      toast.error(error.message || "An error occurred while fetching details.");
    }
  };

 
    return(<div>
<section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Payment Details</h2>
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-200">
                
                  <th className="px-4 py-2 border">Full Name</th>
                  <th className="px-4 py-2 border">Phone</th>
                  <th className="px-4 py-2 border">Amount</th>
                  <th className="px-4 py-2 border">Remark</th>
                  <th className="px-4 py-2 border">Date</th>
                </tr>
              </thead>
              <tbody>
                {payment.map((pay, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="px-2 py-2 border">{pay.fullname}</td>
                    <td className="px-4 py-2 border">{pay.phone}</td>
                    <td className="px-4 py-2 border">₹{pay.amount}</td>
                    <td className="px-4 py-2 border">{pay.remark}</td>
                    <td className="px-4 py-2 border">{new Date(pay.createdAt).toLocaleDateString()}</td>
                    
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
    </div>
    )
  }
  export default PaymentHistory;

