import { useState } from 'react';
import { useLocation } from 'wouter';
import { useMutation } from '@tanstack/react-query';
import { useCart } from '@/context/CartContext';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { formatCurrency } from '@/lib/utils';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const formSchema = z.object({
  customerName: z.string().min(3, { message: 'Nama harus diisi minimal 3 karakter' }),
  customerEmail: z.string().email({ message: 'Email tidak valid' }),
  customerPhone: z.string().min(10, { message: 'Nomor telepon tidak valid' }).max(15),
  paymentMethod: z.string({ required_error: 'Pilih metode pembayaran' }),
});

type FormValues = z.infer<typeof formSchema>;

const CheckoutForm = () => {
  const { cart, totalPrice, clearCart } = useCart();
  const { toast } = useToast();
  const [_, setLocation] = useLocation();
  const [isProcessing, setIsProcessing] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerName: '',
      customerEmail: '',
      customerPhone: '',
      paymentMethod: '',
    },
  });

  const mutation = useMutation({
    mutationFn: async (values: FormValues) => {
      const orderData = {
        ...values,
        items: cart,
        total: totalPrice,
        status: 'pending',
        userId: null,
        createdAt: new Date().toISOString(),
      };
      
      const response = await apiRequest('POST', '/api/orders', orderData);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: 'Pesanan Berhasil Dibuat!',
        description: 'Terima kasih atas pesanan Anda. Silakan lakukan pembayaran sesuai instruksi yang dikirim ke email Anda.',
      });
      clearCart();
      setIsProcessing(false);
      // Redirect to thank you page or home
      setTimeout(() => {
        setLocation('/');
      }, 2000);
    },
    onError: (error) => {
      toast({
        title: 'Gagal Membuat Pesanan',
        description: 'Terjadi kesalahan saat membuat pesanan. Silakan coba lagi nanti.',
        variant: 'destructive',
      });
      setIsProcessing(false);
    },
  });

  const onSubmit = (values: FormValues) => {
    setIsProcessing(true);
    mutation.mutate(values);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <h2 className="font-heading text-2xl font-bold text-secondary mb-6">
          Detail Pembayaran
        </h2>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <FormField
                control={form.control}
                name="customerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Lengkap</FormLabel>
                    <FormControl>
                      <Input placeholder="Nama lengkap Anda" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="customerEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Email Anda" type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="customerPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nomor Telepon</FormLabel>
                      <FormControl>
                        <Input placeholder="Nomor telepon Anda" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="paymentMethod"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Metode Pembayaran</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0 border rounded-md p-4">
                          <FormControl>
                            <RadioGroupItem value="bank_transfer" />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer flex-1">
                            Transfer Bank
                          </FormLabel>
                          <div className="flex space-x-2">
                            <i className="ri-bank-card-line text-gray-500"></i>
                          </div>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0 border rounded-md p-4">
                          <FormControl>
                            <RadioGroupItem value="e_wallet" />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer flex-1">
                            E-Wallet (OVO, GoPay, Dana)
                          </FormLabel>
                          <div className="flex space-x-2">
                            <i className="ri-wallet-3-line text-gray-500"></i>
                          </div>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0 border rounded-md p-4">
                          <FormControl>
                            <RadioGroupItem value="credit_card" />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer flex-1">
                            Kartu Kredit / Debit
                          </FormLabel>
                          <div className="flex space-x-2">
                            <i className="ri-visa-line text-gray-500"></i>
                            <i className="ri-mastercard-line text-gray-500"></i>
                          </div>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="pt-4 border-t">
              <Button 
                type="submit" 
                className="bg-primary hover:bg-primary-dark text-white w-full"
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <i className="ri-loader-4-line animate-spin mr-2"></i>
                    Memproses...
                  </>
                ) : (
                  <>
                    <i className="ri-secure-payment-line mr-2"></i>
                    Lanjutkan ke Pembayaran
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
      
      <div>
        <h2 className="font-heading text-2xl font-bold text-secondary mb-6">
          Ringkasan Pesanan
        </h2>
        
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="space-y-4 mb-6">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center border-b pb-4">
                <div className="flex items-center">
                  <div className="w-16 h-16 rounded-md overflow-hidden mr-4">
                    <img 
                      src={item.imageUrl} 
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-primary">{formatCurrency(item.price)}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="space-y-2 border-b pb-4 mb-4">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>{formatCurrency(totalPrice)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Pajak</span>
              <span>{formatCurrency(0)}</span>
            </div>
          </div>
          
          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span className="text-primary">{formatCurrency(totalPrice)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
