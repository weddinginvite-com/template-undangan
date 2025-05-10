import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { insertMessageSchema, insertOrderSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes prefix
  const apiPrefix = "/api";

  // Get all templates
  app.get(`${apiPrefix}/templates`, async (req: Request, res: Response) => {
    try {
      const templates = await storage.getTemplates();
      res.json(templates);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch templates" });
    }
  });

  // Get templates by category
  app.get(`${apiPrefix}/templates/category/:category`, async (req: Request, res: Response) => {
    try {
      const { category } = req.params;
      const templates = await storage.getTemplatesByCategory(category as any);
      res.json(templates);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch templates by category" });
    }
  });

  // Get template by ID
  app.get(`${apiPrefix}/templates/:id`, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid template ID" });
      }

      const template = await storage.getTemplateById(id);
      if (!template) {
        return res.status(404).json({ message: "Template not found" });
      }

      res.json(template);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch template" });
    }
  });

  // Get featured templates
  app.get(`${apiPrefix}/templates/featured`, async (req: Request, res: Response) => {
    try {
      const templates = await storage.getFeaturedTemplates();
      res.json(templates);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured templates" });
    }
  });

  // Get new templates
  app.get(`${apiPrefix}/templates/new`, async (req: Request, res: Response) => {
    try {
      const templates = await storage.getNewTemplates();
      res.json(templates);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch new templates" });
    }
  });

  // Get bestseller templates
  app.get(`${apiPrefix}/templates/bestseller`, async (req: Request, res: Response) => {
    try {
      const templates = await storage.getBestsellerTemplates();
      res.json(templates);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch bestseller templates" });
    }
  });

  // Create order
  app.post(`${apiPrefix}/orders`, async (req: Request, res: Response) => {
    try {
      const validationResult = insertOrderSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        return res.status(400).json({ 
          message: "Invalid order data", 
          errors: validationResult.error.errors 
        });
      }
      
      const order = await storage.createOrder(validationResult.data);
      res.status(201).json(order);
    } catch (error) {
      res.status(500).json({ message: "Failed to create order" });
    }
  });

  // Create contact message
  app.post(`${apiPrefix}/messages`, async (req: Request, res: Response) => {
    try {
      const validationResult = insertMessageSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        return res.status(400).json({ 
          message: "Invalid message data", 
          errors: validationResult.error.errors 
        });
      }
      
      const message = await storage.createMessage(validationResult.data);
      res.status(201).json(message);
    } catch (error) {
      res.status(500).json({ message: "Failed to send message" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
