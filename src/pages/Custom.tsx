import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Mail, Download, Share2 } from "lucide-react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const Custom = () => {
  const [formData, setFormData] = useState({
    invoiceNumber: "",
    companyLogo: null,
    billTo: {
      name: "",
      phone: "",
      email: "", // Added email field
      address: "",
    },
    from: {
      name: "",
      phone: "",
      email: "", // Added email field
      address: "",
    },
    date: "",
    items: [{ description: "", quantity: 1, price: 0 }],
    notes: "",
    bankDetails: {
      bankName: "",
      accountNumber: "",
      email: "",
    },
  });

  const [showPreview, setShowPreview] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e, section, field) => {
    if (section) {
      setFormData({
        ...formData,
        [section]: {
          ...formData[section],
          [field]: e.target.value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [field]: e.target.value,
      });
    }
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          companyLogo: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { description: "", quantity: 1, price: 0 }],
    });
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index][field] = value;
    setFormData({
      ...formData,
      items: newItems,
    });
  };

  const calculateTotal = () => {
    return formData.items.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    ).toFixed(2);
  };

  // Download PDF functionality
  const downloadPDF = async () => {
    setIsLoading(true);
    const invoice = document.getElementById("invoice-preview");
    
    try {
      const canvas = await html2canvas(invoice, {
        scale: 2,
        useCORS: true,
      });
      
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgProps = pdf.getImageProperties(imgData);
      const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      // Handle multiple pages if content is too long
      let heightLeft = imgHeight;
      let position = 0;
      
      pdf.addImage(imgData, "PNG", 0, position, pdfWidth, imgHeight);
      heightLeft -= pdfHeight;
      
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, pdfWidth, imgHeight);
        heightLeft -= pdfHeight;
      }
      
      pdf.save(`invoice-${formData.invoiceNumber || "new"}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Error generating PDF. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Share functionality (using Web Share API or fallback)
  const shareInvoice = async () => {
    setIsLoading(true);
    const invoice = document.getElementById("invoice-preview");
    
    try {
      const canvas = await html2canvas(invoice, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");
      
      if (navigator.share) {
        const blob = await fetch(imgData).then(res => res.blob());
        const file = new File([blob], `invoice-${formData.invoiceNumber || "new"}.png`, {
          type: "image/png",
        });
        
        await navigator.share({
          title: `Invoice ${formData.invoiceNumber}`,
          text: "Check out this invoice",
          files: [file],
        });
      } else {
        // Fallback: Copy URL to clipboard
        navigator.clipboard.writeText(imgData);
        alert("Image URL copied to clipboard!");
      }
    } catch (error) {
      console.error("Error sharing invoice:", error);
      alert("Error sharing invoice. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Email functionality (basic mailto link)
  const emailInvoice = async () => {
    setIsLoading(true);
    const invoice = document.getElementById("invoice-preview");
    
    try {
      const canvas = await html2canvas(invoice, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");
      
      const subject = `Invoice ${formData.invoiceNumber || "New Invoice"}`;
      const body = `Please find the invoice attached.\n\nYou can also view it here: ${imgData}\n\nFrom: ${formData.from.name}\nTotal: $${calculateTotal()}`;
      const mailtoLink = `mailto:${formData.billTo.email || ""}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      
      window.location.href = mailtoLink;
    } catch (error) {
      console.error("Error preparing email:", error);
      alert("Error preparing email. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const InvoicePreview = () => (
    <div id="invoice-preview" className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-blue-900">INVOICE</h1>
          <p className="text-gray-600">No: {formData.invoiceNumber}</p>
          <p className="text-gray-600">Date: {formData.date || new Date().toLocaleDateString()}</p>
        </div>
        {formData.companyLogo && (
          <img
            src={formData.companyLogo}
            alt="Company Logo"
            className="h-16 object-contain"
          />
        )}
      </div>

      <div className="grid grid-cols-2 gap-8 mb-8">
        <div>
          <h2 className="font-semibold mb-2">Bill To:</h2>
          <p>{formData.billTo.name}</p>
          <p>{formData.billTo.phone}</p>
          <p>{formData.billTo.email}</p>
          <p>{formData.billTo.address}</p>
        </div>
        <div>
          <h2 className="font-semibold mb-2">From:</h2>
          <p>{formData.from.name}</p>
          <p>{formData.from.phone}</p>
          <p>{formData.from.email}</p>
          <p>{formData.from.address}</p>
        </div>
      </div>

      <div className="mb-8">
        <table className="w-full">
          <thead>
            <tr className="bg-blue-900 text-white">
              <th className="p-2 text-left">Description</th>
              <th className="p-2 text-right">Qty</th>
              <th className="p-2 text-right">Price</th>
              <th className="p-2 text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {formData.items.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="p-2">{item.description}</td>
                <td className="p-2 text-right">{item.quantity}</td>
                <td className="p-2 text-right">₹{item.price}</td>
                <td className="p-2 text-right">
                  ₹{(item.quantity * item.price).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end mb-8">
        <div className="w-64">
          <div className="flex justify-between p-2 bg-blue-900 text-white">
            <span>Total:</span>
            <span>₹{calculateTotal()}</span>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="font-semibold mb-2">Notes:</h2>
        <p>{formData.notes || "Thank you for your business!"}</p>
      </div>

      <div>
        <h2 className="font-semibold mb-2">Payment Information:</h2>
        <p>Bank: {formData.bankDetails.bankName}</p>
        <p>Account: {formData.bankDetails.accountNumber}</p>
        <p>Email: {formData.bankDetails.email}</p>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Invoice Generator</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Invoice Number</Label>
                <Input
                  value={formData.invoiceNumber}
                  onChange={(e) => handleInputChange(e, null, "invoiceNumber")}
                  placeholder="INV-12345"
                />
              </div>
              <div>
                <Label>Date</Label>
                <Input
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange(e, null, "date")}
                />
              </div>
            </div>

            <div>
              <Label>Company Logo</Label>
              <Input
                type="file"
                onChange={handleLogoUpload}
                accept="image/*"
              />
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-2">Bill To</h3>
                <div className="grid gap-2">
                  <Input
                    placeholder="Name"
                    value={formData.billTo.name}
                    onChange={(e) => handleInputChange(e, "billTo", "name")}
                  />
                  <Input
                    placeholder="Phone"
                    value={formData.billTo.phone}
                    onChange={(e) => handleInputChange(e, "billTo", "phone")}
                  />
                  <Input
                    placeholder="Email"
                    value={formData.billTo.email}
                    onChange={(e) => handleInputChange(e, "billTo", "email")}
                  />
                  <Input
                    placeholder="Address"
                    value={formData.billTo.address}
                    onChange={(e) => handleInputChange(e, "billTo", "address")}
                  />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">From</h3>
                <div className="grid gap-2">
                  <Input
                    placeholder="Name"
                    value={formData.from.name}
                    onChange={(e) => handleInputChange(e, "from", "name")}
                  />
                  <Input
                    placeholder="Phone"
                    value={formData.from.phone}
                    onChange={(e) => handleInputChange(e, "from", "phone")}
                  />
                  <Input
                    placeholder="Email"
                    value={formData.from.email}
                    onChange={(e) => handleInputChange(e, "from", "email")}
                  />
                  <Input
                    placeholder="Address"
                    value={formData.from.address}
                    onChange={(e) => handleInputChange(e, "from", "address")}
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Items</h3>
              {formData.items.map((item, index) => (
                <div key={index} className="grid grid-cols-3 gap-2 mb-2">
                  <Input
                    placeholder="Description"
                    value={item.description}
                    onChange={(e) =>
                      handleItemChange(index, "description", e.target.value)
                    }
                  />
                  <Input
                    type="number"
                    placeholder="Quantity"
                    value={item.quantity}
                  
                    onChange={(e) =>
                      handleItemChange(
                        index,
                        "quantity",
                        parseInt(e.target.value) || 1
                      )
                    }
                  />
                  <Input
                    type="number"
                    placeholder="Price"
                    value={item.price}
                    min="0"
                    
                    onChange={(e) =>
                      handleItemChange(
                        index,
                        "price",
                        parseFloat(e.target.value) || 0
                      )
                    }
                  />
                </div>
              ))}
              <Button onClick={addItem} variant="outline" className="mt-2">
                Add Item
              </Button>
            </div>

            <div>
              <Label>Notes</Label>
              <Input
                value={formData.notes}
                onChange={(e) => handleInputChange(e, null, "notes")}
                placeholder="Additional notes..."
              />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Payment Information</h3>
              <div className="grid gap-2">
                <Input
                  placeholder="Bank Name"
                  value={formData.bankDetails.bankName}
                  onChange={(e) =>
                    handleInputChange(e, "bankDetails", "bankName")
                  }
                />
                <Input
                  placeholder="Account Number"
                  value={formData.bankDetails.accountNumber}
                  onChange={(e) =>
                    handleInputChange(e, "bankDetails", "accountNumber")
                  }
                />
                <Input
                  placeholder="Email"
                  value={formData.bankDetails.email}
                  onChange={(e) =>
                    handleInputChange(e, "bankDetails", "email")
                  }
                />
              </div>
            </div>

            <div className="flex gap-4">
              <Button 
                onClick={() => setShowPreview(!showPreview)}
                disabled={isLoading}
              >
                {showPreview ? "Edit Invoice" : "Preview Invoice"}
              </Button>
              <Button
                variant="outline"
                onClick={downloadPDF}
                disabled={!showPreview || isLoading}
              >
                <Download className="mr-2 h-4 w-4" />
                {isLoading ? "Downloading..." : "Download PDF"}
              </Button>
              <Button
                variant="outline"
                onClick={shareInvoice}
                disabled={!showPreview || isLoading}
              >
                <Share2 className="mr-2 h-4 w-4" />
                {isLoading ? "Sharing..." : "Share"}
              </Button>
              <Button
                variant="outline"
                onClick={emailInvoice}
                disabled={!showPreview || isLoading || !formData.billTo.email}
              >
                <Mail className="mr-2 h-4 w-4" />
                {isLoading ? "Preparing..." : "Email"}
              </Button>
            </div>
          </div>

          {showPreview && (
            <div className="mt-8">
              <InvoicePreview />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Custom;