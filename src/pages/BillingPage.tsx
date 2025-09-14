import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { getCurrentDayStats } from '@/utils/dataProcessing';
import Billing from '@/components/Billing';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { CreditCard, Download, History, DollarSign, Receipt, FileText, Check, Wallet, Calendar, IndianRupee } from 'lucide-react';

const BillingPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("current");
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");

  // Redirect if not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const currentStats = getCurrentDayStats(user.houseNumber);

  // Mock data for Billing component
  // TODO: Replace with real data from your backend/API
  const mockBillingData = {
    dailyConsumption: currentStats.consumption,
    target: 25.0,
    tolerance: 5.0,
    ratePerKwh: 8.5
  };

  // Mock payment history data
  const paymentHistory = [
    { id: 1, date: '2024-09-10', amount: 45.50, status: 'Paid', consumption: 30.2, billId: 'BILL-001' },
    { id: 2, date: '2024-09-05', amount: 0.00, status: 'No charge', consumption: 22.1, billId: 'BILL-002' },
    { id: 3, date: '2024-08-28', amount: 17.25, status: 'Paid', consumption: 27.8, billId: 'BILL-003' },
    { id: 4, date: '2024-08-20', amount: 0.00, status: 'No charge', consumption: 24.5, billId: 'BILL-004' },
  ];

  // Mock upcoming bills
  const upcomingBills = [
    { date: '2024-09-15', estimatedAmount: 23.50, consumption: 28.0, status: 'Pending' },
    { date: '2024-09-20', estimatedAmount: 0.00, consumption: 24.0, status: 'No charge expected' },
  ];

  const excessConsumption = Math.max(0, mockBillingData.dailyConsumption - (mockBillingData.target + mockBillingData.tolerance));
  const payableAmount = excessConsumption * mockBillingData.ratePerKwh;

  const handlePayment = () => {
    // Mock payment processing
    toast({
      title: "Payment Successful!",
      description: `₹${payableAmount.toFixed(2)} has been paid successfully.`,
    });
    setIsPaymentDialogOpen(false);
  };

  const handleDownloadBill = (billId?: string) => {
    // Mock bill download
    toast({
      title: "Bill Downloaded",
      description: billId ? `Bill ${billId} has been downloaded.` : "Current bill has been downloaded.",
    });
  };

  const handleQuickPayment = () => {
    setIsPaymentDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            House {user.houseNumber} - Billing & Payment
          </h1>
          <p className="text-muted-foreground">
            Manage your energy billing, payments, and view consumption history
          </p>
        </div>

        {/* Quick Payment Card - Only show if there's an amount due */}
        {payableAmount > 0 && (
          <Card className="mb-8 border-orange-200 bg-orange-50/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-700">
                <CreditCard className="h-5 w-5" />
                Payment Due
              </CardTitle>
              <CardDescription>
                You have an outstanding balance for excess consumption
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <p className="text-2xl font-bold text-orange-700">₹{payableAmount.toFixed(2)}</p>
                  <p className="text-sm text-muted-foreground">
                    For {excessConsumption.toFixed(1)} kWh excess consumption
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleDownloadBill()}>
                    <Download className="h-4 w-4 mr-2" />
                    Download Bill
                  </Button>
                  <Button size="sm" onClick={handleQuickPayment}>
                    <CreditCard className="h-4 w-4 mr-2" />
                    Pay Now
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tabbed Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="current" className="flex items-center gap-2">
              <Receipt className="h-4 w-4" />
              Current Bill
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2">
              <History className="h-4 w-4" />
              Payment History
            </TabsTrigger>
            <TabsTrigger value="upcoming" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Upcoming
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Billing Settings
            </TabsTrigger>
          </TabsList>

          {/* Current Bill Tab */}
          <TabsContent value="current" className="space-y-6">
            <Billing
              houseNumber={user.houseNumber}
              dailyConsumption={mockBillingData.dailyConsumption}
              target={mockBillingData.target}
              tolerance={mockBillingData.tolerance}
              ratePerKwh={mockBillingData.ratePerKwh}
            />
          </TabsContent>

          {/* Payment History Tab */}
          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <History className="h-5 w-5" />
                  Payment History
                </CardTitle>
                <CardDescription>
                  Your recent billing and payment transactions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-2">Bill ID</th>
                        <th className="text-left py-3 px-2">Date</th>
                        <th className="text-left py-3 px-2">Consumption</th>
                        <th className="text-right py-3 px-2">Amount</th>
                        <th className="text-center py-3 px-2">Status</th>
                        <th className="text-center py-3 px-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paymentHistory.map((payment) => (
                        <tr key={payment.id} className="border-b hover:bg-muted/50">
                          <td className="py-3 px-2 font-medium">{payment.billId}</td>
                          <td className="py-3 px-2">{payment.date}</td>
                          <td className="py-3 px-2">{payment.consumption} kWh</td>
                          <td className="py-3 px-2 text-right font-medium">
                            ₹{payment.amount.toFixed(2)}
                          </td>
                          <td className="py-3 px-2 text-center">
                            <Badge variant={payment.status === 'Paid' ? 'default' : 'secondary'}>
                              {payment.status}
                            </Badge>
                          </td>
                          <td className="py-3 px-2 text-center">
                            <div className="flex gap-1 justify-center">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleDownloadBill(payment.billId)}
                              >
                                <Download className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <FileText className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Upcoming Bills Tab */}
          <TabsContent value="upcoming" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Upcoming Bills
                </CardTitle>
                <CardDescription>
                  Estimated bills based on current consumption patterns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingBills.map((bill, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">{bill.date}</p>
                        <p className="text-sm text-muted-foreground">
                          Estimated consumption: {bill.consumption} kWh
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">₹{bill.estimatedAmount.toFixed(2)}</p>
                        <Badge variant="outline">{bill.status}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Billing Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Billing Settings
                </CardTitle>
                <CardDescription>
                  Configure your billing preferences and payment methods
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3">Current Rate Structure</h4>
                    <div className="space-y-2 text-sm">
                      <p><strong>Daily Target:</strong> {mockBillingData.target} kWh</p>
                      <p><strong>Tolerance:</strong> {mockBillingData.tolerance} kWh</p>
                      <p><strong>Rate per excess kWh:</strong> ₹{mockBillingData.ratePerKwh}</p>
                      <p><strong>Billing cycle:</strong> Daily</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-3">Payment Methods</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-2">
                          <CreditCard className="h-4 w-4" />
                          <span className="text-sm">Card ending in 1234</span>
                        </div>
                        <Badge variant="outline">Primary</Badge>
                      </div>
                      <Button variant="outline" className="w-full">
                        Add Payment Method
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Payment Dialog */}
        <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Make Payment
              </DialogTitle>
              <DialogDescription>
                Pay your outstanding bill of ₹{payableAmount.toFixed(2)}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Button 
                  variant={paymentMethod === "card" ? "default" : "outline"}
                  onClick={() => setPaymentMethod("card")}
                  className="h-16"
                >
                  <CreditCard className="h-5 w-5 mr-2" />
                  Card
                </Button>
                <Button 
                  variant={paymentMethod === "wallet" ? "default" : "outline"}
                  onClick={() => setPaymentMethod("wallet")}
                  className="h-16"
                >
                  <Wallet className="h-5 w-5 mr-2" />
                  UPI/Wallet
                </Button>
              </div>
              
              {paymentMethod === "card" && (
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="expiry">Expiry</Label>
                      <Input id="expiry" placeholder="MM/YY" />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input id="cvv" placeholder="123" />
                    </div>
                  </div>
                </div>
              )}
              
              {paymentMethod === "wallet" && (
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="upiId">UPI ID</Label>
                    <Input id="upiId" placeholder="yourname@upi" />
                  </div>
                </div>
              )}
              
              <div className="p-4 bg-muted/30 rounded-lg">
                <div className="flex justify-between text-sm">
                  <span>Amount to pay:</span>
                  <span className="font-medium">₹{payableAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsPaymentDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handlePayment} className="flex items-center gap-2">
                <IndianRupee className="h-4 w-4" />
                Pay ₹{payableAmount.toFixed(2)}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default BillingPage;