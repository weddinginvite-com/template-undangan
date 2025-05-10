import { 
  users, templates, orders, messages, 
  type User, type InsertUser, 
  type Template, type InsertTemplate,
  type Order, type InsertOrder,
  type Message, type InsertMessage,
  type TemplateCategory
} from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Template methods
  getTemplates(): Promise<Template[]>;
  getTemplatesByCategory(category: TemplateCategory): Promise<Template[]>;
  getTemplateById(id: number): Promise<Template | undefined>;
  createTemplate(template: InsertTemplate): Promise<Template>;
  getFeaturedTemplates(): Promise<Template[]>;
  getNewTemplates(): Promise<Template[]>;
  getBestsellerTemplates(): Promise<Template[]>;
  
  // Order methods
  getOrders(): Promise<Order[]>;
  getOrderById(id: number): Promise<Order | undefined>;
  getOrdersByUserId(userId: number): Promise<Order[]>;
  createOrder(order: InsertOrder): Promise<Order>;
  
  // Message methods
  getMessages(): Promise<Message[]>;
  createMessage(message: InsertMessage): Promise<Message>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private templates: Map<number, Template>;
  private orders: Map<number, Order>;
  private messages: Map<number, Message>;
  private currentUserId: number;
  private currentTemplateId: number;
  private currentOrderId: number;
  private currentMessageId: number;

  constructor() {
    this.users = new Map();
    this.templates = new Map();
    this.orders = new Map();
    this.messages = new Map();
    this.currentUserId = 1;
    this.currentTemplateId = 1;
    this.currentOrderId = 1;
    this.currentMessageId = 1;
    
    // Initialize with template data
    this.initializeTemplates();
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Template methods
  async getTemplates(): Promise<Template[]> {
    return Array.from(this.templates.values());
  }

  async getTemplatesByCategory(category: TemplateCategory): Promise<Template[]> {
    return Array.from(this.templates.values()).filter(
      (template) => template.category === category
    );
  }

  async getTemplateById(id: number): Promise<Template | undefined> {
    return this.templates.get(id);
  }

  async createTemplate(insertTemplate: InsertTemplate): Promise<Template> {
    const id = this.currentTemplateId++;
    const template: Template = { ...insertTemplate, id };
    this.templates.set(id, template);
    return template;
  }

  async getFeaturedTemplates(): Promise<Template[]> {
    return Array.from(this.templates.values()).filter(
      (template) => template.isFeatured
    );
  }

  async getNewTemplates(): Promise<Template[]> {
    return Array.from(this.templates.values()).filter(
      (template) => template.isNew
    );
  }

  async getBestsellerTemplates(): Promise<Template[]> {
    return Array.from(this.templates.values()).filter(
      (template) => template.isBestseller
    );
  }

  // Order methods
  async getOrders(): Promise<Order[]> {
    return Array.from(this.orders.values());
  }

  async getOrderById(id: number): Promise<Order | undefined> {
    return this.orders.get(id);
  }

  async getOrdersByUserId(userId: number): Promise<Order[]> {
    return Array.from(this.orders.values()).filter(
      (order) => order.userId === userId
    );
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = this.currentOrderId++;
    const order: Order = { ...insertOrder, id };
    this.orders.set(id, order);
    return order;
  }

  // Message methods
  async getMessages(): Promise<Message[]> {
    return Array.from(this.messages.values());
  }

  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const id = this.currentMessageId++;
    const message: Message = { ...insertMessage, id };
    this.messages.set(id, message);
    return message;
  }

  // Initialize templates
  private initializeTemplates() {
    const sampleTemplates: InsertTemplate[] = [
      {
        name: "Elegant Gold",
        description: "Template undangan pernikahan digital dengan desain elegan dan aksen warna emas yang mewah. Cocok untuk pesta pernikahan formal dan berkelas.",
        price: 299000,
        category: "elegant",
        imageUrl: "https://images.unsplash.com/photo-1563339007-6914941e8ff7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        thumbnails: [
          "https://images.unsplash.com/photo-1563339007-6914941e8ff7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        ],
        features: [
          "Galeri foto dan video",
          "Fitur RSVP online",
          "Peta lokasi terintegrasi",
          "Countdown timer",
          "Background musik",
          "Amplop digital",
          "Kolom ucapan",
          "Love story timeline",
          "Informasi protokol kesehatan"
        ],
        rating: 45,
        reviews: 128,
        isFeatured: true,
        isNew: false,
        isBestseller: true
      },
      {
        name: "Floral Bliss",
        description: "Template undangan pernikahan dengan desain bunga yang romantis dan lembut. Tema floral yang indah cocok untuk pesta pernikahan outdoor atau garden party.",
        price: 249000,
        category: "floral",
        imageUrl: "https://images.unsplash.com/photo-1571115291119-4777633ba0ed?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        thumbnails: [
          "https://images.unsplash.com/photo-1571115291119-4777633ba0ed?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1571115291059-9da0a5ae998f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        ],
        features: [
          "Galeri foto dan video",
          "Fitur RSVP online",
          "Peta lokasi terintegrasi",
          "Countdown timer",
          "Background musik",
          "Amplop digital",
          "Kolom ucapan"
        ],
        rating: 40,
        reviews: 93,
        isFeatured: true,
        isNew: false,
        isBestseller: false
      },
      {
        name: "Minimalist Charm",
        description: "Template undangan pernikahan digital dengan desain minimalis yang bersih dan modern. Sempurna untuk pasangan yang menyukai kesederhanaan namun tetap elegan.",
        price: 199000,
        category: "minimalis",
        imageUrl: "https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        thumbnails: [
          "https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1612035294814-01fb9e4fbdb5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", 
          "https://images.unsplash.com/photo-1563339007-6914941e8ff7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        ],
        features: [
          "Galeri foto dan video",
          "Fitur RSVP online",
          "Peta lokasi terintegrasi",
          "Countdown timer",
          "Background musik",
          "Amplop digital",
          "Kolom ucapan"
        ],
        rating: 50,
        reviews: 42,
        isFeatured: false,
        isNew: true,
        isBestseller: false
      },
      {
        name: "Rustic Vintage",
        description: "Template undangan pernikahan dengan gaya rustic dan vintage yang hangat. Cocok untuk pesta pernikahan di area pedesaan, barn, atau tempat dengan tema country.",
        price: 279000,
        category: "rustic",
        imageUrl: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        thumbnails: [
          "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1571115291119-4777633ba0ed?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1492905215819-3b880a276559?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        ],
        features: [
          "Galeri foto dan video",
          "Fitur RSVP online",
          "Peta lokasi terintegrasi",
          "Countdown timer",
          "Background musik",
          "Amplop digital",
          "Kolom ucapan",
          "Love story timeline"
        ],
        rating: 40,
        reviews: 86,
        isFeatured: true,
        isNew: false,
        isBestseller: false
      },
      {
        name: "Marble Luxury",
        description: "Template undangan pernikahan mewah dengan desain marmer dan aksen metalik. Tampilan premium dan elegan untuk pernikahan formal dan berkelas.",
        price: 329000,
        category: "elegant",
        imageUrl: "https://images.unsplash.com/photo-1492905215819-3b880a276559?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        thumbnails: [
          "https://images.unsplash.com/photo-1492905215819-3b880a276559?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        ],
        features: [
          "Galeri foto dan video",
          "Fitur RSVP online",
          "Peta lokasi terintegrasi",
          "Countdown timer",
          "Background musik",
          "Amplop digital",
          "Kolom ucapan",
          "Love story timeline",
          "Live streaming",
          "Informasi protokol kesehatan",
          "Multi-bahasa"
        ],
        rating: 45,
        reviews: 73,
        isFeatured: true,
        isNew: false,
        isBestseller: false
      },
      {
        name: "Modern Simplicity",
        description: "Template undangan pernikahan dengan desain modern minimalis yang bersih dan elegan. Fokus pada tipografi dan layout yang nyaman dibaca.",
        price: 219000,
        category: "minimalis",
        imageUrl: "https://images.unsplash.com/photo-1612035294814-01fb9e4fbdb5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        thumbnails: [
          "https://images.unsplash.com/photo-1612035294814-01fb9e4fbdb5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1563339007-6914941e8ff7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1571115291119-4777633ba0ed?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        ],
        features: [
          "Galeri foto dan video",
          "Fitur RSVP online",
          "Peta lokasi terintegrasi",
          "Countdown timer",
          "Background musik",
          "Amplop digital",
          "Kolom ucapan",
          "Mode gelap/terang"
        ],
        rating: 40,
        reviews: 37,
        isFeatured: false,
        isNew: true,
        isBestseller: false
      }
    ];

    // Add templates to storage
    sampleTemplates.forEach(template => {
      const id = this.currentTemplateId++;
      this.templates.set(id, { ...template, id });
    });
  }
}

export const storage = new MemStorage();
