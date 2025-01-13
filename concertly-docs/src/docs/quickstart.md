# Quick Start Guide

Get started with Concertly in minutes! This guide will walk you through the basics.

## Web Platform

1. **Create an Account**
   - Visit [concertly.net/register](https://concertly.net/register)
   - Fill in your details
   - Verify your email

2. **Complete Your Profile**
   - Add your organization details
   - Set your preferences
   - Upload required documents

3. **Find Your First Event**
   ```bash
   POST /api/v1/events
   {
     "title": "Summer Jazz Night",
     "venue_id": "venue_123",
     "date": "2024-07-15T19:00:00Z",
     "ticket_price": 25.00
   }