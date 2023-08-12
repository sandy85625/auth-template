// razorpay
interface RazorpayOptions {
    key: string;
    currency: string;
    amount: string;
    order_id: string;
    name: string;
    description: string;
    handler: (response: any) => void;
    prefill?: {
      name: string;
      email: string;
    };
  }
  
  interface RazorpayInstance {
    open: () => void;
  }
  
  interface RazorpayConstructor {
    new (options: RazorpayOptions): RazorpayInstance;
  }

  declare global {
    interface Window {
      Razorpay: RazorpayConstructor;
      ethereum: any;
    }
  }
  
  export {};
  