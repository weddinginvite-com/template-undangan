import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  name: z.string().min(3, { message: 'Nama harus diisi minimal 3 karakter' }),
  email: z.string().email({ message: 'Email tidak valid' }),
  subject: z.string().min(3, { message: 'Subjek harus diisi minimal 3 karakter' }),
  message: z.string().min(10, { message: 'Pesan harus diisi minimal 10 karakter' }),
  createdAt: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const ContactForm = () => {
  const { toast } = useToast();
  const [isSending, setIsSending] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const mutation = useMutation({
    mutationFn: async (values: FormValues) => {
      const data = {
        ...values,
        createdAt: new Date().toISOString(),
      };
      
      const response = await apiRequest('POST', '/api/messages', data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: 'Pesan Terkirim!',
        description: 'Terima kasih telah menghubungi kami. Kami akan segera membalas pesan Anda.',
        variant: 'default',
      });
      form.reset();
      setIsSending(false);
    },
    onError: (error) => {
      toast({
        title: 'Gagal Mengirim Pesan',
        description: 'Terjadi kesalahan saat mengirim pesan. Silakan coba lagi nanti.',
        variant: 'destructive',
      });
      setIsSending(false);
    },
  });

  const onSubmit = (values: FormValues) => {
    setIsSending(true);
    mutation.mutate(values);
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-sm">
      <h2 className="font-heading text-2xl font-bold text-secondary mb-6">
        Kirim Pesan
      </h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama</FormLabel>
                  <FormControl>
                    <Input placeholder="Nama lengkap Anda" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
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
          </div>
          
          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subjek</FormLabel>
                <FormControl>
                  <Input placeholder="Subjek pesan" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pesan</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Tulis pesan Anda di sini..." 
                    rows={5}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button 
            type="submit" 
            className="bg-primary hover:bg-primary-dark text-white w-full"
            disabled={isSending}
          >
            {isSending ? (
              <>
                <i className="ri-loader-4-line animate-spin mr-2"></i>
                Mengirim...
              </>
            ) : (
              <>
                <i className="ri-send-plane-fill mr-2"></i>
                Kirim Pesan
              </>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ContactForm;
