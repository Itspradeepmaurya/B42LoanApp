import React, { useState } from 'react';  
import './calender.css';  
import { Calendar, Clock, DollarSign, AlertCircle, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';  

function RepaymentCalendar() {  
  const [selectedPayment, setSelectedPayment] = useState(null);  
  const [showNotification, setShowNotification] = useState(false);  
  const [notificationMessage, setNotificationMessage] = useState('');  
  const [notificationType, setNotificationType] = useState('success');  
  const [paymentHistory, setPaymentHistory] = useState([]);  
  const [payments, setPayments] = useState([  
    {  
      id: '1',  
      date: new Date(2024, 2, 15),  
      dueDate: new Date(2024, 2, 15),  
      amount: 500,  
      status: 'paid',  
      principalAmount: 450,  
      interestAmount: 50,  
      lateFee: 0,  
      paymentMethod: 'Credit Card',  
      transactionId: 'TXN-001',  
      processingDate: new Date(2024, 2, 15)  
    },  
    {  
      id: '2',  
      date: new Date(2024, 2, 28),  
      dueDate: new Date(2024, 2, 28),  
      amount: 500,  
      status: 'overdue',  
      principalAmount: 450,  
      interestAmount: 50,  
      lateFee: 25,  
    },  
    {  
      id: '3',  
      date: new Date(2024, 3, 15),  
      dueDate: new Date(2024, 3, 15),  
      amount: 500,  
      status: 'upcoming',  
      principalAmount: 450,  
      interestAmount: 50,  
      lateFee: 0,  
    },  
    {  
      id: '4',  
      date: new Date(2024, 3, 30),  
      dueDate: new Date(2024, 3, 30),  
      amount: 500,  
      status: 'upcoming',  
      principalAmount: 450,  
      interestAmount: 50,  
      lateFee: 0,  
    }  
  ]);  

  const getStatusColor = (status) => {  
    switch (status) {  
      case 'paid': return 'bg-green-500';  
      case 'overdue': return 'bg-red-500';  
      case 'upcoming': return 'bg-yellow-500';  
      case 'processing': return 'bg-blue-500';  
      default: return 'bg-gray-500';  
    }  
  };  

  const getStatusIcon = (status) => {  
    switch (status) {  
      case 'paid': return <CheckCircle className="w-5 h-5 text-green-500" />;  
      case 'overdue': return <XCircle className="w-5 h-5 text-red-500" />;  
      case 'upcoming': return <AlertTriangle className="w-5 h-5 text-yellow-500" />;  
      case 'processing': return <Clock className="w-5 h-5 text-blue-500" />;  
      default: return null;  
    }  
  };  

  const formatDate = (date) => {  
    return date.toLocaleDateString('en-US', {  
      month: 'long',  
      day: 'numeric',  
      year: 'numeric'  
    });  
  };  

  const formatCurrency = (amount) => {  
    return new Intl.NumberFormat('en-US', {  
      style: 'currency',  
      currency: 'USD'  
    }).format(amount);  
  };  

  const handlePaymentClick = (payment) => {  
    setSelectedPayment(payment);  
  };  

  const showNotificationMessage = (message, type = 'success') => {  
    setNotificationMessage(message);  
    setNotificationType(type);  
    setShowNotification(true);  
    setTimeout(() => setShowNotification(false), 3000);  
  };  

  const handleMakePayment = (payment) => {  
    if (payment.status === 'paid') {  
      showNotificationMessage('This payment has already been processed.', 'warning');  
      return;  
    }  

    // Simulate payment processing  
    const updatedPayments = payments.map(p => {  
      if (p.id === payment.id) {  
        return {  
          ...p,  
          status: 'processing',  
          processingDate: new Date(),  
          paymentMethod: 'Credit Card',  
          transactionId: `TXN-${Math.random().toString(36).substr(2, 9)}`  
        };  
      }  
      return p;  
    });  

    setPayments(updatedPayments);  
    setSelectedPayment(null);  
    showNotificationMessage('Payment processing initiated!');  

    // Simulate payment completion after 2 seconds  
    setTimeout(() => {  
      const completedPayments = updatedPayments.map(p => {  
        if (p.id === payment.id) {  
          return {  
            ...p,  
            status: 'paid',  
            processingDate: new Date()  
          };  
        }  
        return p;  
      });  

      setPayments(completedPayments);  
      setPaymentHistory([  
        ...paymentHistory,  
        {  
          date: new Date(),  
          amount: payment.amount,  
          status: 'paid',  
          transactionId: `TXN-${Math.random().toString(36).substr(2, 9)}`  
        }  
      ]);  
      showNotificationMessage('Payment processed successfully!', 'success');  
    }, 2000);  
  };  

  const handleRequestExtension = (payment) => {  
    if (payment.status === 'paid') {  
      showNotificationMessage('Cannot request extension for paid payments.', 'error');  
      return;  
    }  

    showNotificationMessage('Extension request submitted for review.', 'warning');  
  };  

  return (  
    <div className="main-container">  
      <header>  
        <h1 style={{color:'black'}}>Loan Repayment Calendar</h1>  
        <span>{new Date().toLocaleDateString()}</span>  
      </header>  
      <div className="grid">  
        {/* Payment Schedule */}  
        <div className="box">  
          <h2>Payment Schedule</h2>  
          <div className="space-y-4">  
            {payments.map((payment) => (  
              <div  
                key={payment.id}  
                className="card"  
                onClick={() => handlePaymentClick(payment)}  
              >  
                <div className="flex items-center">  
                  <span className={`status-dot ${getStatusColor(payment.status)}`} />  
                  <span>{formatDate(payment.date)}</span>  
                </div>  
                <div className="flex items-center space-x-3">  
                  {getStatusIcon(payment.status)}  
                  <span className="font-semibold">{formatCurrency(payment.amount)}</span>  
                </div>  
              </div>  
            ))}  
          </div>  
        </div>  

        {/* Payment Details */}  
        <div className="box">  
          <h2>Payment Details</h2>  
          {selectedPayment ? (  
            <div className="space-y-4">  
              <div className="card">  
                <div className="flex justify-between mb-4">  
                  <span className="text-lg font-semibold">{formatCurrency(selectedPayment.amount)}</span>  
                  <div className={`px-3 py-1 rounded-full ${getStatusColor(selectedPayment.status)}`}>  
                    {selectedPayment.status}  
                  </div>  
                </div>  
                <div className="space-y-2">  
                  <p>Due Date: {formatDate(selectedPayment.dueDate)}</p>  
                  <p>Principal Amount: {formatCurrency(selectedPayment.principalAmount)}</p>  
                  <p>Interest Amount: {formatCurrency(selectedPayment.interestAmount)}</p>  
                  {selectedPayment.lateFee > 0 && (  
                    <p className="text-red-400">Late Fee: {formatCurrency(selectedPayment.lateFee)}</p>  
                  )}  
                  {selectedPayment.paymentMethod && (  
                    <p>Payment Method: {selectedPayment.paymentMethod}</p>  
                  )}  
                  {selectedPayment.transactionId && (  
                    <p>Transaction ID: {selectedPayment.transactionId}</p>  
                  )}  
                  <div className="flex space-x-2 mt-4">  
                    <button  
                      onClick={() => handleMakePayment(selectedPayment)}  
                      className={`flex-1 py-2 px-4 rounded-lg transition-colors ${  
                        selectedPayment.status === 'paid'  
                          ? 'bg-gray-500 cursor-not-allowed'  
                          : 'bg-green-500 hover:bg-green-600'  
                      }`}  
                      disabled={selectedPayment.status === 'paid'}  
                    >  
                      {selectedPayment.status === 'paid' ? 'Paid' : 'Make Payment'}  
                    </button>  
                    <button  
                      onClick={() => handleRequestExtension(selectedPayment)}  
                      className={`flex-1 py-2 px-4 rounded-lg transition-colors ${  
                        selectedPayment.status === 'paid'  
                          ? 'bg-gray-500 cursor-not-allowed'  
                          : 'bg-yellow-500 hover:bg-yellow-600'  
                      }`}  
                      disabled={selectedPayment.status === 'paid'}  
                    >  
                      Request Extension  
                    </button>  
                  </div>  
                </div>  
              </div>  
            </div>  
          ) : (  
            <div className="text-center">  
              <p>Select a payment to view details</p>  
            </div>  
          )}  
        </div>  

      </div>  

      {/* Payment History */}  
      {paymentHistory.length > 0 && (  
        <div className="box mt-6">  
          <h2>Payment History</h2>  
          <div className="space-y-2">  
            {paymentHistory.map((history, index) => (  
              <div key={index} className="card flex justify-between">  
                <span>{formatDate(history.date)}</span>  
                <span>{formatCurrency(history.amount)}</span>  
                <span className="text-sm">{history.transactionId}</span>  
              </div>  
            ))}  
          </div>  
        </div>  
      )}  

      {/* Notification */}  
      {showNotification && (  
        <div className={`notification ${notificationType}`}>  
          <AlertCircle className="w-5 h-5" />  
          <span>{notificationMessage}</span>  
        </div>  
      )}  
    </div>  
  );  
}  

export default RepaymentCalendar;